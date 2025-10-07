import React, { Suspense, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import BottomNavigation from "../components/Navigation/BottomNavigation";
import Main from "../store/main";
import { lazy } from "react";
import ScrollToTop from "../utils/ScrollToTop";
const Modal = lazy(() => import("../components/Modal/Modal"));
import { Analytics } from "@vercel/analytics/next";

const Layout = () => {
  const { modalShown, handleHideModal, getSavedMovies } = Main();

  useEffect(() => {
    let timer;
    if (modalShown) {
      // Auto close modal after 4 seconds
      timer = setTimeout(() => {
        handleHideModal();
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [modalShown, handleHideModal]);

  useEffect(() => {
    getSavedMovies();
  }, []);

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <ScrollToTop />
      {/* Navbar */}
      <Navbar />
      {/* Success Modal for message on adding a movie to the saved page */}
      {modalShown && <Modal />}
      {/* Outlet or Main data */}
      <Outlet />
      {/* Bottom Navigation */}
      <BottomNavigation />

      <Analytics />
    </div>
  );
};

export default Layout;
