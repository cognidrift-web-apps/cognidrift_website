import SEOMeta from '../components/SEOMeta'
import FAQ from '../components/FAQ'

const FAQPage = () => {
  return (
    <div className="min-h-screen">
      <SEOMeta
        title="FAQ - AI Automation & AI Agents for Business Questions"
        description="Answers to common questions about AI automation solutions, AI agents for business, AI workflow automation, and how companies use AI assistants."
        keywords="what are AI agents for business, how AI automation improves productivity, how companies use AI assistants"
        url="/faq"
      />
      <FAQ />
    </div>
  )
}

export default FAQPage
