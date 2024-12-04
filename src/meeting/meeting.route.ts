import { Router } from "express"
import meetingController from "./meeting.controller"

const router = Router()

router.get('/yes', meetingController.getMeetingYes as any)
router.get('/', meetingController.getAllMeeting as any)

export default router