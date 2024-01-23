import mongoose from "mongoose";


const locationSchema= new mongoose.Schema({

    address:{
        type:String
    },
    locationp: {
        type: {
          type: String,
          enum: ['Point'], // Only allow 'Point' type
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },

})

locationSchema.index({ locationp: '2dsphere' });
const Location = mongoose.model('Location',locationSchema)

export default Location;