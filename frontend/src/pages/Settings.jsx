import { useAtom } from "jotai";
import { userAtom } from "../App";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Settings = () => {
  const [user, setUser] = useAtom(userAtom);
  let navigate = useNavigate();
  if (user?.username === undefined) {
    useEffect(() => {
      navigate("/login");
    }, [])
    return;
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);
  const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] =
    useState(false);

  

  const [toggleEditDesc, setToggleEditDesc] = useState(false);
  const [editDesc, setEditDesc] = useState(user.user_description);

  // const handleClickDesc = () => {
  //     setToggleEditDesc(true)
  // }

  const handleEdit = (edited, catagory) => {
    fetch(`/api/user/settings/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user, [catagory]: edited }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
    if (catagory === "user_description") {
      setToggleEditDesc(false);
    } else {
      setToggleEditImg(false);
    }
  };

  const [toggleEditImg, setToggleEditImg] = useState(false);
  const [editImg, setEditImg] = useState(user.display_pic_url);

  // const handleClickImg = () => {
  //     setToggleEditImg(true)
  // }

  const [toggleDelete, setToggleDelete] = useState(false);

  const handleDelete = () => {
    fetch(`/api/user/settings/${user._id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        setUser();
        navigate("/login");
      });
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-6 sm:px-3 lg:max-w-7xl lg:px-8">
      {/* Description list with inline editing */}
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Account settings</h1>
      <div className="mt-4 divide-y divide-gray-200">
        <div className="space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Profile
          </h3>
          <p className="max-w-2xl text-sm text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        {/* Photo */}
        <div className="mt-6">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
              <dt className="text-sm font-medium text-gray-500">Photo</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {toggleEditImg === true ? (
                  <>
                    <span className="flex-grow">
                      <input
                        text="text"
                        onChange={(event) => setEditImg(event.target.value)}
                        value={editImg}
                        className="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </span>
                    <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                      <button
                        type="button"
                        onClick={() => handleEdit(editImg, "display_pic_url")}
                        className="bg-slate-100 rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Change
                      </button>
                    </span>
                    <br />
                  </>
                ) : (
                  <>
                    <span className="flex-grow">
                      <img
                        className="h-20 w-20 rounded-full"
                        src={user.display_pic_url}
                        alt=""
                      />
                    </span>
                    <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                      <button
                        type="button"
                        onClick={() => setToggleEditImg(true)}
                        className="bg-slate-100 rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Update
                      </button>
                    </span>
                  </>
                )}
              </dd>
            </div>

            {/* User Description */}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
              <dt className="text-sm font-medium text-gray-500">Profile Description</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {toggleEditDesc === true ? (
                <>
                  <span className="flex-grow">
                  <input
                    text="text"
                    onChange={(event) => setEditDesc(event.target.value)}
                    value={editDesc}
                    className="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  </span>
                  <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                  <button
                  type="button" 
                  onClick={() => handleEdit(editDesc, "user_description")}
                  className="bg-slate-100 rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Change
                  </button>
                  </span>
                </>
              ) : (
                <>
                <span className="flex-grow">{user.user_description}</span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setToggleEditDesc(true)}
                    className="bg-slate-100 rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Update
                  </button>
                </span>
                </>
              )}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Account information */}
      <div className="mt-10 divide-y divide-gray-200">
        <div className="space-y-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Account
          </h3>
          <p className="max-w-2xl text-sm text-gray-500">
            Please send an email to the administrator to change the following details.
          </p>
        </div>
        <div className="mt-6">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{user.username}</span>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{user.email}</span>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
              <dt className="text-sm font-medium text-gray-500">First Name</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{user.first_name}</span>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
              <dt className="text-sm font-medium text-gray-500">Last Name</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{user.last_name}</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* Delete account  */}
      <div className="mt-6 divide-y divide-gray-200">
        <div className="space-y-1">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Delete your account</h3>
        <div className="max-w-2xl text-sm text-gray-500">
          <p>Once you delete your account, you will lose all data associated with it.</p>
        </div>
        <div className="mt-6">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          {toggleDelete === true ? (
            <>
            <button 
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >Confirm delete account</button>
            <button 
            type="button"
            onClick={() => setToggleDelete(false)}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
            >Cancel</button>
            </>
          ) : (
            <button
            type="button"
            onClick={() => setToggleDelete(true)}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
          >
            Delete account
          </button>
          )}
          </div>
          </dl>
        </div>
      </div>
      </div>
      </div>
  );
};

export default Settings;
