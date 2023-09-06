"use client"
import Image, { StaticImageData } from 'next/image'
import Brand from '../../public/emirbrand.png'
import { IoIosSearch } from 'react-icons/io'
import { IoBagOutline, IoBasketOutline, IoHomeSharp } from 'react-icons/io5'
import { AiOutlineUser, AiFillStar, AiOutlineStar, AiOutlineLoading } from 'react-icons/ai'
import { Alert, Carousel, Dropdown } from 'react-bootstrap'
import clothes from '@/public/clothes/clothes'
import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'next/navigation'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Session } from 'inspector'
import { MdDeleteOutline } from 'react-icons/md'
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
    const [items, setItems] = useState<{
        id: string,
        title: string,
        price: string,
        images: StaticImageData[],
        size: string,
        count: number
    }[]>();
    const [currentUser, setCurrentUser] = useState<any>();
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
    const [total, setTotal] = useState(0);
    useEffect(() => {
        if (sessionStorage) {
            setItems(JSON.parse(sessionStorage.getItem('card') as string))
            setCurrentUser(sessionStorage.getItem('currentUser') as string)
            var arr = [];
            arr.push(items?.forEach(x => x.price))
            console.log(arr)
            // var sum = arr.reduce((acc, current) => acc + current, 0);
        }

    }, [])

    useEffect(() => {

        var sum = 0;
        items?.forEach(x => sum += parseFloat(x.price))
        setTotal(sum)

    }, [items])

    const [alert, setAlert] = useState(false);
    useEffect(() => {
        if (alert) {
            const id = setInterval(() => {
                setAlert(false)
            }, 5000);
            return () => clearInterval(id);
        }
    }, [alert])

    return (
        <div className='flex flex-row w-full justify-center mt-4 '>
            <div className='flex flex-col w-9/12 gap-8'>
                {/* Header Starts */}
                <div className='flex flex-row justify-center w-full'>
                    <div className='flex flex-col justify-center w-full gap-4'>
                        <div className='flex flex-row justify-between'>

                            <div
                                onClick={() => { router.push('/') }}
                                className="flex flex-col justify-center border-2 border-transparent rounded-full w-12 h-12 hover:border-black duration-300">
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
                                        {

                                            currentUser ?
                                                <Dropdown.Item className='duration-300 hover:border-b-2 border-b-2 hover:border-black border-transparent '>
                                                    {currentUser}
                                                </Dropdown.Item>
                                                :
                                                <></>

                                        }
                                        <Dropdown.Item className='duration-300 hover:border-b-2 border-b-2 hover:border-black border-transparent ' href="/login">Login</Dropdown.Item>
                                        <Dropdown.Item className='duration-300 hover:border-b-2 border-b-2 hover:border-red-500 border-transparent '
                                            onClick={() => {
                                                if (sessionStorage) {
                                                    currentUser
                                                    items
                                                    router.push('/')
                                                }
                                            }
                                            }>Logout</Dropdown.Item>
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
                    items && items.length > 0
                        ?
                        <div className='flex flex-col gap-4'>

                            {
                                items.map((item) =>
                                    <div key={uuid()} className='flex flex-row justify-between border-2 border-black p-2 rounded-lg'>
                                        <div className='flex flex-col justify-center w-1/12 h-28  relative aspect-ratio-1/1'>
                                            <Image
                                                loading='lazy'
                                                className='-z-10'
                                                layout='fill'
                                                objectFit='cover'
                                                alt={item.title + 'image'}
                                                src={item.images[0].src}
                                            />
                                        </div>
                                        <div className='flex flex-col justify-center text-2xl font-extrabold'>
                                            {item.title}
                                        </div>
                                        <div className='flex flex-col justify-center text-lg font-bold'>
                                            {item.size}
                                        </div>
                                        <div className='flex flex-col justify-center text-lg '>
                                            {item.price} $
                                        </div>

                                        <div className='flex flex-col justify-center  '>
                                            {item.count} piece

                                        </div>
                                        <div className='flex flex-col justify-center '>
                                            <div className='flex flex-col justify-center text-3xl hover:text-red-500'>
                                                <MdDeleteOutline />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            <div className='flex flex-row justify-between w-full'>
                                <div className='flex flex-row justify-start gap-4 border-b-2 border-black'>
                                    <div className='flex flex-col justify-center text-2xl font-extrabold'>
                                        Total:
                                    </div>
                                    <div className='flex flex-col justify-center text-xl font-bold'>
                                        {total} $
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        if (sessionStorage) {
                                            sessionStorage.setItem('card', JSON.stringify([]))
                                        }
                                        setItems(undefined);
                                        setAlert(true)
                                    }}
                                    className='flex flex-col justify-center border-2 rounded-md px-6 border-green-400 text-xl font-bold text-green-500 hover:bg-green-400 hover:text-white duration-300'>
                                    Pay
                                </button>
                            </div>

                        </div>
                        :
                        <div className='flex flex-col w-full'>
                            {
                                alert &&
                                <Alert variant={'success'}>
                                   Your order has been received successfully
                                </Alert>
                            }
                            <div className='flex flex-row justify-center'>
                                Your card is empty
                            </div>
                        </div>
                }
                {/* Body Ends */}
            </div>
        </div>
    )
}
