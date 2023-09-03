'use client'
import { Form } from "react-bootstrap"
import { FormEvent, useState } from "react"
import Image from "next/image";
import Brand from "../../public/emirbrand.png"
import { useRouter } from "next/navigation";
import { IoHomeSharp } from "react-icons/io5"

export default function Login() {

  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<any>({
    email: false,
    password: false
  })



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    console.log('click')
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

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
  const router = useRouter();
  return (
    <div className="flex flex-row w-full justify-center">
      <div className='flex flex-col h-screen justify-center gap-4'>
      <div className="flex flex-row">
          <div
            onClick={() => { router.push('/')}}
            className="flex flex-col justify-center border-2 rounded-full w-12 h-12 hover:border-black duration-300">
            <div className="flex felx-row justify-center text-2xl">

              <IoHomeSharp />

            </div>
          </div>
        </div>
        <Form onSubmit={handleSubmit} noValidate validated={validated} className="flex flex-col w-full gap-4 border-2 border-black rounded-lg p-4 shadow-md">
          <div className="flex flex-row justify-center w-full">
            <div className=" text-6xl mb-4">
              <Image alt="" src={Brand.src} width={Brand.width * 0.25} height={Brand.height * 0.25} />
            </div>
          </div>
          <Form.Group className="flex flex-col gap-2" controlId="mailValidationId">
            <Form.Control
              name="email"
              required
              size="lg"
              placeholder="Email"
              className={`border-2 rounded-md pl-2 pr-2 text-md valid:border-green-500 ${(form.email.length == 0 && errors.email) ? 'invalid:border-red-500' : ''}`}
              isValid={(form.email.length > 0 && errors.email) ? true : false}
              value={form.email}
              onChange={e => handleChange(e)}
            ></Form.Control>
            <Form.Control.Feedback className="flex flex-row pl-2 text-sm text-red-500">
              {form.email.length == 0 && errors.email ?
                'Please type email'
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
              className={`border-2 rounded-md pl-2 pr-2 text-md valid:border-green-500 ${(form.password.length == 0 && errors.password) ? 'invalid:border-red-500' : ''}`}
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
            Login
          </button>
        </Form>
        <div className="flex flex-row w-full justify-center">
          or
        </div>
        <button
          type="button"
          className="flex flex-row py-1 justify-center w-full border-2 border-white hover:border-b-black hover:border-b-2 hover:border-t-black hover:border-t-2 text-black duration-200 ease-in"
          onClick={() => { router.push('/register') }}
        >
          Register
        </button>
      </div>
    </div >
  )
}

