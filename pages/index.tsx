import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Mega Verse</title>
        <link rel="icon" href="https://davidhoganwriter.files.wordpress.com/2013/11/star-cluster.jpg?w=840"/>
      </Head>

      <h1 className='text-red-500 text-4xl font-bold'>Welcome to Mega Verse: A platform to mint NFT's on the Ethereum Blockchain.</h1> 
    </div>
  )
}

export default Home

