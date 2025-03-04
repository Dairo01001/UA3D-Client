import { Input } from './ui/input'
import axios from 'axios'
import { useToast } from '@/hooks'
import { Label } from './ui/label'

interface UploadImgProps {
  accessToken: string
  photo: string | null
  setPhoto: (photo: string | null) => void
}

export const UploadImg = ({ setPhoto, accessToken }: UploadImgProps) => {
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0]

      const formData = new FormData()
      formData.append('image', selectedFile as Blob)
      try {
        const img = await axios.post('/images/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`
          }
        })
        setPhoto(img.data.url)
        toast({
          title: 'Imagen subida correctamente',
          variant: 'default',
          description: 'La imagen se ha subido correctamente'
        })
      } catch (error) {
        toast({
          title: 'Error al subir la imagen',
          variant: 'destructive',
          description: 'Ha ocurrido un error al subir la imagen'
        })
      }
    }
  }

  return (
    <div className="flex w-full flex-row items-center justify-center gap-2">
      <Label htmlFor="photo">Subir imagen</Label>
      <Input
        name="photo"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  )
}
