import { MessageSquare, Smartphone } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'

export const channels = [
  {
    id: 'webchat',
    label: 'Web Chat',
    icon: MessageSquare,
    statusLabel: 'Online',
    headerTitle: 'CogniDrift AI',
  },
  {
    id: 'sms',
    label: 'SMS',
    icon: Smartphone,
    statusLabel: 'SMS',
    headerTitle: 'CogniDrift AI',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: SiWhatsapp,
    statusLabel: 'WhatsApp',
    headerTitle: 'CogniDrift AI',
    showCheckMarks: true,
  },
]

export const conversations = {
  webchat: [
    { type: 'user', text: 'Hey, do you offer any plans for small businesses?' },
    { type: 'ai', text: 'Absolutely! Here\'s a quick look at our plans:' },
    { type: 'ai', text: '', richContent: { type: 'pricingCard', plans: [{ name: 'Starter', price: '$29/mo' }, { name: 'Pro', price: '$69/mo' }, { name: 'Enterprise', price: '$149/mo' }] } },
    { type: 'user', text: 'The Pro plan looks good. Can I book a demo?' },
    { type: 'ai', text: 'Of course! Pick a time that works:' },
    { type: 'ai', text: '', richContent: { type: 'appointmentButton', label: 'Book a Free Demo' } },
    { type: 'user', text: 'Done! Booked for Thursday' },
    { type: 'ai', text: 'See you Thursday! I\'ve sent a confirmation to your email.' },
  ],
  sms: [
    { type: 'ai', text: 'Hi Mike! We noticed you missed your 10am appointment today. Would you like to reschedule?' },
    { type: 'user', text: 'Yeah sorry, got held up. Are you still open today?' },
    { type: 'ai', text: 'No problem! We\'re open until 6pm today.' },
    { type: 'user', text: 'Can I come in at 3?' },
    { type: 'ai', text: '3pm works! I\'ve reserved a spot for you:' },
    { type: 'ai', text: '', richContent: { type: 'calendarCard', date: 'Today', time: '3:00 PM', status: 'Confirmed' } },
    { type: 'user', text: 'Perfect, see you then' },
    { type: 'ai', text: 'See you at 3! Text HELP anytime if plans change.' },
  ],
  whatsapp: [
    { type: 'user', text: 'Hi, I need an emergency plumbing repair' },
    { type: 'ai', text: 'I can help! What\'s the issue?' },
    { type: 'user', text: 'Leaking pipe under the kitchen sink' },
    { type: 'ai', text: 'Got it. We have a technician available today at 2pm. Sound good?' },
    { type: 'user', text: 'Yes please!' },
    { type: 'ai', text: 'Booked! Here\'s your appointment details:' },
    { type: 'ai', text: '', richContent: { type: 'confirmationCard', service: 'Plumbing Repair', date: 'Today', time: '2:00 PM', address: '123 Main St, Suite 4' } },
    { type: 'user', text: 'Thanks so much!' },
  ],
}
