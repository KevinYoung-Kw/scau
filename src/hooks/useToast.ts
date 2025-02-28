import { useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  duration?: number;
  position?: 'top' | 'bottom' | 'center';
}

const useToast = () => {
  const showToast = useCallback((message: string, type: ToastType = 'info', options: ToastOptions = {}) => {
    const { duration = 2000, position = 'center' } = options;
    
    // 创建toast元素
    const toast = document.createElement('div');
    
    // 根据类型设置样式
    let bgColor = 'bg-gray-800';
    let textColor = 'text-white';
    let icon = '';
    
    switch (type) {
      case 'success':
        bgColor = 'bg-green-600';
        icon = `
          <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        `;
        break;
      case 'error':
        bgColor = 'bg-red-600';
        icon = `
          <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        `;
        break;
      case 'warning':
        bgColor = 'bg-yellow-500';
        icon = `
          <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        `;
        break;
      case 'info':
      default:
        bgColor = 'bg-primary-600';
        icon = `
          <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        `;
        break;
    }
    
    // 设置位置
    let positionClass = 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    if (position === 'top') {
      positionClass = 'top-16 left-1/2 transform -translate-x-1/2';
    } else if (position === 'bottom') {
      positionClass = 'bottom-16 left-1/2 transform -translate-x-1/2';
    }
    
    // 应用样式
    toast.className = `fixed ${positionClass} ${bgColor} ${textColor} px-4 py-2 rounded-lg z-50 flex items-center shadow-lg transition-opacity duration-300 ease-in-out`;
    toast.innerHTML = `${icon}${message}`;
    
    // 添加到DOM
    document.body.appendChild(toast);
    
    // 淡出并移除
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, duration);
  }, []);
  
  return {
    showToast,
    success: (message: string, options?: ToastOptions) => showToast(message, 'success', options),
    error: (message: string, options?: ToastOptions) => showToast(message, 'error', options),
    warning: (message: string, options?: ToastOptions) => showToast(message, 'warning', options),
    info: (message: string, options?: ToastOptions) => showToast(message, 'info', options),
  };
};

export default useToast;
