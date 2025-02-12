import { Calendar, Input } from '@/components'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Edit } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { UserProfile } from '../../models'
import { upsertMe } from '../../services'
import { ProfileSchema } from './schema'
import { UploadImg } from '@/components/upload-img'
import { useToast } from '@/hooks'

type EditProfileProps = {
  user: UserProfile
  accessToken: string
}

export const EditProfile = ({ user, accessToken }: EditProfileProps) => {
  const { toast } = useToast()
  const { profile } = user
  const [photo, setPhoto] = useState<string | null>(null)
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      birthDate: profile?.birthDate ? new Date(profile?.birthDate) : new Date(),
      phone: profile?.phone || '',
      photo: profile?.photo || ''
    }
  })
  const [edit, setEdit] = useState(true)
  console.log(photo)

  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    if (!photo) {
      return toast({
        title: 'Error al subir la imagen',
        variant: 'destructive',
        description: 'Debes subir una imagen de perfil'
      })
    }

    const upsertProfile = {
      birthDate: values.birthDate.toISOString(),
      phone: values.phone,
      photo: values.photo || photo || '',
      userId: user.id
    }
    upsertMe(accessToken, upsertProfile)
      .then(() => setEdit(true))
      .finally(() => setEdit(true))
  }

  return (
    <div className="m-10 p-4 shadow-lg">
      <p className="m-5 w-full text-center text-2xl font-bold">
        Datos Personales
        <Edit onClick={() => setEdit(!edit)} className="hover:cursor-pointer" />
      </p>
      <div className="flex gap-5">
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8 rounded-lg p-10"
            >
              <FormField
                control={form.control}
                name="birthDate"
                disabled={edit}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={field.value}
                          onSelect={field.onChange}
                          className="rounded-md border shadow"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                disabled={edit}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numero de Telefono</FormLabel>
                    <FormControl>
                      <Input placeholder="3003123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                disabled={edit}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto</FormLabel>
                    <FormControl>
                      <Input
                        value={photo || ''}
                        onChange={e => {
                          setPhoto(e.target.value)
                          field.onChange(e)
                        }}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <UploadImg
                photo={photo}
                setPhoto={setPhoto}
                accessToken={accessToken}
              />

              {!edit ? (
                <div className="flex w-full justify-around">
                  <Button size="sm" className="bg-green-600" type="submit">
                    Enviar
                  </Button>

                  <Button
                    size="sm"
                    className="bg-red-600"
                    onClick={() => setEdit(true)}
                  >
                    Cancelar
                  </Button>
                </div>
              ) : null}
            </form>
          </Form>
        </div>
        <img
          src={
            profile?.photo ||
            photo ||
            'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
          }
          alt="Foto de perfil"
          className="m-5 h-72 w-auto rounded-sm bg-cover bg-center bg-no-repeat"
        />
      </div>
    </div>
  )
}

export default EditProfile
