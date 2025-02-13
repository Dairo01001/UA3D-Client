import { useAppDispatch, useAppSelector } from '@/hooks'
import { createFullUser } from '@/redux'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { getMe } from '../services'
import { useQuery } from '@tanstack/react-query'

export const useUserMe = () => {
  const [cookie] = useCookies(['user'])
  const fullUser = useAppSelector(state => state.fullUser)
  const dispatch = useAppDispatch()
  const { data, isLoading } = useQuery({
    queryFn: () => getMe(cookie.user),
    queryKey: ['FullUser']
  })
  useEffect(() => {
    dispatch(createFullUser(data))
  }, [isLoading])

  return { me: fullUser }
}
