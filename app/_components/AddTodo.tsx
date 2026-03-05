
import useCreateTodo from "../_hooks/useCreateTodo";
import TodoInputField from "./TodoInputField";

export default function AddTodo() {

  const {createMutation} = useCreateTodo();

  function triggerAtSubmit(text:string, resetForm: ()=>void) {
    const fakeId = Date.now().toString();
    createMutation.mutate(
      {task: text, id: fakeId},
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

      <TodoInputField {...{triggerAtSubmit, text:"", reset:()=>null, pending, success}} className="w-full p-6 rounded-xl shadow-sm border" />
    </>
  );
}


// TodoInput - prop(text), save/submit -> editAction(text,id)/postTodo(text), error -> validateText().message 
// 
