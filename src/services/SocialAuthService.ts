import { AxiosRequestConfig } from 'axios'
import { $api } from '../http'


export type FbRes = {
  id: string;
  name: string;
  first_name: string;
  picture: {
    data: {
      url: string;
    }
  };
}

type Tokens = {
  accessToken: string;
  refreshToken: string;
}

type TokensRes = {
  data: Tokens;
}

class SocialAuthService {
  facebookSignin = async (res: FbRes) => {
    return await $api.post<AxiosRequestConfig, TokensRes>('/auth/facebook', {
      facebookId: res.id,
      name: res.first_name || res.name.split(' ')[0],
      avatar: res.picture.data.url,
      email: `${res.name.split(' ').join('_')}@facebook.com`,
    })
  }

  appleSignin = async (appleId: string, email: string | null, name?: string | null) => {
    return await $api.post<AxiosRequestConfig, TokensRes>('/auth/apple', {
      email,
      name,
      appleId,
    })
  }
}

export default new SocialAuthService()
