import { useAuth } from '@/utils/AuthContext'

export const HelloPage = () => {
  const { accessToken } = useAuth()

  // fetch('/api/data', {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // })

  return <div>Hello!</div>
}
