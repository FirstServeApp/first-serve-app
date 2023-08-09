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

type ImageRes = {
  data: string;
}

class ImageService {
  async upload(image: any) {
    const formData = new FormData()
    formData.append('image', image)
    return await $api.post<AxiosRequestConfig, ImageRes>('/image/upload', formData)
  }
}

export default new ImageService()
