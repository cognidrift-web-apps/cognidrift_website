import { Link } from 'react-router-dom'
import { FaRobot, FaCode, FaCog, FaRocket, FaShieldAlt, FaChartLine } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'

const Home = () => {
  const features = [
    {
      icon: <FaRobot className="text-4xl text-blue-600" />,
      title: 'AI Agent Development',
      description: 'Custom intelligent agents tailored to your business needs'
    },
    {
      icon: <FaCode className="text-4xl text-cyan-600" />,
      title: 'Custom Software',
      description: 'Bespoke software solutions built with cutting-edge technology'
    },
    {
      icon: <FaCog className="text-4xl text-blue-600" />,
      title: 'Maintenance & Support',
      description: '24/7 support and maintenance for your applications'
    },
    {
      icon: <FaShieldAlt className="text-4xl text-cyan-600" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and reliability standards'
    },
    {
      icon: <FaRocket className="text-4xl text-blue-600" />,
      title: 'Fast Deployment',
      description: 'Quick turnaround time from concept to deployment'
    },
    {
      icon: <FaChartLine className="text-4xl text-cyan-600" />,
      title: 'Scalable Solutions',
      description: 'Built to grow with your business requirements'
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float top-0 left-0"></div>
          <div className="absolute w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-2000 bottom-0 right-0"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <HiSparkles className="text-6xl text-blue-600 mx-auto mb-6 animate-pulse-slow" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to <span className="gradient-text">CogniDrift</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Building the future with intelligent AI agents and innovative software solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/services">
                <button className="btn-primary btn-animated text-lg px-8 py-4">
                  Explore Services
                </button>
              </Link>
              <Link to="/contact">
                <button className="btn-secondary btn-animated text-lg px-8 py-4">
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text">CogniDrift</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We deliver cutting-edge solutions that transform your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card hover:scale-105 transform transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's build something amazing together. Contact us today for a free consultation.
          </p>
          <Link to="/contact">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-glow">
              Start Your Project
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
