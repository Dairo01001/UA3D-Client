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
import { useToast } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CreateServerSchema } from './schemas'
import { createServer } from './services'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export const CreateServer = () => {
  const form = useForm<z.infer<typeof CreateServerSchema>>({
    resolver: zodResolver(CreateServerSchema),
    defaultValues: {
      port: '',
      gridName: ''
    }
  })
  const [cookies] = useCookies(['user'])
  const [loading, setLoading] = useState(false)
  const { accessToken } = cookies.user
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: createServer,
    onSuccess: () => {
      setLoading(false)
      toast({
        title: 'Creado',
        description: 'El servidor se ha creado correctamente',
        variant: 'default'
      })
    },
    onError: err => {
      setLoading(false)
      if (err instanceof AxiosError) {
        toast({
          title: 'Error',
          description: err.response?.data.message,
          variant: 'destructive'
        })
      }

      toast({
        title: 'Error',
        description: 'Ha ocurrido un error al crear el servidor',
        variant: 'destructive'
      })
    }
  })

  const onSubmit = (data: z.infer<typeof CreateServerSchema>) => {
    setLoading(true)
    mutation.mutate({ data, accessToken })
  }

  return (
    <div className="w-full">
      <div className="w-full pb-10">
        <p className="text-center text-2xl font-bold">Nuevo Servidor</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex w-full flex-row gap-4">
            <FormField
              control={form.control}
              name="port"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Server port</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="3001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="gridName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grid Name</FormLabel>
                <FormControl>
                  <Input placeholder="IoT Grid Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit">
            {loading ? <Loader2 className="animate-spin" /> : null}
            Crear
          </Button>
        </form>
      </Form>
    </div>
  )
}
