import React, { useState, useMemo } from 'react';
import Header from '../../components/shared/Header';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';

interface Candidate {
  id: string;
  name: string;
  studentId: string;
  department: string;
  volunteerType: 'normal' | 'special';
  status: 'pending' | 'interview' | 'waitlist' | 'accepted' | 'rejected';
  college: string;
  interviewTime?: string;
  selected?: boolean;
}

const BatchOperations: React.FC = () => {
  // 模拟候选人数据
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: '001', name: '张三', studentId: '2023030001', department: '技术部', volunteerType: 'special', status: 'pending', college: '信息学院', selected: false },
    { id: '002', name: '李四', studentId: '2023030002', department: '技术部', volunteerType: 'normal', status: 'pending', college: '工学院', selected: false },
    { id: '003', name: '王五', studentId: '2023030003', department: '技术部', volunteerType: 'special', status: 'interview', college: '信息学院', interviewTime: '2023-09-15 14:30', selected: false },
    { id: '004', name: '赵六', studentId: '2023030004', department: '技术部', volunteerType: 'normal', status: 'interview', college: '经济学院', interviewTime: '2023-09-15 15:00', selected: false },
    { id: '005', name: '钱七', studentId: '2023030005', department: '技术部', volunteerType: 'normal', status: 'waitlist', college: '管理学院', selected: false },
    { id: '006', name: '孙八', studentId: '2023030006', department: '技术部', volunteerType: 'normal', status: 'accepted', college: '外语学院', selected: false },
    { id: '007', name: '周九', studentId: '2023030007', department: '技术部', volunteerType: 'special', status: 'rejected', college: '信息学院', selected: false },
  ]);
  
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'interview' | 'waitlist' | 'accepted' | 'rejected'>('all');
  const [selectedAction, setSelectedAction] = useState<'notify' | 'status' | 'location' | 'time'>('notify');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 根据当前标签和搜索过滤候选人
  const filteredCandidates = useMemo(() => {
    let result = candidates;
    
    // 状态过滤
    if (activeTab !== 'all') {
      result = result.filter(c => c.status === activeTab);
    }
    
    // 搜索过滤
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(
        c => c.name.toLowerCase().includes(lowerCaseQuery) || 
             c.studentId.includes(searchQuery) ||
             c.college.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    return result;
  }, [candidates, activeTab, searchQuery]);
  
  // 选中的候选人数量
  const selectedCount = candidates.filter(c => c.selected).length;
  
  // 切换单个候选人选中状态
  const toggleSelect = (id: string) => {
    setCandidates(candidates.map(c => 
      c.id === id ? { ...c, selected: !c.selected } : c
    ));
  };
  
  // 切换所有候选人选中状态
  const toggleSelectAll = () => {
    const allSelected = filteredCandidates.every(c => c.selected);
    setCandidates(candidates.map(c => 
      filteredCandidates.includes(c) ? { ...c, selected: !allSelected } : c
    ));
  };
  
  // 批量更新状态
  const updateStatus = (newStatus: 'pending' | 'interview' | 'waitlist' | 'accepted' | 'rejected') => {
    setCandidates(candidates.map(c => 
      c.selected ? { ...c, status: newStatus, selected: false } : c
    ));
    
    // 显示操作成功提示
    showToast(`已将${selectedCount}名候选人状态更新为${getStatusLabel(newStatus)}`);
  };
  
  // 批量设置面试时间
  const setInterviewTime = (time: string) => {
    setCandidates(candidates.map(c => 
      c.selected ? { ...c, interviewTime: time, selected: false } : c
    ));
    
    showToast(`已为${selectedCount}名候选人设置面试时间`);
  };
  
  // 批量发送通知
  const sendNotification = (templateType: string) => {
    // 在实际应用中，这里应该调用API发送通知
    console.log(`发送${templateType}通知给${selectedCount}名候选人`);
    
    // 取消选中状态
    setCandidates(candidates.map(c => 
      c.selected ? { ...c, selected: false } : c
    ));
    
    showToast(`已向${selectedCount}名候选人发送通知`);
  };
  
  // 显示操作成功提示
  const showToast = (message: string) => {
    const toastElement = document.createElement('div');
    toastElement.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg z-50';
    toastElement.textContent = message;
    document.body.appendChild(toastElement);
    
    setTimeout(() => {
      toastElement.style.opacity = '0';
      toastElement.style.transition = 'opacity 0.5s';
      
      setTimeout(() => {
        document.body.removeChild(toastElement);
      }, 500);
    }, 2000);
  };
  
  // 获取状态标签文本
  const getStatusLabel = (status: string): string => {
    const statusLabels: Record<string, string> = {
      pending: '待审核',
      interview: '待面试',
      waitlist: '候补',
      rejected: '未通过',
      accepted: '已录取'
    };
    return statusLabels[status] || '未知';
  };
  
  // 获取状态标签样式和文字
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string, text: string }> = {
      pending: { 
        bg: 'bg-blue-100', 
        text: 'text-blue-800'
      },
      interview: { 
        bg: 'bg-yellow-100', 
        text: 'text-yellow-800'
      },
      waitlist: { 
        bg: 'bg-purple-100', 
        text: 'text-purple-800'
      },
      rejected: { 
        bg: 'bg-gray-100', 
        text: 'text-gray-800'
      },
      accepted: { 
        bg: 'bg-green-100', 
        text: 'text-green-800'
      },
    };
    
    const style = statusMap[status] || statusMap.pending;
    const label = getStatusLabel(status);
    
    return (
      <span className={`${style.bg} ${style.text} text-xs font-medium px-2 py-0.5 rounded-full`}>
        {label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="批量操作" />
      
      <div className="pt-20 px-4 pb-20 max-w-lg mx-auto">
        {/* 搜索框 */}
        <div className="relative mb-4">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="搜索姓名、学号、学院..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchQuery && (
            <button 
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              onClick={() => setSearchQuery('')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {/* 筛选标签 */}
        <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 mb-4 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: '全部' },
            { id: 'pending', label: '待审核' },
            { id: 'interview', label: '待面试' },
            { id: 'waitlist', label: '候补' },
            { id: 'accepted', label: '已录取' },
            { id: 'rejected', label: '未通过' },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`py-2.5 px-3 text-center text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* 筛选结果统计 */}
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm text-gray-500">
            共 <span className="font-medium text-gray-700">{filteredCandidates.length}</span> 名候选人
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={filteredCandidates.length > 0 && filteredCandidates.every(c => c.selected)}
              onChange={toggleSelectAll}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              disabled={filteredCandidates.length === 0}
            />
            <label className="ml-2 text-sm text-gray-500">
              {selectedCount > 0 ? `已选择 ${selectedCount} 人` : "全选"}
            </label>
          </div>
        </div>
        
        {/* 候选人列表 */}
        <div className="space-y-2 mb-6">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate) => (
              <Card key={candidate.id} className={`transition duration-200 border-l-4 ${
                candidate.selected ? 'border-primary-500 bg-primary-50' : 'border-transparent'
              }`}>
                <div className="flex items-center p-3">
                  <input
                    type="checkbox"
                    checked={candidate.selected}
                    onChange={() => toggleSelect(candidate.id)}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <h3 className="text-gray-900 font-medium">{candidate.name}</h3>
                        {candidate.volunteerType === 'special' && (
                          <span className="ml-2 inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                            特招
                          </span>
                        )}
                      </div>
                      {getStatusBadge(candidate.status)}
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <p className="text-sm text-gray-500">{candidate.studentId}</p>
                      <p className="text-sm text-gray-500">{candidate.college}</p>
                    </div>
                    {candidate.interviewTime && (
                      <div className="text-xs text-gray-500 mt-1 flex items-center">
                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        面试时间: {candidate.interviewTime}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500">没有找到符合条件的候选人</p>
            </div>
          )}
        </div>
        
        {/* 批量操作区 */}
        {selectedCount > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
            <div className="max-w-lg mx-auto">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900">批量操作 ({selectedCount}人)</h3>
                <select 
                  className="text-sm border border-gray-300 rounded-md py-1.5 px-3 focus:ring-primary-500 focus:border-primary-500 bg-white"
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value as any)}
                >
                  <option value="notify">发送通知</option>
                  <option value="status">更新状态</option>
                  <option value="location">设置面试地点</option>
                  <option value="time">设置面试时间</option>
                </select>
              </div>
              
              {selectedAction === 'notify' && (
                <div>
                  <select className="w-full mb-3 border border-gray-300 rounded-lg py-2.5 px-3 focus:ring-primary-500 focus:border-primary-500 bg-white">
                    <option value="">请选择通知模板</option>
                    <option value="interview">面试通知</option>
                    <option value="result">结果通知</option>
                    <option value="supplement">补充资料通知</option>
                  </select>
                  <Button 
                    fullWidth 
                    onClick={() => sendNotification('面试通知')}
                  >
                    发送通知
                  </Button>
                </div>
              )}
              
              {selectedAction === 'status' && (
                <div>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <Button variant="outline" size="sm" onClick={() => updateStatus('interview')}>
                      设为待面试
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => updateStatus('waitlist')}>
                      设为候补
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => updateStatus('pending')}>
                      设为待审核
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="success" size="sm" onClick={() => updateStatus('accepted')}>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      录取
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => updateStatus('rejected')}>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      淘汰
                    </Button>
                  </div>
                </div>
              )}
              
              {selectedAction === 'location' && (
                <div>
                  <select className="w-full mb-3 border border-gray-300 rounded-lg py-2.5 px-3 focus:ring-primary-500 focus:border-primary-500 bg-white">
                    <option value="">请选择面试地点</option>
                    <option value="301">学生活动中心 301</option>
                    <option value="302">学生活动中心 302</option>
                    <option value="203">信息学院 203</option>
                    <option value="online">线上面试</option>
                  </select>
                  <Button fullWidth>
                    确认设置
                  </Button>
                </div>
              )}
              
              {selectedAction === 'time' && (
                <div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">日期</label>
                      <input 
                        type="date" 
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-primary-500 focus:border-primary-500 bg-white" 
                        defaultValue="2023-09-15"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">时间</label>
                      <input 
                        type="time" 
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-primary-500 focus:border-primary-500 bg-white" 
                        defaultValue="14:30"
                      />
                    </div>
                  </div>
                  <Button 
                    fullWidth
                    onClick={() => setInterviewTime('2023-09-15 14:30')}
                  >
                    确认设置
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default BatchOperations;
