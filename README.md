# 📦 Subscription Tracker – Node.js API

A simple and powerful **subscription management system** built with **Node.js**, **Express**, **MongoDB**, and **Upstash Workflow**. Easily manage user subscriptions and send automated email reminders for upcoming renewals.

---

## 🚀 Features

- 🧾 Create, read, update, and delete subscriptions
- ⏳ Track subscription frequency, status, and renewal dates
- 📧 Send **automated email reminders** before renewal
- ⏱️ Schedule reminders using **Upstash Workflow**
- 📬 Email delivery using **Nodemailer**
- 🛡️ Rate-limiting and bot protection via **Arcjet**
- 📅 Auto-calculate renewal date from start date + frequency
- 🧩 Modular folder structure & middleware handling

---

## 🛠️ Tech Stack

| Tool         | Purpose                          |
|--------------|----------------------------------|
| **Node.js**  | Backend runtime                  |
| **Express**  | Web framework                    |
| **MongoDB**  | Database                         |
| **Mongoose** | ODM for MongoDB                  |
| **Upstash**  | Serverless workflow for reminders|
| **dayjs**    | Date handling and formatting     |
| **Nodemailer** | Email sending via SMTP         |
| **PM2**      | Process manager (optional)       |

---

## 📁 Project Structure

subscription-tracker/
├── controllers/ 
│   ├── subscription.controller.js
│   └── workflow.controller.js
├── middleware/ 
│   ├── arcjet.middleware.js
│   └── error.middleware.js
├── models/ 
│   └── subscription.model.js
├── utils/
│   └── send.email.js
├── workflows/ 
│   └── sendRemainders.js
├── .env 
├── server.js 
└── package.json

---



## ⚙️ Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/Venkatsuresh432/Subscription-system-Nodejs.git
   cd Subscription-system-Nodejs


---

 2. **Install dependencies**
    ```bash
    Copy
    Edit
    npm install
---    
 3. **Set up environment variables**

     **Create a .env file in the root directory:**
       ```bash
        - MONGODB_URI=your_mongodb_uri
        - SMTP_HOST=smtp.example.com
        - SMTP_PORT=587
        - SMTP_USER=your_email@example.com
        - SMTP_PASS=your_email_password
        - ARCJET_API_KEY=your_arcjet_key
        - UPSTASH_WORKFLOW_TOKEN=your_upstash_token

---    
 4. **Run the server**
    ```bash
     npm run dev

---  
# ✉️ Email Reminders
      Emails are sent using Nodemailer.
      
      Reminder intervals: 7, 5, 2, and 1 day(s) before the renewal date.
      
      Triggered via Upstash Workflow using the sendRemainders function.
---

# 📬 Example Request – Create Subscription
       ```bash
         POST /api/subscription
         Content-Type: application/json
         
         {
           "name": "Netflix",
           "price": 499,
           "currency": "IND",
           "freequency": "monthly",
           "category": "entertainment",
           "paymentMethod": "credit_card",
           "startDate": "2025-01-12T00:00:00.000Z",
           "user": "64f82bc1234abcde12345678"
         }

   
   # 🔐 Arcjet Protection
   **Your middleware includes Arcjet bot detection and rate-limiting:**
   ```bash
         if (decision.reason.isBot) {
         return res.status(403).json({ message: "Access denied for bots" });
         }
         if (decision.reason.isRateLimited) {
         return res.status(429).json({ message: "Rate limit exceeded" });
         }

```

# Some Screenshots
![Screenshot](./images/Screenshot%20(227).png)
![Screenshot](./images/Screenshot%20(228).png)
![Screenshot](./images/Screenshot%20(229).png)
![Screenshot](./images/Screenshot%20(230).png)


**Made with 💙 by Venkatsuresh432**

