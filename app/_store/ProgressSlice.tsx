import { StateCreator } from 'zustand'

// const progressReducer = (state, action) => {
//   switch (action.type) {
//     case 'PROGRESS_QUEUE_DOWN':
//       return ({...state, progressDone: state.progressDone+1})
//     case 'PROGRESS_QUEUE_UP':
//       return ({...state, progressRemain: state.progressRemain+1})
//     case 'PROGRESS_FINISH':
//       return ({
//       ...state,
//       progressDone: 0,
//       progressRemain: 0
//     })

//     default:
//       return state;
//   }
// }


export type ProgressState = {
  shouldFinish: number;
  progressDone: number;
  progressRemain: number;
  // isProgressing: () => boolean;
  progressActions: {
    progressQueueUp: (queueAmount:number) => void;
    progressQueueDown: (queueAmount:number) => void;
    finishProgressing: () => void;
  }
}

export const ProgressSlice: StateCreator<ProgressState, [], [], ProgressState> = (set, get) => ({
  progressDone: 0,
  progressRemain: 0,
  shouldFinish: 0,

  // isProgressing: () => {
  //   let ans = false;
  //   set(state => {
  //     if(state.progressDone < state.progressRemain) ans = true;
  //     return state;
  //   })
  //   return ans;
  // },

  progressActions: {
    progressQueueUp: (queueAmount:number) => {
      set(state =>({
      ...state, progressRemain: state.progressRemain + queueAmount,
      shouldFinish: state.shouldFinish + queueAmount
    }))},
  
    progressQueueDown: (queueAmount:number) => {set(state => ({
      ...state, progressDone: state.progressDone + queueAmount,
      shouldFinish: state.shouldFinish - queueAmount
    }))},
  
    // sometimes finish called, then QueueUp action triggers, so cleanup finish() call happened before by 
    // logical check Remain===Done or shouldFinish=0
    finishProgressing: () => {
      if(get().shouldFinish === 0) {
        set(state => ({
            ...state,
            progressDone: 0,
            progressRemain: 0
          }))
      }
      
    }
  }  

})

