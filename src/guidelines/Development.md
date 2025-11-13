# Development Guidelines

## Code Style

- Use TypeScript for all new code
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused

## Component Structure

```typescript
// Component structure template
import { useState, useEffect } from 'react';
import type { ComponentProps } from '../types';

interface ComponentNameProps {
  // Props interface
}

export function ComponentName({ ...props }: ComponentNameProps) {
  // Component logic
  return (
    // JSX
  );
}
```

## File Naming

- Components: PascalCase (e.g., `ServiceCard.tsx`)
- Utilities: camelCase (e.g., `adminStorage.ts`)
- Types: camelCase (e.g., `types.ts`)

## Git Workflow

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Commit with descriptive messages
5. Push and create PR

