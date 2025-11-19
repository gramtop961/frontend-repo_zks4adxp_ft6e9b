import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${backend}/api/products`)
        if (!res.ok) throw new Error('Failed to load products')
        const data = await res.json()
        if (!data || data.length === 0) {
          // try to seed
          await fetch(`${backend}/api/products/seed`, { method: 'POST' })
          const res2 = await fetch(`${backend}/api/products`)
          const data2 = await res2.json()
          setProducts(data2)
        } else {
          setProducts(data)
        }
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q)
    )
  }, [products, query])

  const addToCart = (product) => {
    setCartOpen(true)
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const checkout = async () => {
    try {
      const payload = {
        customer_name: 'Guest',
        customer_email: 'guest@example.com',
        customer_address: '123 Tech Street',
        items: cart.map(i => ({
          product_id: i.id,
          title: i.title,
          price: i.price,
          quantity: i.quantity,
          image: i.image
        }))
      }
      const res = await fetch(`${backend}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.detail || 'Order failed')
      alert(`Order placed! ID: ${data.order_id}`)
      setCart([])
      setCartOpen(false)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar cartCount={cart.reduce((n, i) => n + i.quantity, 0)} onSearch={setQuery} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Tech Gadgets Store</h1>
          <p className="text-slate-400 mt-2">Browse the latest and greatest gadgets</p>
        </div>

        {loading ? (
          <p className="text-slate-400 text-center">Loading products...</p>
        ) : error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </main>

      {cartOpen && (
        <CartDrawer items={cart} onClose={() => setCartOpen(false)} onCheckout={checkout} />
      )}
    </div>
  )
}

export default App
