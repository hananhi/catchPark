
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Header from './Header';
import { useNavigate } from 'react-router-dom';

export default function CatchPark() {

  const navigate = useNavigate();

    const { state } = useLocation ();

    const [updatedLocation,setupdatedLocation]=useState([]);
    const[deleted,setDeleted]=useState(false);

    useEffect(() => {
        if (state.userLocation && state.dataArray) {
          const fetchData = async () => {
            await getClosePark(state.userLocation, state.dataArray);
            // Additional logic after getting close parks
          };
      
          fetchData();
        }
      }, [state.userLocation, state.dataArray]);

   
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
              duration:duration
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
        closestLocation.sort((a, b) => a.distance - b.distance);
  
        // Update the state
        setupdatedLocation(closestLocation);
      } else {
        console.log('No locations within', maxRadius, 'meters.');
      }
    };
  
   
    useEffect(() => {
      // This code block will run after each render
      console.log('Closest locations:', updatedLocation);
    }, [updatedLocation]);

  
    const handleWazeLinkClick = (e, lo) => {
        e.preventDefault();
      
        // Fallback to Waze website

            window.open(`https://www.waze.com/ul?ll=${encodeURIComponent(lo.location?.locationp?.coordinates[1])},${encodeURIComponent(lo.location?.locationp?.coordinates[0])}&navigate=yes&zoom=17&from=${encodeURIComponent(state.userLocation.lat)},${encodeURIComponent(state.userLocation.lng)}`, '_blank');
          
      };
      
      const handleDeleteLocaton = async(location) =>{

        try {
            const locationId = location.location._id; 
        console.log(locationId);
            const response = await fetch(`http://localhost:5000/location/${locationId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              }
            });
        
            if (response.ok) {
              console.log('Deleted successfully:', location.location.address);
            } else {
              console.error('Failed to delete location data.');
            }

            setDeleted(true);
          } catch (error) {
            console.error('Error deleting location:', error);
          }
        };

        function goBack(){

          navigate('/Home')
        }
  return (
    <div>
        <Header/>
        <div className='text-[#007FFF] font-bold text-3xl text-center mt-4'>  Available empty park around you</div>
    

<div className='flex flex-col space-y-8 mt-12 '>
        {updatedLocation.map((lo, index) => (
  <div key={index}className='flex flex-row justify-evenly bg-gray-100 p-4 rounded-md' >
    <div > <img src='https://static.wixstatic.com/media/8d272c_5422731719f24e8290ee3b352f0133c4~mv2.png/v1/fill/w_410,h_551,al_c,usm_0.66_1.00_0.01/CarParking_Icon.png' 
    alt="Moving GIF"
    className='w-15 h-10 mx-auto rounded-full'/></div>
    <div className='text-[#007FFF] font-bold mt-4'>{lo.location.address}</div>
    <div> <img

    src='https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/256/Clock.png' 
    alt="Moving GIF"
    className='w-15 h-10 mx-auto rounded-full'/>
    
 {lo.duration}</div>
  
    <a
        href={`https://www.waze.com/ul?ll=${encodeURIComponent(lo.location?.locationp?.coordinates[1])},${encodeURIComponent(lo.location?.locationp?.coordinates[0])}&navigate=yes&zoom=17&from=${encodeURIComponent(state.userLocation.lat)},${encodeURIComponent(state.userLocation.lng)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => handleWazeLinkClick(e, lo)}
      >
        <img 
        src='https://www.underconsideration.com/brandnew/archives/waze_2020_logo_icon.png' 
        alt="Moving GIF"
        className='w-15 h-10 mx-auto rounded-full mt-3'/>
      </a>

{!deleted?
<button onClick={(e)=>handleDeleteLocaton(lo)}>
    <img
     src='https://cdn3.iconfinder.com/data/icons/simple-web-navigation/165/tick-1024.png' 
     alt="Moving GIF"
     className='w-15 h-10 mx-auto '/>

</button>
:
<button>
    <img
     src='https://townsquare.media/site/177/files/2016/02/wrong.png?w=1200&h=0&zc=1&s=0&a=t&q=89' 
     alt="Moving GIF"
     className='w-15 h-10 mx-auto '/>

</button>
}
  </div>
))}
       </div>    

<div className='text-center'>
<button onClick={goBack} className='bg-[#007FFF] font-bold text-white p-2 rounded-md  mt-[50%]'>Back</button>
</div>       
            </div>
  )
}
