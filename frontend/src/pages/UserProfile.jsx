import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImgAndDesc from "../components/ImgAndDesc";
import UserPost from "../components/UserPost";
import UserProduct from "../components/UserProduct";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";

function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [view, setView] = useState("posts");

  useEffect(() => {
    fetch(`/api/user/view/${id}`)
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);

  const handleViewPosts = () => {
    setView("posts");
  };

  const handleViewProducts = () => {
    setView("products");
  };

  const profile = {
    name: "Ricardo Cooper",
    email: "ricardo.cooper@example.com",
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    backgroundImage:
      "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    fields: [
      ["Phone", "(555) 123-4567"],
      ["Email", "ricardocooper@example.com"],
      ["Title", "Senior Front-End Developer"],
      ["Team", "Product Development"],
      ["Location", "San Francisco"],
      ["Sits", "Oasis, 4th floor"],
      ["Salary", "$145,000"],
      ["Birthday", "June 8, 1990"],
    ],
  };

  return (
    <div>
      <div>
        <img
          className="h-32 w-full object-cover lg:h-48"
          src={profile.backgroundImage}
          alt=""
        />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <ImgAndDesc
              img={userData["display_pic_url"]}
              description={userData["user_description"]}
            />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {userData.username}
              </h1>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleViewPosts}
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <MailIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Post</span>
              </button>
              <button
                onClick={handleViewProducts}
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <PhoneIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Products</span>
              </button>
              
            </div>
          </div>
        </div>
        
        <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 truncate">
            {profile.name}
          </h1>
        </div>
        <div className="mt-6 absolute inset-x-0 h-20">
        
                {view === "posts" ? <UserPost /> : <UserProduct />}
              </div>
      </div>
    </div>
  );
}

export default UserProfile;

{
  /* <div className="container">
  <div className="leftcolumn">
    <ImgAndDesc
      img={userData["display_pic_url"]}
      description={userData["user_description"]}
    />
  </div>
  <div className="rightcolumn">
    <button onClick={handleViewPosts}>Posts</button>
    <button onClick={handleViewProducts}>Products</button>
    {view === "posts" ? <UserPost /> : <UserProduct />}
  </div>
</div> */
}
