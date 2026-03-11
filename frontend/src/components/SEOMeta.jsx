import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://cognidrift.com'
const DEFAULT_IMAGE = `${BASE_URL}/cognidrift_logo.png`
const SITE_NAME = 'CogniDrift'

const GLOBAL_KEYWORDS = [
  // Primary high-intent
  'AI automation solutions',
  'AI agents for business',
  'enterprise AI automation',
  'AI digital workforce',
  'business AI automation platform',
  'AI workflow automation',
  'AI consulting services',
  // Secondary
  'intelligent automation platform',
  'AI business intelligence',
  'AI analytics solutions',
  'document AI processing',
  'conversational AI platform',
  // Long-tail
  'what are AI agents for business',
  'how AI automation improves productivity',
  'AI document processing automation tools',
  'AI workflow automation examples',
  'how companies use AI assistants',
].join(', ')

const SEOMeta = ({
  title,
  description,
  keywords = '',
  url = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  noIndex = false,
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - AI Automation Solutions & AI Agents for Business`
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL
  const allKeywords = keywords ? `${keywords}, ${GLOBAL_KEYWORDS}` : GLOBAL_KEYWORDS

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="googlebot" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@CogniDrift" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEOMeta
