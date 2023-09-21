import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { $api } from '../http'


export type Tokens = {
  accessToken: string;
  refreshToken: string;
}

interface TokensRes extends AxiosResponse {
  data: Tokens;
}

class AuthService {
  async register(email: string, password: string, name: string) {
    return await $api.post<AxiosRequestConfig, TokensRes>('/auth/signup', { email, password, name })
  }

  async login(email: string, password: string) {
    return await $api.post<AxiosRequestConfig, TokensRes>('/auth/login', { email, password })
  }

  async refresh(refreshToken: string) {
    try {
      return await $api.post<AxiosRequestConfig, TokensRes>('/auth/refresh', { refreshToken })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async googleSignin(email: string, name: string, googleId: string, avatar?: string) {
    return await $api.post<AxiosRequestConfig, TokensRes>('/auth/google', {
      email,
      name,
      avatar,
      googleId,
    })
  }

  async sendOTP(email: string) {
    return await $api.post('/auth/forgot-password/send-otp', { email })
  }

  verifyOTP(id: string, code: string) {
    return new Promise(async (resolve, reject) => {
      await $api.post('/auth/forgot-password/verify', { id, otpCode: code })
        .then(res => resolve(res))
        .catch(err => {
          if (err.message.includes('400')) {
            return reject('400')
          } else if (err.message.includes('404')) {
            return reject('404')
          } else if (err.message.includes('500')) {
            return reject('500')
          }
        })
    })
  }

  async changePassword(id: string, password: string) {
    return await $api.post('/auth/forgot-password/change', { id, password })
  }
}

export default new AuthService()
