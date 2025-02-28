import ResultQuery from '../pages/student/ResultQuery';
import QrCodeScanner from '../pages/interviewer/QrCodeScanner';
import InterviewerPortal from '../pages/interviewer/InterviewerPortal';
import InterviewProcessSettings from '../pages/interviewer/InterviewProcessSettings';
import NotificationTemplates from '../pages/interviewer/NotificationTemplates';
import BatchOperations from '../pages/interviewer/BatchOperations';

const routes = [
  // 学生端路由
  {
    path: '/student/result',
    element: <ResultQuery />
  },
  
  // 面试官端路由
  {
    path: '/interviewer',
    element: <InterviewerPortal />
  },
  {
    path: '/interviewer/qrcode',
    element: <QrCodeScanner />
  },
  {
    path: '/interviewer/process',
    element: <InterviewProcessSettings />
  },
  {
    path: '/interviewer/templates',
    element: <NotificationTemplates />
  },
  {
    path: '/interviewer/batch',
    element: <BatchOperations />
  },
];

export default routes;
