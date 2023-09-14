import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Banner.css'

function Banner( {page, filters, updateFilters, cities, query} ) {

    const [selectedBedroom, setSelectedBedroom] = useState(0);
    const [selectedBathroom, setSelectedBathroom] = useState(0);
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [selectedHomeType, setSelectedHomeType] = useState(0);

    useEffect(() => {
        console.log('selectedBedroom:', selectedBedroom)
        console.log('yes', filters);
      }, [selectedBedroom]);
    
      useEffect(() => {
        console.log('selectedBathroom:', selectedBathroom);
      }, [selectedBathroom]);
    
      useEffect(() => {
        console.log('selectedPrice:', selectedPrice);
      }, [selectedPrice]);
    
      useEffect(() => {
        console.log('selectedHomeType:', selectedHomeType);
      }, [selectedHomeType]);

      //Banner Search Bar

      const handleBedroomChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedBedroom(selectedValue);
    
        updateFilters({
          ...filters,
          query: {
            ...filters.query,
            bedroom_count: selectedValue,
          },
        });
      };
    
      const handleBathroomChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedBathroom(selectedValue);
    
        updateFilters({
          ...filters,
          query: {
            ...filters.query,
            bathroom_count: selectedValue,
          },
        });
      };
    
      const handlePriceChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedPrice(selectedValue);
    
        updateFilters({
          ...filters,
          query: {
            ...filters.query,
            rent: selectedValue,
          },
        });
      };
    
      const handleHomeTypeChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedHomeType(selectedValue);
    
        updateFilters({
          ...filters,
          query: {
            ...filters.query,
            property_type: selectedValue,
          },
        });
      };
    
    //Banner Text
    let search = <input type='text' placeholder='Search by city' />;
    let click = <button>Find Homes</button>;
    let title = 'Find Student homes with bills included';
    let description = 'A simple and faster way to search for student accommodation';
    let bannerClassName = 'banner-search';
  
    if (page === 'home') {
      // Customize text for the home page
      title = 'Find Student homes with bills included';
      description = 'A simple and faster way to search for student accommodation';

       search = (
       <select defaultValue="">
      <option value="" disabled>
        Search by city
      </option>
      {cities.map((city) => (
        <option key={city.id} value={city.name}>
          {city.name}
        </option>
      ))}
    </select>
    )
      click = <button>Find Homes</button>;
      bannerClassName = 'banner-search';
    
      } else if (page === 'properties/city/') {
        // Customize text for the search page
        title = 'Search Accomodation'
        description = 'Whatever you`re after, we can help you find the right student accommodation for you.'
        search = '';
        click = '';
        bannerClassName = 'banner-search banner-city';

      } else if (page === 'seeallcities') {
        // Customize text for the search page
        title = 'Student Accomodation'
        description = 'UniLife have student accommodation available across the UK. Whatever you`re after, we can help you find the right student accommodation for you.'
        
        search = '';
        click = '';
        bannerClassName = 'banner-cities';
      }
    
      const bedroomFilter =
        page === 'properties/city/' && (
          <div>
            <h3>Min Bedroom</h3>
            <select value={selectedBedroom} onChange={handleBedroomChange}>
              <option value="" disabled selected hidden>
                Any bedroom
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6+">6+</option>
            </select>
          </div>
        );
    
        console.log('Cities prop in BannerSearch:', cities);
    
    
      const bathroomFilter =
        page === 'properties/city/' && (
          <div>
            <h3>Min Bathroom</h3>
            <select value={selectedBathroom} onChange={handleBathroomChange}>
              <option value="" disabled selected hidden>
                Any bathroom
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6+">6+</option>
            </select>
          </div>
        );
    
      const priceFilter =
        page === 'properties/city/' && (
          <div>
            <h3>Min Price</h3>
            <select value={selectedPrice} onChange={handlePriceChange}>
              <option value="" disabled selected hidden>
                Any price
              </option>
              <option value="1000">£1000</option>
              <option value="1500">£1500</option>
              <option value="2000">£2000</option>
              <option value="2500">£2500</option>
            </select>
          </div>
        );
    
      const homeFilter =
        page === 'properties/city/' && (
          <div>
            <h3>Home Type</h3>
            <select value={selectedHomeType} onChange={handleHomeTypeChange}>
              <option value="" disabled selected hidden>
                Any type
              </option>
              <option value="Detached">Detached</option>
              <option value="Semi-Detached">Semi-Detached</option>
              <option value="Apartment">Apartment</option>

            </select>
          </div>
        );
    return (
      <div className='banner-container'>
        <div className='banner-text'>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        <div className={bannerClassName}>
      {page === 'properties/city/' && (
        <>
          {bedroomFilter}
          {bathroomFilter}
          {priceFilter}
          {homeFilter}
        </>
      )}

      {search}
      {click}
    </div>
      </div>
    );
  }
  Banner.propTypes = {
    page: PropTypes.string.isRequired,
      filters: PropTypes.object.isRequired,
  updateFilters: PropTypes.func.isRequired,
  };
export default Banner;