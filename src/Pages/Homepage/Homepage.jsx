import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Banner from '../../Components/Banner/Banner';
import {
  MdTravelExplore,
  MdOutlineChecklistRtl,
  MdOutlineReceiptLong,
  MdOutlineRealEstateAgent,
} from 'react-icons/md';
import { IoMdHeartEmpty } from 'react-icons/io';
import MyImage from '../../../src/assets/Rectangle 6.png';

import './Homepage.css';
import KeepInTouch from '../../Components/KeepInTouch/KeepInTouch';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

function Homepage( ) {
  const [cities, setCities] = useState([]);
  const [clickedCityName, setClickedCityName] = useState('');
  const handleCityClick = (_id) => {
    console.log('Clicked city:', _id);
    setClickedCityName(_id);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}cities`)
      .then((res) => {
        console.log(res.data.response.name); 
        setCities(res.data.response);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCityChange = (selectedCity) => {
    if (selectedCity) {
      console.log('Selected city ID:', selectedCity._id);
      
      axios
        .get(`${import.meta.env.VITE_APP_BASE_URL}cities/${selectedCity._id}`)
        .then((res) => {
          console.log('API Response:', res.data);
        })
        .catch((err) => {
          console.error('API Error:', err);
        });
    }
  };

  return (
    <div>
      <Header />
        <Banner page='home' cities={cities} onCityChange={handleCityChange} />
      <div className='see-all-cities-container'>
      <h2>Student accommodations in our top cities</h2>
        <div className='city-card-container'>
          {cities.map((city) => (
            <div
              className='city-card'
              style={{ backgroundImage: `url(${city.image_url})` }}
              key={`${city.id}_${city.name}`}
            >
              <Link
                to={`/properties/city/${city._id}`}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <h2 onClick={() => handleCityClick(city._id)}>{city.name}</h2>
              </Link>
              <p>{city.property_count} properties</p>
            </div>
          ))}
        </div>
        <Link to='/seeallcities'>
        <button className='see-all-cities-button'>See all cities</button>
      </Link>
      </div>
      <div className='compare-container'>
        <div className='compare-student-homes'>
          <h1>Compare all-inclusive student homes.</h1>
          <div className='compare-search'>
            <MdTravelExplore size={94} color={'#3A5295'} />
            <h2>Search</h2>
            <p>Find your dream home in the perfect area near your university.</p>
          </div>
          <div className='compare-compare'>
            <MdOutlineChecklistRtl size={94} color={'#3A5295'} />
            <h2>Compare</h2>
            <p>Compare student accommodation to find the right home for you.</p>
          </div>
          <div className='compare-bills'>
            <MdOutlineReceiptLong size={94} color={'#3A5295'} />
            <h2>Bills included</h2>
            <p>Bills are included in all rent prices. No hidden fees.</p>
          </div>
        </div>
        <div className='select-compare-container'>
          <div className='select-compare'>
            <div className='best-selection'>
              <div className='compare-icons'>
                <MdOutlineRealEstateAgent size={64} />
              </div>
              <h2>Best selection</h2>
              <p>
                Best selection of student accommodations. Never been easier to find a home that's right for you.
              </p>
            </div>
            <div className='your-favorite'>
              <div className='compare-icons'>
                <IoMdHeartEmpty size={64} />
              </div>
              <h2>Your favorite</h2>
              <p>Shortlist your favorite properties and send enquiries in one click.</p>
            </div>
            <div className='search-and-compare'>
              <button>Search & Compare</button>
            </div>
          </div>
          <div className='compare-image-container'>
            <img src={MyImage} alt='My Image' />
          </div>
        </div>
      </div>
      <KeepInTouch />
      <Footer />
    </div>
  );
}

export default Homepage;
