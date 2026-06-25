'use client'
import Link from 'next/link'

const stats = [
  { label: 'Total Contacts', value: '2,841', change: '+143 this week', icon: '👥', color: 'indigo' },
  { label: 'Active Flows', value: '12', change: '3 published today', icon: '🤖', color: 'cyan' },
  { label: 'Messages Sent', value: '18,432', change: '+2,100 vs last month', icon: '📨', color: 'green' },
  { label: 'Open Rate', value: '68.4%', change: '+5.2% vs last month', icon: '📊', color: 'amber' },
]

const recentFlows = [
  { name: 'Instagram Welcome DM', trigger: 'New Follower', status: 'active', sent: 412 },
  { name: 'Comment → DM (Promo)', trigger: 'Keyword: INFO', status: 'active', sent: 1820 },
  { name: 'WhatsApp FAQ Bot', trigger: 'Any Message', status: 'active', sent: 6300 },
  { name: 'Product Showcase', trigger: 'Keyword: SHOP', status: 'paused', sent: 203 },
  { name: 'Re-engagement Blast', trigger: 'Inactive 30 days', status: 'draft', sent: 0 },
]

const quickActions = [
  { label: 'New Flow', href: '/dashboard/flows/new', icon: '🤖', color: 'bg-indigo-50 text-indigo-600' },
  { label: 'New Broadcast', href: '/dashboard/broadcasts/new', icon: '📣', color: 'bg-cyan-50 text-cyan-600' },
  { label: 'Add Contact', href: '/dashboard/contacts', icon: '👤', color: 'bg-green-50 text-green-600' },
  { label: 'Add Product', href: '/dashboard/store', icon: '🏪', color: 'bg-amber-50 text-amber-600' },
]

export default function DashboardPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Good morning! 👋</h1>
          <p className="text-slate-500 mt-1">Here's what's happening with your FlowChat today.</p>
        </div>
        <div className="flex gap-3">
          {quickActions.map(a => (
            <Link key={a.label} href={a.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl ${a.color} font-semibold text-sm border border-current/10 hover:scale-105 transition-transform`}>
              <span>{a.icon}</span>{a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">↑ trending</span>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 mb-1">{s.value}</p>
            <p className="text-xs text-slate-500 font-medium">{s.label}</p>
            <p className="text-xs text-slate-400 mt-1">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Flows */}
        <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">Recent Flows</h2>
            <Link href="/dashboard/flows" className="text-xs text-indigo-600 font-semibold hover:underline">View all →</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentFlows.map((f) => (
              <div key={f.name} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-base">🤖</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{f.name}</p>
                    <p className="text-xs text-slate-400">{f.trigger}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-500">{f.sent.toLocaleString()} sent</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    f.status === 'active' ? 'bg-green-50 text-green-600' :
                    f.status === 'paused' ? 'bg-amber-50 text-amber-600' :
                    'bg-slate-100 text-slate-400'
                  }`}>{f.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Live inbox preview */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800 text-sm">Live Inbox</h2>
              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">5 new</span>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { name: 'Sarah M.', msg: 'Hi, do you have size 40?', channel: '📸', time: '2m' },
                { name: 'John K.', msg: 'How much for the bag?', channel: '💬', time: '5m' },
                { name: 'Fatima A.', msg: 'Thank you so much!', channel: '📘', time: '12m' },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {m.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-800">{m.name} {m.channel}</p>
                      <p className="text-xs text-slate-400">{m.time}</p>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{m.msg}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3">
              <Link href="/dashboard/inbox" className="block text-center text-xs text-indigo-600 font-semibold hover:underline">
                Open Inbox →
              </Link>
            </div>
          </div>

          {/* Channel health */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <h2 className="font-bold text-slate-800 text-sm mb-3">Connected Channels</h2>
            <div className="space-y-2">
              {[
                { ch: '📸 Instagram', status: 'Connected', ok: true },
                { ch: '💬 WhatsApp', status: 'Connected', ok: true },
                { ch: '📘 Facebook', status: 'Connected', ok: true },
                { ch: '✈️ Telegram', status: 'Not connected', ok: false },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">{c.ch}</span>
                  <span className={`text-xs font-medium ${c.ok ? 'text-green-600' : 'text-slate-400'}`}>
                    {c.ok ? '● ' : '○ '}{c.status}
                  </span>
                </div>
              ))}
            </div>
            <Link href="/dashboard/settings" className="block mt-3 text-center text-xs text-indigo-600 font-semibold hover:underline">
              Manage Channels →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
