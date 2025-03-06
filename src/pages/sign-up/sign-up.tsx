import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components'
import { useState } from 'react'
import { SignUpPerson, SignUpUDLA } from './components'

export type SignUpTabs = 'sign-up' | 'sign-up-person'

export const SignUp = () => {
  const [activeTab, setActiveTab] = useState<SignUpTabs>('sign-up')

  return (
    <div className="flex flex-col items-center justify-center">
      <Tabs value={activeTab} className="w-full max-w-md">
        <TabsList className="w-full">
          <TabsTrigger value="sign-up" className="w-full">
            Chaira
          </TabsTrigger>
          <TabsTrigger value="sign-up-person" disabled className="w-full">
            Datos Institucionales
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sign-up">
          <SignUpUDLA setActiveTab={setActiveTab} />
        </TabsContent>
        <TabsContent value="sign-up-person">
          <SignUpPerson setActiveTab={setActiveTab} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
