import React from "react";

//imoort routes
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// import component

//import pages
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import MainLayout from "./Layout/MainLayout";
import AllLayout from "./Layout/AllLayout";
import AdminLayout from "./Layout/AdminLayout";
import MainDash from "./AdminResources/components/MainDash/MainDash";
import AllListing from "./AdminResources/components/Listing/AllListing/AllListing";
import AddListing from "./AdminResources/components/Listing/AddListing/AddListing";
import AddBlog from "./AdminResources/components/Blog/AddBlog/AddBlog";
import AllBlog from "./AdminResources/components/Blog/AllBlog/AllBlog";
import UpdateBlog from "./AdminResources/components/Blog/AddBlog/UpdateBlog";
import UpdateListing from "./AdminResources/components/Listing/AddListing/UpdateListing";
import Messaage from "./AdminResources/components/Message/Messaage";
import LoginLayout from "./Layout/LoginLayout";
import PrivateRoutes from "./Layout/PrivateRoutes";
import AboutUs from "./pages/About/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Search from "./pages/Search/Search";
import Blogs from "./pages/Blog/Blogs";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import Agents from "./AdminResources/components/Agents/Agents";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AllLayout />}>
      <Route element={<MainLayout />} path="/">
        <Route path="/" element={<Home />} />
        <Route path="property/:id" element={<PropertyDetails />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="listings" element={<Search />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blog/:id" element={<BlogDetails />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin" exact element={<MainDash />} />
          <Route path="all-listing" element={<AllListing />} />
          <Route path="add-listing" element={<AddListing />} />{" "}
          <Route path="update-listing/:listingId" element={<UpdateListing />} />
          <Route path="all-blog" element={<AllBlog />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="update-blog/:blogId" element={<UpdateBlog />} />
          <Route path="messages" element={<Messaage />} />
          <Route path="agents" element={<Agents />} />
        </Route>
      </Route>
      <Route element={<LoginLayout />} path="/login" />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
