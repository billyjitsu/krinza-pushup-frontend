import React from 'react'
import type { NextPage } from 'next'
import { useAccount } from 'wagmi'
import Intro from './Intro'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Header from '../../components/Nav'

const LandingPage: NextPage = () => {
  
    const { isConnected } = useAccount()

  return(isConnected) ? (
    <div className='bg-black h-screen w-full'>
        <Header />
        <Intro /> 
    </div>
  ) : (
    <div>
        <ConnectButton />
    </div>
  )
}

export default LandingPage