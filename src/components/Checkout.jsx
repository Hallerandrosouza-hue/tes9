import { useState } from 'react'

const fmt = (v) => v.toFixed(2).replace('.', ',')

export default function Checkout({ cart, subtotal, onClose, onFinish }) {
  const [step, setStep] = useState(1)
  
  const [method, setMethod] = useState('delivery') // 'delivery' | 'pickup'
  const [address, setAddress] = useState({ street: '', number: '', neighborhood: '', complement: '', ref: '' })
  const [payment, setPayment] = useState('pix') // 'pix' | 'card' | 'cash'
  const [changeFor, setChangeFor] = useState('')
  const [obs, setObs] = useState('')

  const taxaEntrega = method === 'delivery' ? 5.00 : 0
  const total = subtotal + taxaEntrega

  const handleNext = () => setStep(s => s + 1)
  const handlePrev = () => setStep(s => s - 1)

  const handleConfirm = () => {
    const orderData = {
      id: `#${String(Date.now()).slice(-4)}`,
      customer: 'Cliente Web',
      method,
      address: method === 'delivery' ? `${address.street}, ${address.number} - ${address.neighborhood}` : 'Retirada no balcão',
      payment,
      changeFor: payment === 'cash' ? changeFor : null,
      obs,
      items: cart,
      subtotal,
      tax: taxaEntrega,
      total,
      status: 'received',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    }
    onFinish(orderData)
  }

  return (
    <div className="modal-overlay">
      <div className="modal checkout-modal">
        <div className="modal-header">
          <h2>Finalizar Pedido</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="checkout-body">
          {/* STEP 1: Modalidade */}
          {step === 1 && (
            <div className="checkout-step">
              <h3>1. Como deseja receber?</h3>
              <div className="options-grid">
                <button 
                  className={`option-card ${method === 'delivery' ? 'selected' : ''}`}
                  onClick={() => setMethod('delivery')}
                >
                  <span className="opt-emoji">🛵</span>
                  <strong>Delivery</strong>
                  <small>Receber em casa</small>
                </button>
                <button 
                  className={`option-card ${method === 'pickup' ? 'selected' : ''}`}
                  onClick={() => setMethod('pickup')}
                >
                  <span className="opt-emoji">🏬</span>
                  <strong>Retirada</strong>
                  <small>Buscar na loja</small>
                </button>
              </div>

              {method === 'delivery' && (
                <div className="address-form form-grid" style={{marginTop: '20px'}}>
                  <div className="form-group full">
                    <label>Rua / Avenida *</label>
                    <input value={address.street} onChange={e => setAddress({...address, street: e.target.value})} placeholder="Ex: Rua das Flores" />
                  </div>
                  <div className="form-group">
                    <label>Número *</label>
                    <input value={address.number} onChange={e => setAddress({...address, number: e.target.value})} placeholder="Ex: 123" />
                  </div>
                  <div className="form-group">
                    <label>Bairro *</label>
                    <input value={address.neighborhood} onChange={e => setAddress({...address, neighborhood: e.target.value})} placeholder="Ex: Centro" />
                  </div>
                  <div className="form-group full">
                    <label>Complemento / Ponto de Referência</label>
                    <input value={address.complement} onChange={e => setAddress({...address, complement: e.target.value})} placeholder="Apt 12, ao lado do mercado..." />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Pagamento */}
          {step === 2 && (
            <div className="checkout-step">
              <h3>2. Forma de Pagamento</h3>
              <div className="options-grid">
                <button className={`option-card ${payment === 'pix' ? 'selected' : ''}`} onClick={() => setPayment('pix')}>
                  <span className="opt-emoji">💠</span>
                  <strong>Pix</strong>
                </button>
                <button className={`option-card ${payment === 'card' ? 'selected' : ''}`} onClick={() => setPayment('card')}>
                  <span className="opt-emoji">💳</span>
                  <strong>Cartão</strong>
                </button>
                <button className={`option-card ${payment === 'cash' ? 'selected' : ''}`} onClick={() => setPayment('cash')}>
                  <span className="opt-emoji">💵</span>
                  <strong>Dinheiro</strong>
                </button>
              </div>

              {payment === 'cash' && (
                <div className="form-group" style={{marginTop: '20px'}}>
                  <label>Troco para quanto?</label>
                  <input 
                    type="number" 
                    placeholder="Ex: 50" 
                    value={changeFor} 
                    onChange={e => setChangeFor(e.target.value)} 
                  />
                  <small style={{color: 'var(--gray)'}}>Deixe em branco se não precisar de troco.</small>
                </div>
              )}

              <div className="form-group full" style={{marginTop: '20px'}}>
                <label>Observações do pedido (Opcional)</label>
                <input 
                  value={obs} 
                  onChange={e => setObs(e.target.value)} 
                  placeholder="Ex: Tirar cebola, campainha quebrada..." 
                />
              </div>
            </div>
          )}

          {/* STEP 3: Confirmação */}
          {step === 3 && (
            <div className="checkout-step">
              <h3>3. Resumo do Pedido</h3>
              <div className="review-card">
                <div className="review-row">
                  <span>Itens ({cart.length})</span>
                  <strong>R$ {fmt(subtotal)}</strong>
                </div>
                <div className="review-row">
                  <span>Taxa de Entrega</span>
                  <strong>{taxaEntrega > 0 ? `R$ ${fmt(taxaEntrega)}` : 'Grátis'}</strong>
                </div>
                <div className="review-row total-row">
                  <span>Total</span>
                  <strong className="review-price">R$ {fmt(total)}</strong>
                </div>
              </div>

              <div className="review-card" style={{marginTop: '12px'}}>
                <p><strong>{method === 'delivery' ? '🛵 Entrega' : '🏬 Retirada'}</strong></p>
                {method === 'delivery' && (
                  <p style={{fontSize: '0.85rem', color: 'var(--gray)', marginTop: '4px'}}>
                    {address.street}, {address.number} - {address.neighborhood}
                  </p>
                )}
                <p style={{marginTop: '8px'}}><strong>Pagamento:</strong> {payment === 'pix' ? 'Pix' : payment === 'card' ? 'Cartão na entrega' : 'Dinheiro'}</p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {step > 1 ? (
            <button className="btn-secondary" onClick={handlePrev}>← Voltar</button>
          ) : (
            <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          )}

          {step < 3 ? (
            <button 
              className="btn-primary" 
              onClick={handleNext}
              disabled={method === 'delivery' && (!address.street || !address.number || !address.neighborhood)}
            >
              Avançar →
            </button>
          ) : (
            <button className="btn-green" onClick={handleConfirm}>
              ✅ Confirmar Pedido
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
