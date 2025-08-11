# Component Architecture Documentation

## 📁 Directory Structure

```
src/
├── components/                     # Shared components across the application
│   ├── layout/                    # Layout-related components (navigation, headers)
│   │   ├── Sidebar/              # Main navigation sidebar
│   │   │   ├── Sidebar.tsx       # ✅ Shared across authenticated pages
│   │   │   └── index.ts          # Export configuration
│   │   ├── Header/               # Page header with breadcrumbs
│   │   │   ├── Header.tsx        # ✅ Reusable header with props
│   │   │   └── index.ts          # Export configuration
│   │   └── index.ts              # Layout components export
│   ├── ui/                       # Generic UI components
│   │   ├── Snackbar.tsx         # ✅ Global notification system
│   │   └── index.ts             # UI components export
│   └── index.ts                 # Main components export
├── hooks/                        # Custom React hooks
│   ├── useApiKeys.ts            # ✅ API key CRUD operations
│   ├── useSnackbar.ts           # ✅ Snackbar state management
│   └── useApiKeyForm.ts         # ✅ Form state management
├── app/
│   ├── dashboard/
│   │   ├── components/          # Dashboard-specific components
│   │   │   ├── PlanOverview.tsx # ❗ Dashboard-specific
│   │   │   ├── ApiKeyTable/     # ❗ Dashboard-specific table components
│   │   │   │   ├── ApiKeyTable.tsx
│   │   │   │   ├── ApiKeyRow.tsx
│   │   │   │   ├── ApiKeyModal.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── page.tsx             # Main dashboard page
│   └── (other pages)/
└── types/                       # TypeScript type definitions
    └── api-key.ts
```

## 🔍 Component Classification

### ✅ **Shared Components** (`src/components/`)
Components that can be reused across multiple pages or sections of the application.

#### Layout Components (`src/components/layout/`)
- **Sidebar**: Main navigation sidebar used across authenticated pages
- **Header**: Flexible page header with configurable breadcrumbs and status

#### UI Components (`src/components/ui/`)
- **Snackbar**: Global notification system for success/error messages

### ❗ **Page-Specific Components** (`src/app/[page]/components/`)
Components that are specific to a particular page or feature.

#### Dashboard Components (`src/app/dashboard/components/`)
- **PlanOverview**: Displays current plan and usage information
- **ApiKeyTable**: Complete table system for managing API keys
  - **ApiKeyRow**: Individual table row component
  - **ApiKeyModal**: Create/edit modal for API keys

## 📦 Import Patterns

### ✅ **Recommended Import Patterns**

```typescript
// Shared layout components
import { Sidebar, Header } from '../../components/layout';

// Shared UI components  
import { Snackbar } from '../../components/ui';

// All shared components
import { Sidebar, Header, Snackbar } from '../../components';

// Page-specific components
import { PlanOverview, ApiKeyTable } from './components';

// Custom hooks
import { useApiKeys, useSnackbar } from '../../hooks';
```

### ❌ **Avoid These Patterns**

```typescript
// Don't import directly from file paths
import Sidebar from '../../components/layout/Sidebar/Sidebar';

// Don't import page-specific components from other pages
import { PlanOverview } from '../dashboard/components';
```

## 🎯 Component Scope Guidelines

### **When to Create Shared Components:**
- Component is used in 2+ different pages
- Component provides generic UI functionality
- Component handles global application state
- Component is part of the main layout structure

### **When to Keep Components Page-Specific:**
- Component contains business logic specific to one feature
- Component tightly coupled to page-specific data
- Component unlikely to be reused elsewhere
- Component represents a unique page section

## 🔄 Migration Benefits

### **Before Reorganization:**
- 728-line monolithic dashboard component
- Components mixed with page-specific and shared concerns
- Difficult to reuse navigation across pages
- Hard to maintain and test individual components

### **After Reorganization:**
- ✅ **89-line** main dashboard component
- ✅ **Clear separation** between shared and page-specific components
- ✅ **Reusable navigation** system for future pages
- ✅ **Modular architecture** with focused responsibilities
- ✅ **Easy testing** with isolated components
- ✅ **Better developer experience** with logical imports

## 🚀 Future Expansion

### **Adding New Pages:**
1. Create page directory under `src/app/`
2. Import shared components from `src/components/`
3. Create page-specific components in `src/app/[page]/components/`
4. Follow established import patterns

### **Adding New Shared Components:**
1. Determine if it belongs in `layout/` or `ui/`
2. Create component with proper TypeScript interfaces
3. Add to appropriate index.ts export file
4. Update main components index.ts if needed

### **Component Promotion:**
When a page-specific component becomes reusable:
1. Move component to appropriate shared directory
2. Update import statements across codebase
3. Add proper TypeScript interfaces for flexibility
4. Update export configurations
