import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { inputValidation } from "@/utility/stringLib";
import { ChangeEvent, FormEvent, useState } from "react";

interface TodoInputFieldProps {
  text: string;
  triggerAtSubmit: (text:string)=>Promise<boolean>;
  reset: ()=>void;
}

export default function TodoInputField({text, triggerAtSubmit, reset}: TodoInputFieldProps) {
  
  const [error, setError] = useState<string> ('')
  const [input, setInput] = useState<string>(text || '')
  const [pending, setPending] = useState<boolean> (false)

  async function triggerAfterSubmit() {
    console.log(input, "trigger")
    const success = await triggerAtSubmit(input);
    if(success) {
      reset()
      setInput('')
    } 

    setPending(false);
  }

  function onSubmits(event:FormEvent) {
    event.preventDefault();
    console.log("#$#$")


    if(inputValidation(input).error) {
      setError(inputValidation(input).message)
    } 
    else {
      setPending(true)
      triggerAfterSubmit();
    }
  }

  function changeHandler(e:ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
    setError('')
  }


  return (
    <form onSubmit={onSubmits} >
      <Field 
        data-invalid={error? true:false}
      >
        {
          error ? 
            <FieldLabel htmlFor="input-invalid">Invalid Input</FieldLabel> :
            null
        }
        <div className="flex border-2 rounded-sm p-2">
          <Input className="grow"
            id="input-field-username"
            type="text"
            placeholder={(text? "edit": "add" )+" todo"}
            onChange={changeHandler}
            value={input}
          />
          <Button type="submit" className="grow-0 cursor-pointer"
            disabled={pending}
          > submit </Button>
        </div>
        {
          error &&
            <FieldDescription>
              {error}
            </FieldDescription>
        }
      </Field>
    </form>
  )
}

// a generic input field which can be used for add and edit input submit.

// TodoInput - prop(text), save/submit -> editAction(text,id)/postTodo(text), error -> validateText().message 
// TodoInput(prop: triggerAtSubmit()),  await Trigger..() === true? inputStatus reset : null -> pending/disable submit,
// a message is recieved from add_action or postTodo after request finishes, meaning, pending state can be kept locally, so removed this part:     // else if(status?.pending === 'true') { // Redundant => disable submit on pending

