import { Request, Response } from "express"
import { db } from "../db/db"
import { message } from "../db/schema"
import { eq } from "drizzle-orm"
import { format, toZonedTime } from 'date-fns-tz';


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

    public createMessage = async (req: Request, res: Response) => {
        const { content, meetingId, userName } = req.body

        try{
                const mess = await db
                .insert(message)
                .values({
                    content,
                    meetingId,
                    userName,
                    createDate: toZonedTime(new Date(), 'Asia/Ho_Chi_Minh'),
                    updateDate: toZonedTime(new Date(), 'Asia/Ho_Chi_Minh')
                })
                .returning()

                return res.status(200).json({
                    message: "Success!",
                    data: mess
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