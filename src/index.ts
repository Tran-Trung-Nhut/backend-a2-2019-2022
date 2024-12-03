import express, { Request, Response } from 'express';
import dotenv from "dotenv"
import { createServer } from 'http';
import cors from "cors"
import loginRoutes from "./login/login.route"
import meetingRoutes from "./meeting/meeting.route"


dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', loginRoutes)
app.use('/meeting', meetingRoutes)

const server = createServer(app)
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
