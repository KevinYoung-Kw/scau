import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RecruitmentProvider } from './context/RecruitmentContext';

// 学生端页面
import VerifyStudentNumber from './pages/student/VerifyStudentNumber';
import DepartmentList from './pages/student/DepartmentList';
import VolunteerSelection from './pages/student/VolunteerSelection';
import InterviewProgress from './pages/student/InterviewProgress';
import ResultQuery from './pages/student/ResultQuery';
import RegisterForm from './pages/student/RegisterForm'; 
import ResumePreview from './pages/student/ResumePreview'; // 添加简历预览页面

// 面试官端页面
import QrCodeScanner from './pages/interviewer/QrCodeScanner';
import BatchOperations from './pages/interviewer/BatchOperations';
import InterviewEvaluation from './pages/interviewer/InterviewEvaluation';
import InterviewerPortal from './pages/interviewer/InterviewerPortal';
import InterviewProcessSettings from './pages/interviewer/InterviewProcessSettings';
import NotificationTemplates from './pages/interviewer/NotificationTemplates';

// 首页和导航页
import Home from './pages/Home';
import StudentPortal from './pages/student/StudentPortal';
import HomePage from './pages/HomePage';
// 使用新的 AppNavBar 替代原来的 BottomNavBar
import AppNavBar from './components/AppNavBar';

const App: React.FC = () => {
  return (
    <RecruitmentProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* 设置主页为默认路由 */}
            <Route path="/" element={<HomePage />} />
            
            {/* 学生端页面 */}
            <Route path="/student" element={<StudentPortal />} />
            <Route path="/student/register" element={<RegisterForm />} />
            <Route path="/student/resume" element={<ResumePreview />} />
            <Route path="/student/verify" element={<ResumePreview />} /> {/* 将"学号验证"重定向到简历页面 */}
            <Route path="/student/departments" element={<DepartmentList />} />
            <Route path="/student/volunteer" element={<VolunteerSelection />} />
            <Route path="/student/progress" element={<InterviewProgress />} />
            <Route path="/student/result" element={<ResultQuery />} />
            
            {/* 面试官端页面 */}
            <Route path="/interviewer" element={<InterviewerPortal />} />
            <Route path="/interviewer/qrcode" element={<QrCodeScanner />} />
            <Route path="/interviewer/process" element={<InterviewProcessSettings />} />
            <Route path="/interviewer/templates" element={<NotificationTemplates />} />
            <Route path="/interviewer/batch" element={<BatchOperations />} />
            <Route path="/interviewer/evaluate" element={<InterviewEvaluation />} />
          </Routes>
          <AppNavBar />
        </div>
      </Router>
    </RecruitmentProvider>
  );
};

export default App;