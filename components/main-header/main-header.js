import Link from 'next/link'
import React from 'react'

import logoImg from '@/assets/logo.png';
import classes from "@/components/main-header/main-header.module.css"
import Image from 'next/image';
import MainHeaderBackground from './main-header-background';

const MainHeader = () => {
  return (
    <>
    <MainHeaderBackground />
    <header className={classes.header}>
        <Link href="/" className={classes.logo}>
            <Image src={logoImg.src} alt='A plate with food on it'  width={100} height={100} priority/>
            NextLevel Food
        </Link>

        <nav className={classes.nav}>
        <ul>
          <li>
            <Link href="/meals">
                Browser Meals
            </Link>
          </li>

          <li>
            <Link href="/community">
                Foodies Community
            </Link>
          </li>
        </ul>

        </nav>
    </header>
    </>
  )
}

export default MainHeader