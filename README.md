



PLEASE DO NOT forget to nvm use 12 and npm i - it will install dependencies from the project


node ./src/index.js - to launch this API

OR
npm start
DO NOT use npm react start - it won't work, but npm start - actually works
UPDATE:
Use NODE_OPTIONS=--openssl-legacy-provider before any command. So for running project, please use
NODE_OPTIONS=--openssl-legacy-provider npm start


//npx create-react-app my-app - в терминале чтобы создать приложение на реакте

//my-app это имя нашего приложения

//npm start - Start development server on localhost 3000 (приложение реакт запустилось на 3 000 порту)
//сервер умеет принимать http запросы и отвечать на них, отдавая index.html(html страницы)
//https://www.youtube.com/watch?v=9Jk8SLMl3gI&list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8&index=4

//npm run build - Bundles the app into static files for production

//npm test - Starts the test runner

//npm run eject - Removes this tool and copies build dependices, configuration files and scripts
//into the app directory. If you do this, you can't go back


//Maybe from these commands I can begin?
//cd my-app
//npm start

//# Run in development and serve at localhost:3000
//npm run dev
