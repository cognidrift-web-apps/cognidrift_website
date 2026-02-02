import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary-600 text-white shadow-button hover:bg-primary-700 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 focus:ring-primary-500',
        secondary:
          'bg-white text-primary-600 border-2 border-primary-600 shadow-sm hover:bg-primary-50 hover:shadow-button hover:-translate-y-0.5 active:translate-y-0 focus:ring-primary-500',
        ghost:
          'bg-transparent text-primary-600 hover:bg-primary-50 hover:underline focus:ring-primary-500',
        outline:
          'border-2 border-neutral-border bg-transparent text-text-primary hover:bg-neutral-offWhite focus:ring-primary-500',
        destructive:
          'bg-red-600 text-white shadow-sm hover:bg-red-700 focus:ring-red-500',
        link:
          'text-primary-600 underline-offset-4 hover:underline focus:ring-primary-500',
      },
      size: {
        default: 'px-8 py-4',
        sm: 'px-4 py-2 text-sm',
        lg: 'px-10 py-5 text-lg',
        icon: 'h-10 w-10',
      },
      glow: {
        true: 'animate-glow',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      glow: false,
    },
  }
)

const Button = forwardRef(
  ({ className, variant, size, glow, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, glow, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
