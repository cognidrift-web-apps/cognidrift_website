import { FaUsers, FaLightbulb, FaRocket, FaHeart } from 'react-icons/fa'

const About = () => {
  const values = [
    {
      icon: <FaLightbulb className="text-5xl text-yellow-500" />,
      title: 'Innovation',
      description: 'We stay ahead of the curve with cutting-edge AI and software technologies'
    },
    {
      icon: <FaUsers className="text-5xl text-blue-600" />,
      title: 'Collaboration',
      description: 'Working closely with clients to deliver solutions that exceed expectations'
    },
    {
      icon: <FaRocket className="text-5xl text-cyan-600" />,
      title: 'Excellence',
      description: 'Committed to delivering high-quality, scalable, and efficient solutions'
    },
    {
      icon: <FaHeart className="text-5xl text-red-500" />,
      title: 'Passion',
      description: 'Passionate about creating technology that makes a real difference'
    }
  ]

  const stats = [
    { number: '100+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '24/7', label: 'Support Available' }
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            About CogniDrift
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto animate-slide-up">
            Pioneering the future of AI-powered software solutions
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                At CogniDrift, we're on a mission to transform businesses through intelligent automation 
                and innovative software solutions. We believe in the power of AI to revolutionize how 
                companies operate and serve their customers.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Our team of experienced developers and AI specialists work tirelessly to create custom 
                solutions that not only meet but exceed our clients' expectations.
              </p>
              <p className="text-lg text-gray-600">
                We combine deep technical expertise with a genuine passion for solving complex problems, 
                ensuring that every project we undertake delivers real value and measurable results.
              </p>
            </div>
            <div className="relative animate-float">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <FaRocket className="text-9xl text-blue-600 mx-auto mb-4" />
                  <p className="text-2xl font-bold gradient-text">Building Tomorrow, Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="card text-center hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl md:text-6xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            A diverse group of talented professionals dedicated to delivering excellence
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-12">
            <p className="text-lg text-gray-700">
              Our team brings together expertise in artificial intelligence, machine learning, 
              full-stack development, and project management. With a combined experience of over 
              50 years in the tech industry, we're equipped to handle projects of any scale and complexity.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
