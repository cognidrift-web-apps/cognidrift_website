const WorkflowStep = ({ number, icon: Icon, title, description }) => (
  <div className="workflow-step">
    <div className="step-icon">
      <Icon className="w-8 h-8" />
    </div>
    <div className="step-number absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white text-sm rounded-full flex items-center justify-center font-bold">
      {number}
    </div>
    <h4 className="text-lg font-semibold text-text-primary mb-2">{title}</h4>
    <p className="text-sm text-text-secondary max-w-[200px]">{description}</p>
  </div>
)

export default WorkflowStep
