import { useTodoContext } from "../_contexts/TodoContext";
import TodoInputField from "./TodoInputField";

export default function AddTodo() {

  const {createMutation} = useTodoContext();

  function triggerAtSubmit(text:string, resetForm: ()=>void) {
    createMutation.mutate(
      {task: text, createdAt: new Date().toISOString(), id:Date.now().toString()},
      {
        onSuccess() {
          resetForm();
        }
      }
    )
  }

  const pending = createMutation.isPending;
  const success = createMutation.isSuccess;
  

  return (
    <>
      <TodoInputField {...{triggerAtSubmit, text:"", reset:()=>null, pending, success}} />
    </>
  );
}


// TodoInput - prop(text), save/submit -> editAction(text,id)/postTodo(text), error -> validateText().message 
// 
