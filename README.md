### issue

icon.tsx not working
title description meta is not showing
error in vercel typescript
could not deploy preview branch try/middleware
npx tsc --noEmit --watch
https://www.opengraph.xyz/url/https%3A%2F%2Fbangla-typing-online.vercel.app%2F
https://vercel.com/abhijeet-kuri-pritoms-projects/todo-app-gisl-test/C5Ncqvb8j3JtYCPBVr8CBZLYjunk

https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
⚠ ./app/opengraph-image.jpeg
AVIF image not supported
This version of Turbopack does not support AVIF images, will emit without optimization or encoding


## instructions

parallel route, middleware feature:
- visit localhost/practice/parallelRoute, type 'admin' or 'user' submit to login, type anything else to logout. 
- if logged in resource page is accessible, otherwise middleware redirects requests.


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
optimistically added item's delete disable phase should not have spinner
cleaned unused codes
todo crud requests are now routed to nextjs server instead of mock server from user's end, used routes.ts to achieve this
lighthouse performance optimization: todoList data fetch takes about 2 seconds, so we cache data on nextjs server using fetch(,next:{revalidate:60}, we define server function for getTodo inside page.tsx of Home page. so, when the first user requests data it will be cached for subsequent users.
> issue: the first time data is not fetched because npm run build can't fetch data when server is not up yet, in real world, server will be seperate and build won't show warnings.
opengraph-image shows in localhost, but not in vercel, 


### analysis
current progress
zustand integration for todo states, nextjs integration, 
todo query, mutations don't need state, don't need zustand, done in react query. 

### todo

add a search bar or a "Show Completed" toggle
User Session Info, User Authentication, NextAuth.js (Auth.js) or Clerk, Security, Middleware, and Database Relations.
Theme (Dark/Light)
Search/Filter Text
progress bar > color dynamic / transition, rerender optimize, toast space conflict, mutation fire.
toaster message does not disappear after an error or multiple messages, 
progress component, use 3rd party library from daily.dev, or animate
fails optimistic create when task="slowest"
react hook form for todo form, todo add, todo set priority, todo done toggle, todo edit, delete;

### plan
