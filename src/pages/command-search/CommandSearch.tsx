import { Button, Input } from '@/components'
import { useState } from 'react'
import { commandSearchService } from './services/command-search.service'

interface ICommandResult {
  category: string
  description: string
  command: string
  score: number
}

export const CommandSearch = () => {
  const [result, setResult] = useState<ICommandResult[]>([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    const query = data['query'].toString()
    console.log(query)

    commandSearchService(query).then(setResult)
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <h4 className="pb-10 text-center text-xl font-bold">Buscar comandos</h4>
      <form onSubmit={handleSubmit} className="flex w-full flex-row gap-4">
        <Input
          required
          name="query"
          type="text"
          placeholder="Ej: Como subir un objeto"
        ></Input>
        <Button type="submit">Buscar</Button>
      </form>
      <div className="flex w-full flex-col gap-4">
        {result.map(item => (
          <div key={item.command} className="flex w-full flex-row gap-4">
            <div className="w-full">
              <p className="text-xl font-bold">{item.category}</p>
              <p className="text-sm">{item.command}</p>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
        <div className="h-10" />
      </div>
    </div>
  )
}
