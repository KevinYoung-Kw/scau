import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Header from '../../components/shared/Header';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import { useRecruitment } from '../../context/RecruitmentContext';

// 可选部门列表
const departments = [
  { 
    id: 'tech', 
    name: '技术部', 
    specialRecruitment: {
      available: true,
      eligibleMajors: ['计算机科学与技术', '软件工程', '信息安全', '数据科学与大数据技术', '人工智能'],
      eligibleColleges: ['信息学院', '数据科学学院']
    }
  },
  { 
    id: 'pr', 
    name: '宣传部', 
    specialRecruitment: {
      available: true,
      eligibleMajors: ['视觉传达设计', '美术学', '广告学', '艺术设计', '数字媒体艺术'],
      eligibleColleges: ['美术学院', '设计学院', '艺术学院', '传媒学院']
    }
  },
  { 
    id: 'hr', 
    name: '人力资源部', 
    specialRecruitment: {
      available: false
    }
  },
  { 
    id: 'event', 
    name: '策划部', 
    specialRecruitment: {
      available: true,
      eligibleMajors: ['市场营销', '行政管理', '公共关系', '会展经济与管理'],
      eligibleColleges: ['管理学院', '经济学院', '工商管理学院']
    }
  },
  { 
    id: 'external', 
    name: '外联部', 
    specialRecruitment: {
      available: false
    }
  },
];

interface SortableItemProps {
  id: string;
  index: number;
  name: string;
  onRemove: () => void;
}

