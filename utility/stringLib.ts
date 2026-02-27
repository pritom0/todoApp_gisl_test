interface InputValidation  {
  error: boolean;
  message: string;
} 

// trim, more than 5 chars, less than 100 char, bad chars, prevent empty submission, 
export function inputValidation(s:string): InputValidation {
  if(s.trim().length===0) {
    return {error: true, message:"input can't be empty"}
  }
  if(s.trim().length>30) {
    return {error: true, message:"input is too long"}
  }

  return {error: false, message: s.trim()}
}

