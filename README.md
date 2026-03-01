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

