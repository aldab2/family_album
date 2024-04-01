### Running Database : 


 first ```cd database``` 
 #### for none dockerized frontend and backend
  ```docker run --name mongo1 -v ${PWD}/db:/data/db -p 127.0.0.1:27017:27017 -d mongo:latest```
#### for dockerized frontend and backend
```docker run --name mongo1 -v ${PWD}/db:/data/db --network="host" -d mongo:latest```

