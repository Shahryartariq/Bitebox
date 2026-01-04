import Link from 'next/link'
import React from 'react'

import logoImg from '@/assets/logo.png';
import classes from "@/components/main-header/main-header.module.css"
import Image from 'next/image';
import MainHeaderBackground from './main-header-background';
import { NavLink } from './nav-link';

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
            <NavLink href="/meals">Browse Meals</NavLink>
          </li>

          <li>
            <NavLink href="/community">BiteBox Community</NavLink>
          </li>
        </ul>

        </nav>
    </header>
    </>
  )
}

export default MainHeader