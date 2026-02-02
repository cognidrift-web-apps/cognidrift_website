import { createContext, useContext, forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

const DialogContext = createContext({})

const Dialog = ({ children, open, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const handleOpenChange = (newOpen) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  return (
    <DialogContext.Provider value={{ isOpen, handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

const DialogTrigger = forwardRef(({ children, asChild, ...props }, ref) => {
  const { handleOpenChange } = useContext(DialogContext)

  if (asChild) {
    return (
      <div onClick={() => handleOpenChange(true)} ref={ref} {...props}>
        {children}
      </div>
    )
  }

  return (
    <button onClick={() => handleOpenChange(true)} ref={ref} {...props}>
      {children}
    </button>
  )
})
DialogTrigger.displayName = 'DialogTrigger'

const DialogPortal = ({ children }) => {
  const { isOpen } = useContext(DialogContext)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {children}
        </div>
      )}
    </AnimatePresence>
  )
}

const DialogOverlay = forwardRef(({ className, ...props }, ref) => {
  const { handleOpenChange } = useContext(DialogContext)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
        className
      )}
      onClick={() => handleOpenChange(false)}
      {...props}
    />
  )
})
DialogOverlay.displayName = 'DialogOverlay'

const DialogContent = forwardRef(({ className, children, ...props }, ref) => {
  const { handleOpenChange } = useContext(DialogContext)

  return (
    <DialogPortal>
      <DialogOverlay />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={cn(
          'fixed z-50 w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 mx-4',
          'focus:outline-none',
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
        <button
          onClick={() => handleOpenChange(false)}
          className="absolute top-4 right-4 p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-neutral-offWhite transition-colors"
        >
          <X className="w-5 h-5" />
          <span className="sr-only">Close</span>
        </button>
      </motion.div>
    </DialogPortal>
  )
})
DialogContent.displayName = 'DialogContent'

const DialogHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-2 mb-4', className)}
    {...props}
  />
))
DialogHeader.displayName = 'DialogHeader'

const DialogTitle = forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-xl font-semibold text-text-primary', className)}
    {...props}
  />
))
DialogTitle.displayName = 'DialogTitle'

const DialogDescription = forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-text-secondary', className)}
    {...props}
  />
))
DialogDescription.displayName = 'DialogDescription'

const DialogFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex justify-end gap-3 mt-6', className)}
    {...props}
  />
))
DialogFooter.displayName = 'DialogFooter'

const DialogClose = forwardRef(({ children, asChild, ...props }, ref) => {
  const { handleOpenChange } = useContext(DialogContext)

  if (asChild) {
    return (
      <div onClick={() => handleOpenChange(false)} ref={ref} {...props}>
        {children}
      </div>
    )
  }

  return (
    <button onClick={() => handleOpenChange(false)} ref={ref} {...props}>
      {children}
    </button>
  )
})
DialogClose.displayName = 'DialogClose'

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
}
