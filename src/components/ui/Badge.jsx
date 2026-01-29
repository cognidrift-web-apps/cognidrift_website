import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-primary-100 text-primary-700',
        secondary:
          'bg-neutral-offWhite text-text-secondary',
        outline:
          'border border-primary-300 text-primary-600 bg-transparent',
        success:
          'bg-green-100 text-green-700',
        warning:
          'bg-yellow-100 text-yellow-700',
        destructive:
          'bg-red-100 text-red-700',
        info:
          'bg-cyan-100 text-cyan-700',
        gradient:
          'bg-gradient-to-r from-primary-500 to-accent-violet text-white',
      },
      size: {
        default: 'px-3 py-1 text-xs',
        sm: 'px-2 py-0.5 text-[10px]',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Badge({ className, variant, size, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props} />
  )
}

export { Badge, badgeVariants }
