import { User } from '@/models/User'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type AuthStore = {
  accessToken: string | undefined
  refreshToken: string | undefined
  user: User | undefined
  isAuthenticated: boolean
  isInitialized: boolean
  setToken: (accessToken: string, refreshToken: string) => void
  setUser: (user: User | undefined) => void
  logout: () => void
}
export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      accessToken: undefined,
      refreshToken: undefined,
      user: undefined,
      isAuthenticated: false,
      isInitialized: false,
      setToken: (accessToken, refreshToken) => set({ accessToken: accessToken, refreshToken: refreshToken }),
      setUser: (user) => set({ user }),
      logout: () => set({ accessToken: undefined, refreshToken: undefined, user: undefined })
    }),
    {
      enabled: true,
      name: 'auth-store'
    }
  )
)
