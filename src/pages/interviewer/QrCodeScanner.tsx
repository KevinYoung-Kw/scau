import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/shared/Header';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';

interface CandidateInfo {
  id: string;
  name: string;
  studentId: string;
  department: string;
  volunteerType: 'normal' | 'special';
  college: string;
  status: 'pending' | 'interview' | 'accepted' | 'rejected';
}

const QrCodeScanner: React.FC = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<CandidateInfo | null>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  
  // 模拟扫描过程
  const startScanning = () => {
    setScanning(true);
    
    // 添加扫描动画
    if (cameraRef.current) {
      const scanLine = document.createElement('div');
      scanLine.className = 'absolute left-0 right-0 h-0.5 bg-primary-500 animate-scanning';
      cameraRef.current.appendChild(scanLine);
    }
    
    // 模拟2秒后扫描成功
    setTimeout(() => {
      const mockData: CandidateInfo = {
        id: '20230915001',
        name: '张三',
        studentId: '2023030001',
        department: '技术部',
        volunteerType: 'special',
        college: '信息学院',
        status: 'interview',
      };
      
      // 播放声音反馈
      const audio = new Audio('/assets/scan-success.mp3');
      audio.volume = 0.5;
      try {
        audio.play();
      } catch (error) {
        console.log('音频播放失败', error);
      }
      
      setScannedData(mockData);
      setScanning(false);
      
      // 移除扫描线
      if (cameraRef.current) {
        const scanLine = cameraRef.current.querySelector('.animate-scanning');
        if (scanLine) {
          cameraRef.current.removeChild(scanLine);
        }
      }
    }, 2000);
  };
  
  // 重置扫描
  const resetScanner = () => {
    setScannedData(null);
  };
  
  // 跳转到评价表单
  const goToEvaluation = () => {
    if (scannedData) {
      navigate(`/interviewer/evaluate?id=${scannedData.id}&name=${scannedData.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="二维码扫描" />
      
      <div className="pt-20 px-4 pb-6 max-w-lg mx-auto">
        {/* 扫描区域 */}
        <Card elevated className="mb-6">
          {!scannedData ? (
            <div className="p-6">
              <div className="flex flex-col items-center">
                {scanning ? (
                  <>
                    <div 
                      ref={cameraRef}
                      className="w-64 h-64 border-4 border-primary-500 rounded-lg relative mb-4 overflow-hidden"
                    >
                      {/* 四个角的装饰 */}
                      <div className="absolute top-0 left-0 h-6 w-6 border-t-4 border-l-4 border-primary-500"></div>
                      <div className="absolute top-0 right-0 h-6 w-6 border-t-4 border-r-4 border-primary-500"></div>
                      <div className="absolute bottom-0 left-0 h-6 w-6 border-b-4 border-l-4 border-primary-500"></div>
                      <div className="absolute bottom-0 right-0 h-6 w-6 border-b-4 border-r-4 border-primary-500"></div>
                      
                      {/* 摄像头模拟 (黑色背景和闪光) */}
                      <div className="absolute inset-0 bg-black">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-500/5 to-transparent animate-pulse-slow"></div>
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white/70 text-center px-4">
                          <div className="w-12 h-12 mx-auto mb-2 rounded-full border-2 border-white/30 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-white/30"></div>
                          </div>
                          将面试者的二维码<br/>放入框内
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-500 animate-pulse text-center">
                      扫描中...
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center p-6">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                        <p className="text-gray-400 mb-4">点击下方按钮开始扫描</p>
                      </div>
                    </div>
                    <Button 
                      onClick={startScanning} 
                      fullWidth
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      }
                    >
                      开始扫描
                    </Button>
                  </>
                )}
              </div>
              
              {scanning && (
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm" onClick={() => setScanning(false)}>
                    取消扫描
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <Card.Header className="bg-green-50 flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-medium text-green-800">扫描成功</h3>
              </Card.Header>
              
              <Card.Body>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">候选人信息</h3>
                    <p className="font-medium text-gray-900">{scannedData.name} | {scannedData.studentId}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">申请部门</h3>
                      <div className="flex items-center">
                        <p className="font-medium text-gray-900">{scannedData.department}</p>
                        {scannedData.volunteerType === 'special' && (
                          <span className="ml-2 inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                            特招
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <h3 className="text-sm font-medium text-gray-500">所属学院</h3>
                      <p className="font-medium text-gray-900">{scannedData.college}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">当前状态</h3>
                    <div className="mt-1">
                      {scannedData.status === 'interview' ? (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded-full">
                          待面试
                        </span>
                      ) : scannedData.status === 'accepted' ? (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
                          已录取
                        </span>
                      ) : scannedData.status === 'rejected' ? (
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">
                          未通过
                        </span>
                      ) : (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                          待审核
                        </span>
                      )}
                      {scannedData.status === 'interview' && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-100 rounded-md text-sm text-yellow-700 flex items-start">
                          <svg className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>该候选人已到场签到，需要立即开始面试流程</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card.Body>
              
              <Card.Footer className="flex justify-between">
                <Button variant="outline" onClick={resetScanner}>
                  重新扫描
                </Button>
                <Button onClick={goToEvaluation} disabled={scannedData.status !== 'interview'}>
                  进入评价
                </Button>
              </Card.Footer>
            </div>
          )}
        </Card>
        
        {/* 操作提示 */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-800">扫码提示</h3>
              <ul className="mt-1 text-sm text-blue-700 list-disc list-inside space-y-1.5">
                <li>请确保面试者出示本人二维码</li>
                <li>扫描时请保持手机稳定</li>
                <li>扫码成功后可直接进入面试评价表单</li>
                <li>已录取或未通过的候选人无法进入评价</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCodeScanner;
