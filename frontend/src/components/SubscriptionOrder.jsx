import { useAtom } from "jotai";
import { userAtom } from "../App";
import SubscriptionOrderBox from "./SubscriptionOrderBox";
import { useState } from "react";

const SubscriptionOrder = () => {
  const [user, setUser] = useAtom(userAtom);
  const [orders, setOrders] = useState(user.sales_order_subscription);

  const handleChangeStatus = (id, index, newStatus) => {
    const updatedOrder = {
      ...user.sales_order_subscription[index],
      status: newStatus,
    };
    const newOrders = [
      ...orders.slice(0, index),
      updatedOrder,
      ...orders.slice(index + 1),
    ];

    fetch(`/api/user/MSorderstatus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrders),
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(newOrders);
      });
  };

  const DisplayOrders = () => {
    const ordersArr = [];
    for (let i = 0; i < orders.length; i++) {
      ordersArr.push(
        <SubscriptionOrderBox
          orderID={user._id}
          itemIndex={i}
          orderNum={orders[i].orderId.orderNum}
          price={orders[i].price}
          productName={orders[i].productName}
          subscriptionDate={orders[i].subscriptionDate}
          buyerUsername={orders[i].buyerUsername}
          buyerId={orders[i].buyerId}
          productId={orders[i].productId}
          qty={orders[i].qty}
          status={orders[i].status}
          handleChangeStatus={handleChangeStatus}
          key={i}
        />
      );
    }
    return ordersArr;
  };

  return (
    <>
      
          <DisplayOrders />
          
        
    </>
  );
};

export default SubscriptionOrder;
