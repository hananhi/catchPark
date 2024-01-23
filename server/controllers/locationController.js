import Location from "../models/locationModel.js";


export const addLocation =async (req,res,next)=>{

    try{

       const{ userAddress , userLocation}=req.body

        console.log(req.body);
   
  console.log(userAddress,userLocation);

    const newSpot = await Location.create({
        address:userAddress,
        locationp: {
            type: "Point",
            coordinates: [userLocation.lng,userLocation.lat]
          }
    })
    console.log('newSpot',newSpot);
    res.status(201).send(newSpot);

} catch (error) {
    next(error);
}


}

export const deleteLocation=async(req,res,next)=>{

    try {

        const locationID= req.params.id;
         console.log(req.params.id);
        console.log(locationID);
        const response=await Location.findByIdAndDelete(locationID);

        console.log(response)
        res.status(200).json({ message: 'Location deleted successfully' });
        
    } catch (error) {
        next();
    }

}

export const getLocations= async(req,res,next)=>{

    try {
        
        const locations = await Location.find() ;
        console.log('location server from data base'.locations);
 res.json(locations)
       
    } catch (error) {

        next(error);
        
    }
}