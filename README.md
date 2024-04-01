#  Distributed Cloud Based Social Media For Families. 

### Backend
#### Node, ExpressJS and Mongo (found in dir /backend)
First run 
```npm install``` then run
``` npm start``` to run the backend #
or ```npm server``` to run with nodemon (development automatic refresh)
### Frontend React (found in dir /frontend)
First run 
```npm install``` then run
``` npm start``` to run the frontend

### To run them all 
Run ```npm install``` inside the root directory,frontend and backend (3 times), then run ``` npm run dev ``` inside the root

#### Backend docker

```cd backend```
```docker run -d --env-file .env --network="host" --name backend  abbarnawi/family-space-backend:latest```



#### frontend docker

```cd code-react```
```docker run -d  -v ${PWD}/nginx.conf:/etc/nginx/conf.d/default.conf --network="host"  --name frontend abbarnawi/family-space-frontend:latest```