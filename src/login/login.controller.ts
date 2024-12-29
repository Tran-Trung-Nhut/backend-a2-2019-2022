import { Request, Response } from "express"
import { db } from "../db/db"
import { user } from "../db/schema"
import { eq } from "drizzle-orm"

class LoginController{
    public login = async (req: Request, res: Response) => {
        try{
                const {name, phoneNumber} = req.body

                const existUser = await db
                .select()
                .from(user)
                .where(eq(user.name, name))

                if(existUser.length === 0){
                    return res.status(404).json({
                        message: "Tên này không có trong lớp A2! Vui lòng nhập thật chính xác!"
                    })
                }

                if(!existUser[0].phoneNumber){
                    await db
                    .update(user)
                    .set({
                        phoneNumber: phoneNumber
                    })
                    .where(eq(user.id, existUser[0].id))
                    .returning()

                    return res.status(200).json({
                        message: "Login successfully!",
                        role: existUser[0].role
                    })
                }

                if(existUser[0].phoneNumber !== phoneNumber){
                    return res.status(404).json({
                        message: "Số điện thoại không chính xác! Vui lòng nhập lại!",
                    })
                }
                
                return res.status(200).json({
                    message: "Login successfully!",
                    role: existUser[0].role
                })
        }catch(e){
            return res.status(500).json({
                message: e
            })
        }
    }

}

export default new LoginController()