// 可排序的志愿项组件
const SortableItem: React.FC<SortableItemProps> = ({ id, index, name, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="bg-white rounded-xl shadow-md p-4 mb-3 flex items-center justify-between"
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center">
        <div className="bg-primary-100 text-primary-600 font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3">
          {index + 1}
        </div>
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <div className="flex items-center">
        <button 
          type="button" 
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="移除"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-gray-400 ml-2 cursor-grab">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const VolunteerSelection: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'normal' | 'special'>('normal');
  const [selectedDepartments, setSelectedDepartments] = useState<Array<{id: string, name: string, type: 'normal' | 'special'}>>([]);
  const { student } = useRecruitment();
  
  // 设置拖拽传感器
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 处理拖拽结束事件
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setSelectedDepartments((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // 添加志愿
  const addDepartment = (deptId: string, deptName: string) => {
    // 检查是否已经添加过
    const alreadySelected = selectedDepartments.some(dept => dept.id === deptId);
    if (alreadySelected) {
      return;
    }
    
    // 检查是否已达到志愿上限
    if (selectedDepartments.length >= 2) {
      // 使用原生alert替代，实际应用中可使用更美观的提示组件
      alert('最多只能选择2个志愿');
      return;
    }
    
    // 添加新志愿
    setSelectedDepartments([
      ...selectedDepartments, 
      {
        id: deptId,
        name: deptName,
        type: activeTab
      }
    ]);
  };

  // 移除志愿
  const removeDepartment = (deptId: string) => {
    setSelectedDepartments(selectedDepartments.filter(dept => dept.id !== deptId));
  };

  // 提交志愿
  const submitVolunteers = () => {
    if (selectedDepartments.length === 0) {
      alert('请至少选择一个志愿');
      return;
    }
    
    // 模拟提交确认
    const confirmed = window.confirm(`确认提交${selectedDepartments.length}个志愿？提交后将不能修改！`);
    if (confirmed) {
      // 模拟提交操作，显示加载状态
      const loadingToast = document.createElement('div');
      loadingToast.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800/80 text-white px-6 py-3 rounded-lg z-50 flex items-center';
      loadingToast.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        正在提交...
      `;
      document.body.appendChild(loadingToast);
      
      // 实际应用中应该调用API提交数据
      setTimeout(() => {
        document.body.removeChild(loadingToast);
        navigate('/student/progress');
      }, 1500);
    }
  };

  // 检查是否可以选择某个部门
  const canSelectDepartment = (deptId: string, deptHasSpecial: boolean) => {
    // 如果是特招标签，但部门没有特招通道
    if (activeTab === 'special' && !deptHasSpecial) {
      return false;
    }
    
    // 如果已经选了这个部门
    if (selectedDepartments.some(d => d.id === deptId)) {
      return false;
    }
    
    // 如果已经选了特招部门，不能再选普通部门
    if (activeTab === 'normal' && selectedDepartments.some(d => d.type === 'special')) {
      return false;
    }
    
    // 如果已经选了普通部门，不能再选特招部门
    if (activeTab === 'special' && selectedDepartments.some(d => d.type === 'normal')) {
      return false;
    }
    
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="志愿填报" />
      
      <div className="pt-20 px-4 pb-6 max-w-lg mx-auto">
        {/* 提示卡片 */}
        <Card elevated className="mb-6">
          <Card.Body>
            <div className="flex items-start">
              <div className="bg-blue-50 rounded-full p-2 mr-3">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">志愿填报说明</h3>
                <p className="text-sm text-gray-600">
                  请最多选择2个志愿部门，可通过<span className="text-primary-600 font-medium">拖拽调整志愿顺序</span>。第一志愿录取优先级更高。
                </p>
                <div className="mt-3 p-2 bg-yellow-50 border border-yellow-100 rounded-md">
                  <p className="text-xs text-yellow-700">
                    <span className="font-medium">特别提醒：</span>
                    特招通道与普通招新互斥，一旦选择特招部门则不能再选普通部门。
                  </p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
        
        {/* 已选志愿列表 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">已选志愿</h2>
            <span className="text-sm text-gray-500">
              {selectedDepartments.length}/2 个志愿
            </span>
          </div>
          
          {selectedDepartments.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="bg-gray-100 rounded-xl p-4">
                <SortableContext
                  items={selectedDepartments.map(dept => dept.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {selectedDepartments.map((dept, index) => (
                    <SortableItem
                      key={dept.id}
                      id={dept.id}
                      index={index}
                      name={`${dept.name} ${dept.type === 'special' ? '(特招)' : ''}`}
                      onRemove={() => removeDepartment(dept.id)}
                    />
                  ))}
                </SortableContext>
                
                <div className="mt-2 text-center text-sm text-gray-500 flex justify-center items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  拖拽调整志愿优先级
                </div>
              </div>
            </DndContext>
          ) : (
            <div className="bg-gray-100 rounded-xl p-8 text-center flex flex-col items-center">
              <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 15h2m-6 4h12a2 2 0 002-2v-3a2 2 0 00-2-2h-3V8a5 5 0 00-10 0v4H3a2 2 0 00-2 2v3a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500">请从下方选择你心仪的部门</p>
            </div>
          )}
        </div>
        
        {/* 部门选择区 */}
        <Card elevated className="mb-6">
          <div className="flex border-b">
            <button
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                activeTab === 'normal' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('normal')}
            >
              普通招新
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                activeTab === 'special' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('special')}
            >
              特招通道
            </button>
          </div>
          
          <Card.Body>
            {activeTab === 'normal' ? (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  选择你喜欢的部门，最多可选择2个
                </p>
                <div className="space-y-3">
                  {departments.map((dept) => {
                    const isDisabled = !canSelectDepartment(dept.id, dept.specialRecruitment.available);
                    return (
                      <button
                        key={dept.id}
                        onClick={() => !isDisabled && addDepartment(dept.id, dept.name)}
                        className={`w-full text-left px-4 py-3 border rounded-lg transition-all ${
                          isDisabled
                            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                            : 'border-gray-200 hover:border-primary-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500'
                        }`}
                        disabled={isDisabled}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-800'}`}>{dept.name}</span>
                          {selectedDepartments.some(d => d.id === dept.id) ? (
                            <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  特招通道需满足部门特定要求，一旦选择特招将不能选择普通招新
                </p>
                <div className="space-y-3">
                  {departments.filter(dept => dept.specialRecruitment.available).map((dept) => {
                    const isDisabled = !canSelectDepartment(dept.id, dept.specialRecruitment.available);
                    return (
                      <button
                        key={dept.id}
                        onClick={() => !isDisabled && addDepartment(dept.id, dept.name)}
                        className={`w-full text-left px-4 py-3 border rounded-lg transition-all ${
                          isDisabled
                            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                            : 'border-gray-200 hover:border-primary-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500'
                        }`}
                        disabled={isDisabled}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className={`font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-800'}`}>{dept.name}</span>
                            <span className="ml-2 inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">特招</span>
                          </div>
                          {selectedDepartments.some(d => d.id === dept.id) ? (
                            <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          )}
                        </div>
                      </button>
                    );
                  })}
                  
                  {departments.filter(dept => dept.specialRecruitment.available).length === 0 && (
                    <div className="py-10 text-center text-gray-500">
                      没有可选择的特招部门
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
        
        <Button 
          fullWidth 
          size="lg" 
          onClick={submitVolunteers}
          disabled={selectedDepartments.length === 0}
        >
          提交志愿
        </Button>
      </div>
    </div>
  );
};

export default VolunteerSelection;
