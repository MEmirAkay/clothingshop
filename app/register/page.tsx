'use client'
import { Form } from "react-bootstrap"
import { FormEvent, useEffect, useState } from "react"
import Image from "next/image";
import { AiOutlineUser, AiFillStar, AiOutlineStar, AiOutlineLoading } from 'react-icons/ai'
import Brand from "../../public/emirbrand.png"
import { IoChevronBackSharp } from "react-icons/io5"
import { useRouter } from "next/navigation";

export default function Login() {
  const [validated, setValidated] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState<any>({
    username: false,
    password: false
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formX = event.currentTarget;

    if (formX.checkValidity() === false) {

      event.preventDefault();
      event.stopPropagation();
      return
    }


    sessionStorage.setItem('username', form.username)
    sessionStorage.setItem('password', form.password)
    setValidated(true);
  };

  useEffect(() => {
    console.log(validated)
  }, [])


  const handleChange = (event: React.FormEvent<HTMLFormElement> & any) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value
    })

    if (!errors[event.currentTarget.name]) {
      setErrors({
        ...errors,
        [event.currentTarget.name]: true
      })
    }

  }

  useEffect(() => {
    if (sessionStorage.getItem('currentUser')) {
      router.push('/')
    }
  }, [])

  return (
    <div className="flex flex-row w-full justify-center">
      {
        !sessionStorage.getItem('currentUser') ?
        <div className='flex flex-col h-screen justify-center gap-4'>
          <div className="flex flex-row">
            <div
              onClick={() => { router.push('/login') }}
              className="flex flex-col justify-center border-2 rounded-full w-12 h-12 hover:border-black duration-300">
              <div className="flex felx-row justify-center text-2xl">

                <IoChevronBackSharp />

              </div>
            </div>
          </div>
          <Form onSubmit={handleSubmit} noValidate validated={validated} className="flex flex-col w-full gap-4 border-2 border-black rounded-lg p-4 ">
            <div className="flex flex-row justify-center w-full">
              <div className=" text-6xl mb-4">
                <Image alt="" src={Brand.src} width={Brand.width * 0.25} height={Brand.height * 0.25} />
              </div>
            </div>
            <Form.Group className="flex flex-col gap-2" controlId="mailValidationId">
              <Form.Control
                name="username"
                required
                size="lg"
                placeholder="Username"
                className={`border-2 rounded-md pl-2 pr-2 text-lg valid:border-green-500 ${(form.username.length == 0 && errors.username) ? 'invalid:border-red-500' : ''}`}
                isValid={(form.username.length > 0 && errors.username) ? true : false}
                value={form.username}
                onChange={e => handleChange(e)}
              ></Form.Control>
              <Form.Control.Feedback className="flex flex-row pl-2 text-sm text-red-500">
                {form.username.length == 0 && errors.username ?
                  'Please type username'
                  :
                  ''}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="flex flex-col gap-2" controlId="passwordValidationId">
              <Form.Control
                name="password"
                required
                size="lg"
                placeholder="Password"
                type="password"
                className={`border-2 rounded-md pl-2 pr-2 text-lg valid:border-green-500 ${(form.password.length == 0 && errors.password) ? 'invalid:border-red-500' : ''}`}
                isValid={(form.password.length > 0 && errors.password) ? true : false}
                value={form.password}
                onChange={e => handleChange(e)}
              ></Form.Control>
              <Form.Control.Feedback className="flex flex-row pl-2 text-sm text-red-500">
                {form.password.length == 0 && errors.password ?
                  'Please type password'
                  :
                  ''}
              </Form.Control.Feedback>
            </Form.Group>

            <button
              type="submit"
              className="flex flex-row py-1 justify-center rounded-md w-full border-2 border-black text-black hover:bg-black hover:text-white duration-300">
              Register
            </button>
          </Form>

        </div>
:
      <div className='col-span-3 flex flex-row w-full justify-center text-4xl animate-spin'>
        <AiOutlineLoading />
      </div>
}

    </div >
  )
}

