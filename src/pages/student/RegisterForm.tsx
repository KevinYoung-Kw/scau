import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecruitment } from '../../context/RecruitmentContext';
import { useToast } from '../../hooks';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { verifyStudentId, dispatch } = useRecruitment();
  const { success, error } = useToast();
  
  // 设置默认预置数据
  const [formData, setFormData] = useState({
    name: '',
    studentId: '2023120192001', // 默认预填一个学号
    phone: '13800138000',
    wechat: 'wxid_example',
    email: 'student@example.com',
    college: '',
    major: '计算机科学与技术',
    avatar: null,
    biography: '我是一名热爱科技的大一新生，对编程和人工智能充满热情，希望能在校科联找到志同道合的伙伴。',
    skills: [
      { name: 'JavaScript', level: 3 },
      { name: 'Python', level: 4 },
      { name: 'UI设计', level: 2 },
    ],
    portfolioLinks: [
      { title: '个人博客', url: 'https://myblog.example.com' },
      { title: 'GitHub项目', url: 'https://github.com/example/project' }
    ],
    interests: ['编程开发', '人工智能', '新媒体运营'],
    achievements: '高中参加过信息学奥赛，获得省三等奖。大一上学期参与了校内小程序开发。'
  });
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [studentIdVerified, setStudentIdVerified] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // 表单字段变更处理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // 文件上传处理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: file
      });
      
      // 创建预览URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // 处理技能评级变更
  const handleSkillLevelChange = (skillName: string, level: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.name === skillName ? { ...skill, level } : skill
      )
    }));
  };
  
  // 添加新技能
  const handleAddSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: '', level: 1 }]
    }));
  };
  
  // 移除技能
  const handleRemoveSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };
  
  // 添加作品链接
  const handleAddPortfolioLink = () => {
    setFormData(prev => ({
      ...prev,
      portfolioLinks: [...prev.portfolioLinks, { title: '', url: '' }]
    }));
  };
  
  // 更新作品链接
  const handleUpdatePortfolioLink = (index: number, field: 'title' | 'url', value: string) => {
    setFormData(prev => ({
      ...prev,
      portfolioLinks: prev.portfolioLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };
  
  // 移除作品链接
  const handleRemovePortfolioLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      portfolioLinks: prev.portfolioLinks.filter((_, i) => i !== index)
    }));
  };
  
  // 兴趣标签选择处理
  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const interests = prev.interests as string[];
      if (interests.includes(interest)) {
        return {
          ...prev,
          interests: interests.filter(i => i !== interest)
        };
      } else {
        return {
          ...prev,
          interests: [...interests, interest]
        };
      }
    });
  };
  
  // 学号验证处理
  const handleVerifyStudentId = async () => {
    if (!formData.studentId || formData.studentId.length !== 13) {
      error('请输入正确的13位学号');
      return;
    }
    
    setLoading(true);
    try {
      const result = await verifyStudentId(formData.studentId);
      if (result.valid) {
        setFormData(prev => ({
          ...prev,
          college: result.college || '',
          name: prev.name || getDefaultName(formData.studentId)
        }));
        setStudentIdVerified(true);
        success('学号验证成功');
        setStep(2);
      } else {
        error(result.message || '学号验证失败');
      }
    } catch (err) {
      error('验证过程中出错，请稍后再试');
    } finally {
      setLoading(false);
    }
  };
  
  // 根据学号生成默认姓名
  const getDefaultName = (studentId: string) => {
    const lastDigit = parseInt(studentId.slice(-1));
    const firstNames = ['张', '李', '王', '刘', '陈', '杨', '赵', '黄', '周', '吴'];
    const lastNames = ['明', '华', '强', '伟', '芳', '娜', '军', '杰', '磊', '敏'];
    
    return firstNames[lastDigit] + lastNames[(lastDigit + 3) % 10];
  };
  
  // 表单提交处理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 基本表单验证
    if (!formData.name) {
      error('请输入姓名');
      return;
    }
    
    if (!formData.phone || !/^1[3-9]\d{9}$/.test(formData.phone)) {
      error('请输入正确的手机号码');
      return;
    }
    
    if (!formData.wechat) {
      error('请输入微信号');
      return;
    }
    
    setLoading(true);
    
    // 提交表单数据到Context中
    try {
      dispatch({
        type: 'SET_STUDENT_INFO',
        payload: {
          ...formData,
          avatar: previewImage, // 保存预览URL而非文件对象
        }
      });
      
      dispatch({
        type: 'SET_AUTH',
        payload: true
      });
      
      // 显示成功消息并跳转
      success('报名信息提交成功！');
      setTimeout(() => navigate('/student'), 1500);
    } catch (err) {
      error('提交失败，请稍后再试');
      setLoading(false);
    }
  };
  
  // 步骤标题列表
  const stepTitles = [
    '基本信息',
    '联系方式',
    '个人简介',
    '技能与作品',
    '兴趣与成就'
  ];
  
  // 兴趣列表
  const interestOptions = [
    '编程开发', '网络技术', '人工智能', '数据分析', '机器学习',
    '活动策划', '宣传设计', '公关组织', '新媒体运营', '视频制作',
    '文案写作', '项目管理', '团队协作', '演讲辩论', '创新思维'
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          校科联招新报名
        </h1>
        
        {/* 步骤指示器 */}
        <div className="flex justify-between items-center mb-8">
          <div className={`flex-1 h-1 ${step >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${step >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`}>1</div>
          <div className={`flex-1 h-1 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}>2</div>
          <div className={`flex-1 h-1 ${step >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${step >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`}>3</div>
          <div className={`flex-1 h-1 ${step >= 4 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${step >= 4 ? 'bg-blue-500' : 'bg-gray-300'}`}>4</div>
          <div className={`flex-1 h-1 ${step >= 5 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${step >= 5 ? 'bg-blue-500' : 'bg-gray-300'}`}>5</div>
          <div className={`flex-1 h-1 ${step >= 5 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
        </div>
        
        {/* 步骤标题 */}
        <h2 className="text-lg font-medium text-center text-gray-700 mb-6">
          {stepTitles[step - 1]}
        </h2>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {/* 步骤1：基本信息 */}
          {step === 1 && (
            <>
              <div className="mb-4">
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">学号</label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="请输入13位学号"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={studentIdVerified}
                  required
                />

                {!studentIdVerified && (
                  <button
                    type="button"
                    onClick={handleVerifyStudentId}
                    disabled={loading}
                    className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors disabled:bg-gray-400"
                  >
                    {loading ? '验证中...' : '验证学号'}
                  </button>
                )}
              </div>
              {studentIdVerified && (
                <>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="请输入您的姓名"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">学院</label>
                    <input
                      type="text"
                      id="college"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      placeholder="您的学院"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      disabled
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">专业</label>
                    <input
                      type="text"
                      id="major"
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      placeholder="请输入专业"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    下一步
                  </button>
                </>
              )}
            </>
          )}
          
          {/* 步骤2：联系方式 */}
          {step === 2 && (
            <>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">手机号码</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="请输入手机号码"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="wechat" className="block text-sm font-medium text-gray-700 mb-1">微信号</label>
                <input
                  type="text"
                  id="wechat"
                  name="wechat"
                  value={formData.wechat}
                  onChange={handleChange}
                  placeholder="请输入微信号"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="请输入邮箱地址"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  上一步
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                >
                  下一步
                </button>
              </div>
            </>
          )}
          
          {/* 步骤3：个人简介与头像 */}
          {step === 3 && (
            <>
              {/* 头像上传区域 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">个人头像</label>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 border-2 border-gray-300 rounded-full flex items-center justify-center overflow-hidden bg-gray-100">
                    {previewImage ? (
                      <img src={previewImage} alt="头像预览" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="w-full bg-blue-50 border border-blue-300 text-blue-700 py-2 px-3 rounded-md inline-flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      上传头像
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">支持JPG、PNG格式，小于2MB</p>
                  </div>
                </div>
              </div>
              
              {/* 个人简介 */}
              <div className="mb-4">
                <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-1">个人简介</label>
                <textarea
                  id="biography"
                  name="biography"
                  value={formData.biography}
                  onChange={handleChange}
                  rows={5}
                  placeholder="请简单介绍一下自己，包括个人爱好、特长和参加校科联的初衷等"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
                <p className="text-xs text-gray-500 text-right mt-1">
                  {formData.biography?.length || 0}/300字
                </p>
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  上一步
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                >
                  下一步
                </button>
              </div>
            </>
          )}
          
          {/* 步骤4：技能与作品 */}
          {step === 4 && (
            <>
              {/* 技能评级 - 修改布局以适应移动端 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">技能评级</label>
                  <button 
                    type="button"
                    onClick={handleAddSkill}
                    className="text-sm text-blue-600 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    添加技能
                  </button>
                </div>
                
                <div className="space-y-4">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      {/* 技能名称和删除按钮放在一行 */}
                      <div className="flex items-center justify-between mb-2">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const newSkills = [...formData.skills];
                            newSkills[index].name = e.target.value;
                            setFormData({...formData, skills: newSkills});
                          }}
                          placeholder="技能名称"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(index)}
                          className="ml-2 text-gray-400 hover:text-red-500 p-1"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                      
                      {/* 评分按钮单独一行显示 */}
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">熟练度评分：</span>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <button
                              key={level}
                              type="button"
                              onClick={() => handleSkillLevelChange(skill.name, level)}
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                                skill.level >= level 
                                  ? 'bg-blue-500 text-white' 
                                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {formData.skills.length === 0 && (
                    <div className="text-center py-3 border border-dashed border-gray-300 rounded-md">
                      <p className="text-sm text-gray-500">点击"添加技能"按钮开始添加</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* 作品链接部分保持不变 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">作品展示</label>
                  <button 
                    type="button"
                    onClick={handleAddPortfolioLink}
                    className="text-sm text-blue-600 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    添加链接
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.portfolioLinks.map((link, index) => (
                    <div key={index} className="flex flex-col space-y-2 p-3 border border-gray-200 rounded-md">
                      <div className="flex justify-between">
                        <label className="text-xs text-gray-500">项目{index+1}</label>
                        <button
                          type="button"
                          onClick={() => handleRemovePortfolioLink(index)}
                          className="text-xs text-red-500"
                        >
                          删除
                        </button>
                      </div>
                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => handleUpdatePortfolioLink(index, 'title', e.target.value)}
                        placeholder="项目标题"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => handleUpdatePortfolioLink(index, 'url', e.target.value)}
                        placeholder="项目链接 (https://...)"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                  
                  {formData.portfolioLinks.length === 0 && (
                    <div className="text-center py-3 border border-dashed border-gray-300 rounded-md">
                      <p className="text-sm text-gray-500">还没有添加作品</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  上一步
                </button>
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                >
                  下一步
                </button>
              </div>
            </>
          )}
          
          {/* 步骤5：兴趣与成就 */}
          {step === 5 && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">兴趣方向（可多选）</label>
                <div className="grid grid-cols-2 gap-2">
                  {interestOptions.map((interest) => (
                    <div 
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-3 py-2 border rounded-md text-sm cursor-pointer transition-colors ${
                        (formData.interests as string[]).includes(interest) 
                          ? 'bg-blue-500 text-white border-blue-500' 
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 mb-1">个人成就</label>
                <textarea
                  id="achievements"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  rows={4}
                  placeholder="请列出您在学术、竞赛、项目等方面的成就"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  上一步
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors disabled:bg-blue-300"
                >
                  {loading ? '提交中...' : '提交报名'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
