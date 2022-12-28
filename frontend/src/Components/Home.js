import React from 'react'
import '../App.css'
import Navbar from './Navbar'


const Home = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className='home__container'>
        <div className='title__section'>
            <h2>This is Title</h2>
        </div>
        <div className='author__section'>
            <h2>Author : <span>Ravi Sharma</span></h2>
        </div>
        <div className='description__section'>
            <p></p>
        </div>
        <div className='image__section'>
            <p>Image Here</p>
        </div>
    </div>
    </>
  )
}

export default Home