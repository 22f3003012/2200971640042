# 🔗 URL Shortener — Frontend Project
**Roll Number:** 2200971640042  
**Submission Sections:**
- `FrontendTestSubmission/`: React-based URL Shortener  
- `LoggingMiddleware/`: Reusable frontend logger  

## 📸 Screenshots

<!-- Method 1: Simple approach -->
![Home Page](./screenshots/home.jpg "Home Page - URL Input")
![Shortened URL](./screenshots/short.jpg "Shortened URL Output")

<!-- Method 2: HTML table approach (if the above doesn't work) -->
<table>
  <tr>
    <td align="center">
      <img src="./screenshots/home.jpg" alt="Home Page" width="400"/><br/>
      <strong>🏠 Home Page – URL Input</strong>
    </td>
    <td align="center">
      <img src="./screenshots/short.jpg" alt="Shortened URL" width="400"/><br/>
      <strong>✅ Shortened URL Output</strong>
    </td>
  </tr>
</table>

<!-- Method 3: Alternative paths (try if others fail) -->
<!-- 
![Home Page](screenshots/home.jpg)
![Shortened URL](screenshots/short.jpg)
-->

## ⚙️ Features
- URL shortening with optional custom shortcode  
- Expiry time for each link (default: 30 minutes)  
- In-memory storage for simplicity  
- Reusable logger with:  
  - Log levels: info, error, warn  
  - Sends logs to external API using Bearer Token  

---

## 📁 Folder Structure
```
2200971640042/
├── LoggingMiddleware/
│   └── logger.js
├── screenshots/
│   ├── home.jpg
│   └── short.jpg
└── FrontendTestSubmission/
    ├── public/
    ├── src/
    │   ├── App.js
    │   ├── logger.js (or imported from ../LoggingMiddleware)
    │   └── components/
    │       ├── ShortenerForm.jsx
    │       └── RedirectHandler.jsx
    ├── package.json
    └── README.md
```

---

## 🧪 How to Run Locally
```bash
cd FrontendTestSubmission
npm install
npm start
```
Then open `http://localhost:3000` in your browser.

---

## 📦 Logging Configuration
* Uses `fetch` to send POST logs to: `http://20.244.56.144/log`
* Authorization handled via static Bearer token
* Used in both components for lifecycle and error logs

---

## 📄 Additional Notes
* Built using **React + Tailwind CSS**
* Fully client-side; uses `window.shortLinks` for temp storage
* No backend used

---

## 🛠️ Screenshot Troubleshooting

If screenshots aren't displaying, try these solutions:

### 1. Check File Path and Names
Ensure your directory structure looks like this:
```
2200971640042/
├── README.md (this file)
├── screenshots/
│   ├── home.jpg
│   └── short.jpg
└── FrontendTestSubmission/
```

### 2. Verify Image Files
- Check that `home.jpg` and `short.jpg` exist in the `screenshots/` folder
- Ensure filenames match exactly (case-sensitive)
- Try renaming files to remove any special characters

### 3. Alternative Image Formats
If `.jpg` doesn't work, try:
- `.png` format
- `.jpeg` format
- Converting images to a different format

### 4. GitHub-Specific Issues
If viewing on GitHub:
- Push the screenshots to your repository
- Wait a few minutes for GitHub to process the images
- Try viewing in an incognito/private browser window

### 5. Local Testing
Test locally by opening the README in a markdown viewer or VS Code preview.

---

## ✅ Submitted By
**Name:** Ritwik Chandra  
**Roll No:** 2200971640042  
**Institute:** Galgotias College Of Engineering And Technology
