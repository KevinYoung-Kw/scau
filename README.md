# 校科联招新系统前端原型

校科联招新系统前端原型是一个基于React的移动端Web应用，用于管理校园科技联盟招新流程。系统包括学生端和面试官端两大模块，支持学生身份验证、志愿填报、面试进度查询以及面试官评价、批量操作等功能。

## 技术栈

- **前端框架**：React 18 + TypeScript 5.0（严格模式）
- **样式方案**：Tailwind CSS v3.3（JIT模式+移动优先）
- **状态管理**：useContext + useReducer组合模式
- **组件库**：@headlessui/react（基础交互） + swiper/react（滑动组件）
- **构建工具**：Vite 4.0
- **拖拽功能**：@dnd-kit/core + @dnd-kit/sortable

## 项目初始化

1. 克隆或下载项目代码。
2. 在项目根目录下运行以下命令以安装依赖：
   ```bash
   npm install
   ```
3. 运行开发服务器：
   ```bash
   npm run dev
   ```
4. 打开浏览器，访问 `http://localhost:3000` 查看应用。

## API 接口概述

系统采用RESTful风格API设计，基础路径为`/api/v1/`，支持5000+并发请求。以下是按模块划分的主要API接口：

### 1. 身份验证与权限API

| 接口路径 | 方法 | 说明 | 权限要求 |
|---------|------|------|---------|
| `/api/v1/auth/verify` | POST | 学号验证，返回学院/专业/年级信息 | 无需权限 |
| `/api/v1/auth/login` | POST | 用户登录，获取身份令牌 | 无需权限 |
| `/api/v1/auth/role` | GET | 获取当前用户角色权限 | 需要令牌 |
| `/api/v1/auth/special-qualification` | GET | 特招资格检查 | 需要令牌 |

**请求示例**:
```json
// POST /api/v1/auth/verify
{
  "studentId": "20230101"
}
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "valid": true,
    "info": {
      "grade": "2023",
      "college": "计算机学院",
      "major": "计算机科学与技术",
      "class": "1班"
    },
    "eligibleForSpecial": true,
    "specialDepartments": ["网络中心", "开发部"]
  }
}
```

### 2. 志愿填报API

| 接口路径 | 方法 | 说明 | 权限要求 |
|---------|------|------|---------|
| `/api/v1/departments` | GET | 获取部门列表信息 | 学生 |
| `/api/v1/departments/{id}` | GET | 获取部门详情 | 学生 |
| `/api/v1/applications` | POST | 提交志愿申请 | 学生 |
| `/api/v1/applications/user` | GET | 获取用户志愿信息 | 学生 |
| `/api/v1/applications/special` | POST | 提交特招申请 | 有特招资格学生 |

**请求示例**:
```json
// POST /api/v1/applications
{
  "preferences": [
    {
      "departmentId": 1,
      "priority": 1,
      "isSpecial": false
    },
    {
      "departmentId": 3,
      "priority": 2,
      "isSpecial": true
    }
  ]
}
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "applicationId": "app12345",
    "submittedAt": "2023-09-20T14:30:00Z",
    "status": "submitted",
    "preferences": [
      {
        "departmentId": 1,
        "departmentName": "网络中心",
        "priority": 1,
        "isSpecial": false
      },
      {
        "departmentId": 3,
        "departmentName": "开发部",
        "priority": 2,
        "isSpecial": true
      }
    ]
  }
}
```

### 3. 面试流程API

| 接口路径 | 方法 | 说明 | 权限要求 |
|---------|------|------|---------|
| `/api/v1/interviews/status` | GET | 获取面试进度 | 学生 |
| `/api/v1/interviews/qrcode` | GET | 获取面试二维码 | 学生 |
| `/api/v1/interviews/scan` | POST | 扫描面试二维码 | 面试官 |
| `/api/v1/interviews/{id}/status` | PUT | 更新面试状态 | 面试官 |
| `/api/v1/interviews/notifications` | POST | 发送面试通知 | 面试官 |

**请求示例**:
```json
// PUT /api/v1/interviews/12345/status
{
  "status": "passed",
  "comment": "表现良好，逻辑思维能力强",
  "score": 85
}
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "interviewId": "12345",
    "studentId": "20230101",
    "updatedStatus": "passed",
    "nextStep": "等待部门确认",
    "updatedAt": "2023-09-21T10:15:00Z"
  }
}
```

### 4. 面试官管理API

