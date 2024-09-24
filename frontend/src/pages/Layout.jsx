import React from 'react'
import NavBar from '../components/NavBar'
import HomePage from './HomePage'
import ImageSlider from '../components/ImageSlider'
import CardSlider from '../components/CardSlider'
import MovieDetailsPage from './MovieDetailsPage'
import DateScroller from '../components/DateScroller'
import SeatSelection from '../components/SeatSelection'

const Layout = () => {
  return (
    <>
        <NavBar/>
        <MovieDetailsPage/>
        <DateScroller/>
        <SeatSelection/>
    </>
  )
}

export default Layout