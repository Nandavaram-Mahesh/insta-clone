import { useSession,signOut } from 'next-auth/react'
import React from 'react'

const MiniProfile = () => {
  const {data:session}=useSession()
  console.log(session)
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
        <img
        src={session?.user?.image}
        alt='Mini Profile'
        className='rounded-full border p-[2px] w-16 h-16'
        />
        <div className="flex-1 mx-4">
            <h2>{session?.user?.username}</h2>
            <h3>Welcome to instagram</h3>
        </div>
        <button onClick={signOut} className='text-blue-400 text-sm font-semibold'>Sign Out</button>
    </div>
  )
}

export default MiniProfile