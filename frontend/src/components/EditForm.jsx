import React from "react";
import { useState } from "react";

function EditForm({ singlePost, post, setEdit, setPost }) {
  const [updatePost, setUpdatePost] = useState(singlePost.post);
  const [updateImg, setUpdateImg] = useState(singlePost.Image_url);

  const resetPosts = () => {
    const pos = post.findIndex((item) => item._id === singlePost._id);

    setPost([
      ...post.slice(0, pos),
      { ...singlePost, post: updatePost },
      ...post.slice(pos + 1),
    ]);
  };

  const resetImage = () => {
    const pos = post.findIndex((item) => item._id === singlePost._id);

    setPost([
      ...post.slice(0, pos),
      { ...singlePost, Image_url: updateImg },
      ...post.slice(pos + 1),
    ]);
  };
  const handleEditPost = () => {
    fetch(`/api/feed/${singlePost._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...singlePost, post: updatePost }),
    })
      .then((response) => response.json())
      .then((data) => data);
    resetPosts();
    setEdit(-1);
  };
  const handleEditImg = () => {
    fetch(`/api/feed/img/${singlePost._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...singlePost, Image_url: updateImg }),
    })
      .then((response) => response.json())
      .then((data) => data);
    resetImage();
    setEdit(-1);
  };

  const handleCancel = ()=>{
    setEdit(-1);

  }
  return (
    <div>
      <input 
        className="editpostinput"
        onChange={(event) => setUpdatePost(event.target.value)}
        value={updatePost}
      />
      <button className="relative inline-flex items-center ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleEditPost}>Change Text</button>
      <br/>
      <input
        className="editpostinput"
        value={updateImg}
        onChange={(event) => setUpdateImg(event.target.value)}
      />
      <button className="relative inline-flex items-center ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleEditImg}>Change Image</button>
      <br />
      <button className="relative inline-flex items-center ml-2 mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleCancel}>Cancel Edit</button>
    </div>
  );
}

export default EditForm;
