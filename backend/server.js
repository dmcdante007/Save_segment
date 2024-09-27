import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

// parse JSON requests
app.use(express.json());

//to connect to the webhook
app.use(cors());

// handle POST requests from frontend
app.post("/api/send-data", async (req, res) => {
  const webhookUrl =
    "https://webhook.site/6b9c23ad-8a24-48d2-a2b7-756cfa04b994";

  try {
    const { data } = req.body;

    console.log("Received Data:", data);

    //Send the received data to the Webhook
    const response = await axios.post(webhookUrl, data);

    //Send success response back to the frontend
    res.status(response.status).json({
      message: "Data sent successfully",
      data: response.data,
    });
  } catch (error) {
    //Log the error and send error response
    console.error("Error sending data:", error.message);
    res
      .status(500)
      .json({ message: "Error sending data", error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
