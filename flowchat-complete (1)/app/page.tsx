import Link from 'next/link'

const channels = [
  { name: 'Instagram', icon: '📸', desc: 'Auto-reply DMs, comments & story mentions' },
  { name: 'WhatsApp', icon: '💬', desc: 'Broadcast campaigns & lead capture flows' },
  { name: 'Facebook', icon: '📘', desc: 'Comment automation & click-to-chat ads' },
  { name: 'TikTok', icon: '🎵', desc: 'Keyword DM triggers & audience growth' },
  { name: 'Telegram', icon: '✈️', desc: 'Bot flows, channels & mass broadcasts' },
  { name: 'SMS', icon: '📱', desc: 'Text campaigns with delivery tracking' },
  { name: 'Email', icon: '📧', desc: 'Drip sequences & newsletter automation' },
]

const features = [
  {
    icon: '🔀',
    title: 'Visual Flow Builder',
    desc: 'Drag & drop your entire automation visually. Connect triggers, messages, conditions and actions — no code ever.',
    highlight: '60+ ready templates',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Replies',
    desc: 'Train AI on your business tone. It handles DMs, FAQs, and comments automatically 24/7.',
    highlight: 'Included on Pro+',
  },
  {
    icon: '📣',
    title: 'Broadcast Campaigns',
    desc: 'Reach your entire audience at once with personalized messages. Schedule, segment, and track results.',
    highlight: 'Unlimited on all plans',
  },
  {
    icon: '🏪',
    title: 'Built-in Store',
    desc: 'Manage your products inside FlowChat. Set trigger words so your chatbot auto-sends product info. Export to Excel anytime.',
    highlight: 'Excel export + triggers',
  },
  {
    icon: '📥',
    title: 'Unified Inbox',
    desc: 'Every conversation from every channel in one place. Assign to team members, label, snooze or resolve.',
    highlight: 'All channels in one view',
  },
  {
    icon: '📊',
    title: 'Analytics & Insights',
    desc: 'See open rates, click rates, flow completions and subscriber growth across every channel in real time.',
    highlight: 'Live dashboard',
  },
]

