import { configureStore } from '@reduxjs/toolkit';
import workflow from '@/features/workflow/slice';

export const store = configureStore({
  reducer: {
    workflow,
  },
});
