import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/shared/Header';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import { useRecruitment } from '../../context/RecruitmentContext';

const VerifyStudentNumber: React.FC = () => {
  const navigate = useNavigate();
  const { verifyStudentId, state } = useRecruitment();
  const [studentId, setStudentId] = useState('');
  const [facultyInfo, setFacultyInfo] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 学号验证逻辑
  const handleVerifyStudentId = async () => {
    setIsVerifying(true);
    setError(null);
    
    try {
      const result = await verifyStudentId(studentId);
      
      if (!result.valid) {
        setError(result.message || '验证失败');
        setIsVerifying(false);
        return;
      }
      
      // 显示识别结果和特招资格
      let resultMessage = `您属于${result.college}，可以参与校科联招新`;
      if (result.hasSpecial) {
        resultMessage += '，并且有技术部和策划部的特招资格';
      }
      
      setFacultyInfo(resultMessage);
      setIsVerifying(false);
      
      // 验证成功后2秒跳转
      setTimeout(() => {
        // 跳转并传递学号参数
        navigate(`/student/volunteer?studentId=${studentId}`);
      }, 2000);
      
    } catch (err) {
      setError('验证过程中发生错误，请重试');
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="学号验证" />
      
      <div className="pt-20 px-4 pb-6 max-w-lg mx-auto">
        <Card elevated className="mb-6">
          <Card.Header className="bg-primary-50">
            <h2 className="text-lg font-semibold text-primary-700">学生身份验证</h2>
          </Card.Header>
          
          <Card.Body>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
                </svg>
              </div>
              <p className="text-gray-600">
                请输入您的学号进行身份验证，系统将自动识别您所在的学院信息和特招资格
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                学号
              </label>
              <input
                id="studentId"
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="请输入10位学号"
                maxLength={10}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </p>
              )}
            </div>
            
            <Button 
              onClick={handleVerifyStudentId}
              fullWidth 
              disabled={isVerifying || studentId.length !== 10 || state.loading}
              className="rounded-lg"
            >
              {isVerifying || state.loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  验证中...
                </div>
              ) : '验证学号'}
            </Button>
            
            {facultyInfo && (
              <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg animate-pulse-slow">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-green-700">{facultyInfo}</p>
                </div>
                <p className="text-sm text-green-600 mt-2">
                  <svg className="w-4 h-4 inline-block mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  验证成功！正在跳转到志愿填报页面...
                </p>
              </div>
            )}
          </Card.Body>
        </Card>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="flex items-center text-sm font-medium text-blue-800 mb-2">
            <svg className="w-5 h-5 mr-1.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            温馨提示
          </h3>
          <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1.5">
            <li>只有2023级在校学生可以参与校科联招新</li>
            <li>不同学院的学生可能有不同的特招资格</li>
            <li>学号格式：年份(4位) + 学院代码(2位) + 班级号(2位) + 学号(2位)</li>
            <li>特招通道可优先参加对应部门的面试</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VerifyStudentNumber;