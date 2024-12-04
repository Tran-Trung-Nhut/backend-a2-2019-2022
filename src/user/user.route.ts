import { Router } from "express"
import userController from "./user.controller"

const router = Router()

router.get('/', userController.getAllUser as any)
router.get('/name/:name', userController.getUserByName as any)

export default router