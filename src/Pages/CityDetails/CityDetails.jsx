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

function CityDetails({ selectedBedroom, selectedBathroom, selectedPrice, selectedHomeType, selectedCity }) {
  const { cityId } = useParams();
  const [specificCity, setSpecificCity] = useState([]);
  const [studentLife, setStudentLife] = useState('');
  const [selectedCityId, setSelectedCityId] = useState(cityId);
  const { response } = specificCity;


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
  
  const [filters, setFilters] = useState({
    query: {
      city_id: selectedCityId,
      bedroom_count: selectedBedroom,
      bathroom_count: selectedBathroom,
      rent: selectedPrice,
      property_type: selectedHomeType,
    },
  });
  

  const updateFiltersFromBanner = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}properties/city/${selectedCityId}}`)
      .then((res) => {
        setSpecificCity(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}cities/${selectedCityId}`)
      .then((res) => {
        setStudentLife(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  }, [cityId]);

  useEffect(() => {
    fetchFilters();
  }, [filters]);

  const fetchFilters = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}properties/filter`, filters);
      console.log(res.data);

      setSpecificCity(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="city-details-page-container">
      <Header />
      <Banner 
        page="properties/city/"
        filters={filters}
        updateFilters={updateFiltersFromBanner}
        selectedBedroom={selectedBedroom}
        selectedBathroom={selectedBathroom}
        selectedPrice={selectedPrice}
        selectedHomeType={selectedHomeType}
        selectedCityId={selectedCityId}
        onCityChange={(newCityId) => setSelectedCityId(newCityId)}
      />
      <div className="property-container">
      <div className="number-of-homes">
        <h1>{specificCity.total} homes in {specificCity.city_name}</h1>
      </div>
        <div className="property-card-container">
          {response &&
            response.map((property) => (
              <div key={property._id} className="property-card">
                <img src={property.images[0]} alt={`Property ${property._id}`} />
                <div className="rent-shower">
                  <div className="property-rent">
                    <h3>£{property.rent / 4}</h3>
                    <p>pppw including bills</p>
                  </div>
                  <div className="bed-bath">
                    <MdOutlineBed style={{ marginRight: '5px' }} />
                    <p style={{ marginRight: '30px' }}>{property.bedroom_count}</p>
                    <MdOutlineBathtub style={{ marginRight: '5px' }} />
                    <p>{property.bathroom_count}</p>
                  </div>
                </div>
                <div className="type-furnished">
                  <h3>{property.property_type}</h3>
                  <h3>{property.furnished}</h3>
                </div>
                <div className="address">
                  <MdLocationOn style={{ color: 'rgba(58, 82, 149, 1)' }} />
                  <p>
                    {property.address.street}, {property.address.city}, {property.address.postcode}
                  </p>
                </div>
                <div className="view-home-button">
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
      <div className="student-in-city-container">
        <div className="student-in-city">
          <div className="student-in-city-text">
            <h2>Being a student in {specificCity.city_name}</h2>
            <p>{studentLife.student_life}</p>
            <p>{studentLife.universities}</p>
          </div>
          <div className="student-in-city-image">
            <img src={studentLife.image_url} alt="Student Life" />
          </div>
        </div>
      </div>
      <KeepInTouch />
      <Footer />
    </div>
  );
}

CityDetails.propTypes = {
  selectedBedroom: PropTypes.string,
  selectedBathroom: PropTypes.string,
  selectedPrice: PropTypes.string,
  selectedHomeType: PropTypes.string,
};

export default CityDetails;
