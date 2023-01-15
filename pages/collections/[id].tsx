import React, { useEffect, useState } from 'react'
import { useAddress, useMetamask, useDisconnect, useContract} from '@thirdweb-dev/react';
import { GetServerSideProps } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../typings';
import Link from 'next/link';
import { BigNumber } from 'ethers';

interface Props{
    collection: Collection
}

function merlionFountain({collection}: Props) {

    const walletDisconnect = useDisconnect();
    const walletAddress = useAddress();
    const connectMetamask = useMetamask();

    function thirdWebConnector() {
        connectMetamask();
    }

    const [claimedSupply, setClaimedSupply] = useState<number>(0);
    const [totalSupply, setTotalSupply] = useState<BigNumber>();
    const nftDrop = useContract(collection.address, "nft-drop").contract;
    const [load,setLoad] = useState(true);

    const mint = async()=>{
        if(!nftDrop || !walletAddress) return;
        setLoad(true);
        nftDrop.claimTo(walletAddress, 1)
        .then(async(tx)=>{
            const claimedTokenId = tx[0].id;
            const claimedNFT = await tx[0].data();
            const receipt = tx[0].receipt;
            console.log(claimedTokenId);
            console.log(claimedNFT);
            console.log(receipt);
        })
        .catch(err=>{
            console.log(err);
        })
        .finally(()=>{
            setLoad(false);
        })
    }

    useEffect(()=>{
        setLoad(true);
        if(!nftDrop) return;
        const collectionData = async()=>{
            const nftClaimed = await nftDrop.getAllClaimed();
            const nftTotal = await nftDrop.totalSupply();

            setClaimedSupply(nftClaimed.length);
            setTotalSupply(nftTotal);
            setLoad(false);
        }
        collectionData();
    }, [nftDrop])

    const [price, setPrice] = useState<string>();
    useEffect(()=>{
        if(!nftDrop) return;
        const getPrice = async()=>{
            const conditions = await nftDrop.claimConditions.getAll();
            setPrice(conditions?.[0].currencyMetadata.displayValue)
        }
        getPrice();
    }, [nftDrop])

    
    return (
        <div className='lg:grid lg:grid-cols-11 flex h-screen flex-col'>
            <div className='lg:col-span-7'>
                <div className='flex items-center justify-between'>
                    <Link href={'/'}>
                    <h1 className='ml-5 inline font-bold w-90 cursor-pointer text-2xl underline decoration-4 decoration-sky-600 '>MEGA Verse</h1>
                    </Link>
                    <h1 className='inline font-extralight w-90 cursor-pointer text-2xl pr-10'>Minting Platform</h1>

                    <button className='mr-5 font-extralight text-white mt-3 block rounded-full bg-violet-400 p-3 py-0.5 text lg:text-base lg:px-5 lg:py-1 mb-4' onClick={()=>{!walletAddress ? thirdWebConnector(): walletDisconnect()}}>
                    {!walletAddress ? ' Login ' : 'Logout'}
                    </button>
                </div>

                <hr className='mt-0 mb-4 border ml-5 mr-5'></hr>

                {walletAddress && (
                    <h3 className='text-md text-center text-emerald-500'> Current wallet in use: {walletAddress.substr(0,6)} ... {walletAddress.substr(36,6)}</h3>
                )}
                <div className='mt-9 flex flex-col items-center space-y-3 mb-20 text-center lg:mt-40'>
                    <img className='w-96 object-cover pb-10 lg:h-33' src={urlFor(collection.mainImage).url()} alt='' />

                    <h2 className='text-2xl font-bold lg:text-3xl lg:font-extrabold'>
                        {collection.title}
                    </h2 >
                    {load ? (
                        <div>
                        <p className='text-blue-800 p-1 mt-5 text-md animate-pulse'>Loading NFT supply ...
                        </p>
                        <img className='h-16 object-contain' src='https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif'></img>
                        </div>
                    ): (
                        <p className='p-1 mt-5 text-lg text-blue-800'>Claimed: {claimedSupply} / {totalSupply?.toString()} NFT's</p>
                    )}
                </div>
                <div className='flex flex-row justify-center items-start'>
                <button onClick = {mint} disabled = {load || claimedSupply === totalSupply?.toNumber() || !walletAddress} className='text-l px-3 h-14 w-65 rounded-full mb-6 bg-purple-500 text-indigo-100 disabled:bg-slate-400'>
                    {load ? (
                        <>Please wait</>
                    ): claimedSupply === totalSupply?.toNumber() ? (
                        <>NFT Sold out</>
                    ):(
                        <span className='font-bold'>Mint from Mega Verse ({price} ETH)</span>
                    )}
                </button>
                </div>

            </div>
            <div className='lg:col-span-4 bg-gradient-to-br from-cyan-400 to-purple-500'>
                <div className='flex flex-col justify-center items-center lg:min-h-screen'>
                    <div className='mt-5 rounded-xl bg-gradient-to-br from-yellow-200 to-rose-500 p-1.5'>
                        <img src={urlFor(collection.previewImage).url()} className='lg:w-80 w-40 rounded-3xl object-cover' />
                    </div>
                    <div className='text-center'>
                        <h1 className='mb-4 mt-3 text-5xl font-bold text-sky-200 items-center'>Lion Fountain</h1>
                        <h2 className='mx-3 mb-7 items-center text-xl text-sky-100'>
                            An NFT collectible featuring 12 mysterious merlions living on the Ethereum blockchain.
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default merlionFountain

export const getServerSideProps: GetServerSideProps = async({params})=>{
    const query = `*[_type=="collection" && slug.current == $id][0]{
        _id,
        title,
        address,
        description,
        collectionName,
        mainImage{
          asset
        },
        previewImage{
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
      const collection = await sanityClient.fetch(query, {
        id: params?.id
    })
    if(!collection){
        return{
            notFound: true //returns a 404 page
        }
    }
    return{
        props:{
            collection
        }
    }
}