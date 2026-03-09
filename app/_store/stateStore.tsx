import {create} from 'zustand'
import { ProgressSlice, ProgressState } from './ProgressSlice'

export const useBoundStore = create<ProgressState>()((...a) => ({
  ...ProgressSlice(...a)
}))

