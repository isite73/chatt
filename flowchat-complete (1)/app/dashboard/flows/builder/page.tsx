'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'

const NODE_TYPES = [
  { type:'trigger', label:'Trigger', icon:'⚡', color:'bg-amber-50 border-amber-200 text-amber-700' },
  { type:'message', label:'Message', icon:'💬', color:'bg-indigo-50 border-indigo-200 text-indigo-700' },
  { type:'condition', label:'Condition', icon:'🔀', color:'bg-purple-50 border-purple-200 text-purple-700' },
  { type:'action', label:'Action', icon:'🎯', color:'bg-green-50 border-green-200 text-green-700' },
  { type:'delay', label:'Delay', icon:'⏱️', color:'bg-slate-50 border-slate-200 text-slate-700' },
  { type:'ai', label:'AI Reply', icon:'🤖', color:'bg-pink-50 border-pink-200 text-pink-700' },
]

const STARTER_NODES = [
  { id:'1', type:'trigger', label:'Trigger', x:120, y:200, content:'Keyword: INFO', icon:'⚡', color:'border-amber-300 bg-amber-50' },
  { id:'2', type:'message', label:'Message', x:350, y:120, content:'Hi {{first_name}}! 👋 Thanks for reaching out. Here\'s what you\'re looking for...', icon:'💬', color:'border-indigo-300 bg-indigo-50' },
  { id:'3', type:'message', label:'Message', x:350, y:280, content:'Check out our latest products! Reply SHOP to see the catalog.', icon:'💬', color:'border-indigo-300 bg-indigo-50' },
  { id:'4', type:'condition', label:'Condition', x:600, y:200, content:'Did they reply?', icon:'🔀', color:'border-purple-300 bg-purple-50' },
  { id:'5', type:'action', label:'Action', x:820, y:130, content:'Add tag: hot-lead', icon:'🎯', color:'border-green-300 bg-green-50' },
  { id:'6', type:'action', label:'Action', x:820, y:270, content:'Start: Re-engagement Flow', icon:'🎯', color:'border-green-300 bg-green-50' },
]

const EDGES = [
  { from:'1', to:'2', label:'' },
  { from:'1', to:'3', label:'' },
  { from:'2', to:'4', label:'' },
  { from:'3', to:'4', label:'' },
  { from:'4', to:'5', label:'Yes' },
  { from:'4', to:'6', label:'No' },
]

