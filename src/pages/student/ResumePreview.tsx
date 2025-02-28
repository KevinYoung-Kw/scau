import React from 'react';
import { useRecruitment } from '../../context/RecruitmentContext';
import { useNavigate } from 'react-router-dom';

const ResumePreview: React.FC = () => {
  const { state } = useRecruitment();
  const navigate = useNavigate();
  const { studentInfo } = state;
  
  // 如果没有学生信息，重定向到注册页面
  React.useEffect(() => {
    if (!studentInfo) {
      navigate('/student/register');
    }
  }, [studentInfo, navigate]);
  
  if (!studentInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // 计算技能数据用于图表展示
  const skillCategories = studentInfo.skills?.map((skill: any) => skill.name) || [];
  const skillValues = studentInfo.skills?.map((skill: any) => skill.level) || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部个人信息卡片 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 pb-16 relative">
        <h1 className="text-2xl font-bold mb-1">我的个人简历</h1>
        <p className="text-sm opacity-80">招新报名表与个人详情</p>
        
        {/* 个人信息卡片 */}
        <div className="absolute left-6 right-6 -bottom-24 bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="mr-4">
              {studentInfo.avatar ? (
                <img 
                  src={studentInfo.avatar} 
                  alt="头像" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{studentInfo.name}</h2>
              <p className="text-gray-600 text-sm">{studentInfo.college} · {studentInfo.major}</p>
              <div className="flex mt-1 text-xs text-gray-500">
                <span className="mr-3">学号: {studentInfo.studentId}</span>
              </div>
            </div>
            <button 
              className="ml-auto bg-blue-500 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-600"
              onClick={() => navigate('/student/register')}
            >
              编辑
            </button>
          </div>
        </div>
      </div>
      
      {/* 联系方式 */}
      <div className="mt-28 px-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">联系方式</h3>
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <div>
                <p className="text-sm text-gray-500">手机号码</p>
                <p className="font-medium">{studentInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <div>
                <p className="text-sm text-gray-500">微信号</p>
                <p className="font-medium">{studentInfo.wechat}</p>
              </div>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <div>
                <p className="text-sm text-gray-500">电子邮箱</p>
                <p className="font-medium">{studentInfo.email}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 个人简介 */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">个人简介</h3>
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{studentInfo.biography || "暂无个人简介"}</p>
        </div>
        
        {/* 技能评级 */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">技能评级</h3>
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          {studentInfo.skills && studentInfo.skills.length > 0 ? (
            <div className="space-y-3">
              {studentInfo.skills.map((skill: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{skill.name}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(level => (
                      <div 
                        key={level}
                        className={`w-6 h-6 rounded-full mx-0.5 flex items-center justify-center ${
                          level <= skill.level 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {level}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-3">暂无技能数据</p>
          )}
        </div>
        
        {/* 项目作品 */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">项目作品</h3>
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          {studentInfo.portfolioLinks && studentInfo.portfolioLinks.length > 0 ? (
            <div className="space-y-3">
              {studentInfo.portfolioLinks.map((link: any, index: number) => (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-200 transition"
                >
                  <div>
                    <h4 className="font-medium text-blue-600">{link.title}</h4>
                    <p className="text-xs text-gray-500 truncate max-w-xs">{link.url}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-3">暂无项目作品</p>
          )}
        </div>
        
        {/* 兴趣与成就 */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">兴趣方向</h3>
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {studentInfo.interests && studentInfo.interests.length > 0 ? (
              studentInfo.interests.map((interest: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-center w-full py-3">暂无兴趣方向</p>
            )}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-700 mb-2">个人成就</h3>
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {studentInfo.achievements || "暂无个人成就"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
