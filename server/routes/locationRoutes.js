import express from 'express'
import { getLocations ,deleteLocation,addLocation} from '../controllers/locationController.js';
import Location from '../models/locationModel.js';

const router=express.Router() ;

router.get('/',getLocations);
router.delete('/:id',deleteLocation);
router.post('/',addLocation);

export default router ;