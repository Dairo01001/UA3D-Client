import { Card, CardProps } from './components'

const owners: CardProps[] = [
  {
    image: '/owners/toquica.png',
    title: 'Full Stack Developer',
    fullName: 'Jose Daniel Toquica Agudelo'
  },
  {
    image: '/owners/cenon.png',
    title: 'Diseñador 3D',
    fullName: 'Yerson Arley Cenon Cabrera'
  },
  {
    image: '/owners/gallejo.png',
    title: 'Lider de Proyecto',
    fullName: 'Lubeimar Eduardo Gallejo Ruiz'
  },
  {
    image: '/owners/verastegui.png',
    title: 'Administrador base de datos',
    fullName: 'Fredy Antonio Verástegui González'
  },
  {
    image: '/owners/millan.png',
    title: 'Arquitecto de Software',
    fullName: 'Edwin Eduardo Millán Rojas'
  },
  {
    image: '/owners/janer.jpg',
    title: 'Presidente de la Universidad',
    fullName: 'Janer Edmundo Gonzales'
  },
  {
    image: '/owners/anguie.jpg',
    title: 'Desarrollo de Personajes',
    fullName: 'Anguie Alexandra'
  }
]

export const About = () => {
  return (
    <div className="flex flex-grow flex-col">
      <div className="flex w-full flex-grow flex-col items-center justify-center p-10">
        <h2 className="text-center text-2xl">¿Que es Uniamazonia 3D?</h2>
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Uniamazonia 3D" className="h-52 w-auto" />
          <p className="max-w-2xl">
            Los estudiantes y profesores podrán explorar el campus virtualmente,
            caminando por pasillos, entrando en aulas, y explorando espacios al
            aire libre. Esto podría ofrecer una sensación más inmersiva que los
            entornos virtuales tradicionales. En Uniamazonia 3D se pueden llevar
            a cabo clases en línea en entornos virtuales específicos, con
            profesores y estudiantes interactuando en tiempo real. Esto incluye
            pizarras virtuales, herramientas de colaboración y chat de voz.
            Generando un ambiente único para la enseñanza y el aprendizaje.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-secondary">
        <span className="m-10 text-center text-3xl text-green-500">
          Integrantes
        </span>
        <div className="flex flex-wrap justify-center gap-3">
          {owners.map(owner => (
            <Card key={owner.fullName} {...owner} />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-3">
          <img
            src="/logo-uniamazonia.png"
            alt="Logo Universidad de la Amazonia"
            className="h-24 w-auto"
          />
          <img
            src="/logo-semillero-red.png"
            alt="Logo Semillero Red"
            className="h-24 w-auto"
          />
        </div>
      </div>
    </div>
  )
}

export default About
