import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useToast } from '@/hooks'
import { modifyNewUser } from '@/redux/states'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { SignUpUdlaSchema } from '../../schemas'
import { SignUpTabs } from '../../sign-up'
import { findUserByUsername } from '../services/sign-up.service'

interface SignUpUDLAProps {
  setActiveTab: React.Dispatch<React.SetStateAction<SignUpTabs>>
}

export const SignUpUDLA = ({ setActiveTab }: SignUpUDLAProps) => {
  const form = useForm<z.infer<typeof SignUpUdlaSchema>>({
    resolver: zodResolver(SignUpUdlaSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()

  const onSubmit = async (values: z.infer<typeof SignUpUdlaSchema>) => {
    try {
      const isValid = 'OK'

      if (isValid === 'OK') {
        const existUser = await findUserByUsername({
          username: values.username
        })

        if (!existUser) {
          dispatch(modifyNewUser({ user: values }))
          setActiveTab('sign-up-person')
        } else {
          navigate('/login')
          toast({
            title: 'Usuario ya existe',
            description: 'Ingresa con tu usuario udla',
            variant: 'default'
          })
        }
      } else {
        form.setError('username', {
          type: 'manual',
          message: 'Credenciales incorrectas'
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        form.setError('username', { type: 'manual', message: error.message })
      }
    }
  }

  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-8 rounded-lg p-10 shadow-lg"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario Chaira</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full justify-center">
            <Button size="sm" className="bg-green-600" type="submit">
              Comprovar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignUpUDLA
