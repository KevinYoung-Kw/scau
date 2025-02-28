import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

// 类型定义
export interface Candidate {
  id: string;
  name: string;
  studentId: string;
  department: string;
  volunteerType: 'normal' | 'special';
  status: 'pending' | 'interview' | 'waitlist' | 'accepted' | 'rejected';
  college: string;
  interviewTime?: string;
  interviewLocation?: string;
  score?: number;
  evaluation?: string;
  volunteers?: Array<{
    department: string;
    type: 'normal' | 'special';
    priority: number;
  }>;
}

interface Department {
  id: string;
  name: string;
  hasSpecial: boolean;
  description: string;
  requirements: string[];
}

interface RecruitmentState {
  candidates: Candidate[];
  departments: Department[];
  currentUser: {
    id: string;
    role: 'student' | 'interviewer' | 'admin';
    name: string;
    department?: string;
  } | null;
  loading: boolean;
  error: string | null;
  studentInfo: any | null;
  applications: any[];
  interviews: any[];
  isAuthenticated: boolean;
}

// 定义可能的 Action 类型
type RecruitmentAction = 
  | { type: 'SET_CANDIDATES'; payload: Candidate[] }
  | { type: 'ADD_CANDIDATE'; payload: Candidate }
  | { type: 'UPDATE_CANDIDATE'; payload: { id: string; updates: Partial<Candidate> } }
  | { type: 'DELETE_CANDIDATE'; payload: string }
  | { type: 'SET_DEPARTMENTS'; payload: Department[] }
  | { type: 'SET_CURRENT_USER'; payload: RecruitmentState['currentUser'] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_STUDENT_INFO'; payload: any }
  | { type: 'ADD_APPLICATION'; payload: any }
  | { type: 'UPDATE_INTERVIEW'; payload: any }
  | { type: 'SET_AUTH'; payload: boolean };

// 导入模拟数据和存储工具
import { generateMockCandidates } from '../utils/mockData';
import { saveToStorage, loadFromStorage } from '../utils/storage';

// 初始状态加载模拟数据或从localStorage获取
const initialState: RecruitmentState = loadFromStorage<RecruitmentState>('recruitment-state', {
  candidates: generateMockCandidates(),
  departments: [
    { id: 'tech', name: '技术部', hasSpecial: true, description: '负责校科联的技术支持，包括网站开发、小程序维护和技术培训', requirements: ['熟悉前端或后端技术栈', '对新技术有学习热情'] },
    { id: 'pr', name: '宣传部', hasSpecial: false, description: '负责校科联的形象推广、活动宣传和文案策划', requirements: ['具有较强的文字功底和创意能力', '审美能力较好'] },
    { id: 'hr', name: '人力资源部', hasSpecial: false, description: '负责校科联的人才管理、内部培训和团队建设', requirements: ['良好的沟通能力', '有出色的组织协调能力'] },
    { id: 'event', name: '策划部', hasSpecial: true, description: '负责校科联各类活动的策划、组织和执行', requirements: ['具有创新思维和策划能力', '能够高效处理突发状况'] },
    { id: 'external', name: '外联部', hasSpecial: false, description: '负责校科联的外部资源对接、赞助洽谈和合作维护', requirements: ['出色的沟通表达能力', '热情大方，有责任心'] },
  ],
  currentUser: null,
  loading: false,
  error: null,
  studentInfo: null,
  applications: [],
  interviews: [],
  isAuthenticated: false
});

// Reducer 函数
const recruitmentReducer = (state: RecruitmentState, action: RecruitmentAction): RecruitmentState => {
  switch (action.type) {
    case 'SET_CANDIDATES':
      return { ...state, candidates: action.payload };
    case 'ADD_CANDIDATE':
      return { ...state, candidates: [...state.candidates, action.payload] };
    case 'UPDATE_CANDIDATE':
      return {
        ...state,
        candidates: state.candidates.map(candidate => 
          candidate.id === action.payload.id 
            ? { ...candidate, ...action.payload.updates } 
            : candidate
        )
      };
    case 'DELETE_CANDIDATE':
      return {
        ...state,
        candidates: state.candidates.filter(candidate => candidate.id !== action.payload)
      };
    case 'SET_DEPARTMENTS':
      return { ...state, departments: action.payload };
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_STUDENT_INFO':
      return { ...state, studentInfo: action.payload };
    case 'ADD_APPLICATION':
      return { ...state, applications: [...state.applications, action.payload] };
    case 'UPDATE_INTERVIEW':
      return {
        ...state,
        interviews: state.interviews.map(interview => 
          interview.id === action.payload.id ? action.payload : interview
        )
      };
    case 'SET_AUTH':
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
};

// 创建上下文
interface RecruitmentContextType {
  state: RecruitmentState;
  dispatch: React.Dispatch<RecruitmentAction>;
  // 便捷方法
  updateCandidateStatus: (id: string, status: Candidate['status']) => void;
  addVolunteer: (studentId: string, department: string, type: 'normal' | 'special', priority: number) => void;
  verifyStudentId: (studentId: string) => Promise<{ valid: boolean; college?: string; hasSpecial?: boolean; message?: string }>;
}

const RecruitmentContext = createContext<RecruitmentContextType | undefined>(undefined);

// Provider 组件
interface RecruitmentProviderProps {
  children: ReactNode;
}

export const RecruitmentProvider: React.FC<RecruitmentProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(recruitmentReducer, initialState);
  
  // 状态变更时保存到localStorage
  useEffect(() => {
    saveToStorage('recruitment-state', state);
  }, [state]);

  // 常用操作的便捷方法
  const updateCandidateStatus = (id: string, status: Candidate['status']) => {
    dispatch({
      type: 'UPDATE_CANDIDATE',
      payload: {
        id,
        updates: { status }
      }
    });
  };

  const addVolunteer = (studentId: string, department: string, type: 'normal' | 'special', priority: number) => {
    const candidate = state.candidates.find(c => c.studentId === studentId);
    if (candidate) {
      const volunteers = candidate.volunteers || [];
      dispatch({
        type: 'UPDATE_CANDIDATE',
        payload: {
          id: candidate.id,
          updates: {
            volunteers: [
              ...volunteers,
              { department, type, priority }
            ]
          }
        }
      });
    }
  };

  // 生成唯一ID的辅助函数
  const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // 模拟学号验证和候选人创建
  const verifyStudentId = async (studentId: string): Promise<{ valid: boolean; college?: string; hasSpecial?: boolean; message?: string }> => {
    // 先设置加载状态
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // 简单验证是否为13位数字
      if (!/^\d{13}$/.test(studentId)) {
        return { valid: false, message: '请输入正确的13位学号' };
      }
      
      const year = studentId.substring(0, 4);
      
      // 只允许2023级学生
      if (year !== '2023') {
        return { valid: false, message: '只允许2023级学生参与招新' };
      }
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 模拟获取学院信息 - 基于13位学号格式解析
      const collegeCode = studentId.substring(4, 6);
      let college: string;
      let hasSpecial = false;
      
      switch (collegeCode) {
        case '11':
          college = '农学院';
          break;
        case '13':
          college = '工学院';
          break;
        case '12':
          college = '信息学院';
          hasSpecial = true; // 信息学院学生可以参加特招
          break;
        case '14':
          college = '经济管理学院';
          break;
        default:
          college = '其他学院';
      }
      
      // 检查学号是否已存在
      const existingCandidate = state.candidates.find(c => c.studentId === studentId);
      
      if (!existingCandidate) {
        // 创建新的候选人记录
        const newCandidate: Candidate = {
          id: generateId(),
          name: '', // 等待用户填写
          studentId,
          department: '',
          volunteerType: 'normal',
          status: 'pending',
          college,
          volunteers: []
        };
        
        dispatch({ type: 'ADD_CANDIDATE', payload: newCandidate });
      }
      
      dispatch({ type: 'SET_LOADING', payload: false });
      
      return {
        valid: true,
        college,
        hasSpecial
      };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: '验证过程中出错' });
      dispatch({ type: 'SET_LOADING', payload: false });
      return { valid: false, message: '系统错误，请稍后再试' };
    }
  };

  const value = {
    state,
    dispatch,
    updateCandidateStatus,
    addVolunteer,
    verifyStudentId
  };

  return (
    <RecruitmentContext.Provider value={value}>
      {children}
    </RecruitmentContext.Provider>
  );
};

// 自定义Hook，方便在组件中使用
export const useRecruitment = () => {
  const context = useContext(RecruitmentContext);
  if (context === undefined) {
    throw new Error('useRecruitment must be used within a RecruitmentProvider');
  }
  return context;
};
