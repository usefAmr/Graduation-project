import * as dotenv from 'dotenv';
import express from 'express'
import initApp from './src/app.router.js'
const app = express()
const port = 3000
dotenv.config();

const logSomething = () => {
    console.log('Logging something every 5 minutes...');
};

initApp(app , express)

app.listen(port,
    () => console.log(`Server is running on port ${port}!`))
