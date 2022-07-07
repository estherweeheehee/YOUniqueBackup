import PostComponent from "../components/PostComponent";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useReducer } from "react";
import EditForm from "../components/EditForm";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import ImgAndDesc from "../components/ImgAndDesc";
import moment from "moment";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  CodeIcon,
  DotsVerticalIcon,
  FlagIcon,
  StarIcon,
} from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Post = () => {
  const [user, setUser] = useAtom(userAtom);
  const [post, setPost] = useState([]);
  const [edit, setEdit] = useState(-1);
  let navigate = useNavigate();

  if (user?.username === undefined) {
    useEffect(() => {
      navigate("/login");
    })
    return;
  } 
    //? Fetch
    useEffect(() => {
      fetch(`/api/feed/${user._id}`)
        .then((response) => response.json())
        .then((data) => setPost(data));
    }, []);

    //? Delete
    const handleDelete = (id) => {
      fetch(`/api/feed/${id}`, { method: "DELETE" })
        .then((response) => response.json())
        .then((data) => setPost(post.filter((para) => para._id !== id)));
    };
    //? Edit
    const handleEdit = (id) => {
      setEdit(id);
    };

    return (
      <>
       {/* <div className="container"> */}
        <div className="bg-white px-4 py-5 sm:px-6">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <div>
                <ImgAndDesc
                  img={user.display_pic_url}
                  description={user.user_description}
                />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-base font-medium text-gray-900">
                <div >
                  <PostComponent setPost={setPost} post={post} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BREAK */}
        {post.map((singlePost, index) => {
          return <div key={index}>
  <div className="bg-white px-4 py-5 sm:px-6 postcontents">
          <div className="flex space-x-3">
            <div className="min-w-0 flex-1">
              <div>
                <div>
                {edit === singlePost._id ? <EditForm singlePost={singlePost} post={post} setPost={setPost} setEdit={setEdit} /> : <p>{singlePost.post}</p>}
                </div>
              </div>
              <br/>
              <p className="text-sm text-gray-500">
              <img src={singlePost.Image_url} alt="" />
              </p>
              <br/>
              <p>
                
                  Posted on: {moment(singlePost.date).format('DD MMMM YYYY, h:mm:ss a')}
                
              </p>
            </div>
            <div className="flex-shrink-0 self-center flex">
              <Menu as="div" className="relative z-30 inline-block text-left">
                <div>
                  <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                          onClick={() => handleEdit(singlePost._id)}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "flex px-4 py-2 text-sm"
                            )}
                          >
                            <CodeIcon
                              className="mr-3 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Edit Content</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                          onClick={() => handleDelete(singlePost._id)}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "flex px-4 py-2 text-sm"
                            )}
                          >
                            <FlagIcon
                              className="mr-3 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Remove Content</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
          </div>;
        })}
      </>
      
    );
  
};

{
  /* <div className="leftcolumn">
<ImgAndDesc img={user.display_pic_url} description={user.user_description} />

</div>
<div className="rightcolumn">
  <PostComponent setPost={setPost} post={post}/>
  {post?.map((singlePost, index) => {})}
    return (
      <div key={index}>
        {edit === singlePost._id ? <EditForm singlePost={singlePost} post={post} setPost={setPost} setEdit={setEdit}/> : <p>{singlePost.post}</p>}
        <img src={singlePost.Image_url} alt="" />
        <p>{moment(singlePost.date).format('DD MMMM YYYY, h:mm:ss a')}</p>
        <button onClick={() => handleDelete(singlePost._id)}>Delete</button>
        <button onClick={() => handleEdit(singlePost._id)}>Edit</button>
      </div>
    );
  })}
</div> */
}
export default Post;
