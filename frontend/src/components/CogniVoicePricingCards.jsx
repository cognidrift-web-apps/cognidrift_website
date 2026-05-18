import PricingCards from './PricingCards'
import { plans } from '../data/cognivoicePricing'

const CogniVoicePricingCards = () => (
  <PricingCards
    plans={plans}
    gridClass="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    renderUnits={(plan) => (
      <p className="text-sm font-semibold text-primary-600 mb-4">
        {typeof plan.minutes === 'number' ? `${plan.minutes} AI call minutes included` : `${plan.minutes} AI call minutes`}
      </p>
    )}
  />
)

export default CogniVoicePricingCards
