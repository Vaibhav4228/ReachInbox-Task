
# ReachInbox Assigenment Project

![image](https://github.com/user-attachments/assets/35cee7bd-1065-43b0-bfae-daef0acb11cd)

![image](https://github.com/user-attachments/assets/6c364c73-b71a-4241-9700-acc66831db62)

## Here you can choose your emails what email mails you want to see
![image](https://github.com/user-attachments/assets/0a41f56d-d05d-4e61-8e4e-618f4f6429a3)

## Now genrating a AI replies we can edit it and copy it and also refresh it so we can get multiple suggest replies
![image](https://github.com/user-attachments/assets/efbaa397-b303-425d-84d0-00e7076f353a)


## And using elastic search we can search out emails 
![image](https://github.com/user-attachments/assets/dc630b02-1a11-4477-8325-4a7027657720)






## Overview

VMAIL is a platform designed to help businesses find, enrich, and engage high-intent leads through multi-channel outreach. The platform integrates email, LinkedIn, Twitter, and phone outreach for seamless lead generation. The backend utilizes Node.js, MongoDB, and Elasticsearch, and the frontend is built using React.js and Vercel for deployment.

---

## Backend

### 1. **Technologies Used**

- **Node.js**: The backend is built using Node.js, leveraging its asynchronous event-driven architecture for efficient handling of concurrent requests.
- **MongoDB**: Used for storing email data with complex queries and real-time access.
- **Elasticsearch**: Used for fast and efficient search functionality, including indexing and querying emails.
- **Slack API**: Used to send real-time notifications for specific email categories.
- **Docker**: Used to containerize the backend and Elasticsearch for easy deployment.

### 2. **Features Implemented**

#### 2.1 Real-Time Email Synchronization
- Integrated IMAP to fetch emails from multiple email accounts in real-time.
- Used **IDLE mode** for persistent connections to ensure real-time updates without cron jobs.

#### 2.2 Elasticsearch Integration
- Integrated **Elasticsearch** to index emails and make them searchable.
- Implemented **basic search** functionality, allowing users to filter by account, folder, category, and content.
- Elasticsearch helps with filtering, indexing, and searching large volumes of email data efficiently.

#### 2.3 AI Email Categorization
- Integrated **Gemini API** for categorizing emails into predefined categories such as:
  - Interested
  - Meeting Booked
  - Not Interested
  - Spam
  - Out of Office

#### 2.4 Slack Integration
- **Slack Notifications**: The backend sends Slack notifications whenever a new email is categorized as "Interested."
- **Webhook**: Triggered for external automation when an email is marked as "Interested."

#### 2.5 Email Storage and Retrieval
- Emails are stored in MongoDB, and Elasticsearch is used for making them searchable.
- **Basic CRUD operations** are implemented for email management.

---

## Elasticsearch

### 1. **Elasticsearch Container**

- Elasticsearch is used to index and query emails efficiently.
- The backend container links to the Elasticsearch container, allowing the backend to perform search queries.

### 2. **Pulling Elasticsearch Docker Image**

To run Elasticsearch locally using Docker, use the following command to pull the official Elasticsearch Docker image:

```bash
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.6.2
```

### 3. **Running Elasticsearch with Docker Compose**

You can also use Docker Compose to start Elasticsearch and the Node.js backend services together. Here's the command to run the `docker-compose.yml`:

```bash
docker-compose up -d
```

This will start both **Elasticsearch** and **Node.js** backend services in the background.

---

## Frontend

### 1. **Technologies Used**

- **React.js**: Used to build a dynamic and responsive frontend application.
- **Typescript**: for type safety
- **Redus**: Used for state managemnt like in settings we have 
 mails so that manage there state with AI response
- **MUI**: Using Snackbar and paginations using MUI and there Icons also
  
### 2. **Features of the Frontend**

- **Email Search**: The frontend allows users to search for emails using filters like subject, from, category, and date.
- **Email Categorization**: Displays the AI-based email categories (Interested, Spam, etc.).
- **Responsive UI**: The UI is designed to be responsive, allowing users to interact seamlessly across devices.
- **Slack Notifications**: Users can see real-time notifications for emails categorized as "Interested."

---

## Running the Project Locally

### 1. **Backend Setup**

#### Prerequisites:
- **Node.js** version 16 or later.
- **MongoDB Atlas** for cloud database setup.
- **Elasticsearch** for indexing and search.

#### Steps:
1. Clone the repository:

```bash
git clone https://github.com/your-username/reachinbox.git
cd reachinbox/backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up the `.env` file with the necessary credentials for MongoDB, Slack, and Gemini API.
4. Run the backend locally:

```bash
npm run dev
```

### 2. **Frontend Setup**


#### Prerequisites:
- **Node.js** and **npm** installed.

#### Steps:
Clone the frontend repository:

```bash
git clone https://github.com/vaibhav990/reachinbox-frontend.git
cd reachinbox-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Set up the `.env` file with the necessary backend API URL.
4. Run the frontend locally:

```bash
npm run start
```

### **Frontend Logic**

#### Features:
1. **Email Listing**:
   - Fetch emails from the backend.
   - Display them with **categories** such as **Interested**, **Meeting Booked**, etc.

2. **Search Emails**:
   - Integrate **ElasticSearch** to search emails by **subject**, **from**, **category**, etc.

3. **Category Filter**:
   - Filter emails based on categories: **Interested**, **Meeting Booked**, etc.

4. **User Interface**:
   - A simple UI built with **React.js**.
   - Display a list of emails with options to search and filter.

---

## Docker Image:

Pull my backend image to Docker Hub:

```bash
docker pull vaibhav990/backend
```

### 2. **Running Backend and Elasticsearch with Docker Compose**

Create a `docker-compose.yml` file and use the following command to start both services:

```bash
docker-compose up -d
```

This will start **Elasticsearch** and the **Node.js backend** together.

---

## Conclusion

In this project, we have integrated **Elasticsearch** for fast searching, **AI-based categorization** using Gemini API, **Slack notifications**, and a responsive frontend deployed on **Vercel**. Docker is used to containerize both the backend and Elasticsearch services for easy deployment.

---
