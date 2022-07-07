import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import { atomWithStorage, RESET } from 'jotai/utils'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useAtom(userAtom);
  
  let navigate = useNavigate();

    const [login, setLogin] = useState({
        username: "",
        password: ""
    })

    const handleChange = (event, key) => {
        setLogin({
            ...login,
            [key]: event.target.value
        })
    }

    const handleSubmitLogin = (event) => {
        event.preventDefault();
        fetch("/api/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(login)
          })
            .then((response) => response.json())
            .then((data) => setUser(data));
        navigate("/")
    };
        
    return (
<>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        {/* logo */}
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://i.imgur.com/4fZaiaq.png"
              alt="Workflow"
            />
            <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>

          {/* username form */}
          <form className="mt-6 space-y-6" action="#" method="POST" onSubmit={handleSubmitLogin}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={login.username}
                  onChange={() => handleChange(event, "username")}
                />
              </div>

              {/* password form */}
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={login.password}
                  onChange={() => handleChange(event, "password")}
                />
              </div>
            </div>

            {/* button */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
    )
}

export default Login