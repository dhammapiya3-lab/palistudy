import type { IntroStep as IntroStepType } from '../../types'

interface IntroStepProps {
  step: IntroStepType
}

export default function IntroStep({ step }: IntroStepProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
      <span className="text-7xl mb-6 intro-fade-up block">
        {step.icon}
      </span>
      <h1
        className="text-3xl font-bold intro-fade-up-delay"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {step.title}
      </h1>
      <p
        className="pali-text text-sm mt-2 intro-fade-up-delay"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {step.subtitle}
      </p>
      <p
        className="text-sm mt-8 whitespace-pre-line leading-relaxed
                   max-w-sm intro-fade-up-delay2"
      >
        {step.description}
      </p>
    </div>
  )
}
