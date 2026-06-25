-- ============================================================
-- FLOWCHAT DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS / WORKSPACES
-- ============================================================

CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free','starter','pro','business')),
  plan_expires_at TIMESTAMPTZ,
  active_contacts_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE workspace_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'agent' CHECK (role IN ('owner','admin','agent','viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workspace_id, user_id)
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  email TEXT,
  current_workspace_id UUID REFERENCES workspaces(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CHANNELS
-- ============================================================

CREATE TABLE channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('instagram','whatsapp','facebook','tiktok','telegram','sms','email')),
  name TEXT NOT NULL,
  platform_id TEXT,            -- e.g. instagram page id
  access_token TEXT,           -- encrypted OAuth token
  is_connected BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CONTACTS / CRM
-- ============================================================

CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  external_id TEXT,            -- platform user ID
  platform TEXT,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  tags TEXT[] DEFAULT '{}',
  custom_fields JSONB DEFAULT '{}',
  is_subscribed BOOLEAN DEFAULT true,
  last_active_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contacts_workspace ON contacts(workspace_id);
CREATE INDEX idx_contacts_tags ON contacts USING GIN(tags);

-- ============================================================
-- FLOWS (AUTOMATION BUILDER)
-- ============================================================

CREATE TABLE flows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Untitled Flow',
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','active','paused','archived')),
  trigger_type TEXT,           -- keyword, comment, story_mention, schedule, webhook, manual
  trigger_config JSONB DEFAULT '{}',
  nodes JSONB DEFAULT '[]',    -- React Flow nodes array
  edges JSONB DEFAULT '[]',    -- React Flow edges array
  channel_id UUID REFERENCES channels(id),
  template_id UUID,
  stats JSONB DEFAULT '{"sent":0,"opened":0,"clicked":0,"completed":0}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_flows_workspace ON flows(workspace_id);
CREATE INDEX idx_flows_status ON flows(status);

-- ============================================================
-- MESSAGES / CONVERSATIONS
-- ============================================================

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  channel_id UUID REFERENCES channels(id),
  platform TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open','resolved','snoozed')),
  assigned_to UUID REFERENCES auth.users(id),
  label TEXT,
  is_favorited BOOLEAN DEFAULT false,
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conversations_workspace ON conversations(workspace_id);
CREATE INDEX idx_conversations_contact ON conversations(contact_id);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  direction TEXT NOT NULL CHECK (direction IN ('inbound','outbound')),
  content TEXT,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text','image','video','audio','file','template','carousel')),
  media_url TEXT,
  metadata JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id);

-- ============================================================
-- BROADCASTS
-- ============================================================

CREATE TABLE broadcasts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  channel_id UUID REFERENCES channels(id),
  platform TEXT,
  content JSONB DEFAULT '{}',  -- message blocks
  audience_filter JSONB DEFAULT '{}', -- tag/segment filters
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','scheduled','sending','sent','failed')),
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  stats JSONB DEFAULT '{"total":0,"delivered":0,"opened":0,"clicked":0,"failed":0}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- GROWTH TOOLS
-- ============================================================

CREATE TABLE growth_tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('comment_trigger','story_mention','ref_url','qr_code','keyword','widget')),
  name TEXT NOT NULL,
  config JSONB DEFAULT '{}',
  flow_id UUID REFERENCES flows(id),
  channel_id UUID REFERENCES channels(id),
  is_active BOOLEAN DEFAULT true,
  trigger_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- STORE / PRODUCTS (with Excel export capability)
-- ============================================================

CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  currency TEXT DEFAULT 'USD',
  logo_url TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  sku TEXT,
  price DECIMAL(10,2),
  compare_price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  category TEXT,
  stock_qty INT DEFAULT 0,
  track_inventory BOOLEAN DEFAULT false,
  image_url TEXT,
  images TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  -- automation trigger word
  trigger_word TEXT,           -- e.g. "INFO" → bot sends product details
  flow_id UUID REFERENCES flows(id), -- flow triggered by keyword
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_store ON products(store_id);
CREATE INDEX idx_products_workspace ON products(workspace_id);
CREATE INDEX idx_products_trigger ON products(trigger_word);

