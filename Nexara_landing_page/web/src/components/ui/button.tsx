import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group inline-flex items-center justify-center gap-2 rounded-card font-semibold whitespace-nowrap transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-nx focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        primary: 'bg-nx-teal-700 text-white hover:bg-nx-teal-900 hover:-translate-y-[1px] active:translate-y-0',
        secondary:
          'bg-white text-nx-teal-700 border border-nx-gray-300 hover:border-nx-teal-700 hover:bg-nx-mint-50',
        ghost: 'bg-transparent text-nx-teal-700 hover:bg-nx-mint-50',
      },
      size: {
        sm: 'text-label-m px-nx-3 py-nx-2',
        md: 'text-[15px] px-nx-6 py-nx-3',
        lg: 'text-[16px] px-nx-8 py-[14px]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
