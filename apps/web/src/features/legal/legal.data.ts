import type { LegalDocument } from './types'

export const contactEmail = 'registros@dataijam.com'

const updated = '3 de octubre de 2026'

export const privacyPolicy: LegalDocument = {
  path: '/privacidad',
  eyebrow: 'Legal',
  title: 'Política de privacidad',
  intro:
    'Cómo tratamos los datos personales de quienes se inscriben y participan en DatAIJam, conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador.',
  updated,
  highlights: [
    {
      title: 'No compartimos con patrocinadores',
      text: 'Tus datos no se venden ni se entregan a patrocinadores.',
    },
    {
      title: 'Solo lo necesario',
      text: 'Los usamos para organizar el evento y el hackathon, nada más.',
    },
    {
      title: 'Tú decides',
      text: 'Puedes pedir acceso, corrección o eliminación cuando quieras.',
    },
  ],
  sections: [
    {
      id: 'quienes-somos',
      title: 'Quiénes somos',
      blocks: [
        'DatAIJam es un evento de conferencias y hackathon sobre datos e inteligencia artificial que se realiza en Guayaquil, Ecuador.',
        `Para cualquier consulta sobre tus datos personales, escríbenos a ${contactEmail}.`,
      ],
    },
    {
      id: 'datos',
      title: 'Qué datos recogemos',
      blocks: [
        {
          list: [
            'Inscripción: los datos que ingresas en el formulario oficial, incluidos nombres, apellidos, cédula, correo electrónico, institución o empresa, rol o carrera, temas de interés y cómo conociste el evento.',
            'Comunicaciones: tu correo y el contenido de los mensajes que nos envíes.',
            'Fotos y video: imágenes tomadas durante el evento (ver la sección dedicada más abajo).',
          ],
        },
        'Este sitio web no usa cookies de seguimiento ni herramientas de analítica. Solo guarda en tu navegador tu preferencia de tema (claro u oscuro), que no sale de tu dispositivo. Las tipografías se sirven desde este mismo sitio. Como cualquier sitio, el servidor que lo aloja puede registrar datos técnicos de acceso, como la dirección IP, por motivos de seguridad.',
      ],
    },
    {
      id: 'finalidad',
      title: 'Para qué los usamos',
      blocks: [
        {
          list: [
            'Gestionar tu inscripción y tu participación en las conferencias y el hackathon.',
            'Enviarte información logística, recordatorios y avisos de cambios en el programa.',
            'Organizar los equipos, las mentorías y la evaluación del hackathon.',
            'Responder tus consultas.',
            'Difundir el evento con fotos y video, según se explica más abajo.',
          ],
        },
        'No usaremos tus datos para fines distintos de los descritos sin pedirte antes tu consentimiento.',
      ],
    },
    {
      id: 'compartir',
      title: 'Con quién los compartimos',
      blocks: [
        'No vendemos tus datos ni los compartimos con patrocinadores.',
        {
          list: [
            'Google, que aloja el formulario de inscripción (Google Forms) y procesa los datos por cuenta nuestra.',
            'Mentores y jurado del hackathon, solo en lo necesario para acompañar y evaluar a tu equipo y su proyecto.',
            'Autoridades competentes, únicamente cuando la ley lo exija.',
          ],
        },
      ],
    },
    {
      id: 'conservacion',
      title: 'Cuánto tiempo los conservamos',
      blocks: [
        'Conservamos tus datos solo durante el tiempo necesario para cumplir las finalidades descritas en esta política. Puedes solicitar su eliminación en cualquier momento.',
      ],
    },
    {
      id: 'imagen',
      title: 'Fotografías y video',
      blocks: [
        'Durante el evento se tomarán fotografías y videos que podrán publicarse en este sitio y en nuestras redes sociales.',
        `Si prefieres no aparecer, avísale al equipo organizador durante el evento o escríbenos a ${contactEmail}, y retiraremos el contenido en el que aparezcas en la medida de lo posible.`,
      ],
    },
    {
      id: 'derechos',
      title: 'Tus derechos',
      blocks: [
        'Puedes ejercer en cualquier momento tus derechos de:',
        {
          list: [
            'Acceso: saber qué datos tuyos tenemos.',
            'Rectificación y actualización: corregir datos inexactos o incompletos.',
            'Eliminación: pedir que borremos tus datos.',
            'Oposición: oponerte a un uso concreto de tus datos.',
            'Portabilidad: recibir tus datos en un formato de uso común.',
            'Retiro del consentimiento, sin que afecte lo realizado antes.',
          ],
        },
        `Escríbenos a ${contactEmail} con el asunto «Protección de datos». Te responderemos dentro de los plazos que establece la ley. Si consideras que no atendimos tu solicitud, puedes acudir a la Superintendencia de Protección de Datos Personales.`,
      ],
    },
    {
      id: 'seguridad',
      title: 'Seguridad',
      blocks: [
        'Aplicamos medidas razonables para proteger tus datos y limitamos su acceso al equipo organizador que los necesita para cumplir las finalidades descritas.',
      ],
    },
    {
      id: 'cambios',
      title: 'Cambios a esta política',
      blocks: [
        'Si actualizamos esta política, publicaremos la nueva versión en esta página con su fecha de actualización.',
      ],
    },
  ],
}

