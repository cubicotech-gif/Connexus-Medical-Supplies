'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Mail, Phone, Clock, User, ChevronDown, ChevronUp,
  Inbox, Archive, CheckCircle, MessageSquare, ArrowLeft,
  Loader2, AlertCircle,
} from 'lucide-react'
import Link from 'next/link'

type Submission = {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: string
  created_at: string
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  read: 'bg-yellow-100 text-yellow-700',
  replied: 'bg-green-100 text-green-700',
  archived: 'bg-gray-100 text-gray-500',
}

const statusIcons: Record<string, React.ElementType> = {
  new: Inbox,
  read: Mail,
  replied: CheckCircle,
  archived: Archive,
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'connexus2025'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('admin_auth')
      if (saved === 'true') setAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (authenticated) loadSubmissions()
  }, [authenticated])

  const loadSubmissions = async () => {
    if (!supabase) return
    setLoading(true)

    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setSubmissions(data)
    }
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    if (!supabase) return

    await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id)

    setSubmissions(prev =>
      prev.map(s => s.id === id ? { ...s, status } : s)
    )
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASS) {
      setAuthenticated(true)
      sessionStorage.setItem('admin_auth', 'true')
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen pt-28 pb-20 diagonal-gradient flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-2xl font-bold text-navy text-center mb-6">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter admin password"
                autoFocus
              />
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const filtered = filter === 'all' ? submissions : submissions.filter(s => s.status === filter)
  const counts = {
    all: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    read: submissions.filter(s => s.status === 'read').length,
    replied: submissions.filter(s => s.status === 'replied').length,
    archived: submissions.filter(s => s.status === 'archived').length,
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin" className="text-primary text-sm font-medium flex items-center gap-1 mb-2 hover:underline">
              <ArrowLeft className="h-4 w-4" /> Back to Image Manager
            </Link>
            <h1 className="text-3xl font-bold text-navy">Contact Submissions</h1>
            <p className="text-gray-600 mt-1">
              {counts.new > 0 ? `${counts.new} new message${counts.new > 1 ? 's' : ''}` : 'No new messages'}
            </p>
          </div>
          <button onClick={loadSubmissions} className="text-sm bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-navy font-medium">
            Refresh
          </button>
        </div>

        {/* Supabase not connected */}
        {!supabase && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-navy">Supabase Not Connected</h3>
              <p className="text-gray-600 text-sm mt-1">
                Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables to see submissions.
              </p>
            </div>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', 'new', 'read', 'replied', 'archived'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === status
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <span className="ml-1.5 opacity-70">({counts[status]})</span>
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading submissions...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No submissions found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((sub) => {
              const isExpanded = expandedId === sub.id
              const StatusIcon = statusIcons[sub.status] || Inbox

              return (
                <div
                  key={sub.id}
                  className={`bg-white rounded-xl border transition ${
                    sub.status === 'new' ? 'border-primary/30 shadow-sm' : 'border-gray-200'
                  }`}
                >
                  {/* Header row */}
                  <button
                    onClick={() => {
                      setExpandedId(isExpanded ? null : sub.id)
                      if (sub.status === 'new') updateStatus(sub.id, 'read')
                    }}
                    className="w-full p-5 flex items-center gap-4 text-left"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${statusColors[sub.status]}`}>
                      <StatusIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-navy truncate">{sub.name}</span>
                        {sub.status === 'new' && (
                          <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full font-bold">NEW</span>
                        )}
                      </div>
                      <div className="text-gray-500 text-sm truncate">{sub.subject} — {sub.message.slice(0, 80)}...</div>
                    </div>
                    <div className="text-gray-400 text-xs whitespace-nowrap">
                      {new Date(sub.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    {isExpanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                      <div className="grid sm:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">{sub.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <a href={`mailto:${sub.email}`} className="text-primary hover:underline">{sub.email}</a>
                        </div>
                        {sub.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <a href={`tel:${sub.phone}`} className="text-primary hover:underline">{sub.phone}</a>
                          </div>
                        )}
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="text-xs font-medium text-gray-400 uppercase mb-2">Message</div>
                        <p className="text-gray-700 whitespace-pre-wrap">{sub.message}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-400">Set status:</span>
                        {['new', 'read', 'replied', 'archived'].map(s => (
                          <button
                            key={s}
                            onClick={() => updateStatus(sub.id, s)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                              sub.status === s ? statusColors[s] : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
