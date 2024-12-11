import { Request, Response } from "express"
import { db } from "../db/db"
import { user, userMeeting } from "../db/schema"
import { and, eq } from "drizzle-orm"

class UserMeetingController{
    public acceptMeeting = async (req: Request, res: Response) => {

        const { meetingId, userId } = req.body

        try{
                const acceptedUser = await db
                .select()
                .from(userMeeting)
                .where(and(eq(userMeeting.meetingId, meetingId), eq(userMeeting.userId, userId)))

                if(acceptedUser.length > 0){
                    return res.status(400).json({
                        message: "Bạn đã tham gia buổi họp lớp này rồi!"
                    })
                }

                const accept = await db
                .insert(userMeeting)
                .values({
                    meetingId,
                    userId
                })
                .returning()

                return res.status(200).json({
                    message: "Success!",
                    data: accept
                })
        }catch(e){
            console.log(e)
            return res.status(500).json({
                message: e
            })
        }
    }

    public isAccepted = async (req: Request, res: Response) => {

        const { meetingId, userId } = req.params

        try{
                const acceptedUser = await db
                .select()
                .from(userMeeting)
                .where(and(eq(userMeeting.meetingId, meetingId), eq(userMeeting.userId, userId)))

                if(acceptedUser.length === 0){
                    return res.status(404).json({
                        message: "Bạn chưa tham gia buổi họp lớp này!"
                    })
                }

                return res.status(200).json({
                    message: "Bạn đã tham gia buổi họp lớp này rồi!",
                })
        }catch(e){
            console.log(e)
            return res.status(500).json({
                message: e
            })
        }
    }

    public listUserAccepted = async (req: Request, res: Response) => {

        const { meetingId }  = req.params

        try{
                const meetingUser = await db
                .select()
                .from(userMeeting)
                .where(eq(userMeeting.meetingId, meetingId))

                if(meetingUser.length === 0){
                    return res.status(404).json({
                        message: "Buổi họp lớp này không tồn tại!"
                    })
                }

                const listUser : {id: string, name: string, phoneNumber: string | null, paid: string}[] = []

                for(const u of meetingUser){
                    const us = await db
                    .select()
                    .from(user)
                    .where(eq(user.id, u.userId))

                    const data : {id: string, name: string, phoneNumber: string | null, paid: string} = {
                        id: us[0].id,
                        name: us[0].name,
                        phoneNumber: us[0].phoneNumber,
                        paid: u.paid
                    }
                    
                    listUser.push(data)
                }

                return res.status(200).json({
                    message: "Success!",
                    data: listUser
                })
        }catch(e){
            console.log(e)
            return res.status(500).json({
                message: e
            })
        }
    }

    public listUserAcceptedName = async (req: Request, res: Response) => {

        const { meetingId }  = req.params

        try{
                const meetingUser = await db
                .select()
                .from(userMeeting)
                .where(eq(userMeeting.meetingId, meetingId))

                if(meetingUser.length === 0){
                    return res.status(404).json({
                        message: "Buổi họp lớp này không tồn tại!"
                    })
                }

                const listUserName : string[] = []

                for(const u of meetingUser){
                    const us = await db
                    .select()
                    .from(user)
                    .where(eq(user.id, u.userId))
                    
                    listUserName.push(us[0].name)
                }

                return res.status(200).json({
                    message: "Success!",
                    data: listUserName
                })
        }catch(e){
            console.log(e)
            return res.status(500).json({
                message: e
            })
        }
    }
}

export default new UserMeetingController()