export default function FlowBuilderPage() {
  const [nodes, setNodes] = useState(STARTER_NODES)
  const [selected, setSelected] = useState<string|null>('2')
  const [flowName, setFlowName] = useState('My New Flow')
  const [published, setPublished] = useState(false)
  const [dragging, setDragging] = useState<{id:string,ox:number,oy:number}|null>(null)

  const selectedNode = nodes.find(n => n.id === selected)

  const addNode = (type: typeof NODE_TYPES[0]) => {
    const newNode = {
      id: Date.now().toString(),
      type: type.type,
      label: type.label,
      x: 200 + Math.random() * 200,
      y: 150 + Math.random() * 200,
      content: `New ${type.label}`,
      icon: type.icon,
      color: `border-slate-300 bg-slate-50`,
    }
    setNodes([...nodes, newNode])
    setSelected(newNode.id)
  }

  const updateContent = (id: string, content: string) => {
    setNodes(nodes.map(n => n.id === id ? {...n, content} : n))
  }

  const deleteNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id))
    if (selected === id) setSelected(null)
  }

  return (
    <div className="flex flex-col h-full bg-slate-100">
      {/* Builder Topbar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/flows" className="text-slate-400 hover:text-slate-600 transition-colors">
            ← Back
          </Link>
          <div className="w-px h-5 bg-slate-200" />
          <input value={flowName} onChange={e => setFlowName(e.target.value)}
            className="font-bold text-slate-800 text-base border-none outline-none bg-transparent focus:ring-0 min-w-0 w-48" />
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50">↩ Undo</button>
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50">Test Flow</button>
          <button onClick={() => setPublished(!published)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${published ? 'bg-green-500 text-white' : 'gradient-bg text-white'} hover:opacity-90`}>
            {published ? '● Published' : 'Publish Flow'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar: node palette */}
        <div className="w-52 bg-white border-r border-slate-200 p-4 flex-shrink-0 overflow-y-auto">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Add Blocks</p>
          <div className="space-y-2">
            {NODE_TYPES.map(nt => (
              <button key={nt.type} onClick={() => addNode(nt)}
                className={`w-full flex items-center gap-2 p-3 rounded-xl border-2 ${nt.color} font-semibold text-sm hover:scale-105 transition-transform text-left`}>
                <span className="text-lg">{nt.icon}</span>
                {nt.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Templates</p>
            <div className="space-y-1.5">
              {['Welcome DM','FAQ Bot','Product Info','Lead Capture'].map(t => (
                <button key={t} className="w-full text-left text-xs text-indigo-600 hover:text-indigo-800 px-2 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors font-medium">
                  📋 {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden" style={{backgroundImage:'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', backgroundSize:'24px 24px'}}>
          {/* SVG edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex:1}}>
            {EDGES.map((e, i) => {
              const fromN = nodes.find(n => n.id === e.from)
              const toN = nodes.find(n => n.id === e.to)
              if (!fromN || !toN) return null
              const x1 = fromN.x + 80, y1 = fromN.y + 30
              const x2 = toN.x, y2 = toN.y + 30
              const mx = (x1 + x2) / 2
              return (
                <g key={i}>
                  <path d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`}
                    fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#arrow)" />
                  {e.label && (
                    <text x={mx} y={(y1+y2)/2 - 6} textAnchor="middle" fill="#6366f1" fontSize="10" fontWeight="bold">{e.label}</text>
                  )}
                </g>
              )
            })}
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#6366f1" />
              </marker>
            </defs>
          </svg>

          {/* Nodes */}
          {nodes.map(node => (
            <div key={node.id}
              style={{position:'absolute', left: node.x, top: node.y, zIndex:2, cursor:'move'}}
              onClick={() => setSelected(node.id)}>
              <div className={`rounded-xl border-2 shadow-sm w-40 transition-all ${node.color} ${selected===node.id ? 'ring-2 ring-indigo-500 ring-offset-1 shadow-lg' : 'hover:shadow-md'}`}>
                <div className="px-3 py-2 flex items-center gap-2 border-b border-current/10">
                  <span className="text-sm">{node.icon}</span>
                  <span className="text-xs font-bold uppercase tracking-wide opacity-70">{node.label}</span>
                  <button onClick={(e) => { e.stopPropagation(); deleteNode(node.id) }}
                    className="ml-auto text-xs opacity-0 hover:opacity-100 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity">✕</button>
                </div>
                <div className="px-3 py-2">
                  <p className="text-xs text-slate-700 leading-tight line-clamp-2">{node.content}</p>
                </div>
                {/* Connection dots */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-indigo-500 border-2 border-white shadow cursor-crosshair" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-300 border-2 border-white shadow" />
              </div>
            </div>
          ))}

          {/* Zoom controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-1 bg-white rounded-xl shadow border border-slate-200 p-1">
            <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-600 font-bold text-lg">+</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-600 font-bold text-lg">−</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-500 text-xs">⊡</button>
          </div>
        </div>

        {/* Right sidebar: node editor */}
        {selectedNode && (
          <div className="w-64 bg-white border-l border-slate-200 p-4 flex-shrink-0 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedNode.icon}</span>
                <p className="font-bold text-slate-800 text-sm">{selectedNode.label} Settings</p>
              </div>
              <button onClick={() => deleteNode(selectedNode.id)}
                className="text-xs text-red-400 hover:text-red-600 transition-colors">Delete</button>
            </div>

            {selectedNode.type === 'trigger' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Trigger Type</label>
                  <select className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400">
                    <option>Keyword</option><option>New Follower</option><option>Comment</option>
                    <option>Story Mention</option><option>Schedule</option><option>Webhook</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Keyword</label>
                  <input defaultValue="INFO" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 font-mono" />
                </div>
              </div>
            )}

            {selectedNode.type === 'message' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Message Text</label>
                  <textarea value={selectedNode.content} onChange={e => updateContent(selectedNode.id, e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 resize-none h-28" />
                  <p className="text-xs text-slate-400 mt-1">Use {'{{first_name}}'} to personalize</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Message Type</label>
                  <select className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400">
                    <option>Text</option><option>Image + Text</option><option>Button</option><option>Product Card</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Add Button</label>
                  <button className="w-full py-2 border-2 border-dashed border-indigo-200 text-indigo-500 text-xs rounded-xl hover:bg-indigo-50 transition-colors font-medium">
                    + Add Quick Reply Button
                  </button>
                </div>
              </div>
            )}

            {selectedNode.type === 'condition' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Condition Type</label>
                  <select className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400">
                    <option>Contact has tag</option><option>Message contains</option>
                    <option>Field value</option><option>Random split</option>
                  </select>
                </div>
              </div>
            )}

            {selectedNode.type === 'action' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Action Type</label>
                  <select className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400">
                    <option>Add Tag</option><option>Remove Tag</option>
                    <option>Set Custom Field</option><option>Subscribe to Flow</option>
                    <option>Send Email</option><option>Webhook</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Tag Name</label>
                  <input defaultValue="hot-lead" className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-400" />
                </div>
              </div>
            )}

            {selectedNode.type === 'delay' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Wait Duration</label>
                  <div className="flex gap-2">
                    <input type="number" defaultValue="1" className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-400" />
                    <select className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none">
                      <option>Minutes</option><option>Hours</option><option>Days</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {selectedNode.type === 'ai' && (
              <div className="space-y-3">
                <div className="bg-pink-50 border border-pink-200 rounded-xl p-3">
                  <p className="text-xs text-pink-700 font-semibold">🤖 AI will generate a contextual reply based on your knowledge base and the conversation history.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">AI Tone</label>
                  <select className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-400">
                    <option>Friendly & Professional</option><option>Formal</option><option>Casual</option>
                  </select>
                </div>
              </div>
            )}

            <div className="mt-5 pt-4 border-t border-slate-100">
              <button className="w-full py-2.5 rounded-xl gradient-bg text-white font-bold text-sm hover:opacity-90 transition-opacity">
                Save Block
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
