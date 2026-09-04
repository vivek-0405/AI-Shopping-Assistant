import { motion } from 'framer-motion'
import { Star, Heart, BarChart2, ShoppingCart, Zap, CheckCircle, XCircle, Package, ExternalLink } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { formatCurrency, getDiscountPercent } from '@/utils/format'
import { Badge } from '@/components/Common/Badge'
import { CircularProgress } from '@/components/Common/CircularProgress'
import { useState } from 'react'
import confetti from 'canvas-confetti'

const RELIABLE_STOCK_PHOTO = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80'

function ProductImage({ image, name, brand, color }) {
  const [imgSrc, setImgSrc] = useState(image || RELIABLE_STOCK_PHOTO)
  const [imgError, setImgError] = useState(false)
  const initials = `${brand?.[0] || ''}${name?.[0] || ''}`.toUpperCase()

  const handleImgError = () => {
    if (imgSrc !== RELIABLE_STOCK_PHOTO) {
      setImgSrc(RELIABLE_STOCK_PHOTO)
    } else {
      setImgError(true)
    }
  }

  if (imgSrc && !imgError) {
    return (
      <div className="w-full h-48 shrink-0 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-white/5 relative group border border-slate-100 dark:border-white/5">
        <img
          src={imgSrc}
          alt={name}
          onError={handleImgError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div
      className="w-full h-48 shrink-0 flex-shrink-0 rounded-xl flex items-center justify-center relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}
    >
      <div
        className="text-3xl font-black opacity-30"
        style={{ color }}
      >
        {initials}
      </div>
      <Package
        className="absolute bottom-3 right-3 w-6 h-6 opacity-20"
        style={{ color }}
      />
    </div>
  )
}

function getOfficialStoreUrl(product) {
  if (!product) return 'https://www.google.com'
  const name = product.name || ''
  const store = (product.store || '').toLowerCase()

  if (product.url && product.url.startsWith('http') && !product.url.includes('example.com')) {
    return product.url
  }

  const encodedName = encodeURIComponent(name)

  if (store.includes('myntra')) {
    return `https://www.myntra.com/${encodeURIComponent(name.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}?rawQuery=${encodedName}`
  }
  if (store.includes('nike')) {
    return `https://www.nike.com/in/w?q=${encodedName}`
  }
  if (store.includes('adidas')) {
    return `https://www.adidas.co.in/search?q=${encodedName}`
  }
  if (store.includes('flipkart')) {
    return `https://www.flipkart.com/search?q=${encodedName}`
  }
  if (store.includes('nykaa')) {
    return `https://www.nykaa.com/search/result/?q=${encodedName}`
  }
  if (store.includes('apple')) {
    return `https://www.apple.com/in/search/${encodedName}`
  }
  if (store.includes('samsung')) {
    return `https://www.samsung.com/in/search/?q=${encodedName}`
  }
  if (store.includes('croma')) {
    return `https://www.croma.com/searchB?q=${encodedName}`
  }

  return `https://www.amazon.in/s?k=${encodedName}`
}

export function ProductCard({ product, showCompare = true }) {
  const { saveProduct, removeSavedProduct, isProductSaved, addToCompare, compareList, addToShoppingList } = useAppStore()
  const [showDetails, setShowDetails] = useState(false)
  const saved = isProductSaved(product.id)
  const inCompare = compareList.includes(product.id)
  const discount = getDiscountPercent(product.price, product.originalPrice)
  const storeUrl = getOfficialStoreUrl(product)

  const handleSave = () => {
    if (saved) {
      removeSavedProduct(product.id)
    } else {
      saveProduct(product)
    }
  }

  const handleAddToCart = () => {
    addToShoppingList(product)
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 }, colors: ['#6171f3', '#d946ef', '#10b981'] })
  }

  const handleCompare = () => {
    if (inCompare) return
    if (compareList.length >= 3) {
      return
    }
    addToCompare(product.id)
  }

  const availabilityColor = {
    'In Stock': 'text-emerald-600 dark:text-emerald-400',
    'Low Stock': 'text-amber-600 dark:text-amber-400',
    'Out of Stock': 'text-red-600 dark:text-red-400',
    'Pre-order': 'text-blue-600 dark:text-blue-400',
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl overflow-hidden card-hover flex flex-col"
      aria-label={`Product: ${product.name}`}
    >
      {/* Image */}
      <div className="p-4 pb-0 shrink-0 flex-shrink-0">
        <ProductImage
          image={product.image}
          name={product.name}
          brand={product.brand}
          color={product.imageColor || '#6171f3'}
        />
      </div>

      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Badges */}
        {product.badges?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.badges.map((badge) => (
              <Badge key={badge} label={badge} />
            ))}
          </div>
        )}

        {/* Name & Brand */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{product.brand}</span>
            {product.store && (
              <span className="text-[11px] font-bold bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 px-2 py-0.5 rounded-md border border-brand-200 dark:border-brand-800/50">
                🛒 {product.store}
              </span>
            )}
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Price & Match */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                {formatCurrency(product.price, product.currency)}
              </span>
              {discount > 0 && (
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>
            {product.originalPrice && discount > 0 && (
              <p className="text-xs text-slate-400 line-through">
                {formatCurrency(product.originalPrice, product.currency)}
              </p>
            )}
          </div>
          <CircularProgress value={product.matchScore} size={60} strokeWidth={5} />
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= Math.floor(product.rating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-300 dark:text-slate-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {product.rating}
          </span>
          <span className="text-xs text-slate-400">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Availability & Delivery */}
        <div className="flex items-center justify-between text-xs">
          <span className={`font-semibold ${availabilityColor[product.availability]}`}>
            {product.availability}
          </span>
          <span className="text-slate-500 dark:text-slate-400">🚚 {product.delivery}</span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5">
          {product.features.slice(0, 3).map((f, i) => (
            <span
              key={i}
              className="text-xs bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-lg"
            >
              {f}
            </span>
          ))}
        </div>



        {/* Pros/Cons toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-brand-500 font-semibold hover:text-brand-600 transition-colors text-left"
        >
          {showDetails ? 'Hide details' : 'View pros & cons'}
        </button>

        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-3"
          >
            <div>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1.5">Pros</p>
              {product.pros.map((pro, i) => (
                <div key={i} className="flex items-start gap-1.5 mb-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-600 dark:text-slate-400">{pro}</p>
                </div>
              ))}
            </div>
            {product.cons.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-red-500 dark:text-red-400 mb-1.5">Cons</p>
                {product.cons.map((con, i) => (
                  <div key={i} className="flex items-start gap-1.5 mb-1">
                    <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-600 dark:text-slate-400">{con}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1 mt-auto">
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:scale-[1.02] transition-all cursor-pointer"
            title={`View product on official ${product.store || 'Store'}`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Store</span>
          </a>
          <button
            onClick={handleAddToCart}
            className="flex-1 btn-primary flex items-center justify-center gap-1.5 py-2.5 text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to List
          </button>
          <button
            onClick={handleSave}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
              saved
                ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-500'
                : 'border-slate-200 dark:border-white/10 text-slate-400 hover:text-rose-500 hover:border-rose-200'
            }`}
            aria-label={saved ? 'Remove from saved' : 'Save product'}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
          {showCompare && (
            <button
              onClick={handleCompare}
              disabled={inCompare}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
                inCompare
                  ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-800 text-brand-500'
                  : 'border-slate-200 dark:border-white/10 text-slate-400 hover:text-brand-500 hover:border-brand-200'
              }`}
              aria-label="Add to comparison"
            >
              <BarChart2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  )
}