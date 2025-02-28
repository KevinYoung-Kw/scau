import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCards } from 'swiper';
import Header from '../../components/shared/Header';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';

// 导入Swiper样式
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

interface Department {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  specialRecruitment?: boolean;
  cardColor: string;
  iconColor: string;
  icon: React.ReactNode;
}

const departments: Department[] = [
  {
    id: 'tech',
    name: '技术部',
    description: '负责校科联的技术支持，包括网站开发、小程序维护和技术培训。技术部是校科联的核心部门之一，为各类活动提供技术保障。',
    requirements: [
      '熟悉前端或后端技术栈',
      '对新技术有学习热情',
      '有团队协作意识',
      '有责任心和进取精神'
    ],
    responsibilities: [
      '开发和维护校科联官方网站、小程序等',
      '为校内外活动提供技术支持和解决方案',
      '组织技术分享和培训活动',
      '参与校科联数字化建设'
    ],
    specialRecruitment: true,
    cardColor: 'from-blue-500 to-indigo-500',
    iconColor: 'text-blue-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    id: 'pr',
    name: '宣传部',
    description: '负责校科联的形象推广、活动宣传和文案策划。宣传部是校科联的窗口部门，展现校科联风采。',
    requirements: [
      '具有较强的文字功底和创意能力',
      '有设计、摄影或新媒体运营经验优先',
      '审美能力较好，热爱创作',
      '善于沟通表达'
    ],
    responsibilities: [
      '设计和制作各类宣传物料（海报、视频等）',
      '撰写活动文案和推文',
      '维护管理校科联社交媒体账号',
      '负责活动现场拍摄及后期制作'
    ],
    cardColor: 'from-purple-500 to-pink-500',
    iconColor: 'text-purple-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'hr',
    name: '人力资源部',
    description: '负责校科联的人才管理、内部培训和团队建设。人力资源部是校科联的核心枢纽，连接各部门工作。',
    requirements: [
      '良好的沟通能力和人际交往能力',
      '细心耐心，做事认真负责',
      '有出色的组织协调能力',
      '有同理心，能够站在他人角度思考问题'
    ],
    responsibilities: [
      '组织策划招新面试和成员管理',
      '负责干部考核和内部培训',
      '策划团建活动，增强团队凝聚力',
      '协调各部门间的合作关系'
    ],
    cardColor: 'from-amber-500 to-orange-500',
    iconColor: 'text-amber-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: 'event',
    name: '策划部',
    description: '负责校科联各类活动的策划、组织和执行。策划部是校科联的创意中心，策划各类精彩活动。',
    requirements: [
      '具有创新思维和策划能力',
      '有较强的执行力和团队协作能力',
      '能够高效处理突发状况',
      '有组织校园活动经验优先'
    ],
    responsibilities: [
      '设计和策划各类校园科技文化活动',
      '编写完整的活动方案和预算',
      '协调执行活动流程，负责现场管理',
      '评估活动效果并提出改进建议'
    ],
    specialRecruitment: true,
    cardColor: 'from-green-500 to-teal-500',
    iconColor: 'text-green-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )
  },
  {
    id: 'external',
    name: '外联部',
    description: '负责校科联的外部资源对接、赞助洽谈和合作维护。外联部是校科联的桥梁，连接校内外资源。',
    requirements: [
      '出色的沟通表达能力和社交能力',
      '对商业合作有基本认知',
      '有一定的抗压能力和应变能力',
      '热情大方，有责任心'
    ],
    responsibilities: [
      '联系和洽谈潜在合作伙伴及赞助商',
      '撰写合作企划案和赞助方案',
      '维护与合作方的长期关系',
      '协助其他部门对外合作事宜'
    ],
    cardColor: 'from-red-500 to-rose-500',
    iconColor: 'text-red-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
];

const DepartmentList: React.FC = () => {
  const [currentDept, setCurrentDept] = useState<Department>(departments[0]);
  const [cardHeight, setCardHeight] = useState(460);

  // 根据屏幕高度调整卡片高度
  useEffect(() => {
    const updateCardHeight = () => {
      const windowHeight = window.innerHeight;
      // 考虑到头部和底部按钮的高度，动态计算卡片区域的合适高度
      const newHeight = Math.min(460, windowHeight - 200);
      setCardHeight(newHeight);
    };

    // 初始设置
    updateCardHeight();
    
    // 监听屏幕大小变化
    window.addEventListener('resize', updateCardHeight);
    return () => window.removeEventListener('resize', updateCardHeight);
  }, []);

  // 处理滑动变化
  const handleSlideChange = (swiper: any) => {
    setCurrentDept(departments[swiper.activeIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="部门介绍" 
        rightContent={
          <a href="/student/volunteer" className="text-sm rounded-full bg-white/10 py-1 px-3">
            填报志愿
          </a>
        }
      />
      
      <div className="pt-20 px-4 pb-6 max-w-lg mx-auto">
        <p className="text-gray-600 mb-4 text-center text-sm sm:text-base">
          左右滑动了解各部门详情，选择适合你的部门
        </p>
        
        {/* 部门卡片滑动区 */}
        <div className="mb-6" style={{ height: `${cardHeight}px` }}>
          <Swiper
            modules={[Pagination, EffectCards]}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            effect="cards"
            grabCursor={true}
            onSlideChange={handleSlideChange}
            className="department-swiper h-full"
            // 添加移动端触摸滑动所需参数
            touchEventsTarget="container"
            simulateTouch={true}
            touchRatio={1}
            touchAngle={45}
            touchStartPreventDefault={false}
          >
            {departments.map((dept) => (
              <SwiperSlide key={dept.id}>
                <div className="h-full pt-4 pb-10 px-1">
                  <div className={`bg-gradient-to-br ${dept.cardColor} text-white rounded-2xl h-full shadow-tencent overflow-hidden`}>
                    {/* 卡片顶部 */}
                    <div className="pt-4 sm:pt-6 pb-3 sm:pb-4 px-4 sm:px-6 border-b border-white/20">
                      <div className="flex items-center">
                        <div className="bg-white/20 rounded-full p-2 sm:p-3">
                          {dept.icon}
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="flex items-center flex-wrap">
                            <h2 className="text-xl sm:text-2xl font-bold">{dept.name}</h2>
                            {dept.specialRecruitment && (
                              <span className="ml-2 inline-block bg-yellow-500/20 text-white text-xs px-2 py-0.5 rounded-full border border-yellow-300/30">
                                特招通道
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 卡片内容 - 响应式高度调整 */}
                    <div className="p-4 sm:p-6 overflow-y-auto styled-scrollbar" style={{ height: `${cardHeight - 100}px` }}>
                      <div className="mb-4 sm:mb-5">
                        <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2 flex items-center">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          部门介绍
                        </h3>
                        <p className="text-white/90 text-sm sm:text-base">{dept.description}</p>
                      </div>
                      
                      <div className="mb-4 sm:mb-5">
                        <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2 flex items-center">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          工作职责
                        </h3>
                        <ul className="space-y-1 sm:space-y-1.5 text-white/90 text-sm sm:text-base">
                          {dept.responsibilities.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2 flex items-center">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          招新要求
                        </h3>
                        <ul className="space-y-1 sm:space-y-1.5 text-white/90 text-sm sm:text-base">
                          {dept.requirements.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {dept.specialRecruitment && (
                        <div className="mt-4 sm:mt-6 p-2 sm:p-3 bg-yellow-400/20 border border-yellow-300/30 rounded-lg">
                          <div className="flex items-start">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <p className="text-xs sm:text-sm text-white">
                              该部门开设特招通道，符合条件的同学可直接参加特招面试，详情请在志愿填报页面查看。
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* 底部动作按钮 */}
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            fullWidth
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          >
            招新日程
          </Button>
          <Button 
            fullWidth
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }
            onClick={() => window.location.href = '/student/volunteer'}
          >
            填报志愿
          </Button>
        </div>
      </div>

      {/* 添加额外的全局样式 */}
      <style jsx global>{`
        .department-swiper .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
        }
        .department-swiper .swiper-pagination-bullet-active {
          background: white;
          opacity: 1;
        }
        .styled-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .styled-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .styled-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        /* 禁用iOS上的默认触摸行为，防止拖动问题 */
        .department-swiper {
          touch-action: pan-y;
        }
        /* 确保在移动设备上正常工作 */
        html, body {
          touch-action: manipulation;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
};

export default DepartmentList;
