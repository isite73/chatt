'use client'
import { useState } from 'react'

const BROADCASTS = [
  { id:'1', name:'Black Friday Sale 🔥', platform:'💬', status:'sent', audience:1200, delivered:1180, opened:890, clicked:340, scheduled_at:'Nov 29, 2024' },
  { id:'2', name:'New Collection Drop', platform:'📸', status:'sent', audience:850, delivered:830, opened:720, clicked:210, scheduled_at:'Dec 1, 2024' },
  { id:'3', name:'Christmas Promo', platform:'💬', status:'scheduled', audience:950, delivered:0, opened:0, clicked:0, scheduled_at:'Dec 24, 2024' },
  { id:'4', name:'New Year Message', platform:'✈️', status:'draft', audience:0, delivered:0, opened:0, clicked:0, scheduled_at:'—' },
]

export default function BroadcastsPage() {
  const [broadcasts] = useState(BROADCASTS)
  const [showNew, setShowNew] = useState(false)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">📣 Broadcasts</h1>
          <p className="text-slate-500 mt-1">Send one-time campaigns to your audience</p>
        </div>
        <button onClick={() => setShowNew(true)}
          className="px-4 py-2.5 rounded-xl gradient-bg text-white font-semibold text-sm hover:opacity-90 transition-opacity">
          + New Broadcast
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label:'Total Sent', value:'2,010', icon:'📨' },
          { label:'Avg Open Rate', value:'74%', icon:'👁️' },
          { label:'Avg Click Rate', value:'28%', icon:'🔗' },
          { label:'Scheduled', value: broadcasts.filter(b=>b.status==='scheduled').length, icon:'⏰' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-100 p-4">
            <span className="text-2xl">{s.icon}</span>
            <p className="text-2xl font-extrabold text-slate-900 mt-2">{s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Campaign</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Audience</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Delivered</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Open Rate</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Click Rate</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Date</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {broadcasts.map(b => (
              <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{b.platform}</span>
                    <p className="font-semibold text-slate-800 text-sm">{b.name}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-slate-700 font-semibold">{b.audience.toLocaleString()}</td>
                <td className="px-4 py-4 text-sm text-slate-700">{b.delivered.toLocaleString()}</td>
                <td className="px-4 py-4">
                  {b.delivered > 0 ? (
                    <span className="text-sm font-bold text-green-600">{Math.round(b.opened/b.delivered*100)}%</span>
                  ) : <span className="text-slate-300 text-sm">—</span>}
                </td>
                <td className="px-4 py-4">
                  {b.delivered > 0 ? (
                    <span className="text-sm font-bold text-indigo-600">{Math.round(b.clicked/b.delivered*100)}%</span>
                  ) : <span className="text-slate-300 text-sm">—</span>}
                </td>
                <td className="px-4 py-4 text-xs text-slate-400">{b.scheduled_at}</td>
                <td className="px-4 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    b.status==='sent' ? 'bg-green-50 text-green-600' :
                    b.status==='scheduled' ? 'bg-amber-50 text-amber-600' :
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {b.status==='sent' ? '✓ Sent' : b.status==='scheduled' ? '⏰ Scheduled' : '○ Draft'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showNew && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-extrabold text-slate-900">📣 New Broadcast</h2>
              <button onClick={() => setShowNew(false)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Campaign Name</label>
                <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400" placeholder="e.g. Weekend Flash Sale" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Channel</label>
                <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-indigo-400">
                  <option>WhatsApp</option><option>Instagram</option><option>Telegram</option><option>SMS</option><option>Email</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message</label>
                <textarea className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400 resize-none h-28"
                  placeholder="Hey {{first_name}}! We have a special offer just for you..." />
                <p className="text-xs text-slate-400 mt-1">Use {'{{first_name}}'} for personalization</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Audience</label>
                <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-indigo-400">
                  <option>All Subscribed Contacts (1,234)</option>
                  <option>Tag: vip (89)</option>
                  <option>Tag: buyer (342)</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowNew(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors">
                  Save as Draft
                </button>
                <button className="flex-1 py-3 rounded-xl gradient-bg text-white font-bold text-sm hover:opacity-90 transition-opacity">
                  Schedule / Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
