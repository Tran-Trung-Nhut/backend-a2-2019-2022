import { Router } from "express"
import userController from "./user.controller"

const router = Router()

router.get('/', userController.getAllUser as any)
export default router