import React, { useEffect } from 'react'
import Img from '../assets/img1.jpg'


function Home() {
 
  return (
    <>
      <div className='mt-16'>
        <img className='h-96 mx-auto' src={Img} alt="" />
      </div>
    </>   
  )
}

export default Home;