CREATE TABLE product_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  store_id UUID REFERENCES stores(id),
  contact_id UUID REFERENCES contacts(id),
  product_id UUID REFERENCES products(id),
  quantity INT DEFAULT 1,
  unit_price DECIMAL(10,2),
  total_price DECIMAL(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ANALYTICS EVENTS
-- ============================================================

CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- flow_sent, flow_opened, flow_clicked, contact_added, broadcast_sent etc.
  flow_id UUID REFERENCES flows(id),
  contact_id UUID REFERENCES contacts(id),
  broadcast_id UUID REFERENCES broadcasts(id),
  metadata JSONB DEFAULT '{}',
  occurred_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_workspace ON analytics_events(workspace_id);
CREATE INDEX idx_events_type ON analytics_events(event_type);
CREATE INDEX idx_events_occurred ON analytics_events(occurred_at);

-- ============================================================
-- TEMPLATES
-- ============================================================

CREATE TABLE flow_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT, -- lead_gen, ecommerce, faq, appointment, reengagement
  thumbnail_url TEXT,
  nodes JSONB DEFAULT '[]',
  edges JSONB DEFAULT '[]',
  channels TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE broadcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Workspaces: owner or member can access
CREATE POLICY "workspace_access" ON workspaces
  FOR ALL USING (
    owner_id = auth.uid() OR
    id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  );

-- Profiles: own profile only
CREATE POLICY "profile_own" ON profiles
  FOR ALL USING (id = auth.uid());

-- All workspace-scoped tables: member access
CREATE POLICY "channels_workspace" ON channels FOR ALL USING (
  workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  OR workspace_id IN (SELECT id FROM workspaces WHERE owner_id = auth.uid())
);
CREATE POLICY "contacts_workspace" ON contacts FOR ALL USING (
  workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  OR workspace_id IN (SELECT id FROM workspaces WHERE owner_id = auth.uid())
);
CREATE POLICY "flows_workspace" ON flows FOR ALL USING (
  workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  OR workspace_id IN (SELECT id FROM workspaces WHERE owner_id = auth.uid())
);
CREATE POLICY "conversations_workspace" ON conversations FOR ALL USING (
  workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  OR workspace_id IN (SELECT id FROM workspaces WHERE owner_id = auth.uid())
);
CREATE POLICY "messages_workspace" ON messages FOR ALL USING (
  workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  OR workspace_id IN (SELECT id FROM workspaces WHERE owner_id = auth.uid())
);
CREATE POLICY "broadcasts_workspace" ON broadcasts FOR ALL USING (
  workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  OR workspace_id IN (SELECT id FROM workspaces WHERE owner_id = auth.uid())
);
CREATE POLICY "stores_workspace" ON stores FOR ALL USING (
  workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  OR workspace_id IN (SELECT id FROM workspaces WHERE owner_id = auth.uid())
);
CREATE POLICY "products_workspace" ON products FOR ALL USING (
  workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  OR workspace_id IN (SELECT id FROM workspaces WHERE owner_id = auth.uid())
);
CREATE POLICY "orders_workspace" ON product_orders FOR ALL USING (
  workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  OR workspace_id IN (SELECT id FROM workspaces WHERE owner_id = auth.uid())
);
CREATE POLICY "analytics_workspace" ON analytics_events FOR ALL USING (
  workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  OR workspace_id IN (SELECT id FROM workspaces WHERE owner_id = auth.uid())
);
CREATE POLICY "growth_tools_workspace" ON growth_tools FOR ALL USING (
  workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid())
  OR workspace_id IN (SELECT id FROM workspaces WHERE owner_id = auth.uid())
);

-- Templates: public read
CREATE POLICY "templates_public_read" ON flow_templates FOR SELECT USING (is_public = true);

-- ============================================================
-- AUTO-CREATE PROFILE ON SIGNUP (Trigger)
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- AUTO-UPDATE updated_at (Trigger)
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_workspaces_updated BEFORE UPDATE ON workspaces FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_flows_updated BEFORE UPDATE ON flows FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_products_updated BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_broadcasts_updated BEFORE UPDATE ON broadcasts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_stores_updated BEFORE UPDATE ON stores FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SEED: Default Flow Templates
-- ============================================================

INSERT INTO flow_templates (name, description, category, channels, nodes, edges) VALUES
('Welcome DM', 'Greet new followers with a personalized message', 'lead_gen', ARRAY['instagram','facebook'], '[]', '[]'),
('Comment to DM', 'Auto-reply DM when someone comments a keyword on your post', 'lead_gen', ARRAY['instagram','facebook'], '[]', '[]'),
('FAQ Bot', 'Answer your top 5 most asked questions automatically', 'faq', ARRAY['instagram','whatsapp','facebook'], '[]', '[]'),
('Lead Capture', 'Collect name, email, and phone from interested prospects', 'lead_gen', ARRAY['instagram','whatsapp','facebook','telegram'], '[]', '[]'),
('Product Showcase', 'Send product info + link when triggered by keyword', 'ecommerce', ARRAY['instagram','whatsapp','facebook'], '[]', '[]'),
('Appointment Booking', 'Guide users to book a slot with your calendar link', 'appointment', ARRAY['instagram','whatsapp','facebook','telegram'], '[]', '[]'),
('Re-engagement', 'Win back inactive contacts with a special offer', 'reengagement', ARRAY['whatsapp','telegram','email','sms'], '[]', '[]'),
('Order Confirmation', 'Send automated order confirmation after purchase', 'ecommerce', ARRAY['whatsapp','sms','email'], '[]', '[]');
