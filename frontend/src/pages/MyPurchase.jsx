import { useAtom } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../App";
import { useEffect } from "react";
import MyPurchaseBox from "../components/MyPurchaseBox";
import MySubscriptionBox from "../components/MySubscriptionBox";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";

const tabs = [
  { name: "View Single Orders", href: "#", current: "OF" },
  { name: "View Subscription Orders", href: "#", current: "MS" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MyPurchase = () => {
  const [user, setUser] = useAtom(userAtom);
  let navigate = useNavigate();
  if (user?.username === undefined) {
    useEffect(() => {
      navigate("/login");
    })
    return;
  }
  
      const [purchaseData, setPurchaseData] = useState([]);
      const [view, setView] = useState("OF");

      const fetchOF = () => {
        const userId = user._id;
        fetch(`/api/user/mypurchase/OF/${userId}`)
          .then((response) => response.json())
          .then((data) => setPurchaseData(data));
      };
    
      const fetchMS = () => {
        const userId = user._id;
        fetch(`/api/user/mypurchase/MS/${userId}`)
          .then((response) => response.json())
          .then((data) => setPurchaseData(data));
      };
      
      useEffect(() => {
      if (view === "MS") {
        fetchMS();
      } else {
        fetchOF();
      }
    
      }, [view]);

  const MakeMyPurchases = () => {
    return purchaseData.map((item, index) => (
      <MyPurchaseBox
        orderType={item.orderId.orderType}
        orderNum={item.orderId.orderNum}
        price={item.price}
        productName={item.productName}
        purchaseDate={item.purchaseDate}
        productId={item.productId}
        qty={item.qty}
        status={item.status}
        key={index}
      />
    ));
  };

  const MakeMySubscriptions = () => {
    return purchaseData.map((item, index) => (
      <MySubscriptionBox
        orderType={item.orderId.orderType}
        orderNum={item.orderId.orderNum}
        price={item.price}
        productName={item.productName}
        subscriptionDate={item.subscriptionDate}
        productId={item.productId}
        qty={item.qty}
        status={item.status}
        key={index}
      />
    ));
  };

  const handleView = () => {
    if (view === "OF") {
      setView("MS");
    } else {
      setView("OF");
    }
  }


  return (
    <>
    
          

          
      
      <main className="max-w-2xl mx-auto py-16 px-4 sm:py-6 sm:px-3 lg:max-w-7xl lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">My purchases</h1>
          <p className="mt-4 text-sm text-gray-500">
            View your purchases
           
          </p>
          <div className="mt-6 hidden sm:block">
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
        {view === "OF" ? <MakeMyPurchases /> : <MakeMySubscriptions />}
          
        </div>
      </main>

      
    </>
  );
};
// }

export default MyPurchase;
