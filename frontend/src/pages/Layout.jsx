import React from 'react'
import NavBar from '../components/NavBar'
import HomePage from './HomePage'
import ImageSlider from '../components/ImageSlider'
import CardSlider from '../components/CardSlider'

const Layout = () => {
  return (
    <>
        <NavBar/>
        <ImageSlider/>
        <CardSlider/>
    </>
  )
}

export default Layout