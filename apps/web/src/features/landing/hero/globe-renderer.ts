// Orthographic ray/sphere rendering: longitude changes around the Y axis,
// while the silhouette and camera remain fixed. No video or planar rotation.
const vertexSource = `
attribute vec2 position;
varying vec2 point;
void main() { point = position * 1.08; gl_Position = vec4(position, 0., 1.); }
`

const fragmentSource = `
precision highp float;
varying vec2 point;
uniform sampler2D earth;
uniform float angle;
uniform float elapsed;
uniform vec3 accent;
const float PI = 3.14159265359;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
void main() {
  float r = length(point);
  if (r > 1.) {
    float halo = exp(-(r-1.)*65.) * .42;
    gl_FragColor = vec4(accent, halo);
    return;
  }
  vec3 n = vec3(point, sqrt(max(0., 1.-r*r)));
  // Tilt the globe towards the northern hemisphere before rotating longitude.
  float tilt = .25;
  vec3 p = vec3(n.x, n.y*cos(tilt)+n.z*sin(tilt), n.z*cos(tilt)-n.y*sin(tilt));
  p = vec3(p.x*cos(angle)+p.z*sin(angle), p.y, p.z*cos(angle)-p.x*sin(angle));
  vec2 uv = vec2(atan(p.x,p.z)/(2.*PI)+.5, .5-asin(clamp(p.y,-1.,1.))/PI);
  vec3 albedo = texture2D(earth, uv).rgb;
  float light = .28 + .72*max(dot(n,normalize(vec3(-.5,.7,1.4))),0.);
  float land = smoothstep(.015,.09,max(albedo.r,albedo.g)-albedo.b*.75);
  vec3 color = mix(vec3(.012,.07,.16), albedo*vec3(.5,.85,1.15), .78)*light;
  // A sparse network of great-circle routes rotates with the surface.
  float routes = 0.;
  float sparks = 0.;
  float glow = 0.;
  for(int i=0;i<7;i++) {
    float f=float(i);
    vec3 axis=normalize(vec3(sin(f*2.4+.3), .3+cos(f*1.7),cos(f*2.1)));
    float distanceToRoute=abs(dot(p,axis));
    float route = exp(-distanceToRoute*650.);
    routes += route*.28;
    // Orthonormal route coordinates keep each moving light on its great circle.
    vec3 u = normalize(cross(axis,vec3(0.,1.,0.)));
    vec3 v = cross(axis,u);
    float phase = elapsed*(2.*PI/24.)*(1.+mod(f,3.))+f*1.7;
    vec3 packet = u*cos(phase)+v*sin(phase);
    float d = max(0.,1.-dot(p,packet));
    float opposite = max(0.,1.+dot(p,packet));
    sparks += exp(-d*110000.) + exp(-opposite*110000.);
    glow += exp(-d*2200.)*.65 + exp(-opposite*2200.)*.65;
    // A short luminous wake follows the packet; hubs gently breathe in place.
    float behind = mod(phase-atan(dot(p,v),dot(p,u))+2.*PI,2.*PI);
    routes += route*exp(-behind*7.)*.65;
    float hub = max(0.,1.-dot(p,u));
    float pulse = .7+.3*sin(elapsed*(2.*PI/6.)+f);
    sparks += exp(-hub*80000.)*pulse;
    glow += exp(-hub*1800.)*.5*pulse;
  }
  vec2 cells=uv*vec2(240.,120.);
  float seed=hash(floor(cells));
  float node=exp(-length(fract(cells)-.5)*24.)*step(.85,seed)*land;
  float visibility = smoothstep(0.,.2,n.z);
  float twinkle = .8+.2*sin(elapsed*(2.*PI/8.)+seed*2.*PI);
  color += accent*(routes + node*2.4*twinkle + glow)*visibility;
  color += mix(accent,vec3(1.),.7)*sparks*1.6*visibility;
  float rim=pow(1.-n.z,3.5);
  color += accent*rim*.8;
  gl_FragColor=vec4(color,1.);
}
`

