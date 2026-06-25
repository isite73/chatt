'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { icon: '🏠', label: 'Dashboard', href: '/dashboard' },
  { icon: '🤖', label: 'Flows', href: '/dashboard/flows' },
  { icon: '📣', label: 'Broadcasts', href: '/dashboard/broadcasts' },
  { icon: '👥', label: 'Contacts', href: '/dashboard/contacts' },
  { icon: '📥', label: 'Inbox', href: '/dashboard/inbox' },
  { icon: '🏪', label: 'Store', href: '/dashboard/store' },
  { icon: '📊', label: 'Analytics', href: '/dashboard/analytics' },
  { icon: '🔗', label: 'Growth Tools', href: '/dashboard/growth' },
  { icon: '⚙️', label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-slate-800">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-sm">FC</div>
            <span className="font-bold text-white text-lg">FlowChat</span>
          </Link>
        </div>

        {/* Workspace selector */}
        <div className="px-3 py-3 border-b border-slate-800">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-left">
            <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">M</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">My Business</p>
              <p className="text-slate-400 text-xs">Pro Plan</p>
            </div>
            <span className="text-slate-400 text-xs">⌄</span>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                  active ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}>
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Plan badge */}
        <div className="p-3 border-t border-slate-800">
          <div className="bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 border border-indigo-500/30 rounded-xl p-3">
            <p className="text-white text-xs font-bold mb-1">🚀 Pro Plan</p>
            <p className="text-slate-400 text-xs mb-2">847 / 1,000 contacts used</p>
            <div className="w-full bg-slate-700 rounded-full h-1.5">
              <div className="bg-indigo-400 h-1.5 rounded-full" style={{width:'85%'}} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <input className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-500 w-64 focus:outline-none focus:border-indigo-300"
              placeholder="Search contacts, flows, broadcasts..." />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <span className="text-xl">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">U</div>
              <span className="text-sm font-medium text-slate-700">My Account</span>
              <span className="text-slate-400 text-xs">⌄</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
