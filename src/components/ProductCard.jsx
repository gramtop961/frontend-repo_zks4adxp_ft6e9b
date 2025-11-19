function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-slate-800/40 border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/40 transition-colors">
      <div className="aspect-[4/3] overflow-hidden bg-slate-900">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-white font-medium line-clamp-2">{product.title}</h3>
          <span className="text-blue-400 font-semibold">${product.price.toFixed(2)}</span>
        </div>
        <p className="mt-2 text-slate-400 text-sm line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-500">{product.category}</span>
          <button
            onClick={() => onAdd(product)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
