import PricingCards from './PricingCards'
import { managedPlans, byokPlans } from '../data/cognihubPricing'

const CogniHubPricingCards = () => (
  <PricingCards
    tracks={[
      { id: 'managed', label: 'Managed (AI Included)', plans: managedPlans },
      { id: 'byok', label: 'BYOK (Your Keys)', plans: byokPlans },
    ]}
    gridClass="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    renderUnits={(plan) => (
      <>
        <p className="text-sm font-semibold text-primary-600 mb-1">
          Up to {plan.users} users
        </p>
        <p className="text-sm font-semibold text-primary-600 mb-4">
          {typeof plan.actions === 'string' ? plan.actions + ' AI usage' : plan.actions + ' AI actions/mo'}
        </p>
      </>
    )}
  />
)

export default CogniHubPricingCards
