import TodoInputField from "./TodoInputField";

interface addTodoProp {
  postTodo: (addTodo: string) => Promise<boolean>;
}



export default function AddTodo({ postTodo } :addTodoProp) {

  async function triggerAtSubmit(text: string) {
    return await postTodo(text)
  }


  return (
    <>
      <TodoInputField {...{triggerAtSubmit, text:"", reset:()=>null}} />
    </>
  );
}


// TodoInput - prop(text), save/submit -> editAction(text,id)/postTodo(text), error -> validateText().message 
// 
