import Input from "@/components/Input"
import axios from "axios"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import {FaVk} from 'react-icons/fa'
import {FaDiscord} from 'react-icons/fa'
import {MdOutlineRemoveRedEye} from 'react-icons/md'
import {IoEyeOffOutline} from 'react-icons/io5'




const Auth = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [viewPassword, setViewPassword] = useState(true)


  const [variant, setVariant] = useState('login')
  const toggleVariant = useCallback(() => {
    setEmail('')
    setName('')
    setPassword('')
    setVariant(currentVariant => currentVariant === 'login' ? 'register' : 'login')
  },[])

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {email, password, callbackUrl: '/profiles',})
      // router.push('/profiles')
    } catch (error) {
      console.log(error);
    }
  }, [email, password])

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {email, name, password})
      login()
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login])
  
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/ViMovies.png" alt="logo" className="h-12"/>
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Войти' : 'Регистрация'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input 
                  label="Логин"
                  onChange={(e: any) => {setName(e.target.value)}}
                  id="name"
                  value={name}
                />
              )}
              <Input 
                label="Почта"
                onChange={(e: any) => {setEmail(e.target.value)}}
                id="email"
                type="email"
                value={email}
              />
              <div className="relative">
                <Input 
                  label="Пароль"
                  onChange={(e: any) => {setPassword(e.target.value)}}
                  id="password"
                  type={viewPassword === true ? "password" : "text"}
                  value={password}
                />
                {viewPassword === true ?  
                  <IoEyeOffOutline onClick={() => setViewPassword(!viewPassword)} size={20} className="absolute top-1/2 translate-y-[-50%] text-black cursor-pointer right-4"/>
                  :
                  <MdOutlineRemoveRedEye onClick={() => setViewPassword(!viewPassword)} size={20} className="absolute top-1/2 translate-y-[-50%] text-black cursor-pointer right-4"/> 
                }
              </div>
            </div>
            <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === 'login' ? 'Войти' : 'Создать аккаунт'}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <div onClick={() => signIn('google', {callbackUrl: '/profiles'})}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition">
                  <FcGoogle size={40}/>
                </div>
                <div onClick={() => signIn('github', {callbackUrl: '/profiles'})} 
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition">
                  <FaGithub size={40}/>
                </div>
                <div onClick={() => signIn('vk', {callbackUrl: '/profiles'})}
                  className="w-10 h-10 bg-white rounded-[10px] flex items-center justify-center cursor-pointer hover:opacity-70 transition">
                  <FaVk color="#4a76a8" size={35}/>
                </div>
                <div onClick={() => signIn('discord', {callbackUrl: '/profiles'})}
                  className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition">
                  <FaDiscord color="white" size={30}/>
                </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === 'login' ? 'Первый раз на сайте? ' : 'Уже есть аккаунт? '}
              <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                {variant === 'login' ? 'Создать аккаунт' : 'Войти'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth