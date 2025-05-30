import { Button } from '@/components'
import { Textarea } from '@/components/ui/textarea'
import { editFile } from '../services/edit-files'
import { toast } from '@/hooks'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface EditFormProps {
  name: string
  content: string
  title: string
  path: string
}

export const EditForm = ({ name, content, title, path }: EditFormProps) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    const content = data[name].toString()
    try {
      await editFile({ filePath: path, content })
      toast({
        title: 'Archivo actualizado',
        description: 'El archivo ha sido actualizado correctamente'
      })
    } catch (error) {
      setLoading(false)
      toast({
        title: 'Error al actualizar archivo',
        description: 'El archivo no ha sido actualizado correctamente'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <span className="text-center text-xl font-bold">{title}</span>
      <Textarea name={name} defaultValue={content} rows={10} cols={100} />
      <Button type="submit">
        {loading ? <Loader2 className="animate-spin" /> : 'Guardar'}
      </Button>
    </form>
  )
}
