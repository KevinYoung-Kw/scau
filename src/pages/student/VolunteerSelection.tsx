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
  isSpecial: boolean;
  onRemove: () => void;
}

// 可排序的志愿项组件
const SortableItem: React.FC<SortableItemProps> = ({ id, index, name, isSpecial, onRemove }) => {
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
        <div>
          <span className="font-medium text-gray-800">{name}</span>
          {isSpecial && (
            <span className="ml-2 inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
              特招
            </span>
          )}
        </div>
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
  const [selectedDepartments, setSelectedDepartments] = useState<Array<{
    id: string, 
    name: string, 
    isSpecial: boolean
  }>>([]);
  const { student } = useRecruitment();
  
  // 模拟用户信息，实际中应从 context 或 API 获取
  const [userInfo] = useState({
    studentId: '202301001',
    name: '张三',
    major: '计算机科学与技术',
    college: '信息学院'
  });

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

  // 检查用户是否符合特招条件
  const checkSpecialEligibility = (deptId: string) => {
    const dept = departments.find(d => d.id === deptId);
    if (!dept || !dept.specialRecruitment.available) return false;
    
    const { eligibleMajors, eligibleColleges } = dept.specialRecruitment;
    return eligibleMajors.includes(userInfo.major) || eligibleColleges.includes(userInfo.college);
  };

  // 添加志愿
  const addDepartment = (deptId: string, deptName: string, isSpecial: boolean) => {
    // 检查是否已经添加过
    const alreadySelected = selectedDepartments.some(dept => dept.id === deptId);
    if (alreadySelected) {
      return;
    }
    
    // 检查是否已达到志愿上限
    if (selectedDepartments.length >= 2) {
      alert('最多只能选择2个志愿');
      return;
    }

    // 如果选择特招，需要检查是否符合条件
    if (isSpecial && !checkSpecialEligibility(deptId)) {
      alert('您不符合该部门特招条件');
      return;
    }
    
    // 添加新志愿
    setSelectedDepartments([
      ...selectedDepartments, 
      {
        id: deptId,
        name: deptName,
        isSpecial: isSpecial
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

    // 预测面试方式
    const allSpecial = selectedDepartments.every(dept => dept.isSpecial);
    const interviewMethod = allSpecial ? "特招面试" : "联合面试";
    
    // 模拟提交确认
    const confirmed = window.confirm(`您选择的志愿包含${selectedDepartments.some(d => d.isSpecial) ? '特招部门，' : ''}将参加${interviewMethod}。确认提交吗？`);
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

  // 部门列表，根据是否有特招资格过滤
  const filteredDepartments = departments.filter(dept => {
    // 所有部门都可以正常报名
    return true;
  });

  // 当前部门有特招资格的部门列表
  const eligibleSpecialDepts = departments.filter(dept => 
    dept.specialRecruitment.available && checkSpecialEligibility(dept.id)
  );

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
                <p className="text-sm text-gray-600 mb-2">
                  请最多选择2个志愿部门，可通过<span className="text-primary-600 font-medium">拖拽调整志愿顺序</span>。第一志愿录取优先级更高。
                </p>
                {eligibleSpecialDepts.length > 0 && (
                  <div className="p-2 bg-yellow-50 border border-yellow-100 rounded-md mb-2">
                    <p className="text-xs text-yellow-700">
                      <span className="font-medium">特招资格提示：</span>
                      您符合 {eligibleSpecialDepts.map(d => d.name).join('、')} 的特招条件。
                    </p>
                  </div>
                )}
                <div className="p-2 bg-blue-50 border border-blue-100 rounded-md">
                  <p className="text-xs text-blue-700">
                    <span className="font-medium">面试说明：</span>
                    如果您的志愿均为特招且符合条件，将直接参加特招面试；否则需参加联合面试。
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
                      name={dept.name}
                      isSpecial={dept.isSpecial}
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
          <Card.Body>
            <h3 className="font-medium text-gray-800 mb-4">选择部门</h3>
            <div className="space-y-3">
              {filteredDepartments.map((dept) => {
                // 判断该部门是否有特招资格
                const hasSpecialOption = dept.specialRecruitment.available && checkSpecialEligibility(dept.id);
                // 该部门是否已被选中
                const isSelected = selectedDepartments.some(d => d.id === dept.id);

                return (
                  <div key={dept.id} className="border rounded-lg overflow-hidden">
                    {/* 部门名称 */}
                    <div className="px-4 py-3 bg-gray-50 border-b flex justify-between items-center">
                      <span className="font-medium text-gray-800">{dept.name}</span>
                      {isSelected && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          已选择
                        </span>
                      )}
                    </div>
                    
                    {/* 招募选项 */}
                    <div className={`p-3 ${isSelected ? 'opacity-50' : ''}`}>
                      {/* 普通招新选项 */}
                      <button
                        onClick={() => !isSelected && addDepartment(dept.id, dept.name, false)}
                        disabled={isSelected}
                        className={`w-full text-left mb-2 px-4 py-3 border rounded-lg transition-all ${
                          isSelected
                            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                            : 'border-gray-200 hover:border-primary-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`${isSelected ? 'text-gray-400' : 'text-gray-800'}`}>普通招新</span>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                      </button>
                      
                      {/* 特招选项，仅当用户符合条件时显示 */}
                      {hasSpecialOption && (
                        <button
                          onClick={() => !isSelected && addDepartment(dept.id, dept.name, true)}
                          disabled={isSelected}
                          className={`w-full text-left px-4 py-3 border rounded-lg transition-all ${
                            isSelected
                              ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                              : 'border-yellow-200 bg-yellow-50 hover:border-yellow-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <span className={`${isSelected ? 'text-gray-400' : 'text-gray-800'}`}>特招通道</span>
                              <span className="ml-2 inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                                符合条件
                              </span>
                            </div>
                            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            特招可直接参加专业面试，您已符合条件
                          </p>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card.Body>
        </Card>
        
        {/* 预测面试方式区域 */}
        {selectedDepartments.length > 0 && (
          <Card className="mb-6">
            <Card.Body>
              <h3 className="font-medium text-gray-800 mb-2">面试通知预览</h3>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  根据您的志愿选择，您将参加：
                </p>
                <p className="mt-2 font-medium">
                  {selectedDepartments.every(dept => dept.isSpecial) ? (
                    <span className="text-yellow-600">
                      <span className="inline-block w-2 h-2 rounded-full bg-yellow-600 mr-1.5 align-middle"></span>
                      特招面试（各部门单独面试）
                    </span>
                  ) : (
                    <span className="text-primary-600">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary-600 mr-1.5 align-middle"></span>
                      科联联合面试
                    </span>
                  )}
                </p>
              </div>
            </Card.Body>
          </Card>
        )}
        
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
