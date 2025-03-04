import { Edit } from 'lucide-react'
import { useEffect, useState } from 'react'
import { IProfile, UserProfile } from '../../models'
import { upsertMe } from '../../services'
import { useToast } from '@/hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Input } from '@/components'
import axios from 'axios'

type EditProfileProps = {
  user: UserProfile
  accessToken: string
}

export const EditProfile = ({ user, accessToken }: EditProfileProps) => {
  const { toast } = useToast()
  const { profile } = user
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [edit, setEdit] = useState(true)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (profile: Omit<IProfile, 'id'>) =>
      upsertMe(accessToken, profile),
    onSuccess: () => {
      toast({
        title: 'Perfil actualizado',
        variant: 'default',
        description: 'Perfil actualizado con éxito'
      })
      queryClient.invalidateQueries({ queryKey: ['FullUser'] })
    },
    onError: () => {
      toast({
        title: 'Error al actualizar el perfil',
        variant: 'destructive',
        description: 'Ha ocurrido un error al actualizar el perfil'
      })
    }
  })

  useEffect(() => {
    if (profile) {
      setImgUrl(profile.photo)
    }
  }, [profile])

  return (
    <div className="m-10 p-4 shadow-lg">
      <p className="m-5 w-full text-center text-2xl font-bold">
        Datos Personales
        <Edit onClick={() => setEdit(!edit)} className="hover:cursor-pointer" />
      </p>
      <div className="flex gap-5">
        <div className="w-full">
          <form
            onSubmit={event => {
              event.preventDefault()
              const formData = new FormData(event.currentTarget)
              const data = Object.fromEntries(formData.entries())

              const newProfile: Omit<IProfile, 'id'> = {
                birthDate: new Date(
                  data.birthDate.valueOf().toString()
                ).toISOString(),
                phone: data.phone.valueOf().toString(),
                photo: imgUrl || ' ',
                userId: user.id
              }
              mutation.mutate(newProfile)
              setEdit(!edit)
            }}
            className="w-full space-y-8 rounded-lg p-10"
          >
            <Input
              type="text"
              disabled={edit}
              name="phone"
              placeholder="Celular"
              defaultValue={profile?.phone}
              required
            />
            <Input
              type="file"
              disabled={edit}
              name="photo"
              placeholder="Foto"
              accept="image/*"
              onChange={e => {
                if (e.target.files) {
                  const selectedFile = e.target.files[0]
                  const formData = new FormData()
                  formData.append('image', selectedFile as Blob)
                  axios
                    .post('/images/upload', formData, {
                      headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                      }
                    })
                    .then(res => {
                      toast({
                        title: 'Foto subida correctamente',
                        variant: 'default',
                        description: 'La foto se ha subido correctamente'
                      })
                      setImgUrl(res.data.url)
                    })
                    .catch(() => {
                      toast({
                        title: 'Error al subir la foto',
                        variant: 'destructive',
                        description: 'Ha ocurrido un error al subir la foto'
                      })
                    })
                }
              }}
              required
            />
            <Input
              type="date"
              disabled={edit}
              name="birthDate"
              placeholder="Fecha de nacimiento"
              defaultValue={profile?.birthDate.split('T')[0]}
              required
            />
            {edit || (
              <div className="flex w-full justify-around gap-4">
                <Button size="sm" className="bg-green-600" type="submit">
                  Enviar
                </Button>
              </div>
            )}
          </form>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center">
            <img
              src={
                imgUrl ||
                'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
              }
              alt="Foto de perfil"
              className="relative m-5 h-72 w-auto rounded-sm bg-cover bg-center bg-no-repeat"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
