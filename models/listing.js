const mongoose = require("mongoose");

// Define the schema for a listing
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // The title is required
    },
    description: String, // A simple description field
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://plus.unsplash.com/premium_photo-1687948155999-5a5180004fee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: (v) => v === "" 
                ? "https://plus.unsplash.com/premium_photo-1687948155999-5a5180004fee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                : v
        }
    },
    price: Number, // A field for the price of the listing
    location: String, // The location of the listing
    country: String // The country where the listing is located
});

// Create a Mongoose model for the schema
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
