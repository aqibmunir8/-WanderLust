const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("views", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

// ------- mongodb ----------------------------------------------------------------


main()
.then( () => {
    console.log("Connect Succesfully! :)");
})
.catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


// -------- REST ------------------------------------------------------------------

 // We are Starting the Server Here
 app.listen(port, () => {
    console.log(`App is listening on Port ${port}`);
})

// Home Page

app.get("/", async (req, res) => {
    let allListings = await Listing.find({});
    res.render("page_listings/homepage.ejs", {allListings})
 })

// listing Page
 app.get("/listings", async (req, res) => {
    let allListings = await Listing.find({});
    res.render("page_listings/index.ejs", {allListings})
    // res.send(allListings);
 })

// New Route
app.get("/listings/new", (req, res) => {
    res.render("page_listings/new.ejs")
 })

// SHOW Id Page
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    console.log("----- Data Display --------")
    console.log(listing);
    res.render("page_listings/show.ejs", {listing})
 })

// Create From New Route
app.post("/listings", async (req, res) => {
    const  newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

// Edit Route-----
app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("page_listings/edit.ejs", {listing})
 })

// Update Route
app.put("/listings/:id", async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing});
    console.log("------updated--------")
    res.redirect(`/listings/${id}`);
    
 })

// Delete Route
app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log("-----Deleted-----")
    console.log(deletedListing);
    res.redirect("/listings");
 })