# Cloud image Repository
## For Shopify_Challenge

>### How to use
>#### 1. in .env, set DB_CONNECTION=(your MongoDB connection string)
>#### 2. in .env, set SESSION_SECRET=(any secret string you can create)
>#### 3. type 'npm install' on terminal
>#### 4. run with 'npm start'
>#### 5. default port number is 8080, so after start, go to 'http://localhost:8080/'
--------------------------
  
>### Features
>#### 1. Used framework and DB: NodeJS, expressJS, ejs, MongoDB
>#### 2. Image managing
>>##### a. Add image ( supporting multiple file selection )
>>##### b. Delete image
>>##### c. Implemented totally private repository using passport module (Access Control)
>#### 3. Architecture
>>##### a. Server-side rendering
>>##### b. Without using cloud storage like AWS S3, I implemented backend server to store all uploaded image files on local server. This doesn't mean that users are to share static files(public), but I stored them in normal server side folder, so users can't access to them directly. And when the server have to render images, it converts them into dataurl using base64 encoding and links them with image tag of html so that user can see them. This is so complicated structure but I think it's almost the best practice for implementing this project. 
>>##### c. Used resources of bootstrap for better design
   

