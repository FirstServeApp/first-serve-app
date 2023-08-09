import UnauthenticatedNavigation from './UnauthenticatedNavigation'
import AuthenticatedNavigation from './AuthenticatedNavigation'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/UI/Loader'
import { StoreKeys, getItemFromStore } from '../utils/secureStoreUtils'
import { useEffect, useState } from 'react'


const RootNavigation = () => {
  const { refreshToken, accessToken, user, loading } = useAuth()
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
