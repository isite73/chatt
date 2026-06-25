'use client'
import { useState } from 'react'

const TOOLS = [
  { id:'comment', name:'Comment Trigger', icon:'💬', desc:'Auto-DM anyone who comments a keyword on your post', active:3, color:'bg-indigo-50 border-indigo-200' },
  { id:'story', name:'Story Mention', icon:'📸', desc:'Trigger a flow when someone tags you in their story', active:1, color:'bg-pink-50 border-pink-200' },
  { id:'keyword', name:'Keyword Trigger', icon:'⚡', desc:'Reply automatically when someone messages a specific word', active:5, color:'bg-amber-50 border-amber-200' },
  { id:'ref', name:'Ref URL', icon:'🔗', desc:'Unique trackable links that trigger specific flows', active:2, color:'bg-cyan-50 border-cyan-200' },
  { id:'qr', name:'QR Code', icon:'▦', desc:'Scannable QR codes that launch a conversation flow', active:1, color:'bg-green-50 border-green-200' },
  { id:'widget', name:'Website Widget', icon:'🌐', desc:'Embed a chat widget on any website', active:1, color:'bg-purple-50 border-purple-200' },
]

export default function GrowthPage() {
  const [activeTool, setActiveTool] = useState('comment')

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">🔗 Growth Tools</h1>
        <p className="text-slate-500 mt-1">Turn every interaction into a subscriber</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {TOOLS.map(t => (
          <div key={t.id} onClick={() => setActiveTool(t.id)}
            className={`border-2 rounded-2xl p-5 cursor-pointer transition-all ${t.color} ${activeTool===t.id ? 'ring-2 ring-indigo-500 ring-offset-2' : 'hover:scale-105'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">{t.icon}</span>
              <span className="text-xs bg-white/80 text-slate-600 px-2 py-1 rounded-full font-semibold">{t.active} active</span>
            </div>
            <h3 className="font-bold text-slate-800 mb-1">{t.name}</h3>
            <p className="text-xs text-slate-500">{t.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-800">
            {TOOLS.find(t=>t.id===activeTool)?.icon} {TOOLS.find(t=>t.id===activeTool)?.name} — Active Rules
          </h2>
          <button className="px-4 py-2 rounded-xl gradient-bg text-white font-semibold text-sm hover:opacity-90 transition-opacity">
            + Add New
          </button>
        </div>
        <div className="space-y-3">
          {[1,2].map(i => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="font-semibold text-slate-800 text-sm">Rule #{i} — Keyword: {i===1?'INFO':'SHOP'}</p>
                <p className="text-xs text-slate-400">Flow: {i===1?'Product Showcase':'Welcome DM'} · 📸 Instagram · {i===1?'324':'87'} triggered</p>
              </div>
              <div className="flex gap-2">
                <button className="text-xs px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition-colors">Edit</button>
                <span className="text-xs px-3 py-1.5 rounded-full bg-green-50 text-green-600 font-semibold">● Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
