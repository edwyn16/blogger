import { ConnectDB } from "@/lib/config/db"
import EmailModel from "@/lib/models/EmailModel"
import { NextResponse } from "next/server"

const loadDB = async () => {
    await ConnectDB()
}

loadDB()

export const POST = async (request) => {
    const formData = await request.formData()
    const emailData = {
        email: `${formData.get('email')}`
    }
    await EmailModel.create(emailData)
    return NextResponse.json({
        success: true,
        message: 'Email Is Subscribed'
    })
}

export const GET = async (request) => {
    const emails = await EmailModel.find({})
    return NextResponse.json({emails})
}

export const DELETE = async (request) => {
    const id = await request.nextUrl.searchParams.get('id')
    await EmailModel.findByIdAndDelete(id)
    return NextResponse.json({
        success: true,
        message: 'Email Is Deleted'
    })
}