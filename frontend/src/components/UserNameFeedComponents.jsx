import React from 'react'
import { useState,useEffect } from 'react';


function UserFeedComponents({para}) {
    const [userFeed, setUserFeed] = useState([])
  useEffect(() => {
    fetch(`/api/user/feed/${para}`)
      .then((response) => response.json())
      .then((data) => setUserFeed(data));
  }, []);

  return (
    <>
        {userFeed.username}
      
    </>
  )
}

export default UserFeedComponents