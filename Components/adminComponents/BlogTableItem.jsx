import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTableItem = ({authorImage, title, author, date, deleteBlogs, mongoId}) => {
    const BlogDate = new Date(date)
    const isValidImageSrc = (src) => {
        Boolean(src) && typeof src !== 'string'
            ? true
            : typeof src === 'string' && src.trim() !== '' && src !== 'null';
    }
    const resolvedAuthorImage = isValidImageSrc(authorImage) ? authorImage : assets.profile_icon;

  return (
    <tr className='bg-white border-b'>
        <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
            <Image width={40} height={40} src={resolvedAuthorImage} alt=''/>
            <p> {author ? author : 'No Author'} </p>
        </th>
        <td className='px-6 py-4'>
            {title ? title : 'No Title'}
        </td>
        <td className='px-6 py-4'>
            {BlogDate.toDateString()}
        </td>
        <td onClick={()=>deleteBlogs(mongoId)} className='px-6 py-4 cursor-pointer'>
            X
        </td>
    </tr>
  )
}

export default BlogTableItem;