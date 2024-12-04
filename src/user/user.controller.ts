import { Request, Response } from "express"
import { db } from "../db/db"
import { meeting, timeDescription, user } from "../db/schema"
import { eq } from "drizzle-orm"

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
            console.log(e)
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
                    message: "Success!",
                    data: users[0]
                })
        }catch(e){
            console.log(e)
            return res.status(500).json({
                message: e
            })
        }
    }


}

export default new UserController()