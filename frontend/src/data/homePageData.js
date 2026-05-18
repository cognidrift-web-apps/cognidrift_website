import {
  SiSalesforce,
  SiHubspot,
  SiZoho,
  SiGooglecalendar,
  SiMicrosoftoutlook,
  SiSlack,
  SiTwilio,
  SiZapier,
  SiGoogle,
  SiMicrosoftteams,
  SiNotion,
  SiAirtable,
  SiMailchimp,
  SiStripe,
  SiShopify,
  SiWordpress,
  SiSquarespace,
  SiIntercom,
  SiZendesk,
  SiAsana,
  SiTrello,
  SiGithub,
  SiDropbox,
  SiFigma
} from 'react-icons/si'
import {
  Clock,
  Calendar,
  MessageSquare,
  Phone,
  BarChart3,
  Globe,
  Zap,
  Shield,
  Stethoscope,
  Building2,
  Home as HomeIcon
} from 'lucide-react'

export const features = [
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Never miss a call. Your AI receptionist works around the clock, even on holidays.'
  },
  {
    icon: MessageSquare,
    title: 'Natural Conversations',
    description: 'Advanced AI that understands context and responds naturally like a human.'
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Automatically book appointments and sync with your calendar systems.'
  },
  {
    icon: Phone,
    title: 'Intelligent Routing',
    description: 'Route calls to the right person or department based on intent detection.'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Get insights into call patterns, customer needs, and conversion rates.'
  },
  {
    icon: Globe,
    title: 'Multi-language',
    description: 'Communicate with customers in multiple languages seamlessly.'
  },
  {
    icon: Zap,
    title: 'CRM Integration',
    description: 'Connect with Salesforce, HubSpot, and other popular CRM platforms.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'HIPAA-ready infrastructure with enterprise-grade encryption.'
  }
]

export const industries = [
  {
    icon: Stethoscope,
    title: 'Healthcare',
    description: 'HIPAA-compliant AI for medical practices and clinics.',
    features: ['Patient scheduling', 'Insurance verification', 'Prescription refills', 'Appointment reminders'],
    iconBgColor: 'bg-blue-100/70',
    iconTextColor: 'text-blue-600'
  },
  {
    icon: Shield,
    title: 'Insurance',
    description: 'Handle claims inquiries and policy questions 24/7.',
    features: ['Claims status updates', 'Policy information', 'Quote requests', 'Agent routing'],
    iconBgColor: 'bg-blue-100/70',
    iconTextColor: 'text-blue-600'
  },
  {
    icon: HomeIcon,
    title: 'Real Estate',
    description: 'Qualify leads and schedule property viewings automatically.',
    features: ['Lead qualification', 'Showing scheduling', 'Property inquiries', 'Agent matching'],
    iconBgColor: 'bg-blue-100/70',
    iconTextColor: 'text-blue-600'
  },
  {
    icon: Building2,
    title: 'Professional Services',
    description: 'Custom solutions for law firms, accounting, and consulting.',
    features: ['Consultation booking', 'Client intake', 'Document requests', 'Follow-up calls'],
    iconBgColor: 'bg-blue-100/70',
    iconTextColor: 'text-blue-600'
  }
]

export const integrations = [
  { name: 'Salesforce', icon: SiSalesforce },
  { name: 'HubSpot', icon: SiHubspot },
  { name: 'Zoho', icon: SiZoho },
  { name: 'Google Calendar', icon: SiGooglecalendar },
  { name: 'Zapier', icon: SiZapier },
  { name: 'Outlook', icon: SiMicrosoftoutlook },
  { name: 'Slack', icon: SiSlack },
  { name: 'Twilio', icon: SiTwilio },
  { name: 'Google Ads', icon: SiGoogle },
  { name: 'Teams', icon: SiMicrosoftteams },
  { name: 'Notion', icon: SiNotion },
  { name: 'Airtable', icon: SiAirtable },
  { name: 'Mailchimp', icon: SiMailchimp },
  { name: 'Stripe', icon: SiStripe },
  { name: 'Shopify', icon: SiShopify },
  { name: 'WordPress', icon: SiWordpress },
  { name: 'Squarespace', icon: SiSquarespace },
  { name: 'Intercom', icon: SiIntercom },
  { name: 'Zendesk', icon: SiZendesk },
  { name: 'Asana', icon: SiAsana },
  { name: 'Trello', icon: SiTrello },
  { name: 'GitHub', icon: SiGithub },
  { name: 'Dropbox', icon: SiDropbox },
  { name: 'Figma', icon: SiFigma }
]

export const stats = [
  { number: 67, suffix: '%', label: 'Calls outside business hours' },
  { number: 1200, suffix: '+', label: 'Average cost per missed lead' },
  { number: 35, suffix: '%', label: 'Reduction in no-shows' }
]
