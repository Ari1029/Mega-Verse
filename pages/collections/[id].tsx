import React from 'react'
import { useAddress, useMetamask, useDisconnect } from '@thirdweb-dev/react';

function MintingPlatform() {

    const walletDisconnect = useDisconnect();
    const walletAddress = useAddress();
    const connectMetamask = useMetamask();

    function thirdWebConnector() {
        connectMetamask();
    }

    return (
        <div className='lg:grid lg:grid-cols-11 flex h-screen flex-col'>
            <div className='lg:col-span-7'>
                <div className='flex items-center justify-between'>
                    <h1 className='ml-5 inline font-bold w-90 cursor-pointer text-2xl underline decoration-4 decoration-sky-600 '>MEGA Verse</h1>
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
                    <img className='w-96 object-cover pb-10 lg:h-33' src='/main.png' alt='' />

                    <h2 className='text-2xl font-bold lg:text-3xl lg:font-extrabold'>
                        Merlion NFT fountain collection  <span className='font-extralight'>- Exclusive</span>
                    </h2 >
                    <p className='p-1 mt-5 text-xl text-blue-800'></p>
                </div>
                <div className='flex flex-row justify-center items-start'>
                <button className='text-l px-3 h-14 w-65 rounded-full mb-6 bg-purple-500 text-blue-100'>
                    Mint from Mega Verse (0.01 ETH)
                </button>
                </div>

            </div>
            <div className='lg:col-span-4 bg-gradient-to-br from-cyan-400 to-purple-500'>
                <div className='flex flex-col justify-center items-center lg:min-h-screen'>
                    <div className='mt-5 rounded-xl bg-gradient-to-br from-yellow-200 to-rose-500 p-1.5'>
                        <img src='/merlion.jpg' className='lg:w-80 w-40 rounded-3xl object-cover' />
                    </div>
                    <div className='text-center'>
                        <h1 className='mb-4 mt-3 text-5xl font-bold text-sky-200 items-center'>Lion Fountain</h1>
                        <h2 className='mx-3 mb-7 items-center text-xl text-sky-100'>
                            An NFT collectible featuring 18 colourful merlions living on the Ethereum blockchain.
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MintingPlatform