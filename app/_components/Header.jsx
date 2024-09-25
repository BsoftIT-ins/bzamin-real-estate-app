"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { PlusIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import React from 'react'


const Header = () => {
    const path=usePathname();
    const {user, isSignedIn} = useUser();
    console.log(path);
    useEffect(()=>{
       
    },[])  
  return (
    <div className='p-6 px-10 flex justify-between shadow fixed top-0 w-full z-10 bg-white'>
        <div className='flex gap-12 items-center'>
        <Link href={'/'}><Image src={'/logo.svg'} alt='logo' width={100} height={100} className='mt-2 mx-5'  /></Link>
            <ul className='hidden md:flex gap-10'>
               <Link href={'/'}> <li className={`'hover:text-primary font-medium text-sm cursor-pointer' ${path=='/'&&'text-primary'}`}>For Rent</li>
               </Link>
                <li className='hover:text-primary font-medium text-sm cursor-pointer '>For Sell</li>
                <li className='hover:text-primary font-medium text-sm cursor-pointer '>Agent Finder</li>
            </ul>
        </div>
        <div className='flex gap-2'>
        <Link href={'/add-new-listing'}>
            <Button className='flex gap-2 items-center'><PlusIcon className='h-5 w-5'/>Post your Ad</Button>
            </Link>
            {isSignedIn ? 
              <UserButton />
              :
              <Link href={'/sign-in'}><Button variant='outline'>Login</Button></Link>
            }
            
        </div>
    </div>
  )
}

export default Header