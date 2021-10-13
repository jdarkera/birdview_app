# birdview_app

# 1. Technology Overview
1. MongoDB
2. Express.js
3. React.js
4. Node.js
5. Google APIs

# 2. Architecture
### 1) Front-end (React.js - component tree)
![front-end-architecture](https://user-images.githubusercontent.com/37053909/137188899-655f138c-1332-4372-98b4-5bad8aa99bb3.PNG)

### 2) Back-end (Express.js + Node.js + MongoDB)
![back-end-architecture](https://user-images.githubusercontent.com/37053909/137189160-d0ccff99-2cd6-4025-a6d4-c136a2a4d369.PNG)
# 3. To run the application
### You need to install depenencie & packages first, run "npm i" in frontend and backend folders
Step 1: To Start the app, CD into client folder. 
Step 2:  npm i and then npm start.
Step 3: CD into server folder - node server.js
Both client, and server side should be running simulatenously for the app to work. 

### 1) User Credentials
1. To login as a client, use ID = Feven and PASSWORD = Feven
2. To login as a freelancer, use ID = agency and PASSWORD = agency

### 2) Features
#### A. Freelancer
  - Create and update profile
  - Upload a pdf resume to a job
  - Write a review of a company
  - View, sort opportunities by deadline date, etc.
  - View applications
  - View jobs on Google Maps 
#### B. Client
  - Create and update profile
  - Post and delete an opportunity
  - View applicants with their proposals
  - View, sort opportunities by deadline date, etc.
### 3) Functionalities
  - Form Validation
  - Responsive Design
  - Navigation State Update
  - Google Maps Search
  - Application Deadline & Document Validation

## Possible Improvement
- Implement session 
- Reorganize component tree using Hooks
- Redesign UI
- Improve Form Handling & Validation
- Add more functionalities
  - Chat/Message System
  - Business Profile for freelancers 
  - Reviews & Ratings for freelancers 
