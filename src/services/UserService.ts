import { AxiosRequestConfig } from 'axios'
import { $api } from '../http'


export type User = {
  email: string;
  name: string;
  _id: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

type UserRes = {
  data: User;
}

class UserService {
  async getCurrentUser() {
    return await $api.get<AxiosRequestConfig, UserRes>('/user')
  }

  async changeAvatar(image: string) {
    return await $api.patch<AxiosRequestConfig, { data: { imageUrl: string } }>('/user/change/avatar', { image })
  }

  async changeName(name: string) {
    return await $api.patch<AxiosRequestConfig, UserRes>('/user/change/name', { name })
  }

  async deleteAccount() {
    return await $api.delete('/user/delete')
  }
}

export default new UserService()
