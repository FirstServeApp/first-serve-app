import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import AuthService, { Tokens } from '../services/AuthService'
import UserService, { User } from '../services/UserService'
import { setItemInStore, getItemFromStore, deleteItemFromStore, StoreKeys } from '../utils/secureStoreUtils'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next'
import SocialAuthService, { FbRes } from '../services/SocialAuthService'
import * as AppleAuthentication from 'expo-apple-authentication'
import Toast from 'react-native-toast-message'


export type AuthContextData = {
  user?: User;
  avatar: string;
  refreshToken?: string;
  accessToken?: string;
  loading: boolean;
  isFirstLaunch: boolean;
  isSocial: boolean;
  signup(email: string, password: string, name: string): Promise<void | string>;
  login(email: string, password: string): Promise<void | string>;
  logout(): void;
  getCurrentUser(): Promise<void>;
  setupAvatar(image: any): void;
  deleteAccount(): void;
  googleSignin(): Promise<void>;
  facebookSignin(): Promise<void>;
  appleSigin(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>()
  const [avatar, setAvatar] = useState<any>()
  const [tokens, setTokens] = useState<Tokens>()
  const [loading, setLoading] = useState(true)
  const [isFirstLaunch, setFirstLaunch] = useState<boolean>(true)
  const [isSocial, setSocial] = useState<boolean>(false)

  GoogleSignin.configure({
    // webClientId: '27486761319-aftp0a51jrjq0akdj6vp589id8jeancg.apps.googleusercontent.com',
    webClientId: '274856761319-vjs2kl17lbd4985r8lqsohhn2nmirbml.apps.googleusercontent.com',
    iosClientId: '274856761319-vjs2kl17lbd4985r8lqsohhn2nmirbml.apps.googleusercontent.com',
    profileImageSize: 200,
    offlineAccess: true,
  })

  const logout = async () => {
    if (isSocial) {
      await GoogleSignin.signOut()
      // await LoginManager.logOut()
    }

    setUser(undefined)
    setTokens(undefined)
    setAvatar(undefined)
    setSocial(false)

    await deleteItemFromStore(StoreKeys.accessToken)
    await deleteItemFromStore(StoreKeys.refreshToken)
    await deleteItemFromStore(StoreKeys.user) // I probably need to store it in context
    await deleteItemFromStore(StoreKeys.isSocial)
  }

  const getCurrentUser = async () => {
    try {
      const userData = await UserService.getCurrentUser()
      if (!userData) {
        throw new Error('An error occurred while getting user info')
      }

      const user = userData.data

      setUser(user)
      setAvatar(user.avatar)
      await setItemInStore(StoreKeys.user, user)
    } catch (err) {
      throw err
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    try {
      const tokens = await AuthService.register(email, password, name)
      if (!tokens) {
        throw new Error('Registration error')
      }

      const { accessToken, refreshToken } = tokens.data

      setTokens({ accessToken, refreshToken })

      await setItemInStore(StoreKeys.accessToken, accessToken)
      await setItemInStore(StoreKeys.refreshToken, refreshToken)

      await getCurrentUser()
    } catch (err: any) {
      if (err.message.includes('400')) {
        return '400'
      } else if (err.message.includes('500')) {
        return '500'
      }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const tokens = await AuthService.login(email, password)
      if (!tokens) {
        throw new Error('Login error')
      }

      const { accessToken, refreshToken } = tokens.data

      setTokens({ accessToken, refreshToken })

      await setItemInStore(StoreKeys.accessToken, accessToken)
      await setItemInStore(StoreKeys.refreshToken, refreshToken)

      await getCurrentUser()
    } catch (err: any) {
      if (err.message.includes('400')) {
        return '400'
      } else if (err.message.includes('500')) {
        return '500'
      }
    }
  }

  const googleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

      const userInfo = await GoogleSignin.signIn()
      if (userInfo && userInfo.user && userInfo.idToken) {
        const { user } = userInfo
        const tokens = await AuthService.googleSignin(
          user.email,
          user.givenName || user.email.split('@')[0],
          user.id,
          user.photo || undefined,
        )

        if (!tokens) {
          throw new Error('Registration error')
        }

        const { accessToken, refreshToken } = tokens.data

        setTokens({ accessToken, refreshToken })
        setSocial(true)

        await setItemInStore(StoreKeys.isSocial, 'TRUE')
        await setItemInStore(StoreKeys.accessToken, accessToken)
        await setItemInStore(StoreKeys.refreshToken, refreshToken)

        await getCurrentUser()
      }
    } catch (err) {
      await logout()
      await GoogleSignin.signOut()
    }
  }

  const facebookSignin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile'])
      if (result.isCancelled) {
        throw new Error('User cancelled login')
      }
      await AccessToken
        .getCurrentAccessToken()
        .then(() => {
          const infoRequest = new GraphRequest(
            '/me?fields=name,picture,id,first_name',
            undefined,
            async (err, res) => {
              const data = res as FbRes
              const tokens = await SocialAuthService.facebookSignin(data)
              const { accessToken, refreshToken } = tokens.data
              await setItemInStore(StoreKeys.accessToken, accessToken)
              await setItemInStore(StoreKeys.refreshToken, refreshToken)
              setTokens({ accessToken, refreshToken })

              await setItemInStore(StoreKeys.isSocial, 'TRUE')
              setSocial(true)
              await getCurrentUser()
            },
          )
          new GraphRequestManager().addRequest(infoRequest).start()
        })
        .then(async () => {
          await LoginManager.logOut()
        })
    } catch (err) {
      console.log(err)
      await logout()
    }
  }

  const appleSigin = async () => {
    try {
      const isAviable = await AppleAuthentication.isAvailableAsync()
      if (!isAviable) {
        return Toast.show({
          type: 'tomatoToast',
          text1: 'Your device does`t support Apple Authentication',
          visibilityTime: 2000,
        })
      }

      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })
      console.log(JSON.stringify(credentials))
      const tokens = await SocialAuthService.appleSignin(
        credentials.user,
        credentials.email || 'notrealemail@gmail.com',
        credentials.fullName?.givenName || 'notrealname',
      )

      if (!tokens) {
        throw new Error('Registration error')
      }

      const { accessToken, refreshToken } = tokens.data

      setTokens({ accessToken, refreshToken })
      setSocial(true)

      await setItemInStore(StoreKeys.isSocial, 'TRUE')
      await setItemInStore(StoreKeys.accessToken, accessToken)
      await setItemInStore(StoreKeys.refreshToken, refreshToken)

      await getCurrentUser()
    } catch (e: any) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        return
      }
      return Toast.show({
        type: 'tomatoToast',
        text1: 'Something went wrong, please try again',
        visibilityTime: 2000,
      })
    }
  }

  const setupAvatar = (imageUrl: string): void => {
    setAvatar(imageUrl)
  }

  const deleteAccount = async () => {
    const res = await UserService.deleteAccount()
    if (res.status === 200) {
      await logout()
    }
  }

  const loadStorageData = async (): Promise<void> => {
    try {
      // await GoogleSignin.signOut()
      const accessToken = await getItemFromStore(StoreKeys.accessToken)
      const refreshToken = await getItemFromStore(StoreKeys.refreshToken)
      const onboardingStatus = await getItemFromStore(StoreKeys.onboardingStatus)
      const isSocial = await getItemFromStore(StoreKeys.isSocial)

      // if (!accessToken || !refreshToken) {
      //   throw new Error('Authentication error. Cannot get tokens from secure store')
      // }

      setTokens({ accessToken, refreshToken })
      setFirstLaunch(!onboardingStatus)
      setSocial(!!isSocial)

      await getCurrentUser()
    } catch (err) {
      await logout()
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    try {
      loadStorageData()
    } catch (err) {
      // logout()
      console.log(err)
    }
  }, [])

  const authContextValue: AuthContextData = {
    user,
    accessToken: tokens?.accessToken,
    refreshToken: tokens?.refreshToken,
    loading,
    isFirstLaunch,
    isSocial,
    signup,
    login,
    logout,
    getCurrentUser,
    avatar,
    setupAvatar,
    deleteAccount,
    googleSignin,
    facebookSignin,
    appleSigin,
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
