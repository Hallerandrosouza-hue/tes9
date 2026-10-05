const fmt = (v) => v.toFixed(2).replace('.', ',')

export default function Cart({ cart, onAdd, onRemove, onClose, onCheckout, inline = false }) {
  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const content = (
    <div className={`cart-container ${inline ? 'cart-inline' : 'cart-modal-sidebar'}`} onClick={(e) => e.stopPropagation()}>
      <div className="cart-header">
        <h2>Seu Pedido</h2>
        {!inline && <button className="close-btn" onClick={onClose}>✕</button>}
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Seu carrinho está vazio</p>
          <small>Adicione itens para começar.</small>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <strong>{item.name}</strong>
                  <span>R$ {fmt(item.price)}</span>
                </div>
                <div className="cart-qty">
                  <button onClick={() => onRemove(item.id)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => onAdd(item)}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-subtotal">
            <div className="cart-row">
              <span>Subtotal</span>
              <span>R$ {fmt(totalPrice)}</span>
            </div>
            <div className="cart-row cart-total">
              <span>Total</span>
              <strong>R$ {fmt(totalPrice)}</strong>
            </div>
          </div>
          <button className="checkout-btn" onClick={onCheckout}>
            Finalizar Pedido
          </button>
        </>
      )}
    </div>
  )

  if (inline) return content
  return <div className="cart-overlay" onClick={onClose}>{content}</div>
}
