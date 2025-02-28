import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // 修改跳转到注册表单页面
  const handleApplyClick = () => {
    navigate('/student/register');
  };

  // 科联介绍信息
  const introItems = [
    {
      title: '科技创新的摇篮',
      description: '校科联致力于培养学生科技创新能力，提供丰富的项目实践机会。',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    {
      title: '多元化的部门设置',
      description: '网络中心、开发部、数据中心等多个专业部门，满足不同兴趣方向。',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    {
      title: '丰富的活动资源',
      description: '举办科技竞赛、学术讲座、技能培训，打造全方位成长平台。',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 顶部横幅 */}
      <div className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">校园科技联盟</h1>
        <p className="text-sm opacity-80">科技创新 · 团队协作 · 能力提升</p>
      </div>
      
      {/* 轮播图 */}
      <div className="w-full h-60 md:h-72">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="h-full"
        >
          {introItems.map((item, index) => (
            <SwiperSlide key={index}>
              <div 
                className="w-full h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                  <h2 className="text-white text-xl font-bold">{item.title}</h2>
                  <p className="text-white text-sm mt-2">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 报名按钮 - 修改跳转逻辑 */}
      <div className="px-6 py-4">
        <button
          onClick={handleApplyClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition duration-300 flex items-center justify-center"
        >
          <span className="text-lg">我要报名</span>
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </button>
      </div>

      {/* 科联简介 */}
      <div className="px-6 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">关于校科联</h2>
        <p className="text-gray-600 leading-relaxed">
          校园科技联盟（简称"校科联"）是学校重点支持的学生科技创新组织，致力于培养学生的创新思维、团队协作和实践能力。
          我们提供专业指导、项目实践和资源支持，帮助学生实现科技梦想和个人成长。
        </p>
        
        {/* 核心优势卡片 */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {[
            { icon: "🚀", title: "创新项目", desc: "参与真实项目开发" },
            { icon: "🏆", title: "竞赛支持", desc: "多项赛事指导培训" },
            { icon: "🔍", title: "技术探索", desc: "接触前沿科技" },
            { icon: "👥", title: "人脉拓展", desc: "结交志同道合朋友" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* 底部报名按钮已移除，不再需要 */}
    </div>
  );
};

export default HomePage;
