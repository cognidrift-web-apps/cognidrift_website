import { motion } from 'framer-motion'

const logos = [
  { name: 'Salesforce', color: '#00A1E0' },
  { name: 'HubSpot', color: '#FF7A59' },
  { name: 'Microsoft', color: '#00A4EF' },
  { name: 'Google', color: '#4285F4' },
  { name: 'Slack', color: '#4A154B' },
  { name: 'Zoom', color: '#2D8CFF' },
  { name: 'Zendesk', color: '#03363D' },
  { name: 'Twilio', color: '#F22F46' },
]

const ClientLogos = ({ title = "Trusted by Industry Leaders" }) => {
  return (
    <section className="py-16 bg-neutral-offWhite border-y border-neutral-border">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-text-muted text-sm font-medium mb-8 uppercase tracking-wider"
        >
          {title}
        </motion.p>

        {/* Scrolling Logos */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {[...logos, ...logos].map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % logos.length) * 0.1 }}
                className="flex-shrink-0 mx-8 group"
              >
                <div className="flex items-center justify-center w-32 h-16 bg-white rounded-xl border border-neutral-border shadow-sm group-hover:shadow-md group-hover:border-primary-200 transition-all duration-300">
                  <span
                    className="text-xl font-bold opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: logo.color }}
                  >
                    {logo.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12"
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-text-primary">500+</p>
            <p className="text-sm text-text-muted">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-text-primary">10M+</p>
            <p className="text-sm text-text-muted">Calls Handled</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-text-primary">99.9%</p>
            <p className="text-sm text-text-muted">Uptime</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-text-primary">4.9/5</p>
            <p className="text-sm text-text-muted">Customer Rating</p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default ClientLogos
