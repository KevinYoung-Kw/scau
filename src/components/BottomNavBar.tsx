import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 检查当前路径是否为学生端或面试官端
  const isInStudentOrInterviewerPath = location.pathname.startsWith('/student') || 
                                       location.pathname.startsWith('/interviewer');
  
  // 如果在学生端或面试官端，则不显示整个导航栏
  if (isInStudentOrInterviewerPath) {
    return null;
  }

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-between items-center">
        <div></div> {/* 占位元素，保持布局平衡 */}
        
        {/* 不显眼的面试者入口按钮 */}
        <button
          onClick={() => navigate('/interviewer')}
          className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded-md flex items-center"
        >
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          面试官入口
        </button>
      </div>
    </div>
  );
};

export default BottomNavBar;
