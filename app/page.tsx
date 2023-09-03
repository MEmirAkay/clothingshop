"use client"
import Image, { StaticImageData } from 'next/image'
import Brand from '../public/emirbrand.png'
import { IoIosSearch } from 'react-icons/io'
import { IoBagOutline } from 'react-icons/io5'
import { AiOutlineUser, AiFillStar, AiOutlineStar, AiOutlineLoading } from 'react-icons/ai'
import { Dropdown } from 'react-bootstrap'
import clothes from '@/public/clothes/clothes'
import { useState, useEffect } from 'react'

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


export default function Home() {

  const [itemFilter, setItemFilter] = useState("")

  const [displayedItems, setDisplayedItem] = useState<{
    id: number,
    title: string,
    price: string,
    star: number,
    starCount: number,
    images: StaticImageData[],
  }[]>([])

  useEffect(() => {
    setDisplayedItem(clothes)
  }, [])

  useEffect(() => {

    if (itemFilter != "") {

      const display = clothes.filter((item, index) =>
        item.title.toLowerCase().includes(itemFilter.toLowerCase())
      )
      setDisplayedItem(display)
    } else if (itemFilter == "") {
      setDisplayedItem(clothes)
    }
  }, [itemFilter])

  return (
    <div className='flex flex-row w-full justify-center mt-4 '>
      <div className='flex flex-col w-9/12 gap-8'>
        {/* Header Starts */}
        <div className='flex flex-row justify-center w-full'>
          <div className='flex flex-col justify-center w-full gap-4'>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-col duration-300 border-2 border-transparent hover:border-2 hover:border-black rounded-full p-2 text-3xl'>
                <IoBagOutline />
              </div>
              <div>
                <Dropdown drop='down' autoClose>
                  <Dropdown.Toggle id="dropdown-basic" className='flex flex-col duration-300 border-2 border-transparent hover:border-2 hover:border-black rounded-full p-2 text-3xl'>
                    <AiOutlineUser />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className='flex flex-col  border-r-2 border-black px-4 py-4 gap-4'>
                    <Dropdown.Item className='duration-300 hover:border-b-2 border-b-2 hover:border-black border-transparent ' href="#/profile">Profile</Dropdown.Item>
                    <Dropdown.Item className='duration-300 hover:border-b-2 border-b-2 hover:border-black border-transparent ' href="/login">Login</Dropdown.Item>
                    <Dropdown.Item className='duration-300 hover:border-b-2 border-b-2 hover:border-black border-transparent ' href="#/logout">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              </div>
            </div>
            <div className='flex flex-row justify-center'>
              <Image src={Brand.src} width={Brand.width * 0.25} height={Brand.height * 0.25} alt='' />
            </div>
            <div className='flex flex-row w-full border-2 border-black rounded-3xl px-2 text-3xl'>
              <input
                value={itemFilter}
                onChange={(event) => {
                  setItemFilter(event.currentTarget.value)
                }}
                className='flex w-full outline-none my-2 pl-3 pr-2'
                type='text'
              />
              <div className='flex flex-col justify-center'>
                <IoIosSearch />
              </div>
            </div>
          </div>
        </div>
        {/* Header Ends*/}

        {/* Body Starts */}
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2  xl:grid-cols-3'>

          {displayedItems.length > 0 ?
            displayedItems.map((item, index) => {
              return (
                <div className='flex flex-col border-2 hover:border-black rounded-lg duration-300 ' key={item.title + index}>
                  <div className='relative aspect-ratio-1/1 h-[600px] hover:bg-white hover:bg-opacity-70 duration-300 flex flex-col justify-center'>
                    <Image
                      loading='lazy'
                      className='-z-10'
                      layout='fill'
                      objectFit='cover'
                      alt={item.title + 'image'}
                      src={item.images[0].src}
                    />

                    <div className='flex flex-col opacity-0 hover:opacity-100 duration-300 w-full h-full justify-center p-4'>
                      <div className='flex flex-row  text-xl font-extrabold justify-stretch w-full'>
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
                      <div className=' text-2xl'>
                        {item.price} $
                      </div>
                    </div>

                  </div>

                </div>
              )
            })
            :
            <div className='col-span-3 flex flex-row w-full justify-center text-4xl animate-spin'>
              <AiOutlineLoading />
            </div>
          }

        </div>
        {/* Body Ends */}
        <div>

        </div>
      </div>
    </div>
  )
}
