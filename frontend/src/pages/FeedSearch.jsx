import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom"

const FeedSearch = () => {

    const [results, setResults] = useState();
    const params = useParams();
    const term = params.id
    const lowercaseTerm = term.toLowerCase()

    useEffect(() => {
        fetch(`/api/user/search/${lowercaseTerm}`)
          .then((response) => response.json())
          .then((data) => setResults(data));
      }, [lowercaseTerm]);
    return (
        <div className="bg-slate-100">
    <div className="max-w-2xl mx-auto py-4 px-4 sm:py-1 sm:px-3 lg:max-w-7xl lg:px-8">
      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {results?.map((users) => (
          <div key={users?._id} className="group relative">
            <div className="mt-8 w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
              <img
                src={users?.display_pic_url} 
                alt={users?.display_pic_url}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
              <Link to={"/user/" + users?._id}>
                <span className="absolute inset-0" />
                {users?.product_name}
              </Link>
            </h3>
            <p className="mt-1 text-sm font-medium text-gray-900">@ {users?.username}</p>
            {users?.product_price_subscription === 0 ? "": <p className="mt-1 text-sm font-medium text-gray-400">{users. first_name} {users.last_name}</p>}
          </div>
        ))}
      </div>
    </div>
  </div>
    )
}

export default FeedSearch