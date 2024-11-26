import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      user: null,
      login: (data) =>
        set({
          isLoggedIn: true,
          accessToken: data.accessToken,
          user: data
        }),
      logout: () =>
        set({
          isLoggedIn: false,
          accessToken: null,
          user: null
        })
    }),
    {
      name: 'auth',
      getStorage: () => localStorage
    }
  )
)

export default useAuthStore
