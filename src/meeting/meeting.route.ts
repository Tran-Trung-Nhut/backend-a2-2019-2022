import { Router } from "express"
import meetingController from "./meeting.controller"

const router = Router()

router.get('/yes', meetingController.getMeetingYes as any)
export default router