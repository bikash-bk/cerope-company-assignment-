
# CEROPE WEB PAGE 
this project is based on mern stack technologies (react,nodejs,mongodb,expressjs ) . in this project we can add emplyee details , 
edit EMPLOYEE, update emplyee etc 


## steps to download and install this project on windows

## BACKEND SETUP 
1. clone the repository 

2. setup for backend folder

```bash 
cd backend
npm install
npm i nodemon

```
3. create .env file on root directory (/backend/.env)
```bash 

MONGO_URI= your mongoDB uri
JWT_SECRET= your jwt secret code 


```
4. run the server 
```bash 
nodemon server.js 

# or 

node server.js



```

## FRONTEND SETUP 

1. Navigate to frontend folder:
```bash 
cd frontend
```
2. Install frontend dependencies:
```bash 
npm install
```
3. Create .env file inside frontend folder
```bash 
VITE_API_URL=http://localhost:5000/api
```
5. Start the frontend server:
```bash 
npm run dev

```





