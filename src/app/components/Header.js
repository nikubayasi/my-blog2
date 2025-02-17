// components/Header.js
"use client";  // 👈 これを追加
import {Button, Navbar, TextInput} from 'flowbite-react'

import styles from './Header.module.css'
import {AiOutlineSearch} from 'react-icons/ai';
import{FaMoon, FaSun} from "react-icons/fa";
import { usePathname} from 'next/navigation';
import {useTheme} from 'next-themes';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { dark, light } from '@clerk/themes';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link'

export default function Header() {
  const path = usePathname();
  const { theme, setTheme} = useTheme();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams();
  // ダークモードのオン/オフ状態
  // const [darkMode, setDarkMode] = useState(false)
  const handleSubmit =  (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams= new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }
  }, [searchParams]);
  return (

    <Navbar className = 'border-b-2'>
      <Link href="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
      <img
        src="/logo.png"
        alt="Logo"
        className="w-10 inline pb-2"
      />
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white">Nikku&apos;s</span>
        <span className='px-2'>Blog</span>
      </Link>
      
      {/* 3) 検索バー */}
      <form onSubmit={handleSubmit}>
        <TextInput type='text'
        placeholder="Search..."
        rightIcon={AiOutlineSearch}
        className="hidden lg:inline"
        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
      />
      </form>
       <Button className='w-12 h-10 md:inline' color='gray' pill>
        <AiOutlineSearch />
       </Button>
      {/* 4) Home, 5) About, 6) Products */}
      <div className='flex gap-5 md:order-2'>

      {/* 7) ダークモードボタン */}
      <Button className="w-12 h-10 hidden sm:inline rounded-full" color="gray" pill onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >{theme === 'light' ? <FaSun /> :<FaMoon />}
      </Button>
      <SignedIn>
          <UserButton
            appearance={{
              baseTheme: theme === 'light' ? light : dark,
            }}
            userProfileUrl='/dashboard?tab=profile'
            
          />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Button gradientDuoTone='purpleToBlue' outline>
             Sign in
            </Button>
          </Link>
        </SignedOut>
      <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link href='/'>
          <Navbar.Link active={path === '/'} as={'div'}>
          Home
          </Navbar.Link>
        </Link>
        <Link href='/about'>
          <Navbar.Link active={path === '/about'} as={'div'}>
          About
          </Navbar.Link>
        </Link>
        <Link href='/projects'>
          <Navbar.Link active={path === '/projects'} as={'div'}>
          Projects
          </Navbar.Link>
        </Link>
      </Navbar.Collapse>
      
    </Navbar>

  )
}
