
Create a simple react app to manage your Todos.

1. Homepage should contain a list of Todos (focus on API Data fetching and use of hooks like useState and useEffects)
	* to fetch todos use "https://6375088248dfab73a4f034c4.mockapi.io/api/v1/todos" url as get method
	* use some library like axios instead of using JS fetch
	* call the API inside the useEffect  fetch data on page load

2. Add an input field where user can write new todo and submit (Focus on form handling and hooks like useState and date posting)
	* use the same URL but as post method with a payload that looks like {task: "Clean the room"}
	* Success full submit should show a success message
	* once the API is posted the todo list should be updated.

3. Each task should have a delete button
	* On clicking the delete button the task should get deleted (if possible add some a confirmation dialogue before delete)
	* Call the same API URL but this time with id and as delete method
	
	

## commits
- testing shadcn: button spinning component 	
- refactored the code: removed setAddTodo prop from postTodo(), inserted setAddTodo prop into useTodoAction(), because postTodo should not depend on this prop. now we can move the onSubmit of the page.tsx to the AddTodo component where it belongs. Todo: stop showing toast message for form input validation errors. 
- done editAction, now we need to choose UI approach: 1. Reuse  the form component that was used for add feature, 2. switch a todo field into input field, 3. open up a shadcn dialogue box for edit operation.
- refactor: introduced generic TodoInputField for create and edit, localized validation and pending state to simplify parent logic.
- feat: added toast notification for API response errors, implemented functional cancel button for edit mode, relocated Add todo form to the top of the UI, refactored layout spacing for better ux, removed unused imports.
- bug-fix: fixed incorrect todo list sorting. mock server was generating inconsistent createdAt timestamp resulting in incorrect todo list order. 



### done
defined limits of amount of refetch so that an error shows if request does not resolve after 10 seconds.
query
create, edit, delete mutation
optimistic mutation
reset not happening fixed
query error notification
disable delete button when pending
disable single todo item instead of all items.
merge with switchField
fixed bug: at 3g, multiple updates at a time, pending state is removed by neighboring last item's pending state. useMutation at Todo item instead of central useMutation
Use separate hooks for each api actions like for example to get all the todo useTodos(), to create a new todo useCreateTodo(), to update a todo useUpdateTodo() and to delete todo useDeleteTodo()
removed context wrapper in TodoApp component which might optimize performance
No need to show "Deleting..." in the toast, instead just disable the button and if possible show a loading spinner in the delete button
Error state is not handled in the TodoApp.tsx file
While creating todo, you are sending id and createdAt in the payload, which is unnecessary.
disable delete button when createMutation is pending
Managing "Edit Mode"
progressBarCustom component > progress bar at the very top of the screen that tracks any pending mutation (Create, Delete, or Update) for slow networks.


### analysis
current progress
zustand integration for todo states, nextjs integration, 
todo query, mutations don't need state, don't need zustand, done in react query. 

### todo

Zustand can act as the coordinator.
If you add a search bar or a "Show Completed" toggle
User Session Info
Theme (Dark/Light)
Search/Filter Text
progress bar > color dynamic / transition, rerender optimize, toast space conflict, mutation fire.
optimistic added item delete disable should not have spinner
toaster message does not disappear after an error or multiple messages, 
progress component, use 3rd party library from daily.dev, or animate

### plan

edit flow
edit state, edit state reducer
dispatch('edit', text)
selector = create (set => editReducer(state,edit_action))
selector(state => state.edit)
keep selector=create at store/edit.ts and import it inside editTodo component

progress bar flow
<progress completed={boolean} color={getColor(mutation_type)}>
create/edit/delete mutation isPending && <progress>
progress state, progress state reducer
dispatch('progress', 'create_on'|'create_off'|'update..'|'delete..')
selector = create(set => progressReducer(state, 'create_on'))
>
called QUEUE_UP in onMutation function, QUEUE_DOWN in onSettled function, Queue check to reset
onSettled increases percentage, 
queue_done++ at onSettle, queue_done = queue_remain = 0 after 2 seconds onSettle, causes bug for 2 seconds delay: if mutation event fires within the delay > queue_remain++ > queue_remain resets abruptly. solve approaches: 1. create new progress component each time reset happens. 2. clear the reset event if queue_up event fires > keep state.shouldReset boolean for progressFinish function

