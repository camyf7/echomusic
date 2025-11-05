"use client"

import { createContext, useContext, useState } from "react"
import { isLogged, getUser } from "../lib/authHandler"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const initialLoggedState = isLogged()
  const initialUserState = initialLoggedState ? getUser() : null

  const [logged, setLogged] = useState(initialLoggedState)
  const [user, setUser] = useState(initialUserState)

  return <AuthContext.Provider value={{ logged, setLogged, user, setUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