export const termsOfUse: LegalDocument = {
  path: '/terminos',
  eyebrow: 'Legal',
  title: 'Términos y condiciones',
  intro:
    'Las reglas para participar en DatAIJam, sus conferencias y su hackathon. Al inscribirte o participar, aceptas estos términos.',
  updated,
  highlights: [
    {
      title: 'Tu proyecto es tuyo',
      text: 'Lo que construyas en el hackathon pertenece a tu equipo.',
    },
    {
      title: 'Equipos de 3 a 4',
      text: 'Para el hackathon te inscribes con tu equipo ya armado.',
    },
    {
      title: 'Un espacio respetuoso',
      text: 'Aplicamos un código de conducta en todas las actividades.',
    },
  ],
  sections: [
    {
      id: 'aceptacion',
      title: 'Aceptación',
      blocks: [
        'Estos términos regulan la participación en DatAIJam, un evento de conferencias y hackathon sobre datos e inteligencia artificial en Guayaquil, Ecuador, y el uso de este sitio web.',
        'Al inscribirte o participar en cualquiera de sus actividades, confirmas que los leíste y los aceptas.',
      ],
    },
    {
      id: 'inscripcion',
      title: 'Inscripción',
      blocks: [
        {
          list: [
            'La inscripción se realiza únicamente a través del formulario oficial enlazado en este sitio.',
            'Debes proporcionar información veraz y mantenerla actualizada.',
            'La participación en DatAIJam es gratuita; no se cobra ningún valor por la inscripción.',
          ],
        },
      ],
    },
    {
      id: 'programa',
      title: 'Programa del evento',
      blocks: [
        'La agenda, los horarios y los speakers pueden cambiar por motivos organizativos o de fuerza mayor. Comunicaremos cualquier cambio por este sitio y por correo a las personas inscritas.',
      ],
    },
    {
      id: 'hackathon',
      title: 'Hackathon',
      blocks: [
        {
          list: [
            'Participan equipos de 3 a 4 integrantes. Para inscribirte necesitas tener tu equipo armado.',
            'El hackathon dura cuatro semanas: capacitación y nivelación, sprint eliminatorio, desarrollo por tracks y Gran Final con Demo Day.',
            'Los proyectos se evalúan con las rúbricas publicadas en este sitio: una eliminatoria en la semana 2 y la final del jurado en la semana 4.',
            'Las decisiones del jurado son definitivas.',
          ],
        },
      ],
    },
    {
      id: 'propiedad',
      title: 'Propiedad de los proyectos',
      blocks: [
        'Los proyectos, el código, los prototipos y demás resultados que desarrolles en el hackathon pertenecen a tu equipo.',
        'Para difundir el evento, DatAIJam podrá mencionar el nombre del proyecto y del equipo, y mostrar capturas o demos presentadas públicamente durante el evento.',
        'Cada equipo es responsable de contar con los derechos sobre el código, los datos y los recursos de terceros que utilice, y de respetar sus licencias.',
      ],
    },
    {
      id: 'conducta',
      title: 'Código de conducta',
      blocks: [
        'DatAIJam es un espacio para aprender y colaborar. En todas las actividades, presenciales y en línea, esperamos que:',
        {
          list: [
            'Trates a todas las personas con respeto, sin importar su nivel de experiencia, origen o identidad.',
            'No acoses, discrimines, intimides ni ridiculices a nadie.',
            'Respetes el trabajo de otros equipos y no presentes como propio lo que no lo es.',
          ],
        },
        `La organización podrá retirar o descalificar a quien incumpla este código. Si presencias o sufres una situación inapropiada, avisa al equipo organizador o escríbenos a ${contactEmail}.`,
      ],
    },
    {
      id: 'sitio',
      title: 'Contenido del sitio',
      blocks: [
        'La marca, el logotipo y los contenidos de este sitio pertenecen a DatAIJam o a sus respectivos autores, y no pueden usarse sin autorización. Las fotografías de terceros indican su autoría y licencia.',
      ],
    },
    {
      id: 'responsabilidad',
      title: 'Responsabilidad',
      blocks: [
        'Cada participante es responsable de sus pertenencias y equipos durante el evento. En la medida que lo permita la ley, DatAIJam no se hace responsable por pérdidas o daños que no le sean imputables.',
      ],
    },
    {
      id: 'privacidad',
      title: 'Privacidad',
      blocks: [
        'El tratamiento de tus datos personales se rige por nuestra Política de privacidad, disponible en este mismo sitio.',
      ],
    },
    {
      id: 'cambios',
      title: 'Cambios y legislación aplicable',
      blocks: [
        'Podemos actualizar estos términos; la versión vigente siempre estará publicada en esta página con su fecha de actualización.',
        'Estos términos se rigen por las leyes de la República del Ecuador.',
      ],
    },
  ],
}
