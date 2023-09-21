import UnauthenticatedNavigation from './UnauthenticatedNavigation'
import AuthenticatedNavigation from './AuthenticatedNavigation'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/UI/Loader'


const RootNavigation = () => {
  const { user, loading } = useAuth()
  const showLoader = loading === undefined ? true : loading

  const isAuthenticated = user !== undefined

  if (showLoader) {
    return (
      <Loader />
    )
  }

  return isAuthenticated ? (
    <AuthenticatedNavigation />
  ) : (
    <UnauthenticatedNavigation />
  )
}

export default RootNavigation
