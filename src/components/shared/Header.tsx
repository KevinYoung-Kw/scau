import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  subtitle, 
  showBackButton = true, 
  onBack,
  rightElement
}) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
      <div className="flex items-center px-4 h-16">
        {showBackButton && (
          <button
            onClick={handleBack}
            className="mr-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="返回"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        )}
        
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-800">{title}</h1>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        
        {rightElement}
      </div>
    </div>
  );
};

export default Header;
