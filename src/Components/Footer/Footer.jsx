import './Footer.css'
import React from 'react'
import {BiCopyright} from 'react-icons/bi'

function Footer() {
  return (
    <div className='footer-container'>
      <div className='left-side'>
        <button>About Us</button>
        <button>Terms & Conditions</button>
        <button>Privacy & Cookies Policies</button>
      </div>
      <div className='right-side'>
        <p>2022</p>
        <p><BiCopyright/>Unilife</p>

      </div>
    </div>
  )
}

export default Footer