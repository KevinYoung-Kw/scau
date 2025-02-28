import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  onClick?: () => void;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> & {
  Body: React.FC<CardBodyProps>;
  Footer: React.FC<CardFooterProps>;
  Header: React.FC<CardHeaderProps>;
} = ({ children, className = '', elevated = false, onClick }) => {
  return (
    <div 
      className={`bg-white rounded-lg ${elevated ? 'shadow-md' : 'shadow-sm'} ${className} ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const Body: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

const Footer: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-4 py-3 bg-gray-50 rounded-b-lg border-t border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

const Header: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-4 py-3 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

Card.Body = Body;
Card.Footer = Footer;
Card.Header = Header;

export default Card;
