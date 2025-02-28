import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  rounded?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  rounded = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  ...props
}) => {
  // 按钮样式映射
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
  };
  
  // 按钮尺寸映射
  const sizeStyles = {
    sm: 'text-xs px-3 py-1',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };
  
  // 组装样式类
  const buttonClasses = [
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? 'w-full' : '',
    rounded ? 'rounded-full' : 'rounded-md',
    'font-medium transition-colors',
    disabled ? 'opacity-60 cursor-not-allowed' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={`${buttonClasses} flex items-center justify-center`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button;
