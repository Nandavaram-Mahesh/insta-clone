import React, { useState } from 'react'
import { faker } from '@faker-js/faker';
import Profile from './Profile';
const Suggestions = () => {
    const [suggestions,setSuggestions] = useState([])
    useState(()=>{
        const suggestions = [...Array(5)].map((_,i)=>({
            ...faker.helpers.contextualCard(),
            id:i
        }))
        setSuggestions(suggestions)
    },[])
  return (
    <div className="mt-4 ml-10">
        <div className="flex justify-between text-sm mb-5">
            <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
            <button className='text-gray-600 font-semibold'>See All</button>
        </div>
        {suggestions.map(({id,avatar,username,company}) =>(
            <Profile key={id} img={avatar} username={username} companyName={company.name}/>
        ))}
    </div>
  )
}

export default Suggestions