import React from "react";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ImgAndDesc from "../components/ImgAndDesc";
import EditProductForm from "../components/EditProductForm";
import CreateProductForm from "../components/CreateProductForm";
import moment from "moment";

function Sell() {
  const [user, setUser] = useAtom(userAtom);
  const [product, setProduct] = useState([]);
  const [num, setNum] = useState(-1);
  let navigate = useNavigate();

  if (user?.username === undefined) {
    useEffect(() => {
      navigate("/login");
    })
    return;
  } else {
    // initial Fetch
    useEffect(() => {
      fetch(`/api/product/user/${user._id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data));
    }, []);

    // Create product
    const addProduct = (productdetails) => {
      setProduct([...product, productdetails]);
    };

    // Edit product details
    const handleEdit = (id) => {
      setNum(id);
    };

    const submitEdit = (editedproduct) => {
      const pos = product.findIndex((p) => p._id === editedproduct._id);
      setProduct([
        ...product.slice(0, pos),
        editedproduct,
        ...product.slice(pos + 1),
      ]);
      setNum(-1);
    };

    // delete product
    const handleDelete = (prod_id) => {
      fetch(`/api/product/${prod_id}`, { method: "DELETE" })
        .then((response) => response.json())
        .then((data) => {
          setProduct(product.filter((p) => p._id !== prod_id));
        });
    };

    return (
      <>
    {num === -1 ? <div className="max-w-2xl mx-auto lg:max-w-7xl lg:px-8">
      <div>
        <img className="h-32 w-full object-cover lg:h-48" src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="" />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32" src={user.display_pic_url} alt="" />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">{user.first_name + " " + user.last_name}</h1>
              <h1 className="text-sm text-gray-500 truncate">{user.user_description}</h1>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Link to={"/sell/newproduct"}>
                <span>Add product</span>
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 truncate">{user.first_name + " " + user.last_name}</h1>
        </div>
      </div>


      <div className="mt-4">
        <h2 className="text-xl font-bold text-gray-900">Listing</h2> 

        <div className="mt-4 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {product.map((product) => (
            <div key={product._id}>
              <Link to={"/sell/" + product?._id}>
              <div className="relative inset-0">
                <div className="relative w-full h-72 rounded-lg overflow-hidden">
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="mt-4 text-sm text-gray-700">{product.product_name}</h3>
                  <p className="mt-1 text-sm font-medium text-gray-900">Sale price: ${product.product_price_one_off}</p>
                  {parseFloat(product?.product_price_subscription) === 0 ? <p className="mt-1 text-sm font-medium text-gray-900">Subscription price: Not applicable</p> : <p className="mt-1 text-sm font-medium text-gray-900">Subscription price: ${product.product_price_subscription}</p>}
                </div>
              </div>
              </Link>
              
              <div className="mt-2 grid grid-cols-2 gap-6">
              <button
                type="button"
                onClick={() => handleEdit(product._id)}
                className="relative inline-flex justify-center items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span>Edit product</span>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(product._id)}
                className="relative inline-flex justify-center items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <span>Delete product</span>
              </button>
              </div>
            </div>
          ))}
        </div>
      </div> 
      </div> : <EditProductForm
                    key={product._id}
                    product={product}
                    productid={num}
                    submitEdit={submitEdit}
                  /> }
      </>
      // <div>
      //   <CreateProductForm addProduct={addProduct} />
      //   <div className="container">
      //     <div className="leftColumn">
      //       <ImgAndDesc
      //         img={user.display_pic_url}
      //         description={user.user_description}
      //       />
      //     </div>
      //     <div className="rightColumn">
      //       <div>
      //         {product.map((product) =>
      //           num === product._id ? (
      //             <EditProductForm
      //               key={product._id}
      //               product={product}
      //               submitEdit={submitEdit}
      //             />
      //           ) : (
      //             <div key={product._id}>
      //               <Link to={"/sell/" + product._id}>
      //                 <img
      //                   src={product.product_image}
      //                   alt={product.product_name}
      //                 />
      //                 <p>{product.product_name}</p>
      //                 <p>{product.product_category}</p>
      //                 <p>{product.product_description}</p>
      //                 <p>{product.product_price_one_off}</p>
      //                 <p>{product.product_price_subscription}</p>
      //                 <p>
      //                   {moment(product.product_listed_date).format(
      //                     "DD MMMM YYYY, h:mm:ss a"
      //                   )}
      //                 </p>
      //               </Link>
      //               <button onClick={() => handleEdit(product._id)}>
      //                 Edit
      //               </button>
      //               <button onClick={() => handleDelete(product._id)}>
      //                 Delete
      //               </button>
      //             </div>
      //           )
      //         )}
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default Sell;
