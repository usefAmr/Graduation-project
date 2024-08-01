
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../DB/connection.js'
import authRouter from './modules/auth/auth.router.js'
import userRouter from './modules/user/user.router.js'
import soilRouter from './modules/soil/soil.router.js'
import {globalErrorHandling} from './utils/errorHandling.js'
import morgan from 'morgan'
import cors from 'cors'

export const morganDev = morgan('dev')
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
    


const initApp = (app, express) => {

// Serve static files
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(cors())
    app.use(morganDev)
    app.use(express.json({}))
    app.use(authRouter)
    app.use(userRouter)
    app.use(soilRouter)



    app.use(globalErrorHandling);
    connectDB()
}

export default initApp