import { Button, Input } from '@/components'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useAppSelector, useToast } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { SignUpPersonSchema } from '../../schemas'
import { FacultySelector } from '../faculty-selector'
import { createFullPerson } from '../services/sign-up.service'
import { AxiosError } from 'axios'
import { SignUpTabs } from '../../sign-up'

interface SignUpPersonProps {
  setActiveTab: React.Dispatch<React.SetStateAction<SignUpTabs>>
}

export const SignUpPerson = ({ setActiveTab }: SignUpPersonProps) => {
  const form = useForm<z.infer<typeof SignUpPersonSchema>>({
    resolver: zodResolver(SignUpPersonSchema),
    defaultValues: {
      firstName: '',
      secondName: '',
      firstSurname: '',
      secondSurname: '',
      email: ''
    }
  })
  const newUser = useAppSelector(state => state.newUser.user)
  const [programId, setProgramId] = useState<string>('')
  const { toast } = useToast()
  const navigate = useNavigate()

  const onSubmit = async (values: z.infer<typeof SignUpPersonSchema>) => {
    if (programId === '') {
      toast({
        title: 'Debes seleccionar un programa',
        description: 'Debes seleccionar un programa',
        variant: 'destructive'
      })
      return
    }
    try {
      await createFullPerson({
        user: newUser,
        person: {
          firstName: values.firstName,
          secondName: values.secondName,
          firstSurname: values.firstSurname,
          secondSurname: values.secondSurname,
          email: values.email,
          programId: Number(programId)
        }
      })
      toast({
        title: 'Usuario creado',
        description: 'El usuario ha sido creado',
        variant: 'default'
      })
      navigate('/login')
    } catch (error) {
      if (error instanceof AxiosError) {
        setActiveTab('sign-up')
        return toast({
          title: 'Error al crear usuario',
          description: error.response?.data.message,
          variant: 'destructive'
        })
      }
      toast({
        title: 'Error al crear usuario',
        description: 'El usuario no ha sido creado',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="shadow-lg">
      <div className="flex gap-5">
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8 rounded-lg p-10"
            >
              <div className="flex w-full flex-row gap-5">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Primer Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Jhon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="secondName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Segundo Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-row gap-5">
                <FormField
                  control={form.control}
                  name="firstSurname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Primer Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="secondSurname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Segundo Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Institucional</FormLabel>
                    <FormControl>
                      <Input placeholder="j.doe@udla.edu.co" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FacultySelector
                programId={programId}
                setProgramId={setProgramId}
              />
              <div className="flex w-full justify-center">
                <Button size="sm" className="bg-green-600" type="submit">
                  Enviar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default SignUpPerson
