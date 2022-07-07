import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useAtom(userAtom);
  let navigate = useNavigate();

  const [signUp, setSignUp] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    display_pic_url: "",
    user_description: "",
  });

  const handleChange = (event, key) => {
    setSignUp({
      ...signUp,
      [key]: event.target.value,
    });
  };

  const useDefault = () => {
    setSignUp({
      ...signUp,
      display_pic_url: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    })
  }

  const handleSubmitSignup = (event) => {
    event.preventDefault();
    fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUp),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.data === "error") {
          alert(
            "Error! The username or email is currently in use. Please try again"
          );
          navigate("/login");
        } else {
          setUser(data);
          console.log(data)
          navigate("/");
        }
      });
  };

  return (
    <>
    {/* logo plus wording */}
      <div className="min-h-full flex flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://i.imgur.com/4fZaiaq.png"
            alt="Workflow"
          />
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Sign up a new account</h2>
        </div>

        {/* user name & password */}
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmitSignup}>
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={signUp.username}
                    onChange={() => handleChange(event, "username")}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={signUp.password}
                    onChange={() => handleChange(event, "password")}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={signUp.email}
                    onChange={() => handleChange(event, "email")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              {/* Name */}
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    required
                    value={signUp.first_name}
                    onChange={() => handleChange(event, "first_name")}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    required
                    value={signUp.last_name}
                    onChange={() => handleChange(event, "last_name")}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* display picture */}
              <div>
                <label htmlFor="userpicture" className="flex text-sm font-medium text-gray-700">
                  Display picture URL
                  <p className="mx-2 mb-1 text-xs text-white font-medium bg-indigo-600 px-2 py-1 w-max rounded-md" onClick={useDefault}>Click to use default image</p>
                </label>
                
                <div className="mt-1">
                  <input
                    id="userpicture"
                    name="userpicture"
                    type="text"
                    required
                    value={signUp.display_pic_url}
                    onChange={() => handleChange(event, "display_pic_url")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
              </div>

              {/* display picture */}
              <div>
                <label htmlFor="profiledescription" className="block text-sm font-medium text-gray-700">
                  Profile Description
                </label>
                <div className="mt-1">
                  <input
                    id="profiledescription"
                    name="profiledescription"
                    type="text"
                    autoComplete="current-password"
                    required
                    value={signUp.user_description}
                    onChange={() => handleChange(event, "user_description")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* Sign up */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
