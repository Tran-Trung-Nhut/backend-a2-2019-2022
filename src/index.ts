import express, { Request, Response } from 'express';
import dotenv from "dotenv"
import { createServer } from 'http';
import cors from "cors"
import loginRoutes from "./login/login.route"
import meetingRoutes from "./meeting/meeting.route"
import userRoutes from "./user/user.route"
import userMeetingRoutes from "./userMeeting/userMeeting.route"
import messageRoutes from "./message/message.route"



dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', loginRoutes)
app.use('/meeting', meetingRoutes)
app.use('/user', userRoutes)
app.use('/userMeeting', userMeetingRoutes)
app.use('/message', messageRoutes)


const server = createServer(app)
const port = process.env.PORT || 10000;
server.listen(port, () => {
    console.log(`[server]: Server is running at port:${port}`);
  });
