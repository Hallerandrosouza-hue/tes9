import { useState } from 'react'

const ORDER_STATUSES = [
  { key: 'received',  label: 'Recebido' },
  { key: 'preparing', label: 'Preparando' },
  { key: 'onway',     label: 'A Caminho' },
  { key: 'delivered', label: 'Entregue' },
]

const fmt = (v) => v.toFixed(2).replace('.', ',')

export default function AdminPanel({ onLogout, products, setProducts, orders, setOrders }) {
  const [activeTab, setActiveTab] = useState('orders') // 'orders' | 'menu'
  
  // Menu form
  const [editingProd, setEditingProd] = useState(null)
  const [form, setForm] = useState({
    name: '', category: 'Churrasco', price: '', description: '', image: '', available: true
  })

  // Kanban status updater
  const moveOrder = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    )
  }

  /* ── Menu Handlers ── */
  const handleSave = () => {
    if (editingProd) {
      setProducts(prev => prev.map(p => p.id === editingProd.id ? { ...form, id: p.id, price: Number(form.price) } : p))
    } else {
      setProducts(prev => [...prev, { ...form, id: Date.now(), price: Number(form.price) }])
    }
    setEditingProd(null)
    setForm({ name: '', category: 'Churrasco', price: '', description: '', image: '', available: true })
  }

  const handleEdit = (p) => {
    setEditingProd(p)
    setForm(p)
  }

  const handleDelete = (id) => {
    if(window.confirm('Excluir este produto?')) {
      setProducts(prev => prev.filter(p => p.id !== id))
    }
  }

  const toggleAvailability = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, available: !p.available } : p))
  }

  const pendingCount = orders.filter(o => o.status !== 'delivered').length

  return (
    <div className="admin-app">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-logo">
            <h1>Churrascaria Canoa</h1>
            <span>Painel Administrativo</span>
          </div>

          <nav className="admin-tabs">
            <button
              className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Pedidos em Andamento
              {pendingCount > 0 && <span className="tab-badge">{pendingCount}</span>}
            </button>
            <button
              className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
              onClick={() => setActiveTab('menu')}
            >
              Gestão de Cardápio
            </button>
          </nav>

          <button className="btn-logout" onClick={onLogout}>
            Sair
          </button>
        </div>
      </header>

      <main className="admin-main">
        {/* ══════════════════════ PEDIDOS ══════════════════════ */}
        {activeTab === 'orders' && (
          <div className="orders-section">
            <div className="section-bar">
              <h2>Acompanhamento de Pedidos</h2>
              <span className="section-sub">{orders.length} pedido(s) hoje</span>
            </div>

            <div className="kanban">
              {ORDER_STATUSES.map((status, sIndex) => {
                const colOrders = orders.filter((o) => o.status === status.key)
                return (
                  <div key={status.key} className="kanban-col">
                    <div className="kanban-col-header">
                      <h3>{status.label}</h3>
                      <span className="kanban-count">{colOrders.length}</span>
                    </div>

                    <div className="kanban-cards">
                      {colOrders.length === 0 && (
                        <p className="kanban-empty">Vazio</p>
                      )}
                      {colOrders.map((order) => (
                        <div key={order.id} className="order-card">
                          <div className="order-card-top">
                            <strong>{order.id}</strong>
                            <span className="order-time">{order.time}</span>
                          </div>
                          
                          <div className="order-body">
                            <div className={`order-address-box ${order.method === 'delivery' ? 'delivery' : ''}`}>
                              <div className="address-box-title">
                                {order.method === 'delivery' ? 'ENTREGA' : 'RETIRADA NA LOJA'}
                              </div>
                              <div className="order-customer">{order.customer}</div>
                              {order.method === 'delivery' && (
                                <div className="order-address">{order.address}</div>
                              )}
                            </div>
                            
                            <div className="order-items-list">
                              {order.items.map((item, i) => (
                                <div key={i} className="order-item-row">
                                  <span>{item.qty}× {item.name}</span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="order-payment">
                              <span className="order-payment-method">
                                Pagamento: {order.payment ? order.payment.toUpperCase() : 'NÃO INFORMADO'}
                              </span>
                              <div className="order-total">
                                Total: <strong>R$ {fmt(order.total)}</strong>
                              </div>
                            </div>
                          </div>
                          
                          <div className="order-actions">
                            {sIndex > 0 && (
                              <button className="order-move-btn" onClick={() => moveOrder(order.id, ORDER_STATUSES[sIndex - 1].key)}>
                                Voltar
                              </button>
                            )}
                            {sIndex < ORDER_STATUSES.length - 1 && (
                              <button className="order-move-btn primary" onClick={() => moveOrder(order.id, ORDER_STATUSES[sIndex + 1].key)}>
                                Avançar
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════ CARDÁPIO ══════════════════════ */}
        {activeTab === 'menu' && (
          <div className="menu-section">
            <div className="section-bar">
              <h2>Gestão de Cardápio</h2>
            </div>
            <div className="product-form-card">
              <h3>{editingProd ? 'Editar Produto' : 'Novo Produto'}</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nome do Produto</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Ex: Picanha" />
                </div>
                <div className="form-group">
                  <label>Categoria</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option>Churrasco</option>
                    <option>Combos</option>
                    <option>Acompanhamentos</option>
                    <option>Bebidas</option>
                    <option>Sobremesas</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Preço (R$)</label>
                  <input type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label>URL da Imagem</label>
                  <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://..." />
                </div>
                <div className="form-group full">
                  <label>Descrição</label>
                  <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Detalhes do prato..." />
                </div>
              </div>
              <div className="form-actions">
                {editingProd && <button className="btn-secondary" onClick={() => { setEditingProd(null); setForm({name:'', category:'Churrasco', price:'', description:'', image:'', available:true}) }}>Cancelar</button>}
                <button className="btn-primary" onClick={handleSave}>Salvar Produto</button>
              </div>
            </div>

            <div className="table-group">
              <div className="table-group-title">Produtos Cadastrados</div>
              {products.map(p => (
                <div key={p.id} className={`table-row ${!p.available ? 'row-inactive' : ''}`}>
                  <div className="row-info">
                    <strong>{p.name}</strong>
                    <small>{p.category} • {p.description}</small>
                  </div>
                  <div className="row-price">R$ {fmt(p.price)}</div>
                  <div className="row-actions">
                    <button className={`toggle-btn ${p.available ? 'on' : 'off'}`} onClick={() => toggleAvailability(p.id)}>
                      {p.available ? 'Ativo' : 'Esgotado'}
                    </button>
                    <button className="icon-btn" onClick={() => handleEdit(p)}>✏️</button>
                    <button className="icon-btn danger" onClick={() => handleDelete(p.id)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

