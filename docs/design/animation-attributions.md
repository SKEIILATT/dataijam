# Animation component notices

Two small UI components in `apps/web/src/components/ui/` adapt ideas and code from the projects below. Both were modified to use DatAIJam's brand colors and motion settings.

## React Bits GradientText

Source: https://github.com/DavidHDev/react-bits

MIT + Commons Clause License Condition v1.0

Copyright (c) 2026 David Haz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, and distribute the Software **as part of an application, website, or product**, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

### Commons Clause Restriction

You may use this Software, including for any commercial purpose, **so long as you do not sell, sublicense, or redistribute the components themselves-whether alone, in a bundle, or as a ported version.**

### No Warranty

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Magic UI Border Beam

Source: https://github.com/magicuidesign/magicui

MIT License

Copyright (c) Magic UI

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## 21st.dev design references

The hero word entrance, hackathon pointer grid, value card spotlight, and primary button sheen
were independently implemented for this site after reviewing these component pages:

- Text Reveal: https://21st.dev/@kuratlielia/components/text-reveal
- Grid Pulse: https://21st.dev/@carolinaraulino/components/grid-pulse
- Shiny Button: https://21st.dev/@dillionverma/components/shiny-button
- Spotlight Card pattern: https://news.21st.dev/blog/react-spotlight-effect-components

The landing's scroll-expanding media section (`ScrollExpandMedia`) combines two 21st.dev
community components, "Scroll Expansion Hero" and "Image Stream Hero". It was reimplemented
with `motion/react` on native scroll (sticky pinning) instead of intercepting wheel and touch
events, so Lenis, anchor links, keyboard scrolling and reduced motion keep working.
