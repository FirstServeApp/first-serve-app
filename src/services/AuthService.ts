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
    try {
      const response = await $api.post<AxiosRequestConfig, TokensRes>('/auth/signup', { email, password, name })

      return response
    } catch (error: any) {
      if (error.response && error.response.status !== 500) {
        const errorMessage = error.response.data.message

        throw new Error(errorMessage)
      }
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await $api.post<AxiosRequestConfig, TokensRes>('/auth/login', { email, password })

      return response
    } catch (error: any) {
      if (error.response && error.response.status !== 500) {
        const errorMessage = error.response.data.message

        throw new Error(errorMessage)
      }
    }
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
    try {
      const response = await $api.post('/auth/forgot-password/send-otp', { email })

      return response
    } catch (error: any) {
      if (error.response && error.response.status !== 500) {
        const errorMessage = error.response.data.message

        throw new Error(errorMessage)
      }
    }
  }

  async verifyOTP(id: string, code: string) {
    try {
      const response = await $api.post('/auth/forgot-password/verify', { id, otpCode: code })

      return response
    } catch (error: any) {
      if (error.response && error.response.status !== 500) {
        const errorMessage = error.response.data.message

        throw new Error(errorMessage)
      }
    }
  }

  async changePassword(id: string, password: string) {
    try {
      const response = await $api.post('/auth/forgot-password/change', { id, password })

      return response
    } catch (error: any) {
      if (error.response && error.response.status !== 500) {
        const errorMessage = error.response.data.message

        throw new Error(errorMessage)
      }
    }
  }
}

export default new AuthService()
