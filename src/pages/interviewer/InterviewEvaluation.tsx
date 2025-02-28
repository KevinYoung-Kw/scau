import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/shared/Header';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'radio' | 'checkbox' | 'select' | 'textarea' | 'rating';
  options?: string[];
  required?: boolean;
  value?: any;
  description?: string;
}

const InterviewEvaluation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const candidateId = searchParams.get('id');
  const candidateName = searchParams.get('name');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 模拟候选人数据
  const candidateInfo = {
    id: candidateId || '20230915001',
    name: candidateName || '张三',
    studentId: '2023030001',
    department: '技术部',
    volunteerType: 'special',
    college: '信息学院',
  };
  
  // 模拟动态表单字段
  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: 'professionalSkill',
      label: '专业能力',
      type: 'rating',
      required: true,
      value: 0,
      description: '评价候选人的专业知识和技术能力'
    },
    {
      id: 'communication',
      label: '沟通表达',
      type: 'rating',
      required: true,
      value: 0,
      description: '评价候选人的语言表达和沟通能力'
    },
    {
      id: 'teamwork',
      label: '团队协作',
      type: 'rating',
      required: true,
      value: 0,
      description: '评价候选人的团队合作意识和能力'
    },
    {
      id: 'creativity',
      label: '创新能力',
      type: 'rating',
      required: true,
      value: 0,
      description: '评价候选人的创新思维和解决问题能力'
    },
    {
      id: 'attitude',
      label: '学习态度',
      type: 'rating',
      required: true,
      value: 0,
      description: '评价候选人的学习热情和进取精神'
    },
    {
      id: 'techStack',
      label: '技术栈',
      type: 'checkbox',
      options: ['前端', '后端', '设计', '算法', '移动端', '测试', '运维', 'AI/机器学习'],
      value: [],
      description: '选择候选人擅长或有经验的技术领域'
    },
    {
      id: 'recommendation',
      label: '录取建议',
      type: 'radio',
      options: ['强烈推荐', '推荐', '待定', '不推荐'],
      required: true,
      value: '',
      description: '对候选人的综合评价和录取建议'
    },
    {
      id: 'comments',
      label: '面试评语',
      type: 'textarea',
      required: true,
      value: '',
      description: '详细描述候选人的表现、优缺点及其他备注信息'
    },
  ]);
  
  // 模拟加载评价模板
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      // 如果是真实环境，这里应该是从API获取表单配置
      setIsLoading(false);
    }, 800);
  }, []);
  
  // 更新表单字段值
  const updateFieldValue = (id: string, value: any) => {
    setFormFields(
      formFields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };
  
  // 计算总评分
  const calculateTotalScore = () => {
    const ratingFields = formFields.filter(field => field.type === 'rating');
    const totalPossible = ratingFields.length * 5; // 每个评分项最高5分
    const currentTotal = ratingFields.reduce((sum, field) => sum + (field.value || 0), 0);
    return {
      score: currentTotal,
      percentage: Math.round((currentTotal / totalPossible) * 100),
      maxScore: totalPossible
    };
  };
  
  // 检查表单是否有效
  const isFormValid = () => {
    return formFields.every((field) => !field.required || (field.value !== undefined && field.value !== "" && (Array.isArray(field.value) ? field.value.length > 0 : true)));
  };
  
  // 提交表单
  const handleSubmit = () => {
    if (!isFormValid()) {
      alert('请完成所有必填项');
      
      // 滚动到第一个无效字段
      const firstInvalidField = formFields.find(field => field.required && !field.value);
      if (firstInvalidField) {
        const element = document.getElementById(firstInvalidField.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('shake-animation');
          setTimeout(() => {
            element.classList.remove('shake-animation');
          }, 800);
        }
      }
      return;
    }
    
    setIsSubmitting(true);
    
    // 收集表单数据
    const formData = {
      candidateId: candidateInfo.id,
      candidateName: candidateInfo.name,
      department: candidateInfo.department,
      timestamp: new Date().toISOString(),
      scores: Object.fromEntries(
        formFields.filter(field => field.type === 'rating')
          .map(field => [field.id, field.value])
      ),
      evaluation: Object.fromEntries(
        formFields.filter(field => field.type !== 'rating')
          .map(field => [field.id, field.value])
      ),
      summary: {
        totalScore: calculateTotalScore().score,
        maxScore: calculateTotalScore().maxScore,
        recommendation: formFields.find(f => f.id === 'recommendation')?.value || ''
      }
    };
    
    console.log('提交的表单数据:', formData);
    
    // 模拟提交成功，2秒后跳转
    setTimeout(() => {
      setIsSubmitting(false);
      
      // 显示成功提示
      const successToast = document.createElement('div');
      successToast.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-6 py-3 rounded-lg z-50 flex items-center shadow-lg';
      successToast.innerHTML = `
        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        评价提交成功！
      `;
      document.body.appendChild(successToast);
      
      setTimeout(() => {
        document.body.removeChild(successToast);
        navigate('/interviewer');
      }, 1500);
      
    }, 2000);
  };
  
  // 渲染评分组件
  const renderRating = (field: FormField) => {
    return (
      <div id={field.id}>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <span className="text-sm text-gray-500">
            {field.value > 0 ? `${field.value} 分` : '未评分'}
          </span>
        </div>
        {field.description && (
          <p className="text-xs text-gray-500 mb-2">{field.description}</p>
        )}
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              type="button"
              onClick={() => updateFieldValue(field.id, score)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                field.value >= score
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {score}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  // 渲染单选框组
  const renderRadioGroup = (field: FormField) => {
    return (
      <div id={field.id}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        {field.description && (
          <p className="text-xs text-gray-500 mb-2">{field.description}</p>
        )}
        <div className="space-y-2">
          {field.options?.map((option) => (
            <div key={option} className="flex items-center">
              <input
                id={`${field.id}-${option}`}
                name={field.id}
                type="radio"
                checked={field.value === option}
                onChange={() => updateFieldValue(field.id, option)}
                className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <label htmlFor={`${field.id}-${option}`} className="ml-2 block text-sm text-gray-700">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // 渲染复选框组
  const renderCheckboxGroup = (field: FormField) => {
    return (
      <div id={field.id}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        {field.description && (
          <p className="text-xs text-gray-500 mb-2">{field.description}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {field.options?.map((option) => {
            const isChecked = Array.isArray(field.value) && field.value.includes(option);
            return (
              <label
                key={option}
                className={`inline-flex items-center px-3 py-2 rounded-lg text-sm transition-all cursor-pointer ${
                  isChecked
                    ? 'bg-primary-100 text-primary-800 border border-primary-200 shadow-sm'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isChecked}
                  onChange={() => {
                    const currentValues = Array.isArray(field.value) ? [...field.value] : [];
                    const newValues = isChecked
                      ? currentValues.filter((v) => v !== option)
                      : [...currentValues, option];
                    updateFieldValue(field.id, newValues);
                  }}
                />
                {option}
              </label>
            );
          })}
        </div>
      </div>
    );
  };
  
  // 渲染文本区域
  const renderTextarea = (field: FormField) => {
    return (
      <div id={field.id}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        {field.description && (
          <p className="text-xs text-gray-500 mb-2">{field.description}</p>
        )}
        <textarea
          id={field.id}
          value={field.value || ''}
          onChange={(e) => updateFieldValue(field.id, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
          rows={5}
          placeholder={`请输入${field.label}`}
        />
        {field.required && (
          <div className="flex justify-end mt-1">
            <span className="text-xs text-gray-500">
              {field.value ? `已输入 ${field.value.length} 字` : '必填'}
            </span>
          </div>
        )}
      </div>
    );
  };
  
  // 渲染表单字段
  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'rating':
        return renderRating(field);
      case 'radio':
        return renderRadioGroup(field);
      case 'checkbox':
        return renderCheckboxGroup(field);
      case 'textarea':
        return renderTextarea(field);
      default:
        return null;
    }
  };
  
  // 计算评分卡片的样式
  const getScoreCardStyle = () => {
    const { percentage } = calculateTotalScore();
    let gradientColor = 'from-gray-200 to-gray-300';
    let textColor = 'text-gray-600';
    
    if (percentage >= 90) {
      gradientColor = 'from-green-400 to-green-500';
      textColor = 'text-green-800';
    } else if (percentage >= 75) {
      gradientColor = 'from-primary-400 to-primary-500';
      textColor = 'text-primary-800';
    } else if (percentage >= 60) {
      gradientColor = 'from-yellow-400 to-yellow-500';
      textColor = 'text-yellow-800';
    } else if (percentage > 0) {
      gradientColor = 'from-orange-400 to-orange-500';
      textColor = 'text-orange-800';
    }
    
    return { gradientColor, textColor };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="面试评价" />
      
      <div className="pt-20 px-4 pb-6 max-w-lg mx-auto">
        {isLoading ? (
          // 加载状态
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">加载评价表单中...</p>
          </div>
        ) : (
          <>
            {/* 候选人信息卡片 */}
            <Card elevated className="mb-6">
              <Card.Body>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm text-gray-500">候选人信息</p>
                    <div className="flex items-center">
                      <p className="font-medium text-gray-900">
                        {candidateInfo.name} | {candidateInfo.studentId}
                      </p>
                      {candidateInfo.volunteerType === 'special' && (
                        <span className="ml-2 inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                          特招
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">申请部门</p>
                    <p className="font-medium text-gray-900">{candidateInfo.department}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {candidateInfo.college}
                </div>
              </Card.Body>
            </Card>
            
            {/* 分数汇总卡片 */}
            {calculateTotalScore().score > 0 && (
              <Card elevated className="mb-6 overflow-hidden">
                <div className={`bg-gradient-to-r ${getScoreCardStyle().gradientColor} p-4 text-white`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">综合评分</h3>
                      <p className="text-sm text-white/80">基于5个评分维度</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{calculateTotalScore().score}</div>
                      <p className="text-sm text-white/80">满分 {calculateTotalScore().maxScore}</p>
                    </div>
                  </div>
                  
                  {/* 进度条 */}
                  <div className="mt-2 h-2 bg-black/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white/70 rounded-full" 
                      style={{ width: `${calculateTotalScore().percentage}%` }}
                    ></div>
                  </div>
                  
                  {/* 评分分布 */}
                  <div className="mt-3 grid grid-cols-5 gap-1 text-center text-xs">
                    {formFields.filter(field => field.type === 'rating').map((field) => (
                      <div key={field.id} className={`p-1 rounded ${field.value > 0 ? 'bg-white/10' : ''}`}>
                        <div className="font-medium">{field.value || '-'}</div>
                        <div className="truncate text-white/70">{field.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Card.Body className={`text-sm ${getScoreCardStyle().textColor}`}>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>根据得分情况给出录取建议，完成全部评分后提交</span>
                  </div>
                </Card.Body>
              </Card>
            )}
            
            {/* 评价表单 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">面试评价表</h2>
                
                {/* 必填项提示 */}
                <div className="text-xs text-gray-500 flex items-center">
                  <span className="text-red-500 mr-1">*</span>
                  <span>必填项</span>
                </div>
              </div>
              
              <div className="space-y-5">
                {formFields.map((field) => (
                  <Card key={field.id} className="overflow-visible">
                    <Card.Body>{renderField(field)}</Card.Body>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* 操作按钮 */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
              <div className="max-w-lg mx-auto flex space-x-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate(-1)}
                  disabled={isSubmitting}
                >
                  返回
                </Button>
                <Button
                  fullWidth
                  onClick={handleSubmit}
                  disabled={!isFormValid() || isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      正在提交...
                    </div>
                  ) : '提交评价'}
                </Button>
              </div>
            </div>
            
            {/* 为底部按钮预留空间 */}
            <div className="h-20"></div>
          </>
        )}
      </div>
      
      {/* 额外样式 */}
      <style jsx global>{`
        .shake-animation {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
          40%, 60% { transform: translate3d(3px, 0, 0); }
        }
      `}</style>
    </div>
  );
};

export default InterviewEvaluation;