import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export type Plan = 'free' | 'starter' | 'pro' | 'business'
export type Platform = 'instagram' | 'whatsapp' | 'facebook' | 'tiktok' | 'telegram' | 'sms' | 'email'
export type FlowStatus = 'draft' | 'active' | 'paused' | 'archived'

export interface Workspace {
  id: string
  name: string
  slug: string
  owner_id: string
  plan: Plan
  plan_expires_at?: string
  active_contacts_count: number
  created_at: string
}

export interface Profile {
  id: string
  full_name: string
  avatar_url?: string
  email: string
  current_workspace_id?: string
}

export interface Contact {
  id: string
  workspace_id: string
  external_id?: string
  platform?: Platform
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  avatar_url?: string
  tags: string[]
  custom_fields: Record<string, any>
  is_subscribed: boolean
  last_active_at?: string
  created_at: string
}

export interface Flow {
  id: string
  workspace_id: string
  name: string
  description?: string
  status: FlowStatus
  trigger_type?: string
  trigger_config: Record<string, any>
  nodes: any[]
  edges: any[]
  channel_id?: string
  stats: { sent: number; opened: number; clicked: number; completed: number }
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  store_id: string
  workspace_id: string
  name: string
  description?: string
  sku?: string
  price?: number
  compare_price?: number
  currency: string
  category?: string
  stock_qty: number
  track_inventory: boolean
  image_url?: string
  images: string[]
  is_active: boolean
  tags: string[]
  trigger_word?: string
  flow_id?: string
  created_at: string
  updated_at: string
}

export interface Store {
  id: string
  workspace_id: string
  name: string
  description?: string
  currency: string
  logo_url?: string
  created_at: string
}

export interface Broadcast {
  id: string
  workspace_id: string
  name: string
  platform?: Platform
  content: Record<string, any>
  audience_filter: Record<string, any>
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed'
  scheduled_at?: string
  sent_at?: string
  stats: { total: number; delivered: number; opened: number; clicked: number; failed: number }
  created_at: string
}

export interface Conversation {
  id: string
  workspace_id: string
  contact_id: string
  channel_id?: string
  platform?: Platform
  status: 'open' | 'resolved' | 'snoozed'
  assigned_to?: string
  label?: string
  is_favorited: boolean
  last_message_at: string
  contacts?: Contact
}

export interface Message {
  id: string
  conversation_id: string
  direction: 'inbound' | 'outbound'
  content?: string
  message_type: string
  media_url?: string
  is_read: boolean
  sent_at: string
}
