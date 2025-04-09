import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
    messageId: {
        type: String,
        unique: true,
        required: true,
    },
    from:{
        type: String,
        required: true,
    },
    to:[{
        type: String,
    }],
    subject:{
        type: String,
       
    },
    body:{
        type: String,
       
    },
    date:{
        type: Date,
    
    },
    folder:{
        type: String,
    },
    account:{
        type: String,
     
    },
    category:{
        type: String,
    },
    isRead: {
        type: Boolean,
        default: false,
    }

},{
    timestamps: true,
});

const Email = mongoose.model('Email', mailSchema);

export default Email;