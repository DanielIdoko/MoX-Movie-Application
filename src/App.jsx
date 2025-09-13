import { Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react'
import Spinner from './components/Spinner'
// Improved lazy loading
const Home = lazy(() => import('./pages/Home'))
const Layout = lazy(() => import('./pages/Layout'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const MovieDescription = lazy(() => import('./pages/MovieDescription/MovieDescription'))
const SavedPage = lazy(() => import('./pages/Saved/SavedPage'))
const ErrorPage = lazy(() => import('./pages/ErrorPage'))

const App = () => {
  const router = (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/search/:term' element={<SearchPage />} />
          <Route path='/movie/:movie_id' element={<MovieDescription />} />
          <Route path='/savedpage' element={<SavedPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
  return (
    <>
      <Suspense fallback={<Spinner />}>
        {router}
      </Suspense>
    </>
  )
}

export default App