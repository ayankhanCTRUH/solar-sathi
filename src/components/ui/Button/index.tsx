'use client';
import React from 'react';
import AnimatingDots from '../AnimatingDots';
import { ButtonProps, ButtonVariant } from '@/types';

const baseStyles =
  'flex items-center justify-center gap-2 px-8 py-4 text-[28px] font-semibold rounded-xl h-full w-full text-white';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-linear-(--button-primary-gradient) cursor-pointer',
  secondary:
    'bg-background-dark-300 border border-background-dark-100 cursor-pointer',
  tertiary: 'bg-transparent border border-neutral-dark-500 cursor-pointer',
  disable:
    'bg-linear-(--button-primary-gradient) opacity-50 cursor-not-allowed',
};

const animatingDotColors: Record<ButtonVariant, string> = {
  primary: 'bg-brand-200',
  secondary: 'bg-brand',
  tertiary: 'bg-black-300',
  disable: 'bg-brand-200',
};

const Button = ({
  variant = 'primary',
  content,
  className = '',
  leftIcon,
  rightIcon,
  onClick,
  isLoading = false,
}: ButtonProps) => {
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={isLoading || variant === 'disable'}
      onClick={onClick}
    >
      {isLoading ? (
        <AnimatingDots color={animatingDotColors[variant]} />
      ) : (
        <div className="inline-flex items-center gap-[18px]">
          {leftIcon && <span>{leftIcon}</span>}
          <span className="whitespace-nowrap">{content}</span>
          {rightIcon && <span>{rightIcon}</span>}
        </div>
      )}
    </button>
  );
};

export default Button;
