import { useSession } from 'next-auth/react'
import React from 'react'
import MiniProfile from './MiniProfile'
import Posts from './Posts'
import Stories from './Stories'
import Suggestions from './Suggestions'

const Feed = () => {
  const{data:session}=useSession()
  return (
    <main className={`grid grid-cols-1 
    md:max-w-3xl md:grid-cols-2 xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && '!grid-cols-1 !max-w-3xl' }`}>
        {/* Section */}
        <section className='col-span-2'>
            {/* stories */}
            <Stories/>
            {/* posts */}
            <Posts/>
        </section>
            
        {/* section */}
        {session && (
          <section className='hidden xl:inline-grid md:col-span-1'>
            <div className="fixed top-20">
                {/* minni-profile */}
                <MiniProfile/>
                {/* Suggestions */}
                <Suggestions/>
            </div>
          </section>
        )}
        
            
        
            
    </main>
  )
}

export default Feed