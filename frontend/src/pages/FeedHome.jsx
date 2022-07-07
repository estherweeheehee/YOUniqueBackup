import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const FeedHome = () => {
    const [searchItem, setSearchItem] = useState("")
    let navigate = useNavigate();

    const handleChange = (event) => {
        setSearchItem(event.target.value)
      }

      const checkForSpace = (searchItem) => {
        for (let i = 0; i < searchItem.length; i++) {
          if (searchItem[i] !== " ") {
            return true
          }
        }
        return false
      }
    
      const handleSubmit = (event) => {
        event.preventDefault()
        if (searchItem === "") {
          alert("Please enter a search term")
          return;
        } else if (!checkForSpace(searchItem)) {
          alert("Please enter a search term")
          return;
        }
        
        navigate(`/feed/search/${searchItem}`)
        setSearchItem("")
        
      }
      
  
    return (
        <>  
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-6 sm:px-3 lg:max-w-7xl lg:px-8">
    <div className="mt-2 relative flex items-center">
    <form onSubmit={handleSubmit}>
          <fieldset>
            <input 
            type="text"
            name="searchterm" 
            id="searchterm" 
            placeholder="Find user" 
            value={searchItem}
            onChange={handleChange}
            className="w-96 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block pr-12 sm:text-sm border-gray-300 rounded-md"
            />
          </fieldset>
        </form>
      </div>
      </div>
        <Outlet />
        
        </>
    )
}

export default FeedHome