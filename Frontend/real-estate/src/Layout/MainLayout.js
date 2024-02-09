import React from "react";
import Header from "../components/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const MainLayout = () => {
  return (
    <div className="mx-auto bg-white ">
      <Header />
      <section className="main__Outlet">
        <Outlet />
      </section>
      <Footer />
      <Nav />
      <ScrollRestoration
        getKey={(location, matches) => {
          return location.pathname;
        }}
      />
    </div>
  );
};

export default MainLayout;
