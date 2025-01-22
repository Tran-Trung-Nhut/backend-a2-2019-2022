import { Router } from "express"
import userController from "./user.controller"

const router = Router()

router.get('/', userController.getAllUser as any)
router.get('/name/:name', userController.getUserByName as any)
router.patch('/lastAccess', userController.updateLastAccess as any)

export default router