
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/vehicleDB")
.then(() => {
    console.log("MongoDB Connected");
    app.listen(3000, () => {
        console.log("Server running at http://localhost:3000");
    });
})
.catch(err => console.log(err));

// Appointment schema
const schema = new mongoose.Schema({
    customerName: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    vehicleType: { type: String, required: true },
    serviceName: { type: String, required: true },
    charge: { type: Number, required: true }
});

const Appointment = mongoose.model("Appointment", schema);

// CREATE: Book service
app.post("/appointments", async (req, res) => {
    try {
        const data = await Appointment.create(req.body);
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ: View appointments
app.get("/appointments", async (req, res) => {
    try {
        res.json(await Appointment.find());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE: Edit appointment
app.put("/appointments/:id", async (req, res) => {
    try {
        const data = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!data) {
            return res.status(404).json({ error: "Not found" });
        }

        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: Cancel appointment
app.delete("/appointments/:id", async (req, res) => {
    try {
        const data = await Appointment.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).json({ error: "Not found" });
        }

        res.json({ message: "Booking cancelled" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
