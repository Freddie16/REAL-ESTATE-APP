import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBuilding, faUser, faMoneyBill, faHandHoldingUsd, faFileContract, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import GoogleMapReact from 'google-map-react';
import '../css/Dashboard.css';

const AdminDashboard = () => {
  const [estateCount, setEstateCount] = useState(0);
  const [tenantCount, setTenantCount] = useState(0);
  const [rentPayments, setRentPayments] = useState([]);
  const [unpaidRentPayments, setUnpaidRentPayments] = useState([]);
  const [houseCount, setHouseCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const sidebarRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/dashboard');

      setEstateCount(response.data.estateCount);
      setTenantCount(response.data.tenantCount);
      setRentPayments(response.data.rentPayments);
      setHouseCount(response.data.houseCount);

      const unpaidRentPayments = response.data.rentPayments.filter(
        (payment) => !payment.isPaid
      );
      setUnpaidRentPayments(unpaidRentPayments);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (mapApiLoaded && searchValue.trim() !== '') {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        {
          input: searchValue,
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setSearchResults(predictions);
          }
        }
      );
    } else {
      setSearchResults([]);
    }
  };

  const handlePlaceSelect = (placeId) => {
    const service = new window.google.maps.places.PlacesService(mapRef.current.map);
    service.getDetails(
      {
        placeId,
        fields: ['name', 'geometry'],
      },
      (place, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          place &&
          place.geometry
        ) {
          const { location } = place.geometry;
          // Use the location coordinates to update the map center
          if (mapRef.current) {
            const map = mapRef.current.map;
            map.setCenter(location);
            map.setZoom(14);
          }
        }
      }
    );
  };

  const loadGoogleScript = () => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCSoxSVx-xexWCZ2Gw1DJMy0ClqGGqeKXc&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => setMapApiLoaded(true);
    } else {
      setMapApiLoaded(true);
    }
  };

  useEffect(() => {
    loadGoogleScript();
  }, []);

  const handleApiLoaded = (map, maps) => {
    // Handle Google Maps API loaded event
    // You can perform any necessary actions here
    console.log('Google Maps API loaded');
  };

  // Extracting the data for the chart
  const rentPaymentsByMonth = rentPayments.reduce((acc, payment) => {
    const month = payment.month;
    const amount = payment.amount;

    if (acc[month]) {
      acc[month] += amount;
    } else {
      acc[month] = amount;
    }

    return acc;
  }, {});

  // Generating labels and data for the chart
  const chartData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Rent Payments',
        data: Object.values(rentPaymentsByMonth),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
        <div className="menu-icon" onClick={handleToggleSidebar}>
          <div className={`menu-line ${isSidebarOpen ? 'hidden' : ''}`}></div>
          <div className={`menu-line ${isSidebarOpen ? 'hidden' : ''}`}></div>
          <div className={`menu-line ${isSidebarOpen ? 'hidden' : ''}`}></div>
        </div>
        <ul className="vertical-menu">
          <li>
            <NavLink to="/admin/estates" activeClassName="active">
              <FontAwesomeIcon icon={faBuilding} />
              <span>Estates</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/houses" activeClassName="active">
              <FontAwesomeIcon icon={faHome} />
              <span>Houses</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/tenants" activeClassName="active">
              <FontAwesomeIcon icon={faUser} />
              <span>Tenants</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/rent-payments" activeClassName="active">
              <FontAwesomeIcon icon={faMoneyBill} />
              <span>Rent Payments</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/pay-rent" activeClassName="active">
              <FontAwesomeIcon icon={faHandHoldingUsd} />
              <span>Pay Rent</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/lease" activeClassName="active">
              <FontAwesomeIcon icon={faFileContract} />
              <span>Lease</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="content">
        <h2>Dashboard</h2>
        <div className="cards-container">
          <div className="card">
            <h3>Estate Count:</h3>
            <p>{estateCount}</p>
          </div>
          <div className="card">
            <h3>House Count:</h3>
            <p>{houseCount}</p>
          </div>
          <div className="card">
            <h3>Tenant Count:</h3>
            <p>{tenantCount}</p>
          </div>
          <div className='card'>
            <h3>Payments:</h3>
            <p>{unpaidRentPayments.length}</p>
          </div>
        </div>
        <div className="chart-container">
          <h2>Rent Payments by Month</h2>
          <Bar
            data={chartData}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    precision: 0,
                  },
                },
              },
            }}
          />
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by address"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {mapApiLoaded && (
          <div className="map-container">
            <GoogleMapReact
              defaultCenter={{ lat: 0, lng: 0 }}
              defaultZoom={1}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) =>
                handleApiLoaded(map, maps)
              }
              ref={mapRef}
            ></GoogleMapReact>
          </div>
        )}
        <div className="search-results">
          {searchResults.map((result) => (
            <div
              key={result.place_id}
              className="search-result"
              onClick={() => handlePlaceSelect(result.place_id)}
            >
              {result.description}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;




