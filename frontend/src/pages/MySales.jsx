import { useAtom } from "jotai";
import { userAtom } from "../App";
import { useNavigate } from "react-router-dom";
import { useState, Fragment, useEffect } from "react";
import SingleOrder from "../components/SingleOrder";
import SubscriptionOrder from "../components/SubscriptionOrder";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";

const tabs = [
  { name: "View Single Orders", href: "#", current: "single" },
  { name: "View Subscription Orders", href: "#", current: "subscription" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MySales = () => {
  const [user, setUser] = useAtom(userAtom);

  let navigate = useNavigate();

  if (user?.username === undefined) {
    useEffect(() => {
      navigate("/login");
    },[])
    return;
    
  } else {
    const [view, setView] = useState("single");
    const handleView = () => {
      if (view === "single") {
        setView("subscription");
      } else {
        setView("single");
      }
    };

    return (
      <>
        <main className="max-w-2xl mx-auto py-16 px-4 sm:py-6 sm:px-3 lg:max-w-7xl lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">My sales</h1>
          <p className="mt-4 text-sm text-gray-500">
            View and manage the status of your sales
           
          </p>
          <div className="mt-6 hidden sm:block mx-auto">
            <nav className="flex space-x-4" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  onClick={handleView}
                  className={classNames(
                    tab.current === view
                      ? "bg-indigo-100 text-gray-700"
                      : "text-gray-500 hover:text-gray-700",
                    "px-3 py-2 font-medium text-sm rounded-md"
                  )}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-6 space-y-16 sm:mt-10">
        {view === "single" ? <SingleOrder /> : <SubscriptionOrder />}
          
        </div>
      </main>

          
       

        
      </>
    );
  }
};

export default MySales;
