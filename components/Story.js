import React from 'react'

const Story = ({img,username}) => {
  return (
    <div className="">
        <img className='h-14 w-14 rounded-full p-[1.5px] border-2 border-red-500 object-contain transition duration-200 transform ease-out hover:scale-110' src={img} alt='profile pic'/>
        <p className='text-sm w-14 text-center truncate'>{username}</p>
    </div>
  )
}

export default Story