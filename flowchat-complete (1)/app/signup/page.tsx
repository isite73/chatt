'use client'
import { useState } from 'react'
import Link from 'next/link'

const plans = [
  { id: 'free', name: 'Free', price: '$0', desc: '1,000 contacts' },
  { id: 'starter', name: 'Starter', price: '$7/mo', desc: '500 active contacts' },
  { id: 'pro', name: 'Pro', price: '$19/mo', desc: '1,000 active contacts' },
  { id: 'business', name: 'Business', price: '$39/mo', desc: '2,500 active contacts' },
]

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', password: '', workspace: '', plan: 'free' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) { setStep(step + 1); return }
    setLoading(true)
    // TODO: wire to supabase.auth.signUp + create workspace
    setTimeout(() => { window.location.href = '/dashboard'; }, 1200)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold">FC</div>
            <span className="font-bold text-2xl text-slate-800">FlowChat</span>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1,2,3].map(s => (
              <div key={s} className={`h-1.5 rounded-full transition-all ${s <= step ? 'bg-indigo-600 w-8' : 'bg-slate-200 w-5'}`} />
            ))}
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            {step === 1 ? 'Create your account' : step === 2 ? 'Name your workspace' : 'Choose your plan'}
          </h1>
          <p className="text-slate-500 mt-2 text-sm">Step {step} of 3</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    placeholder="you@business.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                  <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    placeholder="Min 8 characters" minLength={8} />
                </div>
              </>
            )}

            {step === 2 && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Workspace Name</label>
                <input type="text" value={form.workspace} onChange={e => setForm({...form, workspace: e.target.value})} required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder="e.g. My Fashion Store" />
                <p className="text-xs text-slate-400 mt-2">This is your business name inside FlowChat. You can change it later.</p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                {plans.map(p => (
                  <label key={p.id} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${form.plan === p.id ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-indigo-200'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="plan" value={p.id} checked={form.plan === p.id}
                        onChange={e => setForm({...form, plan: e.target.value})} className="accent-indigo-600" />
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{p.name}</p>
                        <p className="text-xs text-slate-500">{p.desc}</p>
                      </div>
                    </div>
                    <span className="font-bold text-indigo-600 text-sm">{p.price}</span>
                  </label>
                ))}
                {form.plan !== 'free' && <p className="text-xs text-slate-400 text-center">14-day free trial · No card required today</p>}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl gradient-bg text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60">
              {loading ? 'Creating your account...' : step < 3 ? 'Continue →' : `Start with ${plans.find(p=>p.id===form.plan)?.name}`}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
