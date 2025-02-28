import React from 'react';
import Header from '../../components/shared/Header';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const InterviewProgress: React.FC = () => {
  // 模拟数据
  const interviewData = {
    studentId: '2023030001',
    studentName: '张三',
    volunteers: [
      {
        department: '技术部',
        type: 'special',
        status: 'interview',  // pending, interview, waitlist, rejected, accepted
        interviewTime: '2023-09-15 14:30',
        interviewLocation: '学生活动中心 301',
        feedback: '技术能力不错，需准备作品展示'
      },
      {
        department: '宣传部',
        type: 'normal',
        status: 'pending',
        interviewTime: '',
        interviewLocation: '',
        feedback: ''
      }
    ]
  };

  // 获取状态标签样式和文字
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string, text: string, label: string }> = {
      pending: { 
        bg: 'bg-blue-100', 
        text: 'text-blue-800', 
        label: '待审核' 
      },
      interview: { 
        bg: 'bg-yellow-100', 
        text: 'text-yellow-800', 
        label: '待面试' 
      },
      waitlist: { 
        bg: 'bg-purple-100', 
        text: 'text-purple-800', 
        label: '候补' 
      },
      rejected: { 
        bg: 'bg-gray-100', 
        text: 'text-gray-800', 
        label: '未通过' 
      },
      accepted: { 
        bg: 'bg-green-100', 
        text: 'text-green-800', 
        label: '已录取' 
      },
    };
    
    const style = statusMap[status] || statusMap.pending;
    return (
      <span className={`${style.bg} ${style.text} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
        {style.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="面试进度" />
      
      <div className="pt-20 px-4 pb-6">
        {/* 学生信息 */}
        <Card className="mb-6">
          <Card.Body>
            <div className="flex items-center">
              <div className="bg-primary-100 rounded-full p-2.5">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">学生信息</p>
                <p className="font-medium text-gray-900">{interviewData.studentName} | {interviewData.studentId}</p>
              </div>
            </div>
          </Card.Body>
        </Card>
        
        {/* 面试信息卡片 */}
        {interviewData.volunteers.map((volunteer, index) => (
          <Card key={index} className="mb-6">
            <Card.Header className="flex justify-between items-center">
              <div className="font-medium text-gray-800">{volunteer.department}</div>
              <div className="flex items-center">
                {volunteer.type === 'special' && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                    特招
                  </span>
                )}
                {getStatusBadge(volunteer.status)}
              </div>
            </Card.Header>
            
            <Card.Body>
              {volunteer.status === 'interview' ? (
                <div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">面试时间</h3>
                    <p className="text-gray-900">{volunteer.interviewTime}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">面试地点</h3>
                    <p className="text-gray-900">{volunteer.interviewLocation}</p>
                  </div>
                  
                  {volunteer.feedback && (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">面试官备注</h3>
                      <p className="text-gray-900">{volunteer.feedback}</p>
                    </div>
                  )}
                  
                  {/* 二维码展示 */}
                  <div className="mt-6 flex flex-col items-center">
                    <p className="text-sm text-gray-500 mb-2">出示此二维码签到</p>
                    <div className="bg-white p-3 border border-gray-200 rounded-md">
                      {/* 这里用一个简单的正方形代替二维码，实际应用中应该生成真实二维码 */}
                      <div className="w-48 h-48 bg-gray-800 rounded-sm flex items-center justify-center">
                        <div className="w-40 h-40 bg-white rounded-sm flex items-center justify-center">
                          <div className="w-32 h-32 bg-gray-800 rounded-sm flex items-center justify-center text-white text-xs">
                            面试二维码
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">二维码有效期: 24小时</p>
                  </div>
                </div>
              ) : volunteer.status === 'pending' ? (
                <div className="text-center py-6">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500">您的申请正在审核中，请耐心等待</p>
                </div>
              ) : volunteer.status === 'rejected' ? (
                <div className="text-center py-6">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500">很遗憾，您未通过该部门的初筛</p>
                </div>
              ) : volunteer.status === 'accepted' ? (
                <div className="text-center py-6">
                  <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-green-600 font-medium">恭喜您！已被该部门录取</p>
                </div>
              ) : (
                <div className="text-center py-6">
                  <svg className="w-12 h-12 text-purple-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  <p className="text-gray-500">您已被列入候补名单，请关注后续通知</p>
                </div>
              )}
            </Card.Body>
          </Card>
        ))}
        
        {/* 提示信息 */}
        <div className="bg-blue-50 rounded-md p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-800">注意事项</h3>
              <ul className="mt-1 text-sm text-blue-700 list-disc list-inside space-y-1">
                <li>请按时参加面试，迟到可能会影响您的录取结果</li>
                <li>面试需携带学生证或其他有效证件</li>
                <li>如有特殊情况无法参加，请至少提前6小时联系相关部门</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewProgress;
