import express from "express";
import helmet from "helmet";
import authRoutes from './routes/authRoutes.ts'
import chatRoutes from './routes/chatRoutes.ts'
import messageRoutes from './routes/messageRoutes.ts'
import userRoutes from './routes/userRoutes.ts'

const app = express();
app.use(express.json());
app.use(helmet());



app.get('/health', (req, res) => {
    res.send({status: 'ok', message: 'aal iz vel'})
})


app.use('/api/auth', authRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 3000;

export default app;