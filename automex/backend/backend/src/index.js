const express = require("express");
const cors = require("cors");
require("dotenv").config();

const getGoogleSheet = require("../config/googleSheets");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    const googleSheets = await getGoogleSheet();

    const response = await googleSheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: "Candidates!A1:I10",
    });

    res.json({
      status: "ok",
      data: response.data.values,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});