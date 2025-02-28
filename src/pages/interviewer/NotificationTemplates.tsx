import React, { useState } from 'react';
import Header from '../../components/shared/Header';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';

interface TemplateItem {
  id: string;
  title: string;
  content: string;
  type: 'interview' | 'result' | 'reminder';
  lastModified: string;
}

const NotificationTemplates: React.FC = () => {
  // 模板数据
  const [templates, setTemplates] = useState<TemplateItem[]>([
    {
      id: '1',
      title: '初试通过通知',
      content: '恭喜！您已通过{{department}}的初试，请于{{date}}{{time}}在{{location}}参加复试。请提前10分钟到达现场，并携带个人简历。',
      type: 'interview',
      lastModified: '2023-09-15'
    },
    {
      id: '2',
      title: '复试通过通知',
      content: '恭喜！您已通过{{department}}的复试环节，我们将于9月25日公布最终录取结果，请耐心等待。',
      type: 'result',
      lastModified: '2023-09-17'
    },
    {
      id: '3',
      title: '面试提醒',
      content: '温馨提醒：您的{{department}}面试将于明天{{time}}在{{location}}进行，请提前准备并准时到场。',
      type: 'reminder',
      lastModified: '2023-09-18'
    }
  ]);

  // 当前编辑的模板
  const [currentTemplate, setCurrentTemplate] = useState<TemplateItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // 处理模板编辑
  const handleEditTemplate = (template: TemplateItem) => {
    setCurrentTemplate({ ...template });
    setIsEditing(true);
  };

  // 处理模板保存
  const handleSaveTemplate = () => {
    if (!currentTemplate) return;

    if (currentTemplate.id) {
      // 更新现有模板
      setTemplates(templates.map(t => 
        t.id === currentTemplate.id ? { ...currentTemplate, lastModified: new Date().toISOString().split('T')[0] } : t
      ));
    } else {
      // 添加新模板
      setTemplates([
        ...templates, 
        { 
          ...currentTemplate, 
          id: Date.now().toString(),
          lastModified: new Date().toISOString().split('T')[0]
        }
      ]);
    }
    
    setIsEditing(false);
    setCurrentTemplate(null);
  };

  // 处理添加新模板
  const handleAddTemplate = () => {
    setCurrentTemplate({
      id: '',
      title: '',
      content: '',
      type: 'interview',
      lastModified: new Date().toISOString().split('T')[0]
    });
    setIsEditing(true);
  };

  // 处理删除模板
  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <Header title="通知模板管理" />
      
      <div className="pt-20 px-4 max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">模板列表</h2>
          <Button 
            onClick={handleAddTemplate}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            }
            size="sm"
          >
            添加模板
          </Button>
        </div>
        
        {/* 模板分类标签 */}
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          <button className="bg-primary-100 text-primary-800 rounded-full px-4 py-1 text-sm font-medium">
            全部
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full px-4 py-1 text-sm">
            面试通知
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full px-4 py-1 text-sm">
            结果通知
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full px-4 py-1 text-sm">
            提醒通知
          </button>
        </div>
        
        {/* 模板列表 */}
        <div className="space-y-3">
          {templates.map(template => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <Card.Header className="flex justify-between items-center">
                <div className="flex items-center">
                  {template.type === 'interview' && (
                    <span className="bg-blue-100 text-blue-700 text-xs rounded-full px-2 py-0.5 mr-2">面试</span>
                  )}
                  {template.type === 'result' && (
                    <span className="bg-green-100 text-green-700 text-xs rounded-full px-2 py-0.5 mr-2">结果</span>
                  )}
                  {template.type === 'reminder' && (
                    <span className="bg-yellow-100 text-yellow-700 text-xs rounded-full px-2 py-0.5 mr-2">提醒</span>
                  )}
                  <h3 className="font-medium text-gray-900">{template.title}</h3>
                </div>
                <span className="text-xs text-gray-500">更新: {template.lastModified}</span>
              </Card.Header>
              
              <Card.Body className="text-sm text-gray-600 whitespace-pre-line">
                {template.content}
                
                <div className="mt-3 bg-gray-50 p-2 rounded text-xs text-gray-500">
                  <span className="font-medium">可用变量: </span>
                  <code>{"{{department}}, {{date}}, {{time}}, {{location}}"}</code>
                </div>
              </Card.Body>
              
              <Card.Footer className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteTemplate(template.id)}
                  icon={
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  }
                >
                  删除
                </Button>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => handleEditTemplate(template)}
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  }
                >
                  编辑
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </div>
        
        {/* 变量说明 */}
        <Card className="mt-6">
          <Card.Header>
            <h3 className="font-medium text-gray-800 flex items-center">
              <svg className="w-5 h-5 text-primary-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              模板变量说明
            </h3>
          </Card.Header>
          
          <Card.Body>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">在编写模板时，可使用以下变量，系统会在发送时自动替换：</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li><code className="bg-gray-100 px-1 py-0.5 rounded">{"{{department}}"}</code> - 部门名称</li>
                <li><code className="bg-gray-100 px-1 py-0.5 rounded">{"{{date}}"}</code> - 面试日期</li>
                <li><code className="bg-gray-100 px-1 py-0.5 rounded">{"{{time}}"}</code> - 面试时间</li>
                <li><code className="bg-gray-100 px-1 py-0.5 rounded">{"{{location}}"}</code> - 面试地点</li>
                <li><code className="bg-gray-100 px-1 py-0.5 rounded">{"{{name}}"}</code> - 候选人姓名</li>
                <li><code className="bg-gray-100 px-1 py-0.5 rounded">{"{{studentId}}"}</code> - 候选人学号</li>
              </ul>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      {/* 编辑模态框 */}
      {isEditing && currentTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-lg text-gray-800">
                {currentTemplate.id ? '编辑模板' : '添加模板'}
              </h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  模板标题
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  value={currentTemplate.title}
                  onChange={e => setCurrentTemplate({...currentTemplate, title: e.target.value})}
                  placeholder="输入标题"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  模板类型
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  value={currentTemplate.type}
                  onChange={e => setCurrentTemplate({...currentTemplate, type: e.target.value as any})}
                >
                  <option value="interview">面试通知</option>
                  <option value="result">结果通知</option>
                  <option value="reminder">提醒通知</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  模板内容
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 h-40"
                  value={currentTemplate.content}
                  onChange={e => setCurrentTemplate({...currentTemplate, content: e.target.value})}
                  placeholder="输入通知内容，可使用变量如 {{department}}"
                />
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                取消
              </Button>
              <Button onClick={handleSaveTemplate}>
                保存
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationTemplates;
