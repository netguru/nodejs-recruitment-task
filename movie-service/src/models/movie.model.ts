import { model, Schema } from 'mongoose';

const movieSchema: Schema = new Schema({
    title:{
        type:String,
        required: true
    },
    released:{
        type: Date
    },
    genre:{
        type:String
    },
    userId:{
        type:Number,
        required: true
    },
    director: {
        type:String
    }
},{
    timestamps: true
});

const movieModel = model("Movie", movieSchema)
export default movieModel
