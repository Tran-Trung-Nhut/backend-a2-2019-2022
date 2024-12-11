import { Router } from "express"
import userMeetingController from "./userMeeting.controller"

const router = Router()

router.post('/accept', userMeetingController.acceptMeeting as any)
router.get('/:userId/isAccepted/:meetingId', userMeetingController.isAccepted as any)
router.get('/listUserAccepted/:meetingId', userMeetingController.listUserAccepted as any)
router.get('/listUserAccepted/name/:meetingId', userMeetingController.listUserAcceptedName as any)

export default router