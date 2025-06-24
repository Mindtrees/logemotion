# EmotionLog 개발 가이드라인

## 프로젝트 개요
Emotionlog - 감정 기록 및 분석을 위한 React TypeScript 애플리케이션 (Material-UI 컴포넌트 사용)

## 기술 스택
- **프레임워크**: React 18+ with TypeScript
- **라우팅**: React Router DOM
- **UI 라이브러리**: Material-UI (MUI)
- **상태 관리**: React Hooks (useState, useContext)
- **빌드 도구**: Create React App
- **코드 분할**: 성능 최적화를 위한 React.lazy

## 폴더 구조

```
src/
├── assets/             # 정적 파일 (이미지, 아이콘)
├── components/         # 재사용 가능한 UI 컴포넌트
│   ├── NavBar/
│   │   └── index.tsx
│   └── Loading/
│       └── index.tsx
├── hooks/              # 커스텀 React 훅
├── layout/             # 라우팅을 포함한 레이아웃 컴포넌트
│   └── AppLayout.tsx
├── models/             # TypeScript 타입 정의
│   ├── index.ts        # 중앙 export 파일
│   ├── navbar.ts
│   ├── post.ts
│   ├── user.ts
│   └── common.ts
├── pages/              # 페이지 컴포넌트 (라우트 컴포넌트)
│   ├── AllPosts/
│   │   └── index.tsx
│   ├── Home/
│   │   └── index.tsx
│   ├── Login/
│   │   └── index.tsx
│   ├── MyPosts/
│   │   └── index.tsx
│   ├── Profile/
│   │   └── index.tsx
│   └── Write/
│       └── index.tsx
├── services/           # API 호출 및 외부 서비스
├── store/              # 상태 관리
├── styles/             # 전역 스타일 (필요시)
└── utils/              # 유틸리티 함수
```

## 코드 컨벤션

### File Naming Convention
- **컴포넌트**: PascalCase 폴더와 `index.tsx`
  - `src/components/NavBar/index.tsx`
  - `src/pages/MyPosts/index.tsx`
- **타입**: models 폴더 안에 camelCase로 `.ts` 확장자
  - `user.ts`, `navbar.ts`, `post.ts`
- **유틸리티**: 설명적인 이름으로 camelCase
  - `formatDate.ts`, `apiClient.ts`

### 컴포넌트 구조
```typescript
import React from 'react';
import { ComponentProps } from '@/models';

const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  const [state, setState] = useState<StateType>(initialValue);

  const handleAction = () => {
    // 핸들러 로직
  };

  return (
    <div>
      {/* JSX 내용 */}
    </div>
  );
};

export default ComponentName;
```

### TypeScript 컨벤션
- **인터페이스 명명**: 설명적인 이름으로 PascalCase
  ```typescript
  interface UserProps {
    id: string;
    name: string;
    email: string;
  }
  ```
- **타입 내보내기**: `models/index.ts`에서 중앙 관리
  ```typescript
  export * from './user';
  export * from './post';
  ```
- **타입 가져오기**: 가능한 절대 경로 사용
  ```typescript
  import { User, Post } from '@/models';
  ```

### 이벤트 핸들러
- **명명 규칙**: `handle` + `액션` + `대상`
  ```typescript
  const handleClickSubmit = () => {};
  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {};
  ```

### Material-UI 컨벤션
- **컴포넌트 가져오기**: 특정 컴포넌트만 가져오기
  ```typescript
  import { Button, TextField, Box } from '@mui/material';
  ```
- **스타일링**: 컴포넌트별 스타일에 `sx` prop 사용
  ```typescript
  <Button sx={{ mt: 2, backgroundColor: 'primary.main' }}>
    제출
  </Button>
  ```
- **아이콘**: 설명적인 이름으로 가져와서 사용
  ```typescript
  import { Login as LoginIcon } from '@mui/icons-material';
  ```

## 라우팅 구조

### 라우트 정의
```typescript
const routes = [
  { path: '/', component: 'Home' },
  { path: '/write', component: 'Write' },
  { path: '/my-posts', component: 'MyPosts' },
  { path: '/all-posts', component: 'AllPosts' },
  { path: '/profile', component: 'Profile' },
  { path: '/login', component: 'Login' }
];
```

### 지연 로딩 구현
```typescript
const ComponentName = React.lazy(() => import('../pages/ComponentName'));

<Suspense fallback={<Loading />}>
  <ComponentName />
</Suspense>
```

## 성능 최적화

### 코드 분할
- 페이지 레벨 컴포넌트에 `React.lazy()` 사용
- `Suspense`로 적절한 로딩 상태 구현
- 큰 컴포넌트를 작고 재사용 가능한 조각으로 분할

### 번들 최적화
- 필요한 MUI 컴포넌트만 가져오기
- 깊은 중첩을 방지하기 위해 절대 경로 사용
- 적절한 트리 셰이킹 구현

## 개발 가이드라인

### 컴포넌트 개발
1. **단일 책임**: 하나의 컴포넌트, 하나의 목적
2. **Props 검증**: 항상 TypeScript 인터페이스 정의
3. **재사용성**: 재사용 가능하도록 컴포넌트 설계
4. **성능**: 필요시 React.memo 사용

### 에러 처리
1. **에러 바운더리**: 페이지 레벨 컴포넌트에 구현
2. **폼 유효성 검사**: 사용자 입력 유효성 검사 처리
3. **API 에러**: API 호출에 대한 적절한 에러 처리

### 코드 리뷰 체크리스트
- [ ] 컴포넌트가 명명 규칙을 따르는가
- [ ] TypeScript 인터페이스가 적절히 정의되었는가
- [ ] 사용하지 않는 import나 변수가 없는가
- [ ] 적절한 에러 처리가 구현되었는가
- [ ] 반응형 디자인이 고려되었는가
- [ ] 성능 최적화가 적용되었는가

## 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm start
```

### 프로덕션 빌드
```bash
npm run build
```

### 필수 의존성
```json
{
  "@mui/material": "^5.x.x",
  "@mui/icons-material": "^5.x.x",
  "@emotion/react": "^11.x.x",
  "@emotion/styled": "^11.x.x",
  "react-router-dom": "^6.x.x"
}
```

## 기여하기

1. 기존 폴더 구조 따르기
2. 일관된 코드 컨벤션 유지
3. 모든 컴포넌트에 TypeScript 타입 추가
4. 커밋 전에 컴포넌트를 철저히 테스트
5. 새로운 기능 추가 시 문서 업데이트

---