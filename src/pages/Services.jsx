import { FaRobot, FaCode, FaCog, FaUsers, FaChartBar, FaMobile } from 'react-icons/fa'
import { SiOpenai, SiTensorflow } from 'react-icons/si'

const Services = () => {
  const services = [
    {
      icon: <FaRobot className="text-5xl" />,
      title: 'AI Agent Development',
      description: 'Custom AI agents powered by advanced machine learning algorithms to automate and optimize your business processes.',
      features: ['Natural Language Processing', 'Machine Learning Models', 'Automated Decision Making', 'Real-time Analytics'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <SiOpenai className="text-5xl" />,
      title: 'ChatGPT Integration',
      description: 'Integrate powerful conversational AI into your applications with custom ChatGPT solutions.',
      features: ['Custom Training', 'API Integration', 'Context Management', 'Multi-language Support'],
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: <FaCode className="text-5xl" />,
      title: 'Custom Software Development',
      description: 'Full-stack development services using modern technologies and best practices.',
      features: ['React & Next.js', 'Node.js Backend', 'Database Design', 'Cloud Deployment'],
      color: 'from-blue-600 to-cyan-600'
    },
    {
      icon: <FaMobile className="text-5xl" />,
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: ['React Native', 'Flutter', 'Progressive Web Apps', 'App Store Deployment'],
      color: 'from-cyan-600 to-blue-600'
    },
    {
      icon: <FaCog className="text-5xl" />,
      title: 'Maintenance & Support',
      description: 'Comprehensive maintenance and support services to keep your applications running smoothly.',
      features: ['24/7 Monitoring', 'Bug Fixes', 'Performance Optimization', 'Security Updates'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FaChartBar className="text-5xl" />,
      title: 'Consulting Services',
      description: 'Expert guidance on AI implementation, software architecture, and digital transformation.',
      features: ['Technology Assessment', 'Architecture Design', 'Team Training', 'Project Planning'],
      color: 'from-cyan-500 to-blue-500'
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto animate-slide-up">
            Comprehensive AI and software development solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group card hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-600">Simple, transparent, and effective</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'Understand your needs and goals' },
              { step: '02', title: 'Planning', desc: 'Create a detailed project roadmap' },
              { step: '03', title: 'Development', desc: 'Build with agile methodology' },
              { step: '04', title: 'Deployment', desc: 'Launch and provide ongoing support' }
            ].map((item, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="text-6xl font-bold gradient-text mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
