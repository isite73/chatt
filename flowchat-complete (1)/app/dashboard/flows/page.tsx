'use client'
import { useState } from 'react'
import Link from 'next/link'

const DEMO_FLOWS = [
  { id:'1', name:'Instagram Welcome DM', trigger:'New Follower', status:'active', sent:412, opened:387, channel:'📸' },
  { id:'2', name:'Comment → DM (Promo)', trigger:'Keyword: INFO', status:'active', sent:1820, opened:1640, channel:'📸' },
  { id:'3', name:'WhatsApp FAQ Bot', trigger:'Any Message', status:'active', sent:6300, opened:6100, channel:'💬' },
  { id:'4', name:'Product Showcase', trigger:'Keyword: SHOP', status:'paused', sent:203, opened:180, channel:'💬' },
  { id:'5', name:'Lead Capture Flow', trigger:'Story Mention', status:'draft', sent:0, opened:0, channel:'📸' },
  { id:'6', name:'Re-engagement', trigger:'Inactive 30 days', status:'draft', sent:0, opened:0, channel:'✈️' },
]

const TEMPLATES = [
  { name:'Welcome DM', category:'Lead Gen', channels:['📸','📘'] },
  { name:'Comment to DM', category:'Lead Gen', channels:['📸','📘'] },
  { name:'FAQ Bot', category:'FAQ', channels:['📸','💬','📘'] },
  { name:'Lead Capture', category:'Lead Gen', channels:['📸','💬','✈️'] },
  { name:'Product Showcase', category:'E-commerce', channels:['📸','💬'] },
  { name:'Appointment Booking', category:'Booking', channels:['📸','💬','✈️'] },
]

export default function FlowsPage() {
  const [flows, setFlows] = useState(DEMO_FLOWS)
  const [showTemplates, setShowTemplates] = useState(false)

  const toggleStatus = (id: string) => {
    setFlows(flows.map(f => f.id === id ? {...f, status: f.status === 'active' ? 'paused' : f.status === 'paused' ? 'active' : f.status} : f))
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">🤖 Automations</h1>
          <p className="text-slate-500 mt-1">Build and manage your chat automation flows</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowTemplates(true)}
            className="px-4 py-2.5 rounded-xl border-2 border-indigo-200 text-indigo-600 font-semibold text-sm hover:bg-indigo-50 transition-colors">
            📋 Browse Templates
          </button>
          <Link href="/dashboard/flows/builder"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-bg text-white font-semibold text-sm hover:opacity-90 transition-opacity">
            + New Flow
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label:'Total Flows', value: flows.length, icon:'🤖' },
          { label:'Active', value: flows.filter(f=>f.status==='active').length, icon:'✅' },
          { label:'Messages Sent', value: flows.reduce((a,f)=>a+f.sent,0).toLocaleString(), icon:'📨' },
        ].map(s=>(
          <div key={s.label} className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-4">
            <span className="text-3xl">{s.icon}</span>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Flow Name</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Trigger</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Sent</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Open Rate</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {flows.map(f => (
              <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{f.channel}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{f.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4"><span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">{f.trigger}</span></td>
                <td className="px-4 py-4 text-sm font-semibold text-slate-700">{f.sent.toLocaleString()}</td>
                <td className="px-4 py-4">
                  {f.sent > 0 ? (
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5">
                        <div className="bg-indigo-500 h-1.5 rounded-full" style={{width:`${Math.round(f.opened/f.sent*100)}%`}} />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">{Math.round(f.opened/f.sent*100)}%</span>
                    </div>
                  ) : <span className="text-xs text-slate-300">—</span>}
                </td>
                <td className="px-4 py-4">
                  <button onClick={() => toggleStatus(f.id)}
                    className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors ${
                      f.status==='active' ? 'bg-green-50 text-green-600 hover:bg-green-100' :
                      f.status==='paused' ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' :
                      'bg-slate-100 text-slate-400'
                    }`}>
                    {f.status==='active' ? '● Active' : f.status==='paused' ? '⏸ Paused' : '○ Draft'}
                  </button>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <Link href={`/dashboard/flows/builder?id=${f.id}`}
                      className="text-xs px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors font-medium">
                      Edit
                    </Link>
                    <button className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors font-medium">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-extrabold text-slate-900">📋 Choose a Template</h2>
              <button onClick={() => setShowTemplates(false)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {TEMPLATES.map(t => (
                <div key={t.name} className="border-2 border-slate-100 rounded-xl p-4 hover:border-indigo-300 cursor-pointer transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-semibold">{t.category}</span>
                    <div className="flex gap-1">{t.channels.map((c,i)=><span key={i}>{c}</span>)}</div>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-3">{t.name}</h3>
                  <Link href={`/dashboard/flows/builder?template=${t.name}`}
                    className="block w-full text-center py-2 rounded-lg gradient-bg text-white text-xs font-bold hover:opacity-90 transition-opacity">
                    Use Template →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
