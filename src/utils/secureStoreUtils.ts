import * as SecureStore from 'expo-secure-store'

export enum StoreKeys {
  accessToken = 'ACCESS_TOKEN',
  refreshToken = 'REFRESH_TOKEN',
  user = 'USER',
  avatar = 'AVATAR',
  onboardingStatus = 'ONBOARDING_STATUS',
  isSocial = 'IS_SOCIAL',
}

export const getItemFromStore = async (key: StoreKeys) => {
  try {
    const value = await SecureStore.getItemAsync(key)

    if (key === StoreKeys.user && value) {
      return JSON.parse(value)
    }

    return value
  } catch (err) {
    console.log('Error during getting value from store: ', err)
  }
}

export const setItemInStore = async (key: StoreKeys, value: object | string) => {
  try {
    if (value instanceof Object) {
      value = JSON.stringify(value)
    }

    return await SecureStore.setItemAsync(key, value)
  } catch (err) {
    console.log('Error during setting value in store: ', err)
  }
}

export const deleteItemFromStore = async (key: StoreKeys) => {
  try {
    return await SecureStore.deleteItemAsync(key)
  } catch (err) {
    console.log('Error during deleting value from store: ', err)
  }
}
