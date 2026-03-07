// onCreate/delete/edit progressCount++, onSuccess/onError progressReach++, 
// if(progressCount === progressReach) progressCount/Reach = 0, progress component disappears
// <Progress /> <Home /> <TodoApp />
// layout theme, session auth, 

import {create, StateCreator} from 'zustand'
import { ProgressSlice, ProgressState } from './ProgressSlice'

export const useBoundStore = create<ProgressState>()((...a) => ({
  ...ProgressSlice(...a)
}))

