import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment"

const UserProduct = () => {
  let { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(`/api/product/user/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, []);
  
  return (
    <div>
      <br />
      <h1 className="text-2xl font-bold text-gray-900 truncate userpost">View Products</h1>
      < br/>
      {product.map((element) => (
        <div className="usercontents" key={element._id}>
            <h3 className="text-xl font-bold">{element.product_name}</h3>
            <br/>
            <img src={element.product_image} /> 
            <br />
            <p><b>Product description:</b> {element.product_description}</p>
            <p><b>One-off purchase price:</b> ${element.product_price_one_off}</p>
            {element.product_price_subscription === 0? null
            : <p><b>Monthly subscription price (quantity of 1 per month):</b> ${element.product_price_subscription}</p>}

            
            <p><b>Product listed since:</b> {moment(element.product_listed_date).format('DD MMMM YYYY')}</p> 
            <br/>           
        </div>
      ))}
    </div>
  );
};

export default UserProduct;
