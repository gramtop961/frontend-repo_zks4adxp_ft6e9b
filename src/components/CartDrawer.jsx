import { useMemo } from 'react'

function CartDrawer({ items, onClose, onCheckout }) {
  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const tax = +(subtotal * 0.08).toFixed(2)
    const total = +(subtotal + tax).toFixed(2)
    return { subtotal, tax, total }
  }, [items])

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-slate-900 border-l border-white/10 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">Close</button>
        </div>

        {items.length === 0 ? (
          <p className="text-slate-400">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img src={item.image} alt={item.title} className="w-16 h-16 rounded object-cover" />
                <div className="flex-1">
                  <p className="text-white text-sm">{item.title}</p>
                  <p className="text-slate-400 text-xs">Qty: {item.quantity}</p>
                </div>
                <div className="text-white text-sm">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}

            <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Tax</span>
                <span>${totals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white font-semibold text-base">
                <span>Total</span>
                <span>${totals.total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartDrawer
