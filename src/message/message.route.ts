import { Router } from "express"
import messageController from "./message.controller"

const router = Router()

router.get('/meeting/:meetingId', messageController.getMessageInMeeting as any)

export default router