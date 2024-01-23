
import React, { useState, useEffect } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import CatchPark from './CatchPark';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

 function HomeMap(props) {

    const [dataArray,setdataArray]=useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [reported, setReported] = useState(false);

    const navigate = useNavigate();

     //style map
  const style = {
    width: '70%',
    height: '70%',
  };

  const israelCenter = {
    lat: 31.0461,
    lng: 34.8516,
  }; 
 
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          setUserLocation({
            lat: latitude,
            lng: longitude,
          });

          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBtPxp4LgVI_e6_r8LQMth6hCRHDtuFWfo`
            );
            console.log(response)
            const data = await response.json();

            // Check if 'results' property exists before accessing it
            if (data.results && data.results.length > 0) {
              const address = data.results[0].formatted_address;
              console.log(address);
              setUserAddress(address);
            } else {
              console.error('Invalid or empty response from Geocoding API:', data);
            }
          } catch (error) {
            console.error('Error fetching address:', error);
          }
        },
        (error) => {
          console.error('mn el fetch tb3 5areta',error);
        }
      );

      return () => {
        // Cleanup: Stop watching for location changes when the component unmounts.
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  
  }, []);


  async function reportLocation(userLocation, userAddress) {

    try {
      const response = await fetch('http://localhost:5000/location/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  userAddress , userLocation }),
      });

      if (response.ok) {
        console.log('Location data sent to server successfully.');
      } else {
        console.error('Failed to send location data to server.');
      }
    } catch (error) {
      console.error('Error sending location data:', error);
    }
    console.log(`Latitude: ${userLocation.lat}, Longitude: ${userLocation.lng}, Address: ${userAddress}`);
    setReported(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/location/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const locationsData = await response.json();
          setdataArray(locationsData);
          console.log(locationsData);
          console.log(dataArray);
          console.log('Location data fetched successfully:', locationsData);
        } else {
          console.error('Failed to fetch location data.');
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
  
    fetchData();
  }, [dataArray.length]);



function searchLocation(userLocation,dataArray){
  
  console.log(userLocation,dataArray);
  navigate('CatchPark',{ state: { userLocation, dataArray} })
  
}


  function getLocation(){

    console.log(dataArray);
  }

      
    getLocation();
            

  return (

    
    <div  >
      
      <Map
        google={props.google}
        zoom={12}
        initialCenter={ israelCenter}
        center={userLocation}
      >
       {dataArray.map((lo, index) => (
        <Marker
          key={index}
          address={lo.address}
          position={{
            lat: lo.locationp.coordinates[1], // Adjust according to your schema
            lng: lo.locationp.coordinates[0], // Adjust according to your schema
          }}
          // You can customize the marker icon here, for example:
          icon={{
            url: 'car.png',
            anchor: new window.google.maps.Point(16, 32),
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      ))}
       {userLocation && <Marker key={'currentLocation'} name={'Current location'} position={userLocation} />} 
      </Map>

      <div className='absolute top-0 left-0  w-full '>

     <Header/>

      </div>

    <div className='absolute bottom-0 left-0 space-y-2 w-full  '>
    {userLocation && (
  <div className="bg-gray-100 p-[5%] rounded-3xl space-y-9 text-center">
    {userAddress && (
      <p className="text-[#007FFF] font-bold ">
      <span className='font-extrabold'> live Location:</span> {userAddress}  
      </p>
    )}

<div className='space-x-5'>
{!reported ? (
              <button className='font-extrabold bg-white rounded-full p-2 text-[#007FFF] border border-[#007FFF] animate-bounce' 
                onClick={() => reportLocation(userLocation, userAddress)}>
                Report Location
              </button>
            ) : (
              <div >
                <p className='text-green-500'>Thanks for helping other!</p>
                <img
        src='https://images.emojiterra.com/google/noto-emoji/unicode-15/animated/1f44f.gif' 
        alt="Moving GIF"
        className='w-20 h-30 mx-auto'
      
      /><br></br>
              </div>
            )}
    
    <button className='font-extrabold bg-white rounded-full p-2  text-[#007FFF] border border-[#007FFF]  animate-bounce ' 
    onClick={()=>searchLocation(userLocation,dataArray)}> catch empty park</button>
  
    </div>
  </div>
)}
    </div>
    
 
      </div>
  );
}
        
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBtPxp4LgVI_e6_r8LQMth6hCRHDtuFWfo',
})(HomeMap);

