"use client"

import { useBoundStore } from "@/app/_store/stateStore";

export default function ProgressBarCustom(){
  // +1 for visualization, e.g. 0/1=0%, 1/2=50%
  const progressDone = useBoundStore(state => (state.progressDone)) +1 
  const progressRemain = useBoundStore(state => (state.progressRemain)) +1
  // const isProgressing = progressDone < progressRemain
  // sometimes Done equals Remain, so:
  const isProgressing = progressRemain > 1
  const progressPercent = isProgressing? (progressDone / progressRemain) * 100 : 0;
  console.log({progressDone,progressRemain, progressPercent});

  const style = {
    width: progressPercent+"%",
    // background: `linear-gradient(to right, #3b82f6, #ef4444, #f59e0b, #3b82f6)`,
  }

  return (
    <>
      {
        isProgressing &&
          <div className={`fixed z-1000 border-amber-500 border-t-8 rounded-[100px]`}
            style={style}
          >
            
          </div>
      }
    </>
  )
}

// progress bar documentation
// create progress bar store slice, states > [progress_count] [progress_remain], each mutation > progress_count/remain++
