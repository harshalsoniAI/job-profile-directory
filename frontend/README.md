# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## This is how we test this APP

To test the application locally, you need to run both the backend API and the frontend React application.

Here are the step-by-step instructions (these are also available in the main README.md in the root of your project directory):

1. Start the Backend API
Open a terminal, navigate to the backend folder, and start the development server:

cd /Users/harshalsoni/Claude_Code_Projects/PR04_JobProfile_Directory/backend
npm run dev


This starts the backend API on http://localhost:3001 and connects to the SQLite database.)

2. Start the Frontend App
Open a new, separate terminal window, navigate to the frontend folder, and start the React development server:

bash
cd /Users/harshalsoni/Claude_Code_Projects/PR04_JobProfile_Directory/frontend
npm run dev
(This starts the frontend React app on http://localhost:5173.)

3. Open in Browser
Once both servers are running, open your web browser and navigate to: http://localhost:5173

From there, you can test all the features:

View the Home page stats and department groupings
Try the Search page filters (keywords, departments, management levels, etc.)
Click on any job card to view the Job Detail page
Browse the A–Z Directory page to jump to specific letter groupings

