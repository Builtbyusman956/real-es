const axios = require("axios");

const TERMII_BASE = "https://v3.api.termii.com/api";

const sendOTP = async (phoneNumber) => {
  const payload = {
    api_key:          process.env.TERMII_API_KEY,
    message_type:     "NUMERIC",
    to:               phoneNumber,
    from:             "generic",
    channel:          "generic",
    pin_attempts:     3,
    pin_time_to_live: 10,
    pin_length:       6,
    pin_placeholder:  "< 1234 >",
    message_text:     "Your verification code is < 1234 >. Valid for 10 minutes.",
    pin_type:         "NUMERIC",
  };

  console.log("Sending OTP to:", phoneNumber);

  try {
    const response = await axios.post(`${TERMII_BASE}/sms/otp/send`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Termii response:", JSON.stringify(response.data));
    if (!response.data?.pinId) {
      throw new Error(response.data?.message || "Failed to send OTP");
    }
    return response.data.pinId;
  } catch (err) {
    console.error("Termii full error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || err.message);
  }
};

const verifyOTP = async (pinId, pin) => {
  const payload = {
    api_key: process.env.TERMII_API_KEY,
    pin_id:  pinId,
    pin:     String(pin),
  };

  const response = await axios.post(`${TERMII_BASE}/sms/otp/verify`, payload, {
    headers: { "Content-Type": "application/json" },
  });

  if (response.data?.verified !== "True" && response.data?.verified !== true) {
    throw new Error(response.data?.message || "Invalid or expired OTP");
  }
  return true;
};

module.exports = { sendOTP, verifyOTP };