import React, {useContext} from 'react'
import { ShortlistContext } from '../../Contexts/Shortlist'
import { MdOutlineBed, MdOutlineBathtub, MdLocationOn, MdHomeFilled } from 'react-icons/md';
import {Link} from 'react-router-dom'
import Header from '../../Components/Header/Header';
import KeepInTouch from '../../Components/KeepInTouch/KeepInTouch';
import Footer from '../../Components/Footer/Footer';
import './shortlist.css'
function Shortlist() {

    const {shortlist} = useContext(ShortlistContext)
    console.log(shortlist)

  return (
    <div>
        <Header />
<div className='shortlist-container'>
<h1>Your Shortlisted Properties</h1>
<div className="property-card-container">
          {/* Display information for each property */}
          {shortlist &&
            shortlist.map((property) => (
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



    <KeepInTouch />
    <Footer />

    </div>
  )
    }
export default Shortlist