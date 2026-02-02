import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const cardVariants = cva(
  'rounded-2xl transition-all duration-300',
  {
    variants: {
      variant: {
        default:
          'bg-white border border-neutral-border p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1',
        glass:
          'bg-white/70 backdrop-blur-lg border border-white/50 p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1',
        feature:
          'bg-white border border-neutral-border p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 group',
        elevated:
          'bg-white p-8 shadow-lg hover:shadow-xl hover:-translate-y-1',
        outline:
          'bg-transparent border-2 border-neutral-border p-8 hover:border-primary-300',
        gradient:
          'bg-gradient-to-br from-primary-50 to-white border border-primary-100 p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Card = forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant, className }))}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 mb-4', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-xl font-semibold text-text-primary leading-none tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-text-secondary', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
