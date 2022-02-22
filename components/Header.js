import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { SearchIcon,PlusCircleIcon,UserGroupIcon,HeartIcon,PaperAirplaneIcon,MenuIcon} from '@heroicons/react/outline'
import {HomeIcon,MoonIcon,SunIcon} from '@heroicons/react/solid'
import { useTheme } from 'next-themes'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState } from '../atoms/ModalAtom'
const Header = () => {
    const {data:session}=useSession()
    const[open,setOpen] = useRecoilState(modalState)
    // const open = useRecoilValue(modalState)  this is read only
    const router=useRouter()
  return (
    <div className='shadow-sm border-b bg-white sticky top-0 z-50  '>
        <div className="flex justify-between  max-w-6xl mx-5 xl:mx-auto">
            {/* left */}
            <div onClick={()=>router.push('/')} className="relative hidden lg:inline-grid w-24 cursor-pointer">
                <Image
                src='https://links.papareact.com/ocw'
                layout='fill'
                objectFit='contain'
                />
            </div>
            <div onClick={()=>router.push('/')} className="relative lg:hidden w-8 flex-shrink-0 cursor-pointer">
            <Image
                src='https://links.papareact.com/jjm'
                layout='fill'
                objectFit='contain'
                />
            </div>
            {/* Middle */}
            <div className="max-w-xs">
                <div className="relative mt-1 p-3 rounded-md">
                    <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-500"/>
                    </div>
                    <input className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md' 
                    type="text" placeholder='search'/>
                </div>
            </div>
            
            {/* Right */}
            {session?(
                <div className="flex items-center justify-end space-x-4">
                    <HomeIcon className='icon'/>
                    <MenuIcon className='h-10 md:hidden' />
                <div className="relative icon">
                    <PaperAirplaneIcon className='icon rotate-45'/>
                    <div className="absolute -top-2 -right-2 text-sm w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">3</div>
                </div>
                <PlusCircleIcon onClick={() =>setOpen(true)}className='icon' />
                <UserGroupIcon className='icon'/>
                <HeartIcon className='icon'/>
                <img
                onClick={signOut}
                src={session?.user?.image} 
                alt='profile pic'
                className='h-10 w-10 rounded-full cursor-pointer'/>
                </div>
            ):(
                <div className='flex items-center space-x-4'>
                    <HomeIcon className='icon'/>
                    <MenuIcon className='h-10 w-8 md:hidden' />
                    <button className='text-sm whitespace-nowrap' onClick={signIn}>Sign In</button>
                </div>
            )}
            
            
            {/* {renderThemeChanger()} */}
        </div>
        
    </div>
  )
}

export default Header