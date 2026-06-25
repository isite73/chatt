'use client'
import { useState } from 'react'

const CHANNELS = [
  { id:'instagram', name:'Instagram', icon:'📸', connected:true, account:'@mybusiness_store' },
  { id:'whatsapp', name:'WhatsApp', icon:'💬', connected:true, account:'+233244123456' },
  { id:'facebook', name:'Facebook', icon:'📘', connected:true, account:'My Business Page' },
  { id:'tiktok', name:'TikTok', icon:'🎵', connected:false, account:'' },
  { id:'telegram', name:'Telegram', icon:'✈️', connected:false, account:'' },
  { id:'sms', name:'SMS (Twilio)', icon:'📱', connected:false, account:'' },
  { id:'email', name:'Email', icon:'📧', connected:false, account:'' },
]

const TABS = ['Channels','Team','Billing','Integrations','Account']

export default function SettingsPage() {
  const [tab, setTab] = useState('Channels')
  const [channels, setChannels] = useState(CHANNELS)

  const toggleChannel = (id: string) => {
    setChannels(channels.map(c => c.id === id ? {...c, connected: !c.connected, account: !c.connected ? `Connected ${c.name} account` : ''} : c))
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">⚙️ Settings</h1>
        <p className="text-slate-500 mt-1">Manage your workspace, channels, and team</p>
      </div>

      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab===t ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Channels' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-bold text-slate-800 mb-1">Connected Channels</h2>
          <p className="text-sm text-slate-500 mb-6">Connect your social and messaging platforms to start automating.</p>
          <div className="space-y-3">
            {channels.map(ch => (
              <div key={ch.id} className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${ch.connected ? 'border-green-200 bg-green-50' : 'border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ch.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-800">{ch.name}</p>
                    <p className="text-xs text-slate-400">{ch.connected ? ch.account : 'Not connected'}</p>
                  </div>
                </div>
                <button onClick={() => toggleChannel(ch.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    ch.connected
                      ? 'bg-white border-2 border-red-200 text-red-500 hover:bg-red-50'
                      : 'gradient-bg text-white hover:opacity-90'
                  }`}>
                  {ch.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Billing' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="font-bold text-slate-800 mb-4">Current Plan</h2>
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-5 flex items-center justify-between">
              <div>
                <p className="font-extrabold text-indigo-800 text-xl">Pro Plan</p>
                <p className="text-indigo-600 text-sm">$19/month · renews Jan 25, 2025</p>
                <p className="text-slate-500 text-sm mt-1">847 of 1,000 active contacts used</p>
              </div>
              <button className="px-4 py-2 rounded-xl border-2 border-indigo-300 text-indigo-700 font-semibold text-sm hover:bg-indigo-100 transition-colors">
                Upgrade to Business →
              </button>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="font-bold text-slate-800 mb-4">Pricing Plans</h2>
            <div className="grid grid-cols-4 gap-3">
              {[
                { name:'Free', price:'$0', contacts:'1,000', current:false },
                { name:'Starter', price:'$7/mo', contacts:'500 active', current:false },
                { name:'Pro', price:'$19/mo', contacts:'1,000 active', current:true },
                { name:'Business', price:'$39/mo', contacts:'2,500 active', current:false },
              ].map(p => (
                <div key={p.name} className={`rounded-xl border-2 p-4 text-center ${p.current ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'}`}>
                  <p className="font-bold text-slate-800">{p.name}</p>
                  <p className="text-xl font-extrabold text-indigo-600 my-2">{p.price}</p>
                  <p className="text-xs text-slate-500 mb-3">{p.contacts} contacts</p>
                  <button className={`w-full py-2 rounded-lg text-xs font-bold ${p.current ? 'bg-indigo-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                    {p.current ? 'Current Plan' : 'Switch'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'Team' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-slate-800">Team Members</h2>
            <button className="px-4 py-2 rounded-xl gradient-bg text-white font-semibold text-sm">+ Invite Member</button>
          </div>
          <div className="space-y-3">
            {[
              { name:'You (Owner)', email:'you@business.com', role:'Owner', joined:'Jan 2024' },
              { name:'Jane Agent', email:'jane@business.com', role:'Agent', joined:'Mar 2024' },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">{m.name[0]}</div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{m.name}</p>
                    <p className="text-xs text-slate-400">{m.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg font-semibold">{m.role}</span>
                  <span className="text-xs text-slate-400">Since {m.joined}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Account' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 max-w-lg">
          <h2 className="font-bold text-slate-800 mb-6">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <input defaultValue="Business Owner" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <input defaultValue="owner@mybusiness.com" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Workspace Name</label>
              <input defaultValue="My Business" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Timezone</label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-indigo-400">
                <option>Africa/Accra (GMT+0)</option>
                <option>Africa/Lagos (GMT+1)</option>
                <option>America/New_York (GMT-5)</option>
                <option>Europe/London (GMT+0)</option>
              </select>
            </div>
            <button className="w-full py-3 rounded-xl gradient-bg text-white font-bold text-sm hover:opacity-90 transition-opacity">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {tab === 'Integrations' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-bold text-slate-800 mb-6">Integrations</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name:'Shopify', icon:'🛒', connected:false, desc:'Sync orders & products' },
              { name:'Stripe', icon:'💳', connected:false, desc:'Payment triggers' },
              { name:'Mailchimp', icon:'📬', connected:false, desc:'Sync email contacts' },
              { name:'Google Sheets', icon:'📊', connected:false, desc:'Auto-log contact data' },
              { name:'Zapier', icon:'⚡', connected:false, desc:'Connect 1,000+ apps' },
              { name:'REST API', icon:'🔌', connected:true, desc:'Full API access' },
            ].map(int => (
              <div key={int.name} className={`border-2 rounded-xl p-4 ${int.connected ? 'border-green-200 bg-green-50' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{int.icon}</span>
                  {int.connected && <span className="text-xs text-green-600 font-bold">● Connected</span>}
                </div>
                <p className="font-bold text-slate-800 text-sm">{int.name}</p>
                <p className="text-xs text-slate-400 mb-3">{int.desc}</p>
                <button className={`w-full py-1.5 rounded-lg text-xs font-bold ${int.connected ? 'bg-white border border-red-200 text-red-500' : 'gradient-bg text-white hover:opacity-90'} transition-all`}>
                  {int.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
