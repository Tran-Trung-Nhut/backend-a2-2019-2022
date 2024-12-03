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


                const updatePhoneNumer = await db
                .update(user)
                .set({
                    phoneNumber: phoneNumber
                })
                .where(eq(user.id, existUser[0].id))
                .returning()

                if(!updatePhoneNumer) {
                    return res.status(400).json({
                        message: "Có lỗi trong quá trình cập nhật số điện thoại"
                    })
                }

                return res.status(200).json({
                    message: "Login successfully!",
                })
        }catch(e){
            return res.status(500).json({
                message: e
            })
        }
    }

}

export default new LoginController()