| 接口路径 | 方法 | 说明 | 权限要求 |
|---------|------|------|---------|
| `/api/v1/interviewer/candidates` | GET | 获取候选人列表 | 面试官 |
| `/api/v1/interviewer/candidates/batch` | PUT | 批量更新候选人状态 | 面试官 |
| `/api/v1/interviewer/evaluation-templates` | GET | 获取评价表单模板 | 面试官 |
| `/api/v1/interviewer/evaluations` | POST | 提交面试评价 | 面试官 |
| `/api/v1/interviewer/schedule` | PUT | 调整面试顺序 | 面试官 |

**请求示例**:
```json
// PUT /api/v1/interviewer/candidates/batch
{
  "candidateIds": ["12345", "12346", "12347"],
  "action": "pass",
  "notifyMessage": "恭喜通过初试，请准备9月22日的复试"
}
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "updatedCount": 3,
    "notificationSent": 3,
    "failedNotifications": 0
  }
}
```

### 5. 管理后台API

| 接口路径 | 方法 | 说明 | 权限要求 |
|---------|------|------|---------|
| `/api/v1/admin/users` | GET | 获取用户列表 | 管理员 |
| `/api/v1/admin/roles` | GET/POST | 管理角色权限 | 超级管理员 |
| `/api/v1/admin/departments` | GET/POST/PUT | 部门管理 | 管理员 |
| `/api/v1/admin/special-rules` | POST/PUT | 特招规则配置 | 主席 |
| `/api/v1/admin/statistics` | GET | 获取招新数据统计 | 管理员 |
| `/api/v1/admin/export` | GET | 导出数据(Excel/PDF) | 管理员 |

**请求示例**:
```json
// POST /api/v1/admin/special-rules
{
  "collegeId": 3,
  "collegeName": "计算机学院",
  "eligibleDepartments": [1, 3, 5],
  "requirements": "计算机相关专业，有编程经验优先"
}
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "ruleId": 8,
    "collegeId": 3,
    "collegeName": "计算机学院",
    "eligibleDepartments": [
      {"id": 1, "name": "网络中心"},
      {"id": 3, "name": "开发部"},
      {"id": 5, "name": "数据中心"}
    ],
    "createdAt": "2023-09-15T09:30:00Z",
    "updatedAt": "2023-09-15T09:30:00Z"
  }
}
```

### 6. 数据持久化API

| 接口路径 | 方法 | 说明 | 权限要求 |
|---------|------|------|---------|
| `/api/v1/storage/sync` | POST | 同步本地数据至服务器 | 需要令牌 |
| `/api/v1/storage/pull` | GET | 从服务器拉取最新数据 | 需要令牌 |
| `/api/v1/storage/encryption-key` | GET | 获取数据加密密钥 | 需要令牌 |

**请求示例**:
```json
// POST /api/v1/storage/sync
{
  "lastSyncTimestamp": "2023-09-18T14:30:00Z",
  "data": {
    "interviews": [...],
    "evaluations": [...]
  },
  "checksum": "a1b2c3d4e5f6..."
}
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "syncSuccessful": true,
    "newSyncTimestamp": "2023-09-20T10:15:00Z",
    "conflictItems": []
  }
}
```

### 7. 错误码规范

| 错误码 | 说明 | 处理建议 |
|-------|------|---------|
| 200 | 请求成功 | 正常处理响应数据 |
| 400 | 请求参数错误 | 检查请求参数格式 |
| 401 | 未授权访问 | 用户需重新登录 |
| 403 | 权限不足 | 提示用户无操作权限 |
| 404 | 资源不存在 | 检查请求资源ID |
| 409 | 数据冲突 | 解决志愿填报冲突 |
| 429 | 请求过多 | 实现请求节流 |
| 500 | 服务器内部错误 | 联系系统管理员 |

### 模块说明

模块1：移动端原型设计调整  
模块2：身份验证与权限体系  
模块3：志愿填报与特招逻辑  
模块4：面试流程引擎  
模块5：面试官工作台  
模块6：管理后台系统  
模块7：数据持久化方案  
模块8：异常处理机制

### 技术栈约束说明
1. **框架**：React 18 + TypeScript 5.0（严格模式）
2. **样式**：Tailwind CSS v3.3（JIT模式）
3. **状态管理**：useContext + useReducer（避免Redux）
4. **组件库**：@headlessui/react（基础组件） + swiper/react（轮播）
5. **构建**：Vite 4.0（极速开发服务器）
