import AnimatedCounter from './AnimatedCounter'

const StatItem = ({ number, suffix, label }) => (
  <div className="stat-item">
    <div className="stat-number">
      <AnimatedCounter end={number} suffix={suffix} />
    </div>
    <div className="stat-label">{label}</div>
  </div>
)

export default StatItem
