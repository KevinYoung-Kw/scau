import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/shared/Header';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const ResultQuery: React.FC = () => {
  // 模拟数据
  const resultData = {
    studentId: '2023030001',
    studentName: '张三',
    college: '信息学院',
    results: [
      {
        department: '技术部',
        type: 'special',
        result: 'accepted',  // accepted, rejected
        priority: 1,
        comment: '技术基础扎实，团队协作能力强，符合技术部招新要求。期待你的加入！'
      },
      {
        department: '策划部',
        type: 'normal',
        result: 'accepted',
        priority: 2,
        comment: '具有较好的活动策划能力和创意思维，适合策划部工作'
      }
    ],
    finalDepartment: '技术部', // 最终录取部门
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="录取结果" />
      
      <div className="pt-20 px-4 pb-6 max-w-lg mx-auto">
        {/* 学生信息卡片 */}
        <Card elevated className="mb-6">
          <Card.Body>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">学生信息</p>
                <p className="font-medium text-gray-900">{resultData.studentName} | {resultData.studentId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">所属学院</p>
                <p className="font-medium text-gray-900">{resultData.college}</p>
              </div>
            </div>
            
            {resultData.finalDepartment ? (
              <div className="bg-green-50 border border-green-100 rounded-lg p-5 text-center relative overflow-hidden">
                {/* 装饰效果 */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 via-green-500 to-green-300"></div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-1">恭喜您被录取！</h3>
                  <p className="text-green-700">
                    您已被 <span className="font-semibold">{resultData.finalDepartment}</span> 正式录取
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-600 mb-1">结果暂未公布</h3>
                  <p className="text-gray-500">
                    录取结果将于10月8日公布，请耐心等待
                  </p>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
        
        {/* 志愿结果卡片 */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3">志愿录取详情</h2>
        
        {resultData.results.map((result, index) => (
          <Card key={index} className={`mb-4 border-l-4 ${
            result.result === 'accepted' ? 'border-l-green-500' : 'border-l-gray-300'
          }`}>
            <Card.Header className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="bg-primary-100 text-primary-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2">
                  {result.priority}
                </span>
                <span className="font-medium">{result.department}</span>
              </div>
              <div className="flex items-center">
                {result.type === 'special' && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                    特招
                  </span>
                )}
                {result.result === 'accepted' ? (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    已录取
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    未录取
                  </span>
                )}
              </div>
            </Card.Header>
            
            <Card.Body>
              <p className={`${result.result === 'accepted' ? 'text-gray-700' : 'text-gray-500'}`}>
                {result.comment}
              </p>
            </Card.Body>
          </Card>
        ))}
        
        {/* 优先级说明卡片 */}
        <Card className="mb-6 mt-6">
          <Card.Header>
            <h3 className="font-medium text-gray-800 flex items-center">
              <svg className="w-5 h-5 text-primary-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              志愿优先级说明
            </h3>
          </Card.Header>
          
          <Card.Body>
            <ul className="text-sm text-gray-600 space-y-3.5">
              <li className="flex items-start">
                <svg className="w-4 h-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                <span><strong>第一志愿优先原则：</strong>您被第一志愿部门录取时，将自动放弃第二志愿的录取资格。</span>
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                <span><strong>特招优先级：</strong>特招通道的录取结果优先于普通招新，同时也遵循志愿优先级。</span>
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                <span><strong>调剂机制：</strong>在某些情况下，部门可能会根据您的特长与表现推荐您到其他适合的部门。</span>
              </li>
            </ul>
          </Card.Body>
        </Card>
        
        {/* 按钮组 */}
        <div className="mt-6 space-y-3">
          {resultData.finalDepartment && (
            <Button variant="primary" fullWidth>
              加入部门群聊
            </Button>
          )}
          
          <Link to="/student">
            <Button variant="outline" fullWidth>
              返回首页
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultQuery;
