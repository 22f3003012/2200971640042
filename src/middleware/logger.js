// logger.js

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyaXR3aWsuMjJnY2ViYWltbDA0M0BnYWxnb3RpYWNvbGxlZ2UuZWR1IiwiZXhwIjoxNzUxMDE2ODM4LCJpYXQiOjE3NTEwMTU5MzgsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIzZDIyYWRmMi0zNGM5LTRhYjYtOWYzOC02ZjQ0ODExNzFkNTgiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJyaXR3aWsgY2hhbmRyYSIsInN1YiI6ImU2NjNmYmQzLTViMDAtNDYyOC1iZWU0LTI1MjQzYjc0NWY3YyJ9LCJlbWFpbCI6InJpdHdpay4yMmdjZWJhaW1sMDQzQGdhbGdvdGlhY29sbGVnZS5lZHUiLCJuYW1lIjoicml0d2lrIGNoYW5kcmEiLCJyb2xsTm8iOiIyMjAwOTcxNjQwMDQyIiwiYWNjZXNzQ29kZSI6Ik11YWd2cSIsImNsaWVudElEIjoiZTY2M2ZiZDMtNWIwMC00NjI4LWJlZTQtMjUyNDNiNzQ1ZjdjIiwiY2xpZW50U2VjcmV0IjoiVHpNYXB1aFJmWmJyaHF2WCJ9.opxtacaXMEjLMCbFDvH7gVt1eDp-xRGet3DwLzLZscM"; 
const TEST_SERVER_URL = "http://20.244.56.144/log"; // Replace with the actual log endpoint

/**
 * Creates a logger for a specific stack ("frontend" in your case).
 * 
 * @param {string} stack - For frontend, use "frontend"
 * @returns {(level: string, packageName: string, message: string) => void}
 */
const logger = (stack) => {
  return async (level, packageName, message) => {
    const payload = {
      stack,          // "frontend"
      level,          // e.g., "info", "warn", "error"
      package: packageName, // e.g., "LoginForm"
      message         // your message
    };

    try {
      const response = await fetch(TEST_SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error("❌ Failed to send log:", await response.text());
      } else {
        console.log("✅ Log sent");
      }
    } catch (err) {
      console.error("❌ Error during logging:", err.message);
    }
  };
};

export default logger;
