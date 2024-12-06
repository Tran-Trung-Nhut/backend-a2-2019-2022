import { Request, Response } from "express"
import { db } from "../db/db"
import { meeting, message, timeDescription, user } from "../db/schema"
import { eq } from "drizzle-orm"

class MessageController{
    public getMessageInMeeting = async (req: Request, res: Response) => {
        const meetingId = req.params.meetingId

        try{
                const messages = await db
                .select()
                .from(message)
                .where(eq(message.meetingId, meetingId))

                if(messages.length === 0){
                    return res.status(404).json({
                        message: "Không có tin nhắn nào tồn tại!"
                    })
                }

                return res.status(200).json({
                    message: "Success!",
                    data: messages
                })
        }catch(e){
            console.log(e)
            return res.status(500).json({
                message: e
            })
        }
    }
}

export default new MessageController()