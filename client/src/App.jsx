import React, { useState, useEffect } from 'react';
import HomeMap from './components/HomeMap';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Getstarted from './components/Getstarted';
import CatchPark from './components/CatchPark';
function App() {

 /* const [dataArray,setdataArray]=useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [token, setToken] = useState('');
  //const [reportLocation, setReportLocation] = useState(null);

  //style map
  const style = {
    width: '70%',
    height: '70%',
  };

  const israelCenter = {
    lat: 31.0461,
    lng: 34.8516,
  };

  const googleMapsApiKey = 'AIzaSyBtPxp4LgVI_e6_r8LQMth6hCRHDtuFWfo';

 
 
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
          console.error(error);
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


  function getLocation(){

    console.log(dataArray);
  }
  
async function login(tokenMethod , email , password){
  try {

    const response= await fetch('http://localhost:5000/auth/logIn',{
    method:'POST',
    body:JSON.stringify({
  email,
 password,
 tokenMethod,
    }),
    headers:{
      "content-type":"application/json"
    }
    
  })
  if (!response.ok) {
    // Handle error responses (non-2xx status codes)
    console.error('Error:', response.statusText);
    return;
}

const data = await response.json();
console.log('Response from server:', data);

const token =response.token ;
localStorage.setItem('token',token)

// Do something with the data (if needed)
} catch (error) {
console.error('Fetch error:', error);
}

}

async function getClosePark(userLocation,dataArray){

  if (!userLocation) {
    console.error('User location is not defined.');
    return;
  }
  
  const userLatLng = new window.google.maps.LatLng(userLocation.lat, userLocation.lng);
  const closestLocation = [];
  const maxRadius = 3000; //


  for (let i = 0; i < dataArray.length; i++) {
    const destination = dataArray[i];

    if (!destination || !destination.locationp || !destination.locationp.coordinates) {
      console.error(`Invalid destination at index ${i}:`, destination);
      continue; // Skip to the next iteration
    }

    const coordinates = destination.locationp.coordinates;
    const destinationLatLng = new window.google.maps.LatLng(coordinates[1], coordinates[0]);
  
       

    try {
      let responseb = await new Promise((resolve) => {
        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [userLatLng],
            destinations: [destinationLatLng],
            travelMode: 'DRIVING',
          },
          function (response, status) {
            resolve({ response, status });
          }
        );
      });
      
      console.log(responseb);
      const { response, status } = responseb;
    

      if (status === 'OK') {
        const distance = response.rows[0].elements[0].distance.value;
        const duration = response.rows[0].elements[0].duration.text;
        // Check if the distance is within the specified radius
        if (distance <= maxRadius) {
          closestLocation.push({
            location: destination,
            distance: distance,
          });
        }
      } else {
        console.log('Error:', status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  if (closestLocation.length > 0) {
    closestLocation.sort(function (a, b) {
      return a.distance - b.distance;
    });

    console.log('Closest locations:', closestLocation);
  } else {
    console.log('No locations within', maxRadius, 'meters.');
  }
}
*/
return (
    <div>
     
    <BrowserRouter>
        <Routes>
        <Route path='/' element={<Getstarted />}/>
          <Route path='Login' element={<Login />}/>
          <Route path='Home' element={<HomeMap/>} />
          <Route path='SignUp' element={<SignUp />}/>
          <Route path='Home/CatchPark' element={<CatchPark/>}/>
          
        </Routes>
        </BrowserRouter>
    </div>
  );
}
        
export default App
  

