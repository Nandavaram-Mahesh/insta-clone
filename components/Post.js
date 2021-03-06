import React, { useEffect, useState } from 'react'
import{ 
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from '@heroicons/react/outline'
import{HeartIcon as HeartIconFilled} from '@heroicons/react/solid'
import { useSession } from 'next-auth/react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Comment from './Comment';

const Post = ({id,username,userImg,img,caption}) => {
    const {data:session} = useSession()
    const[comment,setComment]=useState('')
    const[comments,setComments]=useState([])
    const [likes,setLikes] = useState([])
    const [hasLiked,setHasLiked] = useState(false)
        useEffect(
            ()=> onSnapshot(
            query(collection(db,'posts',id,'comments'),orderBy('timestamp','desc')),(snapshot)=>setComments(snapshot.docs),
            [db,id])
        )

        useEffect(
            ()=> onSnapshot(collection(db,'posts',id,'likes'),(snapshot)=>setLikes(snapshot.docs),
            [db,id])
        )
        
        useEffect(
            ()=>setHasLiked(likes.findIndex(like=>like.id=== session?.user?.uid)!==-1)
        ,[likes])

        const likePost=async()=>{
            if(hasLiked){
                await deleteDoc(doc(db,'posts',id,'likes',session.user.uid))
            }else{
                await setDoc(doc(db,'posts',id,'likes',session.user.uid),{
                    username:session.user.username
                })
            }
            
        }
        
        const sendComment= async (e)=>{
        e.preventDefault()

        const commentToSend=comment
        setComment('')

        await addDoc(collection(db,'posts',id,'comments'),{
            comment:commentToSend,
            username:session.user.username,
            userImage:session.user.image,
            timestamp:serverTimestamp()
        })
    }
    return (
    <div className='bg-white my-7 border rounded-sm '>
        {/* Header */}
        <div className="flex items-center">
            <img src={userImg} className='h-12 w-12 rounded-full object-contain p-1 mr-3' alt="pic" />
            <p className='flex-1 font-bold'>{username}</p>
            <DotsHorizontalIcon className='h-5'/>
        </div>
        {/* img */}
        <img
        src={img}
        className='object-cover w-full'
        alt=''/>
        {/* Buttons */}
        {session &&
            <div className="flex justify-between px-4 pt-4">
            <div className="flex  space-x-4">
                {hasLiked?(
                    <HeartIconFilled onClick={likePost} className='btn text-red-500'/>
                ):(
                    <HeartIcon onClick={likePost} className='btn'/>
                )}
                
                <ChatIcon className='btn' />
                <PaperAirplaneIcon className='btn' />
            </div>
            <BookmarkIcon className='btn'/>
            </div> 
        }
        
        
        {/* captions */}
        <p className='p-5 truncate'>
            {likes.length>0 && (
                <p className='font-bold mb-1'>{likes.length} likes</p>
            )}
            <span className='font-bold mr-1'>{username}</span>
            {caption}
        </p>
        {/* comments */}
        {comments.length>0 && (
            <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                {comments.map((comment)=>(
                    <Comment
                    key={comment.id}
                    comment={comment}
                    />
                ))}
            </div>
        )}
        {/* input box */}
        {session && 
            <form className="flex items-center p-2">
                <EmojiHappyIcon className="btn text-gray-500"/>
                <input value={comment} onChange={(e)=>setComment(e.target.value)} type="text" placeholder="Add a comment..." className='border-none flex-1 focus:ring-0'/>
                <button type="submit" disabled={!comment.trim()} onClick={sendComment} className='text-blue-500'>post</button>
            </form>
        }
        
    </div>
  )
}

export default Post