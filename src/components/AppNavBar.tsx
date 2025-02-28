import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';

const AppNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 检查当前路径
  const isInStudentPath = location.pathname.startsWith('/student');
  const isInInterviewerPath = location.pathname.startsWith('/interviewer');
  
  // 在主页路径下使用原有的 BottomNavBar
  if (!isInStudentPath && !isInInterviewerPath) {
    return <BottomNavBar />;
  }
  
  // 学生端导航栏
  if (isInStudentPath) {
    return (
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 px-3 py-1 rounded-md flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          返回
        </button>
        
        <button
          onClick={() => navigate('/student')}
          className="text-sm text-gray-600 px-3 py-1 rounded-md flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          学生主页
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="text-sm text-red-600 px-3 py-1 rounded-md flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          退出
        </button>
      </div>
    );
  }
  
  // 面试官端导航栏
  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2 flex justify-between items-center">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 px-3 py-1 rounded-md flex items-center"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        返回
      </button>
      
      <button
        onClick={() => navigate('/interviewer')}
        className="text-sm text-gray-600 px-3 py-1 rounded-md flex items-center"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        面试官主页
      </button>
      
      <button
        onClick={() => navigate('/')}
        className="text-sm text-red-600 px-3 py-1 rounded-md flex items-center"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
        </svg>
        退出
      </button>
    </div>
  );
};

export default AppNavBar;
