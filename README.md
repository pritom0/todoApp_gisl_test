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
- removed setAddTodo prop from postTodo(), inserted setAddTodo prop into useTodoAction(), because postTodo should not depend on this prop. now we can move the onSubmit of the page.tsx to the AddTodo component where it belongs. 


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
