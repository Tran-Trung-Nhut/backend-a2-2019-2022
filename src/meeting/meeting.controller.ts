import { Request, Response } from "express"
import { db } from "../db/db"
import { meeting, timeDescription, user } from "../db/schema"
import { eq } from "drizzle-orm"

class MeetingController{
    public getMeetingYes = async (req: Request, res: Response) => {
        try{
                const existMeeting = await db
                .select()
                .from(meeting)
                .where(eq(meeting.status, "Yes"))

                if(existMeeting.length === 0){
                    return res.status(404).json({
                        message: "Không có cuộc họp nào trong năm nay!"
                    })
                }

                const meetingId = existMeeting[0].id

                const existTimeDescription = await db
                .select()
                .from(timeDescription)
                .where(eq(timeDescription.meetingId, meetingId))

                if(existTimeDescription.length === 0){
                    return res.status(404).json({
                        message: "Cuộc họp này bị lỗi vui lòng thử lại sau!"
                    })
                }

                const time_description : {time: string, description: string}[] = []

                for(const t_d of existTimeDescription){
                    const data = {
                        time: t_d.time,
                        description: t_d.description
                    }

                    time_description.push(data)
                }

                return res.status(200).json({
                    message: "Success!",
                    data: {
                        ...existMeeting[0],
                        timeDescription: time_description
                    }
                })
        }catch(e){
            console.log(e)
            return res.status(500).json({
                message: e
            })
        }
    }

}

export default new MeetingController()