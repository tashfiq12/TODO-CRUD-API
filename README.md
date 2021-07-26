# TODO CRUD API 

## Features
* User can perform register and login , and logout operations.
* User can perfrom CRUD TODO operations by using the auth-token which was generated after login .
* After logout user can not perform CRUD operations until he is logged in.

## Connecting the Project to MongoDb
* Login to MongoDb atlas , create a cluster and create a database.
* There is a Connect option ,clicking on that there is a ```connect your application ``` button, then we will find a connection string  .
* Then copy the connection string and change the value of mongoURI in ```default.json```  and   ```production.json``` in the ```config``` folder of the project .

## Project installation guide:
* NODEJS installation is needed in the working machine.
* Download/Clone the project repository.
* Run the command  ``` npm install ```  in the terminal or cmd .
* Run the command ``` npm run server ```  in the terminal or cmd .

## Used Techstack

Nodejs , Express, MongoDb 

## Detailed API Documentation/Specification (Generated with the help of POSTMAN)

[API-DOCUMENTATION](https://documenter.getpostman.com/view/7185304/Tzm9kvDD)
