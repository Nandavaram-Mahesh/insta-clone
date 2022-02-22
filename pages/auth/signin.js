import React from 'react'
import {getProviders,signIn as signInProviders} from 'next-auth/react'
import Header from '../../components/Header'
// This is running on browser

export default function SignIn({ providers }) {
    return (
      <>
        <Header/>
        <div className="flex flex-col items-center justify-center
         min-h-screen -mt-10   text-center">
            <img className="w-40"
            src="https://links.papareact.com/ocw" alt="" />
            <p className='font-xs italic'>
                This is for educational purpose only
            </p>
            <div className="mt-40">
                {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button className="p-3 bg-blue-500 rounded-lg text-white" onClick={() => signInProviders(provider.id,{callbackUrl:'/'})}>
                    Sign in with {provider.name}
                    </button>
                </div>
                ))}
            </div>
        </div>
        
        
      </>
    )
  }
// This is running on server 

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
      props: { providers },
    }
  }