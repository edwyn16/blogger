'use client'
import { assets, blog_data } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
    const [data, setData] = useState(null);
    const { id } = React.use(params);

    useEffect(() => {
        if (!id) return;
        const fetchBlogData = async () => {
            try {
                const response = await axios.get('/api/blog', {
                    params: {
                        id
                    }
                })
            setData(response.data)   
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        }
        fetchBlogData();
    }, [id])

    const isValidImageSrc = (src) =>
        Boolean(src) && typeof src !== 'string'
            ? true
            : typeof src === 'string' && src.trim() !== '' && src !== 'null';

    const authorImage = isValidImageSrc(data?.authorImage) ? data.authorImage : assets.profile_icon;
    const hasBlogImage = isValidImageSrc(data?.image);

    if (!data) return <div className="text-center py-10">Loading...</div>;

  return (
    <>
        <div className='bg-gray-300 py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Link href='/'>
                    <Image className='w-[130px] sm:w-auto' src={assets.logo} width={180} alt='logo' />
                </Link>
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
                    Get Started <Image src={assets.arrow} alt='' />
                </button>
            </div>
            <div className='text-center my-24'>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'> {data.title} </h1>
                <Image className='mx-auto mt-6 border border-white rounded-full' src={authorImage} width={60} height={60} alt='' />
                <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'> {data.author} </p>
            </div>
        </div>
        <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
            {hasBlogImage ? (
                <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt='' />
            ) : null}
            <div className='blog-content' dangerouslySetInnerHTML={{__html:data.description}}></div>
            <div className='my-24'>
                <p className='text-black font font-semibold my-4'> Share This Article On Social Media </p>
                <div className='flex'>
                    <Image src={assets.facebook_icon} width={50} alt=''/>
                    <Image src={assets.twitter_icon} width={50} alt=''/>
                    <Image src={assets.googleplus_icon} width={50} alt=''/>
                </div>
            </div>
        </div>
        <Footer />
    </>
  );
};

export default page;
