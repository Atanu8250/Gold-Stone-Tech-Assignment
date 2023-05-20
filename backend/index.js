const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/user.routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
     res.status(200).send('Home page..');
})

app.use("/user", userRouter);

// FOR WRONG URL-ENDPOINTS
app.use("*", (req, res) => {
     res.status(404).send({ message: "Provided wrong URL-Endpoint!" });
})


app.listen(process.env.PORT || 8080, async () => {
     try {
          console.log('Server connected successfully.');
          console.log('⏳ DB Connecting...');
          await connectDB;
          console.log('✅ DB Connected');
     } catch (error) {
          console.log('❌ error:', error);
     }
})

/*
const { parseAsync } = require("json2csv");
const fs = require("fs");
const path = require("path");
const User = require("../models/user.model");

const exportData = async (req, res) => {
    try {
        const users = await User.find();
        const fields = [
            "Id",
            "name",
            "email",
            "gender",
            "status",
            "Created_at",
            "Updated_at",
        ];
        const options = { fields };
        const csv = await parseAsync(users, options);

        const filePath = path.join(__dirname, "user_master.csv");
        fs.writeFileSync(filePath, csv);

        console.log("User data exported as csv");

        res.download(filePath, "user_master.csv", (error) => {
            if (error) {
                console.error("Something went wrong can't download your file", error);
            }
            fs.unlinkSync(filePath); // Remove the temporary file after download
        });
    } catch (error) {
        console.error("Something went wrong can't export your data", error);
        res.status(500).json({ error: "Something went wrong can't export your data" });
    }
};

module.exports = {
    exportData
}
*/ 