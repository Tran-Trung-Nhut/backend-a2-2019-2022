import { date, pgTable, primaryKey, text, uuid, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    phoneNumber: varchar('phoneNumber', { length: 255 }).unique()
});

export const meeting = pgTable("meeting",{
    id: uuid('id').primaryKey().defaultRandom(),
    date: date('date').notNull(),
    status: varchar('status', { length: 255 }).default("Yes")
})

export const timeDescription = pgTable("timeDescription",{
    meetingId: uuid('meetingId').notNull().references(() => meeting.id),
    time: varchar("time", { length: 255 }).notNull(),
    description: text("description").notNull()
}, (table) => {
    return{
        pk: primaryKey({ columns: [table.meetingId, table.time, table.description], name: "pkTimeDescription "})
    }
})

export const userMeeting = pgTable("userMeeting", {
    userId: uuid('userId').notNull().references(() => user.id), 
    meetingId: uuid('meetingId').notNull().references(() => meeting.id),
    paid: varchar('paid').notNull().default("No")
}, (table) => {
    return{
        pk: primaryKey({ columns: [table.userId, table.meetingId], name: "pkUserMeeting"})
    }
});