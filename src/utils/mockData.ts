import { Candidate } from '../context/RecruitmentContext';

// 生成随机ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// 生成随机候选人数据
export const generateMockCandidates = (): Candidate[] => {
  const colleges = ['信息学院', '工学院', '农学院', '经济管理学院', '外国语学院'];
  const firstNames = ['张', '李', '王', '刘', '陈', '杨', '赵', '黄', '周', '吴'];
  const lastNames = ['明', '华', '强', '伟', '芳', '娜', '军', '杰', '磊', '敏'];
  const statuses: Candidate['status'][] = ['pending', 'interview', 'waitlist', 'accepted', 'rejected'];
  const departments = ['技术部', '宣传部', '人力资源部', '策划部', '外联部'];
  
  // 生成20个候选人
  return Array.from({ length: 20 }, (_, i) => {
    const id = `202312${String(i).padStart(3, '0')}`;
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const college = colleges[Math.floor(Math.random() * colleges.length)];
    const hasSpecial = college === '信息学院' || college === '工学院';
    const volunteerType = hasSpecial && Math.random() > 0.5 ? 'special' : 'normal';
    
    const volunteers = [];
    const usedDepts = new Set();
    const numVolunteers = Math.floor(Math.random() * 3) + 1; // 1-3个志愿
    
    for (let j = 0; j < numVolunteers; j++) {
      let dept;
      do {
        dept = departments[Math.floor(Math.random() * departments.length)];
      } while (usedDepts.has(dept));
      
      usedDepts.add(dept);
      volunteers.push({
        department: dept,
        type: j === 0 && volunteerType === 'special' ? 'special' : 'normal',
        priority: j + 1
      });
    }
    
    const candidate: Candidate = {
      id: generateId(),
      name: firstName + lastName,
      studentId: `2023${Math.floor(Math.random() * 2) + 11}${String(Math.floor(Math.random() * 1000)).padStart(4, '0')}${String(i).padStart(3, '0')}`,
      department: volunteers[0]?.department || '',
      volunteerType,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      college,
      volunteers
    };
    
    // 添加面试相关信息
    if (candidate.status === 'interview' || candidate.status === 'accepted') {
      const today = new Date();
      const interviewDate = new Date(today);
      interviewDate.setDate(today.getDate() + Math.floor(Math.random() * 7));
      
      const hours = Math.floor(Math.random() * 8) + 9; // 9AM-4PM
      const minutes = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
      
      candidate.interviewTime = `${interviewDate.getFullYear()}-${String(interviewDate.getMonth() + 1).padStart(2, '0')}-${String(interviewDate.getDate()).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      candidate.interviewLocation = `${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}区 ${Math.floor(Math.random() * 5) + 1}楼 ${Math.floor(Math.random() * 10) + 1}号面试室`;
      
      if (Math.random() > 0.5) {
        candidate.score = Math.floor(Math.random() * 40) + 60; // 60-100分
        candidate.evaluation = ['沟通能力强', '技术功底扎实', '有创新思维', '团队协作好', '有责任心'][Math.floor(Math.random() * 5)];
      }
    }
    
    return candidate;
  });
};

/**
 * 模拟生成模拟面试题目
 */
export const generateMockInterviewQuestions = () => {
  return {
    tech: [
      '请介绍一个你最得意的项目经历',
      '你了解哪些前端/后端技术框架？',
      '如何理解RESTful API？',
      '描述一下你遇到的最困难的技术问题以及解决方案'
    ],
    pr: [
      '你有哪些相关的设计或排版经验？',
      '如何策划一次校园活动的宣传方案？',
      '你对新媒体运营有什么了解？',
      '请即兴设计一条推文宣传校科联'
    ],
    hr: [
      '你如何处理人际关系冲突？',
      '作为HR，你认为最重要的能力是什么？',
      '如何有效管理团队成员的积极性？',
      '请设计一个团建活动方案'
    ],
    event: [
      '你参与组织过哪些活动？',
      '如何确保活动按计划进行？',
      '面对突发情况，你会如何应对？',
      '请简述一下科技节活动的策划思路'
    ],
    external: [
      '如何与企业进行有效沟通？',
      '你如何看待赞助与合作关系？',
      '请模拟一次赞助洽谈的开场白',
      '如何维护与合作伙伴的长期关系？'
    ]
  };
};

export default { generateMockCandidates };
