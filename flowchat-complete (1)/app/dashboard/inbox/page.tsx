'use client'
import { useState } from 'react'

const CONVERSATIONS = [
  { id:'1', name:'Sarah Mensah', msg:'Hi, do you have size 40 in the blue sneakers?', channel:'📸', time:'2m', unread:true, status:'open', platform:'Instagram' },
  { id:'2', name:'James Okafor', msg:'How much for the leather bag?', channel:'💬', time:'8m', unread:true, status:'open', platform:'WhatsApp' },
  { id:'3', name:'Fatima Al-Hassan', msg:'Thank you! Order received 🙏', channel:'💬', time:'15m', unread:false, status:'open', platform:'WhatsApp' },
  { id:'4', name:'Marcus Thompson', msg:'Is this still available?', channel:'📘', time:'1h', unread:false, status:'open', platform:'Facebook' },
  { id:'5', name:'Aisha Diallo', msg:'Can I get a discount for bulk?', channel:'📸', time:'2h', unread:false, status:'resolved', platform:'Instagram' },
]

const MESSAGES: Record<string, any[]> = {
  '1': [
    { dir:'in', text:'Hi, do you have size 40 in the blue sneakers?', time:'10:32' },
    { dir:'out', text:'Hi Sarah! Yes we do have size 40 in stock 😊 The Blue Sneakers are $49.99. Would you like to order?', time:'10:33' },
    { dir:'in', text:'Yes please! How do I pay?', time:'10:34' },
    { dir:'out', text:'Great choice! You can pay via mobile money or bank transfer. Reply with your delivery address and I\'ll send you the payment details 🚀', time:'10:34' },
  ],
  '2': [
    { dir:'in', text:'How much for the leather bag?', time:'09:55' },
    { dir:'out', text:'Hey James! The Leather Crossbody Bag is $89.00 (was $120). Genuine leather, handcrafted. Want to see more photos?', time:'09:56' },
  ],
}

export default function InboxPage() {
  const [selected, setSelected] = useState(CONVERSATIONS[0])
  const [reply, setReply] = useState('')
  const [msgs, setMsgs] = useState(MESSAGES)
  const [filter, setFilter] = useState('all')

  const send = () => {
    if (!reply.trim()) return
    const newMsg = { dir:'out', text: reply, time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) }
    setMsgs(m => ({...m, [selected.id]: [...(m[selected.id] || []), newMsg]}))
    setReply('')
  }

  const filtered = CONVERSATIONS.filter(c =>
    filter === 'all' ? true :
    filter === 'unread' ? c.unread :
    filter === 'resolved' ? c.status === 'resolved' :
    c.status === 'open'
  )

  return (
    <div className="flex h-full bg-white">
      {/* Left: Conversation list */}
      <div className="w-80 border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800 text-lg mb-3">📥 Inbox</h2>
          <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
            placeholder="Search conversations..." />
          <div className="flex gap-1 mt-3">
            {['all','unread','open','resolved'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${filter===f ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
          {filtered.map(c => (
            <div key={c.id} onClick={() => setSelected(c)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${selected.id===c.id ? 'bg-indigo-50 border-r-2 border-indigo-500' : 'hover:bg-slate-50'}`}>
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                  {c.name[0]}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 text-xs">{c.channel}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-sm ${c.unread ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{c.name}</p>
                  <p className="text-xs text-slate-400">{c.time}</p>
                </div>
                <p className="text-xs text-slate-400 truncate">{c.msg}</p>
              </div>
              {c.unread && <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Center: Chat thread */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-white font-bold">
              {selected.name[0]}
            </div>
            <div>
              <p className="font-bold text-slate-800">{selected.name}</p>
              <p className="text-xs text-slate-400">via {selected.platform} · Active now</p>
            </div>
          </div>
          <div className="flex gap-2">
            {['Assign','Label','Resolve','⋯'].map(btn => (
              <button key={btn} className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                {btn}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          {(msgs[selected.id] || [{dir:'in', text: selected.msg, time: 'now'}]).map((m, i) => (
            <div key={i} className={`flex ${m.dir==='out' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm ${
                m.dir==='out'
                  ? 'gradient-bg text-white rounded-br-sm'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm'
              }`}>
                <p>{m.text}</p>
                <p className={`text-xs mt-1 ${m.dir==='out' ? 'text-indigo-200' : 'text-slate-400'}`}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reply box */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors text-lg">😊</button>
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors text-lg">📎</button>
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors text-lg">🖼️</button>
            </div>
            <input value={reply} onChange={e => setReply(e.target.value)}
              onKeyDown={e => e.key==='Enter' && send()}
              className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400"
              placeholder={`Reply to ${selected.name}...`} />
            <button onClick={send}
              className="px-5 py-2.5 rounded-xl gradient-bg text-white font-bold text-sm hover:opacity-90 transition-opacity">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Right: Contact info panel */}
      <div className="w-64 border-l border-slate-200 bg-white p-4 flex-shrink-0 overflow-y-auto">
        <div className="text-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2">
            {selected.name[0]}
          </div>
          <p className="font-bold text-slate-800">{selected.name}</p>
          <p className="text-xs text-slate-400">{selected.platform}</p>
        </div>
        <div className="space-y-3">
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs font-bold text-slate-500 uppercase mb-2">Tags</p>
            <div className="flex flex-wrap gap-1">
              {['buyer','vip'].map(t => <span key={t} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{t}</span>)}
              <button className="text-xs text-slate-400 hover:text-indigo-500">+ add</button>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs font-bold text-slate-500 uppercase mb-2">Active Flows</p>
            <p className="text-xs text-indigo-600 font-medium">Product Showcase</p>
            <p className="text-xs text-slate-400">Step 2 of 4</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs font-bold text-slate-500 uppercase mb-2">Contact Info</p>
            <p className="text-xs text-slate-600">+233244123456</p>
            <p className="text-xs text-slate-400">sarah@email.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
