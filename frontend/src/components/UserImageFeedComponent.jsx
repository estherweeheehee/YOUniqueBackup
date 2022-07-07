import React from 'react'
import { useState,useEffect } from 'react';


function UserImageFeedComponent({para}) {
    const [userImg, setUserImg] = useState([])
    useEffect(() => {
      fetch(`/api/user/feed/${para}`)
        .then((response) => response.json())
        .then((data) => setUserImg(data));
    }, []);
  return (
    <div>
         <img src={userImg.display_pic_url} alt=""  className="h-10 w-10 rounded-full"/>
    </div>
  )
}

export default UserImageFeedComponent