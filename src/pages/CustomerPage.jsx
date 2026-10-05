import { useState, useEffect } from 'react'
import Cart from '../components/Cart'
import BuildYourDish from '../components/BuildYourDish'
import Checkout from '../components/Checkout'
import OrderStatus from '../components/OrderStatus'

const MENU_CATEGORIES = ['Churrasco', 'Combos', 'Acompanhamentos', 'Bebidas', 'Sobremesas']

export const formatBRL = (v) => v.toFixed(2).replace('.', ',')

const BANNER_IMG = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80'

export default function CustomerPage({ products, cart, setCart, onGoAdmin, setOrders, orders }) {
  const [cartOpen, setCartOpen]           = useState(false)
  const [buildOpen, setBuildOpen]         = useState(false)
  const [checkoutOpen, setCheckoutOpen]   = useState(false)
  const [activeCat, setActiveCat]         = useState('Churrasco')

  const [activeOrderId, setActiveOrderId] = useState(() => localStorage.getItem('guaraActiveOrder') || null)
  const [statusOpen, setStatusOpen]       = useState(false)

  const activeOrder = orders?.find(o => o.id === activeOrderId)

  useEffect(() => {
    if (activeOrder?.status === 'delivered') {
      setTimeout(() => { localStorage.removeItem('guaraActiveOrder'); setActiveOrderId(null) }, 10000)
    }
  }, [activeOrder])

  const available = products.filter((p) => p.available)

  const addToCart = (product) =>
    setCart((prev) => {
      const hit = prev.find((i) => i.id === product.id)
      return hit
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...product, qty: 1 }]
    })

  const removeFromCart = (id) =>
    setCart((prev) => {
      const hit = prev.find((i) => i.id === id)
      return hit.qty === 1 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
    })

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const handleFinishOrder = (orderData) => {
    setOrders?.((prev) => [orderData, ...prev])
    setCart([])
    setCheckoutOpen(false)
    setCartOpen(false)
    setActiveOrderId(orderData.id)
    localStorage.setItem('guaraActiveOrder', orderData.id)
    setStatusOpen(true)
  }

  const scrollToCat = (cat) => {
    setActiveCat(cat)
    const el = document.getElementById(`cat-${cat}`)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 130
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="app-wrapper">
      {/* ═══ HEADER ═══ */}
      <header className="main-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-icon">🔥</span>
            <h1>Churrascaria Canoa</h1>
          </div>
          <div className="header-search">
            <input type="text" placeholder="Buscar no cardápio..." />
          </div>
          <nav className="header-right">
            {activeOrder && (
              <button className="track-btn" onClick={() => setStatusOpen(true)}>
                Acompanhar Pedido
              </button>
            )}
            <button className="admin-link-btn" onClick={onGoAdmin}>Admin</button>
            <button className="cart-btn" onClick={() => setCartOpen(true)}>
              🛒 <span className="cart-count">{totalItems}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* ═══ HERO BANNER ═══ */}
      <section className="hero" style={{ backgroundImage: `url(${BANNER_IMG})` }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h2>O melhor churrasco<br/>da cidade, na sua casa.</h2>
            <p>Carnes nobres assadas na brasa com sabor artesanal</p>
            <div className="hero-badges">
              <span>⭐ 4.9</span>
              <span>🛵 40-55 min</span>
              <span>Frete Grátis acima de R$80</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTEÚDO PRINCIPAL ═══ */}
      <div className="main-body">

        {/* Categorias Sticky */}
        <nav className="cat-tabs">
          <div className="cat-tabs-inner">
            {MENU_CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cat-tab ${activeCat === cat ? 'active' : ''}`}
                onClick={() => scrollToCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>

        <div className="content-grid">
          {/* ═══ COLUNA DE PRODUTOS ═══ */}
          <main className="products-col">

            {/* CTA Monte seu Prato */}
            <div className="build-cta" onClick={() => setBuildOpen(true)}>
              <div className="build-cta-text">
                <h3>Monte Seu Prato</h3>
                <p>Escolha carne, base e acompanhamentos do seu jeito</p>
              </div>
              <span className="build-cta-arrow">→</span>
            </div>

            {/* Seções de Produtos */}
            {MENU_CATEGORIES.map(cat => {
              const items = available.filter(p => p.category === cat)
              if (items.length === 0) return null
              return (
                <section key={cat} id={`cat-${cat}`} className="menu-section">
                  <h2 className="section-title">{cat}</h2>
                  <div className="product-list">
                    {items.map(p => (
                      <article key={p.id} className="product-card" onClick={() => addToCart(p)}>
                        <div className="product-text">
                          <h3>{p.name}</h3>
                          <p>{p.description}</p>
                          <strong className="product-price">R$ {formatBRL(p.price)}</strong>
                        </div>
                        <div className="product-thumb">
                          <img src={p.image} alt={p.name} loading="lazy" />
                          <span className="add-badge">+</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )
            })}
          </main>

          {/* ═══ CARRINHO LATERAL (DESKTOP) ═══ */}
          <aside className="cart-col">
            <div className="cart-col-sticky">
              <Cart
                cart={cart}
                onAdd={addToCart}
                onRemove={removeFromCart}
                onCheckout={() => setCheckoutOpen(true)}
                inline={true}
              />
            </div>
          </aside>
        </div>
      </div>

      {/* ═══ BARRA INFERIOR MOBILE ═══ */}
      {totalItems > 0 && !cartOpen && !checkoutOpen && (
        <div className="mobile-bar" onClick={() => setCartOpen(true)}>
          <span className="mb-qty">{totalItems}</span>
          <span className="mb-text">Ver sacola</span>
          <strong className="mb-price">R$ {formatBRL(totalPrice)}</strong>
        </div>
      )}

      {/* ═══ MODAIS ═══ */}
      {cartOpen && (
        <Cart cart={cart} onAdd={addToCart} onRemove={removeFromCart}
          onClose={() => setCartOpen(false)} onCheckout={() => setCheckoutOpen(true)} />
      )}
      {checkoutOpen && (
        <Checkout cart={cart} subtotal={totalPrice}
          onClose={() => setCheckoutOpen(false)} onFinish={handleFinishOrder} />
      )}
      {statusOpen && activeOrder && (
        <OrderStatus order={activeOrder} onClose={() => setStatusOpen(false)} />
      )}
      {buildOpen && (
        <BuildYourDish onClose={() => setBuildOpen(false)}
          onAddToCart={(item) => { setCart(prev => [...prev, { ...item, qty: 1 }]); setBuildOpen(false) }} />
      )}
    </div>
  )
}
