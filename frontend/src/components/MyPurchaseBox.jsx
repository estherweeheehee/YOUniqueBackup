import moment from "moment"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";


const MyPurchaseBox = ({ orderType, orderNum, price, productName, purchaseDate, productId, qty, status}) => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        fetch(`/api/product/${productId}`)
          .then((response) => response.json())
          .then((data) => setProduct(data));
      }, []);

    const cost = parseInt(price) * parseInt(qty)

    return (
        <>
            <section key={orderNum} aria-labelledby={`${orderNum}-heading`}>
              <div className="space-y-1 md:flex md:items-baseline md:space-y-0 md:space-x-4">
                <h2 id={`${orderNum}-heading`} className="text-lg font-medium text-gray-900 md:flex-shrink-0">
                  Order #{orderNum}
                </h2>
                <div className="space-y-5 md:flex-1 md:min-w-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0">
                  <p className="text-sm font-medium text-gray-500">{status}</p>
                  <div className="flex text-sm font-medium">
                  <Link to={`/sell/${productId}`} className="text-indigo-600 hover:text-indigo-500">
                      View Product
                    </Link>
                    {/* <div className="border-l border-gray-200 ml-4 pl-4 sm:ml-6 sm:pl-6">
                      <Link to={`/user/${buyerId}`} className="text-indigo-600 hover:text-indigo-500">
                        View Buyer
                      </Link>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="mt-6 -mb-6 flow-root border-t border-gray-200 divide-y divide-gray-200">
                
                  <div key={orderNum} className="py-6 sm:flex">
                    <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                      <img
                        src={product[0]?.product_image}
                        alt={product[0]?.product_name}
                        className="flex-none w-20 h-20 rounded-md object-center object-cover sm:w-48 sm:h-48"
                      />
                      <div className="pt-1.5 min-w-0 flex-1 sm:pt-0">
                        <h3 className="text-sm font-medium text-gray-900">
                          <Link to={`/sell/${productId}`}>{productName}</Link>
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          
                          <span>Product ID: {productId}</span>
                          
                        </p>
                        <p className="text-sm text-gray-500 truncate">

                          <span>Date of purchase: {moment(purchaseDate).format('DD MMMM YYYY')}</span>
                          
                        </p>
                        <p className="text-sm text-gray-500 truncate">

                          <span>Quantity purchased: {qty}</span>
                        </p>
                        
                        <p className="mt-1 font-medium text-gray-900">Amount paid: ${cost.toLocaleString()}</p>
                      </div>
                    </div>
                    {/* <div className="mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:flex-none sm:w-40">
                      {toggleStatus === "unfulfilled" ?
                      <button
                      type="button"
                      className="w-full flex items-center justify-center bg-indigo-600 py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0"
                      onClick={() => handleClick("delivered")}
                    >
                      Change to delivered
                    </button>
                    :
                    <button
                        type="button"
                        className="w-full flex items-center justify-center bg-indigo-600 py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full sm:flex-grow-0"
                        onClick={() => handleClick("unfulfilled")}
                      >
                        Change to unfulfilled
                      </button>
                    }
                      
                    </div> */}
                  </div>
                
              </div>
            </section>

            {/* <div className="OrderBox">
                <p className="OrderInput">Order type: {orderType}</p>
                <p className="OrderInput">Order number: {orderNum}</p>
                <p className="OrderInput">Product Name: {productName}</p>
                <p className="OrderInput">Product ID: {productId}</p>
                <p className="OrderInput">Quantity purchased: {qty}</p> 
                <p className="OrderInput">Amount paid: ${cost}</p> 
                <p className="OrderInput">Date of Purchase: {moment(purchaseDate).format('DD MMMM YYYY, h:mm:ss a')}</p>
                
                <img src={product[0]?.product_image} alt={product[0]?.product_name}/>
                
                <p className="OrderInput">Status: {status}</p>
            </div> */}
        
        </>
    )
}

export default MyPurchaseBox