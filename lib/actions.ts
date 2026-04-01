import { supabase } from './supabase'

export async function submitContactForm(data: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Database not configured' }
  }

  const { error } = await supabase
    .from('contact_submissions')
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject,
      message: data.message,
    })

  if (error) {
    console.error('Contact form error:', error)
    return { success: false, error: 'Failed to submit. Please try again.' }
  }

  return { success: true }
}

export async function submitQuoteRequest(data: {
  name: string
  email: string
  phone: string
  product_interest: string
  message: string
}): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Database not configured' }
  }

  const { error } = await supabase
    .from('quote_requests')
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      product_interest: data.product_interest,
      message: data.message || null,
    })

  if (error) {
    console.error('Quote request error:', error)
    return { success: false, error: 'Failed to submit. Please try again.' }
  }

  return { success: true }
}

export async function subscribeNewsletter(email: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Database not configured' }
  }

  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email })

  if (error) {
    if (error.code === '23505') {
      return { success: true } // Already subscribed, treat as success
    }
    console.error('Newsletter error:', error)
    return { success: false, error: 'Failed to subscribe. Please try again.' }
  }

  return { success: true }
}
