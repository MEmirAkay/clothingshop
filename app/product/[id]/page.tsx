"use client"
import Image, { StaticImageData } from 'next/image'
import Brand from '../../../public/emirbrand.png'
import { IoIosSearch } from 'react-icons/io'
import { IoBagOutline, IoBasketOutline, IoHomeSharp } from 'react-icons/io5'
import { AiOutlineUser, AiFillStar, AiOutlineStar, AiOutlineLoading } from 'react-icons/ai'
import { Alert, Carousel, Dropdown } from 'react-bootstrap'
import clothes from '@/public/clothes/clothes'
import { useState, useEffect, use } from 'react'
import { v4 as uuid } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'next/navigation'
import React from 'react'
import { useRouter } from 'next/navigation'
import { count } from 'console'

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

  const [currentUser, setCurrentUser] = useState<any>()
  useEffect(() => {
    if (sessionStorage) {
      setCurrentUser(sessionStorage.getItem('currentUser'))
    }
  }, [])

  const [card, setCard] = useState<any>([])


  useEffect(() => {
    if (sessionStorage.getItem('card') != null) {
      setCard(JSON.parse(sessionStorage.getItem('card') as string))
    }
  }, [])

  useEffect(() => {

    sessionStorage.setItem('card', JSON.stringify(card))
  }, [card])
  const [sizeError, setSizeError] = useState<boolean>();
  const [selectedSize, setSelectedSize] = useState<{
    size: string,
  }>({
    size: '',
  });

  const changeSelectedSize = (size: {
    size: string,
  }) => {
    setSizeError(false)
    setSelectedSize(size)
  }

  useEffect(() => {
    if (params.id) {
      setItem(clothes.find(item => item.id == params.id))
    }
  }, [params.id])

  function handleChangeCard() {
    if (selectedSize.size == '') {
      setSizeError(true)
      return
    }
    setSizeError(false)

    var CardItems = [...card]

    if (CardItems.findIndex(x => x.id == item?.id) > -1 && CardItems.findIndex(x => x.size == selectedSize.size) > -1) {
      const index = CardItems.findIndex(x => x.id == item?.id)
      CardItems[index].count += 1;

    } else {
      CardItems.push({
        id: item?.id,
        title: item?.title,
        price: item?.price,
        images: item?.images,
        size: selectedSize.size,
        count: 1
      })
    }
    setCard(CardItems)
    setAlert(true)
  }
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    if (alert) {
      const id = setInterval(() => {
        setAlert(false)
      }, 3000);
      return () => clearInterval(id);
    }
  }, [alert])
  useEffect(() => {
    router.refresh()
  }, [currentUser])


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
                <div className='flex flex-col p-2 justify-center duration-300 border-2 border-transparent hover:border-2 hover:border-black rounded-full text-3xl' onClick={() => router.push('/card')}>
                  <IoBagOutline />
                </div>

                <div className='flex flex-col px-4 py-4 gap-4'>
                {!currentUser && <div className='duration-300 hover:border-b-2 border-b-2 hover:border-black border-transparent decoration-none' onClick={()=>{router.push('/login')}} >Login</div>}
                    {currentUser && <div className='duration-300 hover:border-b-2 border-b-2 hover:hover:border-red-500 border-transparent '
                      onClick={() => {
                        sessionStorage.removeItem('currentUser');
                        sessionStorage.removeItem('card');
                        setCurrentUser(undefined)
                      }}>Logout</div>}
                  </div>

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
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>

              <div className='flex flex-col justify-center'>

                <Carousel variant='dark'>
                  {
                    item.images.map(image =>
                      <Carousel.Item key={uuid()} className=''>
                        <Image
                          loading='lazy'
                          className='-z-10'
                          width={image.width}
                          height={image.height}
                          alt={item.title + 'image'}
                          src={image.src}
                        />
                      </Carousel.Item>
                    )
                  }

                </Carousel>
              </div>
              <div className='flex flex-col w-full h-full justify-start p-4 gap-8'>
                <div className='flex flex-col  text-xl font-extrabold justify-stretch w-full'>
                  <div>
                    {item.title}
                  </div>
                  <div className='flex flex-row justify-start  text-xl gap-1'>
                    <div className='flex flex-col justify-center'>
                      {Stars(item.star)}
                    </div>
                    <div className='flex flex-col justify-center text-lg'>
                      ({item.starCount})
                    </div>
                  </div>
                </div>

                <div className='flex flex-row gap-2 w-full text-center'>
                  {sizes.map(item =>
                    <div
                      key={uuid()}
                      className={`flex flex-col w-full border-2 p-2 rounded-md hover:border-gray-200 duration-300 ${item == selectedSize && 'border-black'}`}
                      onClick={() => {
                        changeSelectedSize(item)
                      }}
                    >
                      {item.size}
                    </div>
                  )}
                </div>
                {
                  sizeError != false && sizeError != undefined ?
                    <div className='text-red-500'>
                      Please select size
                    </div>
                    :
                    <div></div>

                }
                <div className=' text-2xl'>
                  {item.price} $
                </div>
                {
                  alert &&
                  <Alert variant={'success'}>
                    Added to Card Successfully
                  </Alert>
                }
                <div className='flex flex-row'>
                  {
                    currentUser ?
                    <button onClick={() => handleChangeCard()} className='flex flex-row gap-2 border-2 border-black p-2 rounded-md hover:bg-black hover:text-white duration-300'>
                      <div className='flex flex-col justify-center text-2xl'>
                        <IoBasketOutline />
                      </div>
                      <div className='flex flex-col justify-center'>
                        Add to Card
                      </div>
                    </button>
                    :
                    <div className='text-gray-300'>
                      Please login for buy
                    </div>
                  }
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
