import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecruitment } from '../../context/RecruitmentContext';

const StudentPortal: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useRecruitment();
  const { studentInfo, isAuthenticated } = state;

  // 如果未提交过信息，重定向到注册页面
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/student/register');
    }
  }, [isAuthenticated, navigate]);

  const menuItems = [
    {
      title: '查看简历',
      description: '查看您提交的个人简历信息',
      icon: '📋',
      action: () => navigate('/student/verify')
    },
    {
      title: '部门介绍',
      description: '了解各部门详细介绍和招新要求',
      icon: '🏢',
      action: () => navigate('/student/departments')
    },
    {
      title: '志愿填报',
      description: '填报您的部门志愿选择',
      icon: '📝',
      action: () => navigate('/student/volunteer')
    },
    {
      title: '面试进度',
      description: '查询您的面试安排和结果',
      icon: '🔍',
      action: () => navigate('/student/progress')
    }
  ];

  // 如果未认证，显示加载状态
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* 欢迎消息 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-xl font-bold text-gray-800">欢迎，{studentInfo?.name || '同学'}</h1>
        <p className="text-gray-600 mt-1">{studentInfo?.college || ''}的小伙伴</p>
      </div>
      
      {/* 菜单列表 */}
      <div className="grid gap-4">
        {menuItems.map((item, index) => (
          <div 
            key={index}
            onClick={item.action}
            className="bg-white rounded-lg shadow-sm p-4 flex items-center cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mr-4">{item.icon}</div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <div className="ml-auto">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentPortal;
