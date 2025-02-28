import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/shared/Header';
import Card from '../../components/shared/Card';

interface DailyStats {
  total: number;
  interviewed: number;
  pending: number;
  accepted: number;
  rejected: number;
}

const InterviewerPortal: React.FC = () => {
  // 面试官信息
  const interviewer = {
    name: '李四',
    department: '技术部',
    role: '面试官'
  };
  
  // 今日统计
  const dailyStats: DailyStats = {
    total: 25,
    interviewed: 12,
    pending: 13,
    accepted: 8,
    rejected: 4
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <Header title="面试官工作台" showBack={false} />
      
      <div className="pt-20 px-4 max-w-lg mx-auto">
        {/* 面试官信息卡片 */}
        <Card elevated className="mb-6 overflow-visible">
          <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-6 rounded-t-tencent">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold text-2xl shadow-tencent">
                {interviewer.name.charAt(0)}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold">{interviewer.name}</h2>
                <p className="opacity-90">{interviewer.department} | {interviewer.role}</p>
              </div>
            </div>
          </div>
          
          <div className="p-5">
            <div className="bg-gray-50 rounded-tencent p-4">
              <p className="text-sm text-gray-500 mb-2 font-medium">今日面试统计</p>
              <div className="grid grid-cols-4 gap-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary-600">{dailyStats.interviewed}</div>
                  <div className="text-xs text-gray-500">已面试</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary-600">{dailyStats.pending}</div>
                  <div className="text-xs text-gray-500">待面试</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-tencent-green">{dailyStats.accepted}</div>
                  <div className="text-xs text-gray-500">已通过</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-400">{dailyStats.rejected}</div>
                  <div className="text-xs text-gray-500">未通过</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* 功能卡片 */}
        <div className="space-y-3.5">
          <Link to="/interviewer/qrcode">
            <Card interactive elevated className="transition-all duration-300">
              <div className="flex items-center p-4">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">二维码扫描</h3>
                  <p className="text-gray-500">扫描候选人二维码签到与查看信息</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>
          </Link>
          
          <Link to="/interviewer/batch">
            <Card className="transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <div className="flex items-center p-4">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">批量操作</h3>
                  <p className="text-gray-500">批量处理候选人信息与面试状态</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>
          </Link>
          
          <Link to="/interviewer/evaluate">
            <Card className="transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <div className="flex items-center p-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">面试评价</h3>
                  <p className="text-gray-500">填写面试评价表单和打分</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>
          </Link>
        </div>
        
        {/* 待面试列表 */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">今日待面试</h2>
          
          <div className="space-y-3">
            {/* 面试候选人卡片 */}
            {[
              { id: '001', name: '王五', time: '10:30', dept: '技术部', isSpecial: true },
              { id: '002', name: '赵六', time: '11:00', dept: '技术部', isSpecial: false },
              { id: '003', name: '钱七', time: '11:30', dept: '技术部', isSpecial: false },
            ].map((candidate, index) => (
              <Card key={index} className="border-l-4 border-primary-500">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                      {candidate.isSpecial && (
                        <span className="ml-2 inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                          特招
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{candidate.time} | 候选人ID: {candidate.id}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <Link to={`/interviewer/evaluate?id=${candidate.id}`}>
                      <button className="bg-primary-100 text-primary-700 p-2 rounded-full mr-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </Link>
                    
                    <button className="bg-green-100 text-green-700 p-2 rounded-full">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
            
            <div className="text-center py-3">
              <button className="text-primary-600 font-medium text-sm flex items-center justify-center mx-auto">
                查看更多
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewerPortal;