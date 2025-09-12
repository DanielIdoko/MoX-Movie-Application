import React, { Suspense, useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import BottomNavigation from '../components/Navigation/BottomNavigation'
import Main from '../store/main'
import { lazy } from 'react'
import ScrollToTop from '../utils/ScrollToTop'
const Modal = lazy(() => import("../components/Modal/Modal"))


const Layout = () => {
  const { modalShown, handleToggleModal, getSavedMovies } = Main();

  useEffect(() => {
    let timer;
    if (modalShown) {
      // Auto close modal after 4 seconds
      timer = setTimeout(() => {
        handleToggleModal();
      }, 4000)
    }

    return () => clearTimeout(timer)
  }, [modalShown, handleToggleModal])

  useEffect(() => {
    getSavedMovies();
  }, [])
  
  return (
    <div className='w-full h-full overflow-hidden flex flex-col'>
      <ScrollToTop />
      {/* Navbar */}
      <Navbar />
      {/* Success Modal for message on adding a movie to the saved page */}
      <Suspense>
        {modalShown && <Modal />}
      </Suspense>
      {/* Outlet or Main data */}
      <Outlet />
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}

export default Layout