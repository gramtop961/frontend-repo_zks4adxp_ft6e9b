import { ShoppingCart, Search } from 'lucide-react'

function Navbar({ cartCount = 0, onSearch }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 bg-slate-900/60 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="Tech Gadgets" className="w-8 h-8" />
            <span className="text-white font-semibold text-lg">TechGadgets</span>
          </div>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                onChange={(e) => onSearch?.(e.target.value)}
                type="text"
                placeholder="Search gadgets..."
                className="w-full pl-10 pr-3 py-2 rounded-md bg-slate-800/70 border border-white/10 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative inline-flex items-center gap-2 text-slate-200 hover:text-white">
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
