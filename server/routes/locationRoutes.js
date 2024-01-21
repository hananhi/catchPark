import express from 'express'
import { getLocations ,deleteLocation,addLocation} from '../controllers/locationController.js';
import Location from '../models/locationModel.js';

const router=express.Router() ;

router.get('/',getLocations);
router.delete('/:id',deleteLocation);
router.post('/',addLocation);

router.get('/test', async(req,res,next)=>{

    try {
    
        const locations = await Location.findById("65a02dfff5d822c7fbdc6b3d") ;
        console.log(`locations`,locations);
 res.json("HII")
       
    } catch (error) {

        next(error);
        
    }
})
export default router ;