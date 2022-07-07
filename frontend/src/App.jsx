import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import "./App.css";
import Sell from "./pages/Sell";
import Feed from "./pages/Feed";
import Post from "./pages/Post";
import Main from "./pages/Main";
import Search from "./pages/Search";
import UserProfile from "./pages/UserProfile";
import {atom} from "jotai"
import MySales from "./pages/MySales";
import ProductHome from "./pages/ProductHome";
import MyPurchase from "./pages/MyPurchase";
import Product from "./pages/Product";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FeedSearch from "./pages/FeedSearch";
import FeedHome from "./pages/FeedHome";
import CreateProductForm from "./components/CreateProductForm";



export const userAtom = atom({})

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Main />}>
            <Route path={"/"} element={<Home />}>
              <Route path={"/"} element={<ProductHome />} />
              <Route path={"/search/:id"} element={<Search />} />
            </Route>
            <Route path={"/sell"} element={<Sell />} />
            <Route path={"/sell/:id"} element={<Product />} />
            <Route path={"/sell/newproduct/"} element={<CreateProductForm />} />
            <Route path={"/feed"} element={<FeedHome />}>
              <Route path={"/feed"} element={<Feed />} />
              <Route path={"/feed/search/:id"} element={<FeedSearch />} />
            </Route>
            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/post/"} element={<Post />} />
            <Route path={"/user/:id"} element={<UserProfile />} />
            <Route path={"/mysales"} element={<MySales />} />
            <Route path={"/mypurchase"} element={<MyPurchase />} />
            <Route path={"/settings"} element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
