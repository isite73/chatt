'use client'
import { useState } from 'react'
import * as XLSX from 'xlsx'

interface Product {
  id: string; name: string; description: string; sku: string; price: number
  compare_price: number; category: string; stock_qty: number; track_inventory: boolean
  image_url: string; is_active: boolean; tags: string[]; trigger_word: string
}

const DEMO_PRODUCTS: Product[] = [
  { id:'1', name:'Blue Sneakers', description:'Comfortable everyday sneakers', sku:'SHO-001', price:49.99, compare_price:69.99, category:'Footwear', stock_qty:24, track_inventory:true, image_url:'', is_active:true, tags:['shoes','sale'], trigger_word:'SHOES' },
  { id:'2', name:'Summer Floral Dress', description:'Light summer dress, perfect for any occasion', sku:'DRS-002', price:35.00, compare_price:55.00, category:'Clothing', stock_qty:12, track_inventory:true, image_url:'', is_active:true, tags:['dress','summer'], trigger_word:'DRESS' },
  { id:'3', name:'Leather Crossbody Bag', description:'Genuine leather handcrafted bag', sku:'BAG-003', price:89.00, compare_price:120.00, category:'Accessories', stock_qty:8, track_inventory:true, image_url:'', is_active:false, tags:['bag','leather'], trigger_word:'BAG' },
  { id:'4', name:'Gold Drop Earrings', description:'18k gold plated statement earrings', sku:'JEW-004', price:22.00, compare_price:35.00, category:'Jewellery', stock_qty:50, track_inventory:false, image_url:'', is_active:true, tags:['jewellery','gold'], trigger_word:'JEWEL' },
]

