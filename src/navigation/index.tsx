import UnauthenticatedNavigation from './UnauthenticatedNavigation'
import AuthenticatedNavigation from './AuthenticatedNavigation'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/UI/Loader'


type Props = {
  setAppIsReady: (value: boolean) => void
}

const RootNavigation = ({ setAppIsReady }: Props) => {
  const { user, loading } = useAuth()
  const showLoader = loading === undefined ? true : loading

  const isAuthenticated = user !== undefined

  if (showLoader) {
    return (
      <Loader />
    )
  }

  setAppIsReady(!showLoader)

  return isAuthenticated ? (
    <AuthenticatedNavigation />
  ) : (
    <UnauthenticatedNavigation />
  )
}

export default RootNavigation
