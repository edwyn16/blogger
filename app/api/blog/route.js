import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";

const { NextResponse } = require("next/server")
import { writeFile } from 'fs/promises'
const fs = require('fs')

const loadDB = async () => {
    await ConnectDB();
}

loadDB();

// API Endpoint To Get All Blogs
export const GET = async (request) => {
    const blogId = request.nextUrl.searchParams.get('id')
    if (blogId) {
        const blog = await BlogModel.findById(blogId)
        return NextResponse.json(blog)
    } else {
        const blogs = await BlogModel.find({})
        return NextResponse.json({blogs})
    }
}

// API Endpoint For Uploading Blogs
export const POST = async (request) => {
    const formData = await request.formData();
    const timeStamp = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timeStamp}_${image.name}`;
    await writeFile(path, buffer);
    const imageUrl = `/${timeStamp}_${image.name}`;

    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: `${imageUrl}`,
        authorImage: `${formData.get('authorImage')}`
    }

    await BlogModel.create(blogData);
    console.log('Blog Is Saved');
    

    return NextResponse.json({
        success: true,
        message: 'Blog Is Added'
    })
}

// Creating API Endpoint To Delete Blog
export const DELETE = async (request) => {
    const id = await request.nextUrl.searchParams.get('id')
    const blog = await BlogModel.findById(id)
    fs.unlink(`./public${blog.image}`, () => {})
    await BlogModel.findByIdAndDelete(id)
    return NextResponse.json({
        message: 'Blog Is Deleted'
    })
}