import { useState, useEffect } from 'react'
import './App.css'
import CustomerPage from './pages/CustomerPage'
import AdminLogin from './pages/AdminLogin'
import AdminPanel from './pages/AdminPanel'
import { INITIAL_PRODUCTS, DEMO_ORDERS } from './data/products'

const ADMIN_EMAIL = 'admin@guaralanches.com'
const ADMIN_PASS  = 'admin123'

function App() {
  const [view, setView]       = useState('customer') // 'customer' | 'adminLogin' | 'adminPanel'
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('guaraAdmin') === 'true')
  const [cart, setCart]       = useState([])

  const [products, setProducts] = useState(() => {
    try { return JSON.parse(localStorage.getItem('guaraProducts')) || INITIAL_PRODUCTS }
    catch { return INITIAL_PRODUCTS }
  })

  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem('guaraOrders')) || DEMO_ORDERS }
    catch { return DEMO_ORDERS }
  })

  // Persist to localStorage whenever they change
  useEffect(() => { localStorage.setItem('guaraProducts', JSON.stringify(products)) }, [products])
  useEffect(() => { localStorage.setItem('guaraOrders',   JSON.stringify(orders))   }, [orders])

  // Restore admin session on reload
  useEffect(() => { if (isAdmin) setView('adminPanel') }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAdminLogin = (email, pass) => {
    if (email.trim() === ADMIN_EMAIL && pass === ADMIN_PASS) {
      setIsAdmin(true)
      sessionStorage.setItem('guaraAdmin', 'true')
      setView('adminPanel')
      return true
    }
    return false
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
    sessionStorage.removeItem('guaraAdmin')
    setView('customer')
  }

  return (
    <>
      {view === 'customer' && (
        <CustomerPage
          products={products}
          cart={cart}
          setCart={setCart}
          setOrders={setOrders}
          orders={orders}
          onGoAdmin={() => setView('adminLogin')}
        />
      )}

      {view === 'adminLogin' && (
        <AdminLogin
          onLogin={handleAdminLogin}
          onBack={() => setView('customer')}
        />
      )}

      {view === 'adminPanel' && isAdmin && (
        <AdminPanel
          products={products}
          setProducts={setProducts}
          orders={orders}
          setOrders={setOrders}
          onLogout={handleAdminLogout}
        />
      )}
    </>
  )
}

export default App







