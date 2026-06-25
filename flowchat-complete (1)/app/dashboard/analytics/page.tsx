'use client'

const WEEKLY = [
  { day:'Mon', sent:1200, opened:890 },
  { day:'Tue', sent:980, opened:720 },
  { day:'Wed', sent:1450, opened:1100 },
  { day:'Thu', sent:1100, opened:850 },
  { day:'Fri', sent:1600, opened:1280 },
  { day:'Sat', sent:900, opened:680 },
  { day:'Sun', sent:750, opened:560 },
]
const MAX = 1600

const FLOWS_STATS = [
  { name:'WhatsApp FAQ Bot', sent:6300, opened:6100, clicked:2800, completion:'94%' },
  { name:'Comment → DM Promo', sent:1820, opened:1640, clicked:980, completion:'90%' },
  { name:'Instagram Welcome', sent:412, opened:387, clicked:120, completion:'94%' },
  { name:'Product Showcase', sent:203, opened:180, clicked:95, completion:'89%' },
]

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">📊 Analytics</h1>
        <p className="text-slate-500 mt-1">Track your performance across all channels</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label:'Messages Sent (30d)', value:'18,432', change:'+12%', good:true, icon:'📨' },
          { label:'Avg Open Rate', value:'72.4%', change:'+5.2%', good:true, icon:'👁️' },
          { label:'Avg Click Rate', value:'31.8%', change:'+3.1%', good:true, icon:'🔗' },
          { label:'New Contacts', value:'+341', change:'+18%', good:true, icon:'👥' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{k.icon}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${k.good ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                {k.change}
              </span>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">{k.value}</p>
            <p className="text-xs text-slate-400 mt-1">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Bar chart */}
        <div className="col-span-2 bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-slate-800">Messages This Week</h2>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block"/>Sent</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-cyan-400 inline-block"/>Opened</span>
            </div>
          </div>
          <div className="flex items-end gap-3 h-40">
            {WEEKLY.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end gap-1 justify-center" style={{height:'120px'}}>
                  <div className="flex-1 bg-indigo-100 rounded-t-lg relative overflow-hidden" style={{height:`${d.sent/MAX*100}%`}}>
                    <div className="absolute inset-0 bg-indigo-500 rounded-t-lg" />
                  </div>
                  <div className="flex-1 bg-cyan-100 rounded-t-lg relative overflow-hidden" style={{height:`${d.opened/MAX*100}%`}}>
                    <div className="absolute inset-0 bg-cyan-400 rounded-t-lg" />
                  </div>
                </div>
                <span className="text-xs text-slate-400">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Channel breakdown */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h2 className="font-bold text-slate-800 mb-5">By Channel</h2>
          <div className="space-y-4">
            {[
              { ch:'💬 WhatsApp', pct:52, color:'bg-green-500' },
              { ch:'📸 Instagram', pct:28, color:'bg-indigo-500' },
              { ch:'📘 Facebook', pct:12, color:'bg-blue-500' },
              { ch:'✈️ Telegram', pct:8, color:'bg-cyan-500' },
            ].map(c => (
              <div key={c.ch}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-slate-700 font-medium">{c.ch}</span>
                  <span className="text-slate-500 font-bold">{c.pct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`${c.color} h-2 rounded-full`} style={{width:`${c.pct}%`}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flow performance table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Flow Performance</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['Flow Name','Sent','Opened','Clicked','Completion Rate'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {FLOWS_STATS.map(f => (
              <tr key={f.name} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4 font-semibold text-slate-800 text-sm">{f.name}</td>
                <td className="px-5 py-4 text-sm text-slate-600">{f.sent.toLocaleString()}</td>
                <td className="px-5 py-4 text-sm text-green-600 font-semibold">{f.opened.toLocaleString()}</td>
                <td className="px-5 py-4 text-sm text-indigo-600 font-semibold">{f.clicked.toLocaleString()}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-slate-100 rounded-full h-1.5">
                      <div className="bg-indigo-500 h-1.5 rounded-full" style={{width:f.completion}} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{f.completion}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
