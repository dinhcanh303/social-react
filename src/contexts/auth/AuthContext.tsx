import { Dispatch, createContext, useEffect, useReducer } from 'react'
import { AuthState } from './types'
import { initialize, reducer } from './reducers'
import { getTokenAuth } from '@/utils/auth'
import { getProfile } from '@/apis/auth.api'

export enum AuthActionType {
  INITIALIZE = 'INITIALIZE',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT'
}

export interface PayloadAction<T> {
  type: AuthActionType
  payload: T
}

export interface AuthContextType extends AuthState {
  dispatch: Dispatch<PayloadAction<AuthState>>
}
const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  dispatch: () => null
})

interface AuthProviderProps {
  children?: any
}
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    ;(async () => {
      const { accessToken, refreshToken, clientId } = await getTokenAuth()
      if (!accessToken && !refreshToken && !clientId) {
        return dispatch(initialize({ isAuthenticated: false, isInitialized: true, user: null }))
      }
      try {
        const { data } = await getProfile()
        dispatch(initialize({ isAuthenticated: true, user: data?.user ?? null }))
      } catch (error) {
        dispatch(initialize({ isAuthenticated: false, user: null }))
      }
    })()
  }, [])
  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
}
export default AuthProvider
