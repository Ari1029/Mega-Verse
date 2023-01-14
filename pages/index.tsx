import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div className="max-w-7xl mx-auto flex min-h-screen flex-col py-5 px-10 ">
      <Head>
        <title>Mega Verse</title>
        <link rel="icon" href="https://davidhoganwriter.files.wordpress.com/2013/11/star-cluster.jpg?w=840" />
      </Head>
      <div className='mb-10'>
      <h1 className='ml-5 inline font-bold w-90 cursor-pointer text-2xl underline decoration-4 decoration-sky-600 '>MEGA Verse</h1>
      <h1 className='inline font-extralight w-90 cursor-pointer text-2xl pl-2'>Minting Platform</h1>
      </div>

      <main className='bg-gradient-to-br from-sky-200 to-purple-300 shadow-xl shadow-blue-400/50'>
        <div className='text-center grid space-x-5 md:grid-cols-2 lg:grid-cols-3 2xl:grd-cols-4'>
          {collections.map(col => {
            return (
              <Link href={`/collections/${col.slug.current}`}>
              <div className='flex flex-col items-center transition-all duration-200 hover:scale-105'>
                <img className='mt-10 h-96 w-60 rounded-xl object-cover' src={urlFor(col.mainImage).url()} alt=''></img>

                <div className='max-w-50 py-5'>
                  <h2 className=' text-sky-500 text-3xl mb-2'>{col.title}</h2>
                  <p className='mb-10 text-gray-500 text-sm mt-1'>{col.description}</p>
              </div>
            </div>
            </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type=="collection"]{
    _id,
    title,
    address,
    description,
    collectionName,
    mainImage{
      asset
    },
    slug{
      current
    },
    author-> {
      _id,
      name,
      address,
      slug{
        current
      }
    }
  }`

  const collections = await sanityClient.fetch(query);

  return {
    props: {
      collections
    }
  }
}