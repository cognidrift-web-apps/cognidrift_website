import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Input = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full rounded-lg border border-neutral-border bg-white px-4 py-3 text-base text-text-primary placeholder:text-text-muted transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-offWhite',
        'hover:border-primary-300',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'

const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[120px] w-full rounded-lg border border-neutral-border bg-white px-4 py-3 text-base text-text-primary placeholder:text-text-muted transition-all duration-300 resize-none',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-offWhite',
        'hover:border-primary-300',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'

const Label = forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm font-medium text-text-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
))

Label.displayName = 'Label'

export { Input, Textarea, Label }
