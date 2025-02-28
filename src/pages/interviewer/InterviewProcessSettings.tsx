import React, { useState } from 'react';
import Header from '../../components/shared/Header';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';

interface ProcessStep {
  id: string;
  name: string;
  description: string;
  duration: number;
  isRequired: boolean;
  order: number;
}

interface EvaluationCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  maxScore: number;
}

const InterviewProcessSettings: React.FC = () => {
  // 面试流程步骤
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([
    {
      id: '1',
      name: '简历筛选',
      description: '审核学生提交的简历，筛选合适的候选人进入初面环节',
      duration: 0, // 0 表示没有固定时长
      isRequired: true,
      order: 1
    },
    {
      id: '2',
      name: '初面',
      description: '与候选人进行初步面谈，了解基本情况和技能水平',
      duration: 15, // 分钟
      isRequired: true,
      order: 2
    },
    {
      id: '3',
      name: '技术测试',
      description: '针对技术岗位的候选人进行编程或专业知识测试',
      duration: 30,
      isRequired: false,
      order: 3
    },
    {
      id: '4',
      name: '复面',
      description: '对通过初面的候选人进行深入面试',
      duration: 20,
      isRequired: true,
      order: 4
    }
  ]);

  // 评分标准
  const [evaluationCriteria, setEvaluationCriteria] = useState<EvaluationCriteria[]>([
    {
      id: '1',
      name: '专业能力',
      description: '对专业知识的掌握程度和应用能力',
      weight: 30,
      maxScore: 100
    },
    {
      id: '2',
      name: '沟通表达',
      description: '语言表达能力、逻辑性和条理性',
      weight: 20,
      maxScore: 100
    },
    {
      id: '3',
      name: '团队协作',
      description: '与团队成员合作的能力和意愿',
      weight: 20,
      maxScore: 100
    },
    {
      id: '4',
      name: '学习能力',
      description: '接受新知识、新技能的能力',
      weight: 15,
      maxScore: 100
    },
    {
      id: '5',
      name: '创新思维',
      description: '提出创新想法和解决问题的能力',
      weight: 15,
      maxScore: 100
    }
  ]);

  // 编辑状态
  const [editingStep, setEditingStep] = useState<ProcessStep | null>(null);
  const [editingCriteria, setEditingCriteria] = useState<EvaluationCriteria | null>(null);
  const [isEditingStep, setIsEditingStep] = useState(false);
  const [isEditingCriteria, setIsEditingCriteria] = useState(false);

  // 处理步骤拖动
  const handleMoveStep = (id: string, direction: 'up' | 'down') => {
    const currentIndex = processSteps.findIndex(step => step.id === id);
    if (
      (direction === 'up' && currentIndex === 0) || 
      (direction === 'down' && currentIndex === processSteps.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newSteps = [...processSteps];
    
    // 交换位置
    const temp = newSteps[currentIndex];
    newSteps[currentIndex] = newSteps[newIndex];
    newSteps[newIndex] = temp;

    // 更新顺序号
    const updatedSteps = newSteps.map((step, index) => ({
      ...step,
      order: index + 1
    }));

    setProcessSteps(updatedSteps);
  };

  // 处理添加/编辑步骤
  const handleAddStep = () => {
    setEditingStep({
      id: '',
      name: '',
      description: '',
      duration: 15,
      isRequired: true,
      order: processSteps.length + 1
    });
    setIsEditingStep(true);
  };

  const handleEditStep = (step: ProcessStep) => {
    setEditingStep({...step});
    setIsEditingStep(true);
  };

  const handleSaveStep = () => {
    if (!editingStep) return;

    if (editingStep.id) {
      // 更新现有步骤
      setProcessSteps(processSteps.map(step => 
        step.id === editingStep.id ? editingStep : step
      ));
    } else {
      // 添加新步骤
      setProcessSteps([
        ...processSteps, 
        { 
          ...editingStep, 
          id: Date.now().toString(),
        }
      ]);
    }
    
    setIsEditingStep(false);
    setEditingStep(null);
  };

  // 处理添加/编辑评分标准
  const handleAddCriteria = () => {
    setEditingCriteria({
      id: '',
      name: '',
      description: '',
      weight: 20,
      maxScore: 100
    });
    setIsEditingCriteria(true);
  };

  const handleEditCriteria = (criteria: EvaluationCriteria) => {
    setEditingCriteria({...criteria});
    setIsEditingCriteria(true);
  };

  const handleSaveCriteria = () => {
    if (!editingCriteria) return;

    if (editingCriteria.id) {
      // 更新现有标准
      setEvaluationCriteria(evaluationCriteria.map(criteria => 
        criteria.id === editingCriteria.id ? editingCriteria : criteria
      ));
    } else {
      // 添加新标准
      setEvaluationCriteria([
        ...evaluationCriteria, 
        { 
          ...editingCriteria, 
          id: Date.now().toString(),
        }
      ]);
    }
    
    setIsEditingCriteria(false);
    setEditingCriteria(null);
  };

  // 处理删除操作
  const handleDeleteStep = (id: string) => {
    setProcessSteps(processSteps.filter(step => step.id !== id));
  };

  const handleDeleteCriteria = (id: string) => {
    setEvaluationCriteria(evaluationCriteria.filter(criteria => criteria.id !== id));
  };

  // 计算权重总和
  const totalWeight = evaluationCriteria.reduce((sum, criteria) => sum + criteria.weight, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <Header title="面试流程设置" />
      
      <div className="pt-20 px-4 max-w-lg mx-auto">
        {/* 面试流程设置 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">面试流程设置</h2>
            <Button 
              onClick={handleAddStep}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              }
              size="sm"
            >
              添加步骤
            </Button>
          </div>
          
          {/* 流程步骤 */}
          <div className="space-y-3">
            {processSteps.map((step, index) => (
              <Card key={step.id} className="border-l-4 border-primary-500">
                <div className="flex items-start p-4">
                  {/* 序号圆圈 */}
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold text-sm mr-3">
                    {step.order}
                  </div>
                  
                  {/* 内容区 */}
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-900">{step.name}</h3>
                        {step.isRequired ? (
                          <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">必要</span>
                        ) : (
                          <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">可选</span>
                        )}
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        {step.duration ? `${step.duration}分钟` : '无固定时长'}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    
                    {/* 操作按钮 */}
                    <div className="flex justify-end mt-3 space-x-2">
                      <div className="flex space-x-1 mr-auto">
                        <button 
                          onClick={() => handleMoveStep(step.id, 'up')}
                          disabled={index === 0}
                          className={`p-1 rounded ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleMoveStep(step.id, 'down')}
                          disabled={index === processSteps.length - 1}
                          className={`p-1 rounded ${index === processSteps.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="xs"
                        onClick={() => handleDeleteStep(step.id)}
                        className="!px-1.5 !py-1"
                      >
                        <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                      <Button 
                        variant="primary" 
                        size="xs"
                        onClick={() => handleEditStep(step)}
                        className="!px-1.5 !py-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            {processSteps.length === 0 && (
              <div className="text-center py-8 bg-gray-50 border border-gray-200 border-dashed rounded-lg">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <p className="text-gray-500">暂无面试流程，点击"添加步骤"开始设置</p>
              </div>
            )}
          </div>
        </div>
        
        {/* 评分标准设置 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">评分标准设置</h2>
            <Button 
              onClick={handleAddCriteria}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              }
              size="sm"
            >
              添加标准
            </Button>
          </div>
          
          {/* 权重总计 */}
          <div className={`mb-4 p-3 rounded-lg ${totalWeight === 100 ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {totalWeight === 100 ? (
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
                <div>
                  <span className="text-sm font-medium">权重总计: </span>
                  <span className={`font-bold ${totalWeight === 100 ? 'text-green-600' : 'text-yellow-600'}`}>{totalWeight}%</span>
                </div>
              </div>
              
              {totalWeight !== 100 && (
                <span className="text-xs text-yellow-700">权重总和应为100%</span>
              )}
            </div>
          </div>
          
          {/* 评分标准列表 */}
          <div className="space-y-3">
            {evaluationCriteria.map(criteria => (
              <Card key={criteria.id}>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{criteria.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      权重 {criteria.weight}%
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{criteria.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">满分值: {criteria.maxScore}分</span>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="xs"
                        onClick={() => handleDeleteCriteria(criteria.id)}
                      >
                        删除
                      </Button>
                      <Button 
                        variant="primary" 
                        size="xs"
                        onClick={() => handleEditCriteria(criteria)}
                      >
                        编辑
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            {evaluationCriteria.length === 0 && (
              <div className="text-center py-8 bg-gray-50 border border-gray-200 border-dashed rounded-lg">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <p className="text-gray-500">暂无评分标准，点击"添加标准"开始设置</p>
              </div>
            )}
          </div>
        </div>
        
        {/* 保存按钮 */}
        <div className="sticky bottom-4 bg-white shadow-lg border border-gray-200 rounded-lg p-3 mt-8">
          <Button variant="primary" fullWidth>
            保存设置
          </Button>
          <p className="text-xs text-gray-500 text-center mt-2">
            设置将应用于部门所有面试官
          </p>
        </div>
      </div>
      
      {/* 编辑步骤模态框 */}
      {isEditingStep && editingStep && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-lg text-gray-800">
                {editingStep.id ? '编辑面试步骤' : '添加面试步骤'}
              </h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  步骤名称
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  value={editingStep.name}
                  onChange={e => setEditingStep({...editingStep, name: e.target.value})}
                  placeholder="例如：初面、复试"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  步骤描述
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 h-20"
                  value={editingStep.description}
                  onChange={e => setEditingStep({...editingStep, description: e.target.value})}
                  placeholder="简要描述此步骤的内容和目标"
                />
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    时长（分钟）
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    value={editingStep.duration}
                    onChange={e => setEditingStep({...editingStep, duration: parseInt(e.target.value) || 0})}
                    placeholder="0表示无固定时长"
                    min="0"
                  />
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    是否必要
                  </label>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={editingStep.isRequired}
                        onChange={e => setEditingStep({...editingStep, isRequired: e.target.checked})}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">设为必要步骤</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsEditingStep(false)}>
                取消
              </Button>
              <Button onClick={handleSaveStep}>
                保存
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* 编辑评分标准模态框 */}
      {isEditingCriteria && editingCriteria && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-lg text-gray-800">
                {editingCriteria.id ? '编辑评分标准' : '添加评分标准'}
              </h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  标准名称
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  value={editingCriteria.name}
                  onChange={e => setEditingCriteria({...editingCriteria, name: e.target.value})}
                  placeholder="例如：专业能力、沟通表达"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  标准描述
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 h-20"
                  value={editingCriteria.description}
                  onChange={e => setEditingCriteria({...editingCriteria, description: e.target.value})}
                  placeholder="简要描述此评分标准的评判要点"
                />
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    权重（%）
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    value={editingCriteria.weight}
                    onChange={e => setEditingCriteria({...editingCriteria, weight: parseInt(e.target.value) || 0})}
                    placeholder="占总分的百分比，所有权重应合计为100%"
                    min="1"
                    max="100"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    当前所有权重合计：{totalWeight + (editingCriteria.id ? 0 : editingCriteria.weight)}%
                  </p>
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    满分值
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    value={editingCriteria.maxScore}
                    onChange={e => setEditingCriteria({...editingCriteria, maxScore: parseInt(e.target.value) || 0})}
                    placeholder="这项标准的最高分值"
                    min="1"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsEditingCriteria(false)}>
                取消
              </Button>
              <Button onClick={handleSaveCriteria}>
                保存
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewProcessSettings;