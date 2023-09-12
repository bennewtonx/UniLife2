import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Banner from '../../Components/Banner/Banner';
import Header from '../../Components/Header/Header';
import KeepInTouch from '../../Components/KeepInTouch/KeepInTouch';
import Footer from '../../Components/Footer/Footer';
import { MdOutlineBed, MdOutlineBathtub, MdLocationOn, MdHomeFilled } from 'react-icons/md';


import './CityDetails.css';

function CityDetails( {clickedCityName, selectedBedroom, selectedBathroom, selectedPrice, selectedHomeType }) {

    const { cityId } = useParams();
    const [specificCity, setSpecificCity] = useState([]);
    const [studentLife, setStudentLife] = useState('');
    const { response } = specificCity;

    const [filters, setFilters] = useState({
      query : {
      city_id : cityId,
      bedroom_count: selectedBedroom,
      bathroom_count: selectedBathroom,
      rent: selectedPrice,
      property_type: selectedHomeType,
      },
    });

    useEffect(() => {
        setFilters((prevFilters) => ({
          ...prevFilters,
          query: {
            ...prevFilters.query,
            bedroom_count: selectedBedroom,
            bathroom_count: selectedBathroom,
            rent: selectedPrice,
            property_type: selectedHomeType,
          },
        }));
      }, [selectedBedroom, selectedBathroom, selectedPrice, selectedHomeType]);

console.log('ermm', filters)
  
    useEffect(() => {
      // Call API to get data
      axios.get(`${import.meta.env.VITE_APP_BASE_URL}properties/city/${cityId}`)
        .then((res) => {
          setSpecificCity(res.data);
        })
        .catch((err) => console.log(err));
  
      axios.get(`${import.meta.env.VITE_APP_BASE_URL}cities/${cityId}`)
        .then((res) => {
          setStudentLife(res.data.data[0]);
        })
        .catch((err) => console.log(err));
    }, [cityId]);
  
    useEffect(() => {
      // This will run whenever any of the filter values change
      fetchFilters();
    }, [filters]); // Include filters in the dependency array
  
    const updateFilters = (newFilters) => {
      setFilters(newFilters);
    };
  
    const fetchFilters = async () => {
      try {
        // Use the 'filters' state to make the API request
        const res = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}properties/filter`, filters);
        console.log(res.data);


        // Update specificCity with filtered data
        setSpecificCity(res.data);
        console.log('is this working????')
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className='city-details-page-container'>
      <Header />
      <Banner page='properties/city/'  filters={filters} updateFilters={updateFilters}
              selectedBedroom={selectedBedroom}
              selectedBathroom={selectedBathroom}
              selectedPrice={selectedPrice}
              selectedHomeType={selectedHomeType} />

      <div className='number-of-homes'>
        <h1 style={{ marginLeft: '80px', marginBottom: '-10px' }}>{specificCity.total} homes in {specificCity.city_name}</h1>
      </div>
      <div className='property-container'>
      <div className='property-card-container'>
      {/* Display information for each property */}
      {response &&
        response.map((property) => (
          <div key={property._id} className='property-card'>
            <img src={property.images[0]} alt={`Property ${property._id}`} />
            <div className='rent-shower'>
              <div className='property-rent'>
                <h3>£{property.rent / 4}</h3>
                <p>pppw including bills</p>
              </div>
              <div className='bed-bath'>
                <MdOutlineBed style={{ marginRight: '5px' }} />
                <p style={{ marginRight: '30px' }}>{property.bedroom_count}</p>
                <MdOutlineBathtub style={{ marginRight: '5px' }} />
                <p>{property.bathroom_count}</p>
              </div>
            </div>
            <div className='type-furnished'>
              <h3>Detached</h3>
              <h3>{property.furnished}</h3>
            </div>
            <div className='address'>
              <MdLocationOn style={{ color: 'rgba(58, 82, 149, 1)' }} />
              <p>
                {property.address.street}, {property.address.city}, {property.address.postcode}
              </p>
            </div>
            <div className='view-home-button'>
              <Link to={`/properties/${property._id}`} style={{ textDecoration: 'none' }}>
                <p onClick={() => handleProperty(property._id)}>
                  <MdHomeFilled />
                  View Home
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
      </div>
      <div className='student-in-city-container'>
        <div className='student-in-city'>
          <div className='student-in-city-text'>
            <h2>Being a student in {specificCity.city_name}</h2>
            <p>{studentLife.student_life}</p>
            <p>{studentLife.universities}</p>
          </div>
          <div className='student-in-city-image'>
            <img src={studentLife.image_url} alt="Student Life" />
          </div>
        </div>
      </div>
      <KeepInTouch />
      <Footer />
    </div>
  )
}

CityDetails.propTypes = {
    clickedCityName: PropTypes.string.isRequired,
    selectedBedroom: PropTypes.string,
    selectedBathroom: PropTypes.string,
    selectedPrice: PropTypes.string,
    selectedHomeType: PropTypes.string,
  };

export default CityDetails