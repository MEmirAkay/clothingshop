"use client"
import Image, { StaticImageData } from 'next/image'
import Brand from '../../public/emirbrand.png'
import { IoIosSearch } from 'react-icons/io'
import { IoBagOutline, IoBasketOutline, IoHomeSharp } from 'react-icons/io5'
import { AiOutlineUser, AiFillStar, AiOutlineStar, AiOutlineLoading } from 'react-icons/ai'
import { Carousel, Dropdown } from 'react-bootstrap'
import clothes from '@/public/clothes/clothes'
import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'next/navigation'
import React from 'react'
import { useRouter } from 'next/navigation'
function FilledStar(star: number) {
    var arr = []

    for (let index = 0; index < star; index++) {
        arr.push(<AiFillStar />)
    }

    return arr
}

function EmptyStar(star: number) {

    var arr = []

    for (let index = 0; index < star; index++) {
        arr.push(<AiOutlineStar />)
    }

    return arr
}


function Stars(star: number) {
    return (
        <div className='flex flex-row w-full'>
            {
                FilledStar(star)
            }
            {
                EmptyStar(5 - star)
            }

        </div>
    )

}

export default function Product() {
    const router = useRouter()
    const params = useParams()
    const [item, setItem] = useState<{
        id: string;
        title: string;
        price: string;
        star: number;
        starCount: number;
        images: StaticImageData[];
    }>();
    const [sizes, setSizes] = useState<{
        size: string,
    }[]>([
        {
            size: 'S',
        },
        {
            size: 'M',
        },
        {
            size: 'L',
        },
        {
            size: 'XL',
        },
        {
            size: '2XL',
        },
        {
            size: '3XL',
        }
    ]);

    const [selectedSize, setSelectedSize] = useState<{
        size: string,
    }>({
        size: 'S',
    });

    const changeSelectedSize = (size: {
        size: string,
    }) => {
        setSelectedSize(size)
    }

    useEffect(() => {
        if (params.id) {
            setItem(clothes.find(item => item.id == params.id))
        }
    }, [params.id])

    return (
        <div className='flex flex-row w-full justify-center mt-4 '>
            <div className='flex flex-col w-9/12 gap-8'>
                {/* Header Starts */}
                <div className='flex flex-row justify-center w-full'>
                    <div className='flex flex-col justify-center w-full gap-4'>
                        <div className='flex flex-row justify-between'>

                            <div
                                onClick={() => { router.push('/') }}
                                className="flex flex-col justify-center border-2 rounded-full w-12 h-12 hover:border-black duration-300">
                                <div className="flex felx-row justify-center text-2xl">
                                    <IoHomeSharp />
                                </div>

                            </div>
                            <div className='flex flex-row gap-2'>
                                <div className='flex flex-col p-2 justify-center duration-300 border-2 border-transparent hover:border-2 hover:border-black rounded-full text-3xl'>
                                    <IoBagOutline />
                                </div>

                                <Dropdown drop='down' autoClose className='duration-300 border-2 border-transparent hover:border-black rounded-full'>
                                    <Dropdown.Toggle
                                        variant=''
                                        bsPrefix='none'
                                        split
                                        id="dropdown-basic"
                                        className='flex flex-col aria-expanded:border-none focus:outline-none outline-none !border-none focus:border-none '>
                                        <div className='text-3xl'>
                                            <AiOutlineUser />
                                        </div>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className='flex flex-col  border-r-2 border-black px-4 py-4 gap-4'>
                                    {sessionStorage.getItem('currentUser')&& <Dropdown.Item className='duration-300 hover:border-b-2 border-b-2 hover:border-black border-transparent '>  {sessionStorage.getItem('currentUser')}</Dropdown.Item>}
                                        <Dropdown.Item className='duration-300 hover:border-b-2 border-b-2 hover:border-black border-transparent ' href="/login">Login</Dropdown.Item>
                                        <Dropdown.Item className='duration-300 hover:border-b-2 border-b-2 hover:border-red-500 border-transparent ' onClick={()=>{sessionStorage.removeItem('currentUser'), sessionStorage.removeItem('card'), router.push('/')}}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </div>
                        </div>
                        <div className='flex flex-row justify-center'>
                            <Image src={Brand.src} width={Brand.width * 0.25} height={Brand.height * 0.25} alt='' />
                        </div>

                    </div>
                </div>
                {/* Header Ends*/}

                {/* Body Starts */}
                {
                    item
                        ?
                        <div className='flex flex-col'>
                            <div className='flex flex-row'>
                                <div>
                                    {/* <Image
                                        loading='lazy'
                                        className='-z-10'
                                        width={image.width}
                                        height={image.height}
                                        alt={item.title + 'image'}
                                        src={image.src}
                                    /> */}
                                </div>
                                <div className='flex flex-col'>
                                    <div>
                                        {/* title  */}
                                    </div>
                                    <div>
                                        {/* size */}
                                    </div>
                                    <div>
                                        {/* count */}
                                    </div>
                                </div>
                                <div>
                                    {/* count */}
                                </div>
                                <div>
                                    {/* delete */}
                                </div>
                            </div>


                        </div>
                        :
                        <div className='col-span-3 flex flex-row w-full justify-center text-4xl animate-spin'>
                            <AiOutlineLoading />
                        </div>
                }
                {/* Body Ends */}
                <div>

                </div>
            </div>
        </div>
    )
}
