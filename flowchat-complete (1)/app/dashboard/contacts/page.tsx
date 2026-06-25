'use client'
import { useState } from 'react'

const DEMO = [
  { id:'1', name:'Sarah Mensah', email:'sarah@email.com', phone:'+233244123456', platform:'📸', tags:['vip','buyer'], subscribed:true, last_active:'2h ago' },
  { id:'2', name:'James Okafor', email:'james@biz.com', phone:'+2348012345678', platform:'💬', tags:['lead'], subscribed:true, last_active:'1d ago' },
  { id:'3', name:'Fatima Al-Hassan', email:'fatima@shop.com', phone:'+971501234567', platform:'💬', tags:['buyer','repeat'], subscribed:true, last_active:'3h ago' },
  { id:'4', name:'Marcus Thompson', email:'marcus@email.com', phone:'+14155551234', platform:'📘', tags:['inactive'], subscribed:false, last_active:'30d ago' },
  { id:'5', name:'Aisha Diallo', email:'aisha@store.com', phone:'+221771234567', platform:'📸', tags:['vip','buyer'], subscribed:true, last_active:'5m ago' },
]

export default function ContactsPage() {
  const [contacts] = useState(DEMO)
  const [search, setSearch] = useState('')

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.tags.some(t => t.includes(search.toLowerCase()))
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">👥 Contacts</h1>
          <p className="text-slate-500 mt-1">{contacts.length} total contacts · {contacts.filter(c=>c.subscribed).length} subscribed</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors">
            📥 Import CSV
          </button>
          <button className="px-4 py-2.5 rounded-xl gradient-bg text-white font-semibold text-sm hover:opacity-90 transition-opacity">
            + Add Contact
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <input value={search} onChange={e=>setSearch(e.target.value)}
          className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400 w-72"
          placeholder="Search by name, email, or tag..." />
        <select className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white text-slate-600 focus:outline-none">
          <option>All platforms</option>
          <option>Instagram</option><option>WhatsApp</option><option>Facebook</option>
        </select>
        <select className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white text-slate-600 focus:outline-none">
          <option>All statuses</option>
          <option>Subscribed</option><option>Unsubscribed</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Contact</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Phone</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Platform</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Tags</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wide">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-white text-sm font-bold">
                      {c.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">{c.phone}</td>
                <td className="px-4 py-4 text-xl">{c.platform}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {c.tags.map(t => (
                      <span key={t} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${c.subscribed ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                    {c.subscribed ? '● Subscribed' : '○ Unsubscribed'}
                  </span>
                </td>
                <td className="px-4 py-4 text-xs text-slate-400">{c.last_active}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
