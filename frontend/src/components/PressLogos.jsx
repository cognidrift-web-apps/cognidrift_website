import { motion } from 'framer-motion'

const PressLogos = () => {
  const pressLogos = [
    { name: 'Forbes', logo: 'https://cdn.prod.website-files.com/5f3c19f18169b62a0d0bf387/60d33bef8cd8c04eb825a041_forbes-logo.svg' },
    { name: 'TechCrunch', logo: 'https://cdn.prod.website-files.com/5f3c19f18169b62a0d0bf387/60d33bef8cd8c04eb825a042_techcrunch-logo.svg' },
    { name: 'Business Insider', logo: 'https://cdn.prod.website-files.com/5f3c19f18169b62a0d0bf387/60d33bef8cd8c04eb825a043_business-insider-logo.svg' },
    { name: 'Wired', logo: 'https://cdn.prod.website-files.com/5f3c19f18169b62a0d0bf387/60d33bef8cd8c04eb825a044_wired-logo.svg' },
    { name: 'The Verge', logo: 'https://cdn.prod.website-files.com/5f3c19f18169b62a0d0bf387/60d33bef8cd8c04eb825a045_the-verge-logo.svg' },
    { name: 'VentureBeat', logo: 'https://cdn.prod.website-files.com/5f3c19f18169b62a0d0bf387/60d33bef8cd8c04eb825a046_venturebeat-logo.svg' }
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section className="relative py-16 bg-neutral-offWhite border-y border-neutral-border overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted mb-4">
            As Seen On
          </h2>
        </motion.div>

        {/* Marquee container */}
        <div className="relative overflow-hidden">
          <motion.div 
            className="flex items-center gap-16 lg:gap-24"
            animate={{ x: [0, -1920] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate the logos for seamless loop */}
            {[...pressLogos, ...pressLogos, ...pressLogos].map((press, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex-shrink-0 flex items-center justify-center w-40 h-16 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer"
              >
                <div className="text-2xl font-black text-text-secondary hover:text-primary-600 transition-colors">
                  {press.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Alternative: Static Grid for smaller screens */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:hidden gap-8">
          {pressLogos.slice(0, 6).map((press, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-center justify-center p-4 bg-white rounded-xl border border-neutral-border hover:border-primary-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="text-lg font-bold text-text-secondary hover:text-primary-600 transition-colors">
                {press.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PressLogos
