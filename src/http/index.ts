import axios from 'axios'
import { getItemFromStore, setItemInStore, StoreKeys } from '../utils/secureStoreUtils'
import Toast from 'react-native-toast-message'


export const $api = axios.create({
  // baseURL: 'https://first-serve-server-rccn.onrender.com',
  // baseURL: 'https://first-serve-server-2jy5.onrender.com',
  baseURL: 'https://first-serve-server-7r3l.onrender.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

$api.interceptors.response.use(
  res => res,
  async (error: any) => {
    const { status, config } = error.response
    const originalConfig = config
    let isRefreshing = false

    if (status === 500) {
      Toast.show({
        type: 'tomatoToast',
        text1: 'Something went wrong, please try again',
        visibilityTime: 2000,
      })
    }

    if (error.response && status === 401 && !originalConfig._retry && !isRefreshing && !config.headers.Retry) {
      originalConfig._retry = true
      isRefreshing = true

      try {
        const refreshToken = await getItemFromStore(StoreKeys.refreshToken)
        if (!refreshToken) {
          throw new Error('Cannot get refresh token from store')
        }

        const refreshData = await $api.post('/auth/refresh', { refreshToken }, {
          headers: {
            Retry: true,
          },
        })

        const tokens = refreshData.data

        await setItemInStore(StoreKeys.refreshToken, tokens.refreshToken)
        await setItemInStore(StoreKeys.accessToken, tokens.accessToken)

        originalConfig.headers.Authorization = `Bearer ${tokens.accessToken}`

        isRefreshing = false
        return await $api(originalConfig)
      } catch (err) {
        isRefreshing = false
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  },
)

// function createAxiosResponseInterceptor() {
//   const interceptor = $api.interceptors.response.use(
//     res => res,
//     async error => {
//       const { status, config } = error.response
//       if (status === 500) {
//         Toast.show({
//           type: 'tomatoToast',
//           text1: 'Something went wrong, please try again',
//           visibilityTime: 2000,
//         })
//         Promise.reject(error)
//       }
//       if (status !== 401) {
//         return Promise.reject(error)
//       }
//       const refreshToken = await getItemFromStore(StoreKeys.refreshToken)
//       if (status === 401 && refreshToken) {
//         try {
//           $api.interceptors.response.eject(interceptor)

//           const response = await axios.post(
//             'https://first-serve-server.onrender.com/auth/refresh',
//             { refreshToken },
//             {
//               headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//               },
//             },
//           )
//           const tokens = response.data
//           await setItemInStore(StoreKeys.refreshToken, tokens.refreshToken)
//           await setItemInStore(StoreKeys.accessToken, tokens.accessToken)

//           config.headers.Authorization = `Bearer ${tokens.accessToken}`
//           return axios(config)
//         } catch (err: any) {
//           if (err.response.status === 400) {
//             throw { response: { status: 401 } }
//           }
//           return Promise.reject(err)
//         } finally {
//           createAxiosResponseInterceptor()
//         }
//       }
//     }
//   )
// }

// createAxiosResponseInterceptor()

$api.interceptors.request.use(async config => {
  const token = await getItemFromStore(StoreKeys.accessToken)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  Promise.reject(error)
})