export function createGlobeRenderer(canvas: HTMLCanvasElement, textureUrl: string) {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: true })
  if (!gl) return null
  const shaders: WebGLShader[] = []
  const program = gl.createProgram()
  const buffer = gl.createBuffer()
  const texture = gl.createTexture()
  let frame = 0
  let disposed = false
  let loaded = false
  let visible = true
  let angle = -1.35
  let elapsed = 0
  let previousTime = 0
  const image = new Image()

  function dispose() {
    disposed = true
    cancelAnimationFrame(frame)
    image.onload = null
    image.onerror = null
    gl!.deleteTexture(texture)
    gl!.deleteBuffer(buffer)
    gl!.deleteProgram(program)
    shaders.forEach((shader) => gl!.deleteShader(shader))
  }

  try {
    if (!program || !buffer || !texture) throw new Error('WebGL allocation failed')
    for (const [type, source] of [
      [gl.VERTEX_SHADER, vertexSource],
      [gl.FRAGMENT_SHADER, fragmentSource],
    ] as const) {
      const shader = gl.createShader(type)
      if (!shader) throw new Error('Shader allocation failed')
      shaders.push(shader)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(shader) ?? 'Shader compilation failed')
      gl.attachShader(program, shader)
    }
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error('Globe shader linking failed')
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
  } catch (error) {
    console.warn('Globe unavailable; using the static illustration.', error)
    dispose()
    return null
  }

  const rotation = gl.getUniformLocation(program!, 'angle')
  const clock = gl.getUniformLocation(program!, 'elapsed')
  const accent = gl.getUniformLocation(program!, 'accent')

  function draw(time: number) {
    frame = 0
    if (disposed || !loaded) return
    // This ambient globe rotates continuously whenever it is visible.
    // Other site animations still honor the system's reduced-motion preference.
    const running = visible && !document.hidden
    if (running && previousTime) {
      const delta = (time - previousTime) / 1000
      angle = (angle + delta * ((Math.PI * 2) / 60)) % (Math.PI * 2)
      // All light periods divide 120; wrapping avoids precision loss without a jump.
      elapsed = (elapsed + delta) % 120
    }
    previousTime = running ? time : 0
    const size = Math.min(
      2048,
      Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2)),
    )
    if (canvas.width !== size) {
      canvas.width = size
      canvas.height = size
    }
    gl!.viewport(0, 0, canvas.width, canvas.height)
    gl!.uniform1f(rotation, angle)
    gl!.uniform1f(clock, elapsed)
    const token = getComputedStyle(canvas).getPropertyValue('--color-brand-cyan').trim()
    const rgb = /^#[0-9a-f]{6}$/i.test(token)
      ? token
          .slice(1)
          .match(/../g)!
          .map((value) => parseInt(value, 16) / 255)
      : [0.03, 0.8, 0.94]
    gl!.uniform3f(accent, rgb[0], rgb[1], rgb[2])
    gl!.drawArrays(gl!.TRIANGLES, 0, 6)
    canvas.dataset.ready = 'true'
    if (running) frame = requestAnimationFrame(draw)
  }

  function refresh() {
    cancelAnimationFrame(frame)
    previousTime = 0
    draw(performance.now())
  }

  const resize = new ResizeObserver(refresh)
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    refresh()
  })
  const theme = new MutationObserver(refresh)
  resize.observe(canvas)
  intersection.observe(canvas)
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  document.addEventListener('visibilitychange', refresh)
  const onLost = (event: Event) => {
    event.preventDefault()
    loaded = false
    cancelAnimationFrame(frame)
    delete canvas.dataset.ready
  }
  canvas.addEventListener('webglcontextlost', onLost)

  image.onload = () => {
    if (disposed) return
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    loaded = true
    refresh()
  }
  image.src = textureUrl

  return {
    destroy() {
      resize.disconnect()
      intersection.disconnect()
      theme.disconnect()
      document.removeEventListener('visibilitychange', refresh)
      canvas.removeEventListener('webglcontextlost', onLost)
      delete canvas.dataset.ready
      dispose()
    },
  }
}
