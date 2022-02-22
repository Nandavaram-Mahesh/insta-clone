import React from 'react'
import Moment from 'react-moment'
const Comment = ({comment}) => {
  return (
    <div className="flex items-center space-x-2 mb-3">
        <img 
        src={comment.data().userImage} 
        alt=""
        className="rounded-full h-7"
         />
         <p className="text-sm flex-1">
             <span className="font-bold">{comment.data().username}</span> {comment.data().comment}
        </p>
        <Moment fromNow className="text-xs pr-5">
            {comment.data().timestamp?.toDate()}
        </Moment>
    </div>
  )
}

export default Comment