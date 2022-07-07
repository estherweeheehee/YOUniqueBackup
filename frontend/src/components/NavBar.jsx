import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Social Media Feed", to: "/feed" },
  { name: "Sell Item", to: "/sell" },
  { name: "My Content", to: "/post" },
];

const navigation_button_logout = [{ name: "Log out", to: "/" }];

const navigation_button = [
  { name: "Sign up", to: "/signup" },
  { name: "Login", to: "/login" },
];

const navigation_dropdown = [
  { name: "My Sales", to: "/mysales" },
  { name: "My Purchase", to: "/mypurchase" },
  { name: "Account Settings", to: "/settings" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar() {
  const [user, setUser] = useAtom(userAtom);
  let navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    fetch(`/api/user/logout`)
      .then((response) => response.json())
      .then((data) => setUser());
    navigate("/login");
  };


  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          {/* Logo */}
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex px-2 lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://i.imgur.com/s30PMxP.png"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://i.imgur.com/s30PMxP.png"
                    alt="Workflow"
                  />
                </div>

                {/* navigation main pages */}
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      className={classNames(
                        item.to === location.pathname
                          ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      )}
                      aria-current={
                        item.to === location.pathname ? "page" : undefined
                      }
                      to={item.to}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Resize Menu */}
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* login sign up button */}
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                {user?.["username"] !== undefined ? (
                  <div className="flex-shrink-0">
                    {navigation_button_logout.map((item) => (
                      <Link key={item.name} to={item.to}>
                        <button
                          onClick={handleLogOut}
                          type="button"
                          className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-3"
                        >
                          <span>{item.name}</span>
                        </button>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex-shrink-0 space-x-4">
                    {navigation_button.map((item) => (
                      <Link key={item.name} to={item.to}>
                        <button
                          type="button"
                          className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <span>{item.name}</span>
                        </button>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Profile dropdown */}
                {user?.["username"] !== undefined ? (
                  <Menu as="div" className="ml-4 relative flex-shrink-0">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user?.["display_pic_url"]}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="z-40 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {navigation_dropdown.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link
                                key={item.name}
                                to={item.to}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : null}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} to={item.to}>
                  <Disclosure.Button className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>

            {user?.["username"] !== undefined ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.["display_pic_url"]}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user?.username}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user?.email}
                    </div>
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  {navigation_dropdown.map((item) => (
                    <Link key={item.name} to={item.to}>
                      <Disclosure.Button className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                        {item.name}
                      </Disclosure.Button>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default NavBar;
