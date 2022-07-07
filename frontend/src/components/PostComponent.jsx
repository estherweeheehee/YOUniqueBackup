import React from "react";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import {useState} from 'react'

function Post({setPost, post}) {
  const [user, setUser] = useAtom(userAtom);    
  const [newPost, setNewPost] = useState({
    post: "",
    Image_url: "",
    userid: user._id
  })

  const handleChange = (event, catagory) => {
    setNewPost({
      ...newPost,
      [catagory]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    
    event.preventDefault();
    fetch("/api/feed", {
      method: "POST",
      body: JSON.stringify(
        newPost
      //   {
      //   post: event.target.post.value,
      //   Image_url: event.target.image.value,
      //   userid: user._id
      // }
      ),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPost([data, ...post])
        setNewPost({
          ...newPost,
          post: "",
         Image_url: ""
        })
      })
      .catch((error) => console.error({ Error: error }));


      
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Submit a post</legend>
          <label htmlFor="post">Post</label>
          <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Whats on your mind?" type="text"   required name="post" id="post" value={newPost.post} onChange={() => handleChange(event, "post")}/>
          <label htmlFor="image">Image</label>
          <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Wanna link an image?" type="text"  name="image" id="image" value={newPost.Image_url} onChange={() => handleChange(event, "Image_url")}/>
          <br />
          <button className="rounded-full bg-indigo-500 text-white" >Upload Post</button>
        </fieldset>
      </form>
    </div>
  );
}

export default Post;
