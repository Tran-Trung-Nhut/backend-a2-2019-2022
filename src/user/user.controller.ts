import { Request, Response } from "express"
import { db } from "../db/db"
import { user } from "../db/schema"
import { eq } from "drizzle-orm"
import { toZonedTime } from "date-fns-tz"

class UserController{
    public getAllUser = async (req: Request, res: Response) => {
        try{
                const users = await db
                .select()
                .from(user)

                if(users.length === 0){
                    return res.status(404).json({
                        message: "Không có người dùng nào tồn tại!"
                    })
                }


                return res.status(200).json({
                    message: "Success!",
                    data: users
                })
        }catch(e){
            return res.status(500).json({
                message: e
            })
        }
    }

    public getUserByName = async (req: Request, res: Response) => {
        const { name } = req.params

        try{
                const users = await db
                .select()
                .from(user)
                .where(eq(user.name, name))

                if(users.length === 0){
                    return res.status(404).json({
                        message: "Không có người dùng nào tồn tại!"
                    })
                }


                return res.status(200).json({
                    message: "Success",
                    data: users[0]
                })
        }catch(e){
            return res.status(500).json({
                message: e
            })
        }
    }

    public updateLastAccess = async (req: Request, res: Response) => {
        const name = req.body.name
    
        try {
            await db
            .update(user)
            .set({ lastAccess: toZonedTime(new Date(), 'Asia/Ho_Chi_Minh')})
            .where(eq(user.name, name))

            return res.status(200).json({
                message: "Success"
            })
        } catch (e) {
            return res.status(500).json({
                message: e
            })
        }
    }
}

export default new UserController()