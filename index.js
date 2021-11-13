const express = require('express');
const mongoose = require('mongoose');
const BrandName = require('./model');

const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://ravi:7032405789@cluster0.338ow.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useUnifiedTopology:true,
    useNewUrlParser: true
}).then(
    () => console.log("DB Connected...")
).catch(err => console.log(err));

app.post('/addbrands', async (req, res) => {
    const {brandname} = req.body;
    try {
        const newData = new BrandName({brandname});
        await newData.save();
        return res.json(await BrandName.find())
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/getallbrands", async (req, res) => {
    try {
        const allData = await BrandName.find();
        return res.json(allData);
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/getallbrands/:id", async (req, res) => {
    try {
        const Data = await BrandName.findById(req.params.id)
        return res.json(Data);
    } catch (error) {
        console.log(error.message)
    }
})

app.delete("/deletebrand/:id", async (req, res) => {
    try {
        await BrandName.findByIdAndDelete(req.params.id);
        return res.json(await BrandName.find())
    } catch (error) {
        console.log(error.message)
    }
})

app.listen(4000, () => {
    console.log("Server is running at http://localhost:4000")
});