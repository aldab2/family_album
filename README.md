#  Distributed Cloud Based Social Media For Families. 

## Running using docker

```cd <to project root directory>```

Linux
```bash
 docker-compose up --build
```
Windows 
```cmd 
docker compose up --build
```


## Running using npm

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