const pricing = [
  {
    name: 'Free',
    price: 0,
    period: '',
    desc: 'Perfect for getting started',
    contacts: '1,000 contacts',
    cta: 'Start Free',
    href: '/signup',
    featured: false,
    features: [
      '3 channels (Instagram, FB, TikTok)',
      '3 keyword triggers',
      'Basic flow builder',
      '10 contact tags',
      '1 Inbox seat',
      'Community support',
    ],
  },
  {
    name: 'Starter',
    price: 7,
    period: '/mo',
    desc: 'For growing businesses',
    contacts: '500 active contacts',
    cta: 'Start 14-Day Trial',
    href: '/signup?plan=starter',
    featured: false,
    features: [
      'Any 3 channels',
      'Unlimited flows & triggers',
      'Lead capture & tags',
      'Audience segmentation',
      '1 Inbox seat',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    price: 19,
    period: '/mo',
    desc: 'Most popular for creators',
    contacts: '1,000 active contacts',
    cta: 'Start 14-Day Trial',
    href: '/signup?plan=pro',
    featured: true,
    features: [
      'Any 3 channels',
      'Broadcasts & campaigns',
      'AI-powered conversations',
      'Built-in Store + Excel export',
      '2 Inbox seats',
      'Priority email support',
    ],
  },
  {
    name: 'Business',
    price: 39,
    period: '/mo',
    desc: 'For agencies & teams',
    contacts: '2,500 active contacts',
    cta: 'Start 14-Day Trial',
    href: '/signup?plan=business',
    featured: false,
    features: [
      'All channels',
      'Everything in Pro',
      'Custom labels & rules',
      'Team collaboration',
      '3 Inbox seats',
      'Priority support + SLA',
    ],
  },
]

const testimonials = [
  { name: 'Aisha R.', biz: 'Fashion Boutique', quote: 'We tripled our leads in 2 weeks using the Instagram comment automation. FlowChat is insane value.', stars: 5 },
  { name: 'Marcus T.', biz: 'Fitness Coach', quote: 'I set up a WhatsApp flow for new enquiries and now my calendar books itself. Saved me 10 hours a week.', stars: 5 },
  { name: 'Sofia K.', biz: 'Digital Agency', quote: 'Managing 12 client accounts in one dashboard was a game changer. The team inbox is 🔥', stars: 5 },
]

const faqs = [
  { q: 'What is an Active Contact?', a: 'An Active Contact is anyone you send a message to or who messages you within a billing month. Each person counts once per month, no matter how many times you interact.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel any time from your settings. You\'ll keep access until the end of your billing period, then drop to the free tier.' },
  { q: 'Does FlowChat work with WhatsApp?', a: 'Yes! FlowChat supports WhatsApp via the official WhatsApp Business API. Note that WhatsApp charges per message separately (Meta\'s fees, not ours).' },
  { q: 'Is there a free trial?', a: 'Yes — 14 days free on Starter, Pro, and Business plans. No credit card required.' },
  { q: 'What\'s the Excel export feature?', a: 'On Pro+ plans, you can manage your product catalog inside FlowChat and export it to Excel in one click. Your chatbot can also auto-send product info when a customer types your trigger word.' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-sm">FC</div>
            <span className="font-bold text-xl text-slate-800">FlowChat</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600 font-medium">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#channels" className="hover:text-indigo-600 transition-colors">Channels</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Log in</Link>
            <Link href="/signup" className="text-sm font-semibold px-4 py-2 rounded-lg gradient-bg text-white hover:opacity-90 transition-opacity">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-24 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-4 py-1.5 text-sm text-indigo-700 font-medium mb-8">
            🚀 New: AI-powered DM replies — now on Pro & Business
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
            Turn Comments<br />
            into <span className="gradient-text">Customers.</span><br />
            Automatically.
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Build powerful chat automation for Instagram, WhatsApp, Facebook, TikTok, and 3 more channels — no code, no stress, starting free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 rounded-xl gradient-bg text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-indigo-200">
              Start Free — No Card Needed
            </Link>
            <a href="#features" className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-slate-200 bg-white text-slate-700 font-bold text-lg hover:border-indigo-300 transition-all">
              See How It Works →
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-500 flex-wrap">
            <span>✅ Free forever plan</span>
            <span>✅ 14-day Pro trial</span>
            <span>✅ Cancel anytime</span>
            <span>✅ No credit card required</span>
          </div>
        </div>

        {/* MOCK DASHBOARD PREVIEW */}
        <div className="relative max-w-5xl mx-auto mt-16">
          <div className="bg-white rounded-2xl shadow-2xl shadow-indigo-100 border border-slate-200 overflow-hidden">
            {/* Browser bar */}
            <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white rounded-md text-xs text-slate-400 px-3 py-1.5 mx-4">app.flowchat.io/dashboard</div>
            </div>
            {/* Dashboard preview */}
            <div className="flex h-80">
              {/* Sidebar */}
              <div className="w-16 bg-slate-900 flex flex-col items-center py-4 gap-4">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold">FC</div>
                {['🏠','🤖','📣','👥','📥','📊','🏪','⚙️'].map((icon, i) => (
                  <div key={i} className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm cursor-pointer ${i === 0 ? 'bg-indigo-600' : 'hover:bg-slate-700'}`}>{icon}</div>
                ))}
              </div>
              {/* Main area */}
              <div className="flex-1 p-6 bg-slate-50">
                <div className="mb-4">
                  <h3 className="font-bold text-slate-800 text-lg">Good morning! 👋</h3>
                  <p className="text-sm text-slate-500">Here's your FlowChat overview</p>
                </div>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Total Contacts', value: '2,841', color: 'text-indigo-600' },
                    { label: 'Active Flows', value: '12', color: 'text-cyan-600' },
                    { label: 'Messages Sent', value: '18,432', color: 'text-green-600' },
                    { label: 'This Month', value: '+341', color: 'text-amber-600' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">{s.label}</p>
                      <p className={`font-bold text-lg ${s.color}`}>{s.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-3 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 mb-2">Recent Flows</p>
                    {['Welcome DM','Comment Trigger','FAQ Bot'].map((f, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                        <span className="text-xs text-slate-700">{f}</span>
                        <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full font-medium">Active</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 mb-2">Live Inbox</p>
                    {['@user_sarah • Hey, is this...','@marcus_t • I want to order','@shop_kenya • What sizes?'].map((m, i) => (
                      <div key={i} className="flex items-center gap-2 py-1.5 border-b border-slate-50 last:border-0">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex-shrink-0" />
                        <span className="text-xs text-slate-600 truncate">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section className="py-10 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500 font-medium">
          <span className="font-bold text-slate-700">Trusted by businesses worldwide</span>
          <span>⭐⭐⭐⭐⭐ 4.8/5 rating</span>
          <span>🚀 1M+ automations built</span>
          <span>📬 500M+ messages sent</span>
          <span>🌍 150+ countries</span>
        </div>
      </section>

      {/* CHANNELS */}
      <section id="channels" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-600 font-semibold mb-3 tracking-wide uppercase text-sm">Omnichannel</p>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">One platform. Every channel.</h2>
            <p className="text-xl text-slate-500">Connect where your customers already are.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {channels.map((ch) => (
              <div key={ch.name} className="bg-white rounded-2xl p-4 text-center border border-slate-100 card-hover cursor-default">
                <div className="text-3xl mb-2">{ch.icon}</div>
                <div className="font-bold text-slate-800 text-sm mb-1">{ch.name}</div>
                <div className="text-xs text-slate-400 leading-tight">{ch.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-600 font-semibold mb-3 tracking-wide uppercase text-sm">Everything You Need</p>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Built to grow your business on autopilot</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Everything ManyChat does — at a fraction of the price.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 card-hover">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">{f.desc}</p>
                <span className="inline-flex items-center text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  ✓ {f.highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORE HIGHLIGHT */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-50 to-cyan-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-indigo-600 font-semibold mb-3 tracking-wide uppercase text-sm">New Feature</p>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
              Your store, your chatbot,<br />
              <span className="gradient-text">perfectly in sync.</span>
            </h2>
            <p className="text-slate-500 mb-8 text-lg leading-relaxed">
              Add your products inside FlowChat. Set a trigger word like <strong>"INFO"</strong> or <strong>"PRICE"</strong> — and your bot automatically sends product details, pricing, and images when customers type it in any channel.
            </p>
            <ul className="space-y-3 text-slate-700">
              {[
                'Manage your entire product catalog in FlowChat',
                'Set trigger words per product (e.g. "BUY", "INFO", "SHOES")',
                'Bot auto-sends product card when triggered',
                'Export full product list to Excel in one click',
                'Track stock, prices, categories all in one place',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="inline-block mt-8 px-6 py-3 rounded-xl gradient-bg text-white font-bold hover:opacity-90 transition-opacity">
              Set Up Your Store Free →
            </Link>
          </div>
          {/* Store preview card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
              <span className="text-white font-semibold text-sm">🏪 FlowChat Store — Products</span>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <input className="text-sm border border-slate-200 rounded-lg px-3 py-2 w-48 text-slate-400" placeholder="Search products..." readOnly />
                <button className="text-sm px-3 py-2 rounded-lg gradient-bg text-white font-medium">+ Add Product</button>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400">
                    <th className="text-left py-2 font-medium">Product</th>
                    <th className="text-left py-2 font-medium">Price</th>
                    <th className="text-left py-2 font-medium">Trigger</th>
                    <th className="text-left py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Blue Sneakers', price: '$49.99', trigger: 'SHOES', active: true },
                    { name: 'Summer Dress', price: '$35.00', trigger: 'DRESS', active: true },
                    { name: 'Leather Bag', price: '$89.00', trigger: 'BAG', active: false },
                    { name: 'Gold Earrings', price: '$22.00', trigger: 'JEWEL', active: true },
                  ].map((p, i) => (
                    <tr key={i} className="border-b border-slate-50">
                      <td className="py-2 font-medium text-slate-700">{p.name}</td>
                      <td className="py-2 text-slate-600">{p.price}</td>
                      <td className="py-2"><span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-mono">{p.trigger}</span></td>
                      <td className="py-2"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.active ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>{p.active ? 'Active' : 'Draft'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="mt-4 w-full text-sm py-2 border-2 border-dashed border-indigo-200 text-indigo-500 rounded-lg hover:bg-indigo-50 transition-colors font-medium">
                📥 Export to Excel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-600 font-semibold mb-3 tracking-wide uppercase text-sm">Transparent Pricing</p>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Half the price. All the power.</h2>
            <p className="text-xl text-slate-500">ManyChat charges $15/mo to start. We start at <strong className="text-indigo-600">$7/mo</strong>.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricing.map((plan) => (
              <div key={plan.name} className={`rounded-2xl p-6 border-2 relative ${plan.featured ? 'border-indigo-500 bg-indigo-50 shadow-xl shadow-indigo-100' : 'border-slate-200 bg-white'}`}>
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="font-bold text-slate-800 text-lg">{plan.name}</h3>
                  <p className="text-slate-500 text-sm mt-1">{plan.desc}</p>
                </div>
                <div className="mb-2">
                  <span className="text-4xl font-extrabold text-slate-900">${plan.price}</span>
                  <span className="text-slate-400 font-medium">{plan.period}</span>
                </div>
                <p className="text-xs text-indigo-600 font-semibold mb-6">{plan.contacts}</p>
                <Link href={plan.href} className={`block w-full text-center py-3 rounded-xl font-bold text-sm transition-all mb-6 ${plan.featured ? 'gradient-bg text-white hover:opacity-90' : 'border-2 border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600'}`}>
                  {plan.cta}
                </Link>
                <ul className="space-y-2">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-8">
            * WhatsApp & SMS billed per message (Meta / carrier fees). All other features unlimited on paid plans.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Real businesses. Real results.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-slate-100 card-hover">
                <div className="text-amber-400 text-lg mb-3">{'⭐'.repeat(t.stars)}</div>
                <p className="text-slate-700 mb-4 text-sm leading-relaxed">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.biz}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-2">{faq.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 gradient-bg">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-5xl font-extrabold mb-6">Ready to automate your growth?</h2>
          <p className="text-xl text-indigo-100 mb-10">Join thousands of businesses automating their conversations with FlowChat. Start free, no card needed.</p>
          <Link href="/signup" className="inline-block px-10 py-4 bg-white text-indigo-700 font-extrabold text-lg rounded-xl hover:bg-indigo-50 transition-colors shadow-xl">
            Start Free Today →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-sm">FC</div>
              <span className="font-bold text-xl text-white">FlowChat</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">Automate conversations. Grow your audience. The affordable chat marketing platform for every business.</p>
            <div className="flex gap-3">
              {['𝕏', 'in', '▶', '📸'].map((s, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors text-xs">{s}</a>
              ))}
            </div>
          </div>
          {[
            { title: 'Product', links: ['Features', 'Channels', 'Pricing', 'Templates', 'Changelog'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-white mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm hover:text-indigo-400 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2025 FlowChat. All rights reserved.</p>
          <p>Made with ❤️ for creators & businesses everywhere</p>
        </div>
      </footer>
    </div>
  )
}
