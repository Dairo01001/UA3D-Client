import { Input } from '@/components'
import { Person } from '../../models'

type EditProfileProps = {
  person: Person | null
}

export const EditPerson = ({ person }: EditProfileProps) => {
  return (
    <div className="m-10 p-4 shadow-lg">
      <p className="m-5 w-full text-center text-2xl font-bold">
        Datos Institucionales
      </p>
      <div className="flex flex-col gap-5 p-10">
        <div className="flex flex-row gap-5">
          <Input
            type="text"
            name="firstName"
            disabled
            defaultValue={person?.firstName}
            placeholder="Nombre"
            required
          />
          <Input
            type="text"
            disabled
            name="secondName"
            defaultValue={person?.secondName}
            placeholder="Segundo Nombre"
          />
        </div>

        <div className="flex flex-row gap-5">
          <Input
            type="text"
            disabled
            name="firstSurname"
            defaultValue={person?.firstSurname}
            placeholder="Primer Apellido"
            required
          />
          <Input
            type="text"
            disabled
            name="secondSurname"
            defaultValue={person?.secondSurname}
            placeholder="Segundo Apellido"
          />
        </div>
        <Input
          type="text"
          disabled
          name="email"
          defaultValue={person?.email}
          placeholder="Correo"
          required
        />
      </div>
    </div>
  )
}

export default EditPerson
