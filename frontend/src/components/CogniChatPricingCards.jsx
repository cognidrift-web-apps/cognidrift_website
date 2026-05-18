import PricingCards from './PricingCards'
import { plans } from '../data/cognichatPricing'

const CogniChatPricingCards = () => (
  <PricingCards
    plans={plans}
    gridClass="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
    renderUnits={(plan) => (
      <p className="text-sm font-semibold text-primary-600 mb-4">
        {typeof plan.chats === 'number' ? plan.chats + ' customer chats/mo' : plan.chats + ' customer chats/mo'}
      </p>
    )}
  />
)

export default CogniChatPricingCards
