import { useEffect, useState } from "react";
import moment from "moment"
import { useParams } from "react-router-dom";

function UserPost() {
  let {id} = useParams();
  const [userPost, setUserPost] = useState([]);
  useEffect(() => {
    fetch(`/api/feed/user/${id}`)
      .then((response) => response.json())
      .then((data) => setUserPost(data));
  }, []);



  return (
    <div>
      <br />
      <h1 className="text-2xl font-bold text-gray-900 truncate userpost">
            My Posts:
          </h1>
          <br />
      {userPost.map((display) => {
        return (
          <div className="usercontents" key={display._id}>

            <p>{display.post}</p>
            <br />
            <img src={display.Image_url} />
            <br />
            <br />
            <p>Posted on: {moment(display.date).format('DD MMMM YYYY h:mm:ss a')}</p>
            
          </div>
        );
      })}
      <br />
    </div>
  );
}

export default UserPost;
