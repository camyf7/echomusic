"use client"

import { createContext, useContext, useState } from "react"
import { isLogged, getUser } from "../lib/authHandler"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const initialLoggedState = isLogged()

  // Corrige o retorno: se vier objeto com { user: {...} }, pega só user
  const storedUser = initialLoggedState ? getUser() : null
  const initialUserState =
    storedUser && storedUser.user       // caso salvo como { user: {...} }
      ? storedUser.user
      : storedUser                      // caso já esteja correto

  const [logged, setLogged] = useState(initialLoggedState)
  const [user, setUser] = useState(initialUserState)

  return (
    <AuthContext.Provider 
      value={{ logged, setLogged, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)