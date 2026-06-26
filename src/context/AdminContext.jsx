import { createContext, useState, useContext, useEffect } from 'react'

const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
  const datosGuardados = localStorage.getItem('admin')

  const [admin, setAdmin] = useState(
    datosGuardados ? JSON.parse(datosGuardados) : null
  )

  useEffect(() => {
    if (admin) {
      localStorage.setItem('admin', JSON.stringify(admin))
    } else {
      localStorage.removeItem('admin')
    }
  }, [admin])

  const iniciarSesion = (datos) => {
    setAdmin(datos)
  }

  const cerrarSesion = () => {
    setAdmin(null)
  }

  return (
    <AdminContext.Provider value={{ admin, iniciarSesion, cerrarSesion }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)