import Cookies from 'js-cookie'

const COOKIE_ACCESS_TOKEN_KEY = 'social_access_token'
const COOKIE_REFRESH_TOKEN_KEY = 'social_refresh_token'
const COOKIE_X_CLIENT_ID = 'x_client_id'

const optionsCookies = {
  expires: 30,
  path: '/',
  domain: import.meta.env.VITE_DOMAIN_APP
}
export const saveTokenAuth = (accessToken: string, refreshToken: string, clientId: string) => {
  if (accessToken && refreshToken && clientId) {
    Cookies.set(COOKIE_ACCESS_TOKEN_KEY, accessToken, {
      ...optionsCookies
    })
    Cookies.set(COOKIE_REFRESH_TOKEN_KEY, accessToken, {
      ...optionsCookies
    })
    Cookies.set(COOKIE_X_CLIENT_ID, clientId, {
      ...optionsCookies
    })
  }
}
export const removeTokenAuth = () => {
  Cookies.remove(COOKIE_ACCESS_TOKEN_KEY)
  Cookies.remove(COOKIE_REFRESH_TOKEN_KEY)
  Cookies.remove(COOKIE_X_CLIENT_ID)
}
export const getTokenAuth = () => {
  const accessToken = Cookies.get(COOKIE_ACCESS_TOKEN_KEY)
  const refreshToken = Cookies.get(COOKIE_REFRESH_TOKEN_KEY)
  const clientId = Cookies.get(COOKIE_X_CLIENT_ID)
  return {
    accessToken,
    refreshToken,
    clientId
  }
}
