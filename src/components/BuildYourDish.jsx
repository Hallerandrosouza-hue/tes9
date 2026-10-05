import { useState } from 'react'
import { BUILD_OPTIONS } from '../data/products'

const STEPS = ['Base', 'Proteína', 'Extras', 'Revisar']
const fmt = (v) => v.toFixed(2).replace('.', ',')

export default function BuildYourDish({ onClose, onAddToCart }) {
  const [step,           setStep]           = useState(0)
  const [selectedBase,   setSelectedBase]   = useState(null)
  const [selectedProt,   setSelectedProt]   = useState(null)
  const [selectedExtras, setSelectedExtras] = useState([])

  const toggleExtra = (extra) =>
    setSelectedExtras((prev) =>
      prev.find((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    )

  const totalPrice =
    (selectedBase?.price  || 0) +
    (selectedProt?.price  || 0) +
    selectedExtras.reduce((s, e) => s + e.price, 0)

  const canNext = () => {
    if (step === 0) return selectedBase !== null
    if (step === 1) return selectedProt !== null
    return true
  }

  const handleAdd = () => {
    onAddToCart({
      id:          `custom-${Date.now()}`,
      name:        `Prato: ${selectedBase.name} + ${selectedProt.name}`,
      description: selectedExtras.length
        ? selectedExtras.map((e) => e.name).join(', ')
        : 'Sem extras',
      price: totalPrice,
      emoji: '🍽️',
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>🍽️ Monte seu Prato</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Step indicator */}
        <div className="steps-bar">
          {STEPS.map((s, i) => (
            <div key={s} className={`step-item${i === step ? ' active' : i < step ? ' done' : ''}`}>
              <div className="step-circle">{i < step ? '✓' : i + 1}</div>
              <span>{s}</span>
              {i < STEPS.length - 1 && <div className="step-line" />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="step-body">
          {/* Step 0 – Base */}
          {step === 0 && (
            <>
              <h3>Escolha a base</h3>
              <div className="options-grid">
                {BUILD_OPTIONS.bases.map((b) => (
                  <button
                    key={b.id}
                    className={`option-card${selectedBase?.id === b.id ? ' selected' : ''}`}
                    onClick={() => setSelectedBase(b)}
                  >
                    <span className="opt-emoji">{b.emoji}</span>
                    <strong>{b.name}</strong>
                    <small>{b.price === 0 ? 'Incluído' : `+R$ ${fmt(b.price)}`}</small>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 1 – Proteína */}
          {step === 1 && (
            <>
              <h3>Escolha a proteína</h3>
              <div className="options-grid">
                {BUILD_OPTIONS.proteins.map((p) => (
                  <button
                    key={p.id}
                    className={`option-card${selectedProt?.id === p.id ? ' selected' : ''}`}
                    onClick={() => setSelectedProt(p)}
                  >
                    <span className="opt-emoji">{p.emoji}</span>
                    <strong>{p.name}</strong>
                    <small>R$ {fmt(p.price)}</small>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 2 – Extras */}
          {step === 2 && (
            <>
              <h3>
                Adicione extras <small className="opt-label">(opcional – selecione vários)</small>
              </h3>
              <div className="options-grid sm">
                {BUILD_OPTIONS.extras.map((ex) => (
                  <button
                    key={ex.id}
                    className={`option-card${selectedExtras.find((e) => e.id === ex.id) ? ' selected' : ''}`}
                    onClick={() => toggleExtra(ex)}
                  >
                    <span className="opt-emoji">{ex.emoji}</span>
                    <strong>{ex.name}</strong>
                    <small>+R$ {fmt(ex.price)}</small>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 3 – Revisão */}
          {step === 3 && (
            <div className="review">
              <h3>Seu prato montado 🎉</h3>
              <div className="review-card">
                <div className="review-row">
                  <span>Base</span>
                  <strong>{selectedBase?.emoji} {selectedBase?.name}</strong>
                </div>
                <div className="review-row">
                  <span>Proteína</span>
                  <strong>{selectedProt?.emoji} {selectedProt?.name}</strong>
                </div>
                {selectedExtras.length > 0 && (
                  <div className="review-row">
                    <span>Extras</span>
                    <strong className="extras-list">
                      {selectedExtras.map((e) => `${e.emoji} ${e.name}`).join(' · ')}
                    </strong>
                  </div>
                )}
                <div className="review-row total-row">
                  <span>Total</span>
                  <strong className="review-price">R$ {fmt(totalPrice)}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Price ticker */}
        {totalPrice > 0 && (
          <div className="price-ticker">
            Parcial: <strong>R$ {fmt(totalPrice)}</strong>
          </div>
        )}

        {/* Footer navigation */}
        <div className="modal-footer">
          <button
            className="btn-secondary"
            onClick={step === 0 ? onClose : () => setStep((s) => s - 1)}
          >
            {step === 0 ? 'Cancelar' : '← Voltar'}
          </button>

          {step < STEPS.length - 1 ? (
            <button
              className="btn-primary"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext()}
            >
              Próximo →
            </button>
          ) : (
            <button className="btn-green" onClick={handleAdd}>
              🛒 Adicionar ao Carrinho
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
