import './HomeDetails.css';
import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineBed, MdOutlineBathtub, MdCheck, MdOutlineAddHomeWork } from 'react-icons/md';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import Modal from 'react-modal';
import { useParams, Link } from 'react-router-dom';
import Header from './../../Components/Header/Header';
import KeepInTouch from './../../Components/KeepInTouch/KeepInTouch';
import Footer from './../../Components/Footer/Footer';

import axios from 'axios'
import { ShortlistContext } from '../../Contexts/Shortlist';

function HomeDetailsPage({ clickedCityName }) {
  const [isOpen, setIsOpen] = useState(false);
  const { cityId } = useParams();
  const [property, setProperty] = useState([])
  const [specificCity, setSpecificCity] = useState([]);
  const { propertyId } = useParams()
  const [isShortlist, setIsShortlist] = useState(false);
  const { shortlist, addShortlist, removeShortlist } = useContext(ShortlistContext);

  useEffect(()=>{
    setIsShortlist(shortlist.find(item => item.id === property.id));
  }, [shortlist, property]);

  useEffect(()=>{
    console.log(isShortlist);
  }, [isShortlist]);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: '20%',
      bottom: '1%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '90%',
      borderRadius: '24px',
      padding: '10px'
    },
    overlay: {
      backgroundColor: 'rgba(1, 0, 0, 0.5)',
    },
  };

  useEffect(() => {
    // Call API to get data
    axios.get(`${import.meta.env.VITE_APP_BASE_URL}properties/${propertyId}`)
      .then(res => {
        setProperty(res.data);
        console.log(`this`, res);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='home-details-container'>
      <Header />
      {property && property.images && (
        <div className='property-details' key={property._id}>
          <div className='property-images-container'>
            <Link to={`properties/city/${specificCity.cityId}`} style={{ display: 'block', textAlign: 'left' }}><button>&lt;&nbsp;Back to search</button></Link>
            <div className='property-main-image'>
              <img src={property.images[0]} alt='Main Property' />
            </div>
            <div className='property-side-images'>
              {property.images.slice(1, 4).map((image, index) => (
                <img key={index} src={image} alt={`Property ${index + 2}`} />
              ))}
            </div>
          </div>
          <div className='property-info-container'>
            <div className='property-info'>
              <div className='property-address'>
                <p>{property.address.street}, {property.address.city}, {property.address.postcode}
                  <hr /></p>
              </div>
              <div className='property-price'>
                <div className='info-block bedrooms'>
                  <p>Bedrooms</p>
                  <h3 style={{color: 'rgba(58, 82, 149, 1)', paddingBottom: '20px' }}><MdOutlineBed />{property.bedroom_count}</h3>
                </div>
                <div className='info-block bathrooms'>
                  <p>Bathrooms</p>
                  <h3 style={{color: 'rgba(58, 82, 149, 1)', paddingBottom: '20px' }}><MdOutlineBathtub />{property.bathroom_count}</h3>
                </div>
                <div className='info-block property-type'>
                  <p>Property Type</p>
                  <h3 style={{color: 'rgba(58, 82, 149, 1)', paddingBottom: '20px' }}>{property.property_type}</h3>
                </div>
                <div className='info-block rent'>
                  <p>Rent (pppw)</p>
                  <h3 style={{color: 'rgba(58, 82, 149, 1)', paddingBottom: '20px' }}>£{property.rent / property.bedroom_count / 4}</h3>
                </div>
                <div className='info-block furnishing-type'>
                  <p>Furnished Type</p>
                  <h3 style={{color: 'rgba(58, 82, 149, 1)', paddingBottom: '20px' }}>{property.furnished}</h3>
                </div>
                <div className='info-block available-from'>
                  <p>Available From</p>
                  <h3 style={{color: 'rgba(58, 82, 149, 1)', paddingBottom: '20px' }}>{property.availability}</h3>
                </div>
              </div>
              <div className='property-buttons'>
                {
                  isShortlist ?
                  <button className='property-shortlist' onClick={() => removeShortlist(property)}><IoMdHeart />Shortlist</button>
                  :
                  <button className='property-shortlist' onClick={() => addShortlist(property)}><IoMdHeartEmpty />Shortlist</button>

                }
                <button className='property-book' onClick={() => setIsOpen(true)}>Book Viewing</button>
                </div>
                <Modal
                  isOpen={isOpen}
                  onRequestClose={() => setIsOpen(false)}
                  style={customStyles}
                  contentLabel="Contact Us Modal"
                >
                  <div className='booking-modal-container'>
                    <div className='booking-modal-title-container'>
                      <div className='booking-modal-title'>
                        <h1 style={{ fontWeight: '500' }}>Book a Viewing</h1>
                        <h3 style={{ width: '485px', lineHeight: '32px' }}>{property.address.street}, {property.address.city}, {property.address.postcode}</h3>
                      </div>
                      <div>
                        < MdOutlineAddHomeWork className="booking-icon"style={{ fontSize: '70px', color: 'rgba(58, 82, 149, 1)' }}/>
                      </div>
                    </div>
                    <div className='booking-modal-input-left'>
                      <div className='booking-modal-input'>
                        <h2 style={{ fontWeight: '500' }}>Name</h2>
                        <input type='text' placeholder='Enter your name' />
                      </div>
                      <div className='booking-modal-input'>
                        <h2 style={{ fontWeight: '500' }}>Email</h2>
                        <input type='text' placeholder='Enter your email address' />
                      </div>
                      <div className='booking-modal-input'>
                        <h2 style={{ fontWeight: '500' }}>Phone Number</h2>
                        <input type='text' placeholder='Enter your phone number' />
                      </div>
                    </div>
                    <div className='booking-modal-input-right'>
                      <div className='booking-modal-input'
                        style={{ height: '232px' }}>
                        <h2 style={{ fontWeight: '500' }}>Message</h2>
                        <input type='text' placeholder='Enter your message'
                          style={{ height: '184px' }} />
                      </div>
                      <button className='modal-close-btn' onClick={() => setIsOpen(false)}
                        style={{ height: '56px', backgroundColor: 'rgba(58, 82, 149, 1)',
                          borderRadius: '12px', color: '#FFFFFF', fontSize: '20px', border: 'none', margin: '50px 20px' }}>Submit</button>
                    </div>
                  </div>
                </Modal>
            </div>
            </div>
            <div className='home-description-bedrooms-container'>
              <div className='description'>
                <h1>Description</h1>
                <p>{property.property_description}</p>
                <div className='key-features-container'>
                  <h1>Key Features</h1>
                  {property.key_features.map((feature, index) => (
                    <p key={index}><MdCheck />{feature}</p>
                  ))}
                </div>
              </div>
              <div className='bedroom-prices-container'>
                <h1>Bedroom Prices</h1>
                <div className='bedroom-prices'>
                  {Object.entries(property.bedroom_prices).map(([bedroomName, price], index) => (
                    <div className='bedroom-price' key={bedroomName}>
                      <p>Bedroom {index + 1}:</p>
                      <p> £{price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='blank-div'></div>
          </div>
      )}
      <KeepInTouch />
      <Footer />
    </div>
  )
}
export default HomeDetailsPage;
