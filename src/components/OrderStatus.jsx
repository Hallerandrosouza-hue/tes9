export default function OrderStatus({ order, onClose }) {
  if (!order) return null

  const STATUS_STEPS = [
    { key: 'received',  label: 'Recebido',   icon: '📥' },
    { key: 'preparing', label: 'Preparando', icon: '👨‍🍳' },
    { key: 'onway',     label: 'A Caminho',  icon: '🛵' },
    { key: 'delivered', label: 'Entregue',   icon: '✅' },
  ]

  const currentIndex = STATUS_STEPS.findIndex(s => s.key === order.status)

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Acompanhar Pedido {order.id}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="step-body" style={{padding: '30px 20px'}}>
          <div className="steps-bar" style={{border: 'none', padding: 0}}>
            {STATUS_STEPS.map((s, i) => {
              const isPast = i < currentIndex
              const isCurrent = i === currentIndex
              return (
                <div key={s.key} className={`step-item ${isCurrent ? 'active' : isPast ? 'done' : ''}`}>
                  <div className="step-circle" style={{fontSize: '1.2rem', width: '40px', height: '40px'}}>
                    {s.icon}
                  </div>
                  <span style={{marginTop: '8px', fontWeight: isCurrent ? 'bold' : 'normal'}}>{s.label}</span>
                  {i < STATUS_STEPS.length - 1 && <div className="step-line" style={{top: '20px', left: 'calc(50% + 20px)', width: 'calc(100% - 40px)'}} />}
                </div>
              )
            })}
          </div>

          <div className="review-card" style={{marginTop: '40px'}}>
            <p><strong>Detalhes:</strong></p>
            <p style={{fontSize: '0.85rem', color: 'var(--gray)', margin: '8px 0'}}>
              {order.method === 'delivery' ? `Entrega em: ${order.address}` : 'Retirada no local'}
            </p>
            <p style={{fontSize: '0.85rem', color: 'var(--gray)'}}>
              Total: R$ {order.total.toFixed(2).replace('.', ',')}
            </p>
            <p style={{fontSize: '0.85rem', color: 'var(--gray)'}}>
              Horário do pedido: {order.time}
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary w-full" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}