const CATEGORIES = ['All','Clothing','Footwear','Accessories','Jewellery','Electronics','Beauty','Other']

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS)
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form, setForm] = useState<Partial<Product>>({
    name:'', description:'', sku:'', price:0, compare_price:0,
    category:'Clothing', stock_qty:0, track_inventory:false,
    image_url:'', is_active:true, tags:[], trigger_word:''
  })

  const openNew = () => {
    setEditingProduct(null)
    setForm({ name:'', description:'', sku:'', price:0, compare_price:0, category:'Clothing', stock_qty:0, track_inventory:false, image_url:'', is_active:true, tags:[], trigger_word:'' })
    setShowModal(true)
  }

  const openEdit = (p: Product) => {
    setEditingProduct(p)
    setForm({...p})
    setShowModal(true)
  }

  const saveProduct = () => {
    if (!form.name) return
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? {...p, ...form} as Product : p))
    } else {
      const newP: Product = { ...form as Product, id: Date.now().toString() }
      setProducts([...products, newP])
    }
    setShowModal(false)
  }

  const deleteProduct = (id: string) => {
    if (confirm('Delete this product?')) setProducts(products.filter(p => p.id !== id))
  }

  const toggleActive = (id: string) => {
    setProducts(products.map(p => p.id === id ? {...p, is_active: !p.is_active} : p))
  }

  const exportToExcel = () => {
    const data = products.map(p => ({
      'Product Name': p.name,
      'SKU': p.sku,
      'Description': p.description,
      'Category': p.category,
      'Price ($)': p.price,
      'Compare Price ($)': p.compare_price,
      'Stock Qty': p.stock_qty,
      'Track Inventory': p.track_inventory ? 'Yes' : 'No',
      'Trigger Word': p.trigger_word,
      'Status': p.is_active ? 'Active' : 'Draft',
      'Tags': p.tags.join(', '),
    }))
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Products')

    // Style column widths
    ws['!cols'] = [
      {wch:25},{wch:12},{wch:35},{wch:15},{wch:12},{wch:16},{wch:12},{wch:18},{wch:15},{wch:10},{wch:25}
    ]
    XLSX.writeFile(wb, `FlowChat_Products_${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()) || p.trigger_word.toLowerCase().includes(search.toLowerCase())
    const matchCat = catFilter === 'All' || p.category === catFilter
    return matchSearch && matchCat
  })

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">🏪 Store & Products</h1>
          <p className="text-slate-500 mt-1">Manage your product catalog. Set trigger words so your chatbot auto-sends product info.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-green-200 text-green-700 font-semibold text-sm hover:bg-green-50 transition-colors">
            📥 Export to Excel
          </button>
          <button onClick={openNew}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-bg text-white font-semibold text-sm hover:opacity-90 transition-opacity">
            + Add Product
          </button>
        </div>
      </div>

      {/* Trigger word info banner */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div>
          <p className="font-bold text-indigo-800 text-sm">How Trigger Words Work</p>
          <p className="text-indigo-600 text-sm mt-1">When a customer types a trigger word in any connected chat (e.g. "<strong>SHOES</strong>"), FlowChat automatically sends that product's info card — name, price, description, and image — as a reply. No manual work needed.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <input value={search} onChange={e => setSearch(e.target.value)}
          className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400 w-64"
          placeholder="Search products or trigger words..." />
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${catFilter === c ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Products', value: products.length, icon: '📦' },
          { label: 'Active', value: products.filter(p=>p.is_active).length, icon: '✅' },
          { label: 'With Triggers', value: products.filter(p=>p.trigger_word).length, icon: '⚡' },
          { label: 'Low Stock (< 5)', value: products.filter(p=>p.track_inventory && p.stock_qty < 5).length, icon: '⚠️' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-100 p-4">
            <div className="flex items-center gap-2 mb-1">
              <span>{s.icon}</span>
              <span className="text-xs text-slate-500 font-medium">{s.label}</span>
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Products table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Product</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">SKU</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Price</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Stock</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Trigger Word</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Category</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-cyan-100 flex items-center justify-center text-lg flex-shrink-0">
                      📦
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{p.name}</p>
                      <p className="text-xs text-slate-400 truncate max-w-[180px]">{p.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-xs text-slate-500 font-mono">{p.sku}</td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-bold text-slate-800">${p.price.toFixed(2)}</p>
                    {p.compare_price > p.price && (
                      <p className="text-xs text-slate-400 line-through">${p.compare_price.toFixed(2)}</p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  {p.track_inventory ? (
                    <span className={`text-sm font-semibold ${p.stock_qty < 5 ? 'text-red-500' : 'text-slate-700'}`}>
                      {p.stock_qty < 5 && '⚠️ '}{p.stock_qty}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">Unlimited</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  {p.trigger_word ? (
                    <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg font-mono text-xs font-bold">
                      ⚡ {p.trigger_word}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-300">—</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-medium">{p.category}</span>
                </td>
                <td className="px-4 py-4">
                  <button onClick={() => toggleActive(p.id)}
                    className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors ${p.is_active ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>
                    {p.is_active ? '● Active' : '○ Draft'}
                  </button>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(p)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-medium">
                      Edit
                    </button>
                    <button onClick={() => deleteProduct(p.id)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-500 transition-colors font-medium">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-12 text-slate-400">
                  <div className="text-4xl mb-3">📦</div>
                  <p className="font-semibold">No products found</p>
                  <p className="text-sm mt-1">Try a different search or add your first product</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-extrabold text-slate-900">
                {editingProduct ? '✏️ Edit Product' : '+ Add New Product'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>

            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Product Name *</label>
                <input value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400"
                  placeholder="e.g. Blue Sneakers" />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                <textarea value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400 resize-none h-20"
                  placeholder="Short product description for customers..." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">SKU</label>
                <input value={form.sku || ''} onChange={e => setForm({...form, sku: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400"
                  placeholder="e.g. SHO-001" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
                <select value={form.category || 'Clothing'} onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400 bg-white">
                  {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Price ($) *</label>
                <input type="number" value={form.price || 0} onChange={e => setForm({...form, price: parseFloat(e.target.value)})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400"
                  min="0" step="0.01" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Compare Price ($)</label>
                <input type="number" value={form.compare_price || 0} onChange={e => setForm({...form, compare_price: parseFloat(e.target.value)})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400"
                  min="0" step="0.01" placeholder="Original price (shows as strikethrough)" />
              </div>

              <div className="col-span-2 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                <label className="block text-sm font-bold text-indigo-800 mb-1.5">⚡ Trigger Word</label>
                <input value={form.trigger_word || ''} onChange={e => setForm({...form, trigger_word: e.target.value.toUpperCase()})}
                  className="w-full border border-indigo-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400 bg-white font-mono font-bold text-indigo-700 uppercase"
                  placeholder="e.g. SHOES, INFO, BUY" />
                <p className="text-xs text-indigo-600 mt-2">When a customer types this word in any chat, FlowChat automatically sends this product's details as a reply.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Stock Quantity</label>
                <input type="number" value={form.stock_qty || 0} onChange={e => setForm({...form, stock_qty: parseInt(e.target.value)})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400"
                  min="0" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Image URL</label>
                <input value={form.image_url || ''} onChange={e => setForm({...form, image_url: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400"
                  placeholder="https://..." />
              </div>

              <div className="col-span-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.track_inventory || false}
                      onChange={e => setForm({...form, track_inventory: e.target.checked})}
                      className="w-4 h-4 accent-indigo-600" />
                    <span className="text-sm text-slate-600 font-medium">Track inventory</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.is_active !== false}
                      onChange={e => setForm({...form, is_active: e.target.checked})}
                      className="w-4 h-4 accent-indigo-600" />
                    <span className="text-sm text-slate-600 font-medium">Active (visible to chatbot)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={saveProduct}
                className="flex-1 py-3 rounded-xl gradient-bg text-white font-bold text-sm hover:opacity-90 transition-opacity">
                {editingProduct ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
