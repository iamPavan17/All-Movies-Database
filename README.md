# All-Movies-Database
Technologies used - MERN (Mongo, Express, React, Node)



## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine and also mongod should be running.  

#### React - Client folder:

`npm install`  

To Run Test Suite:  

`npm test`  

To Start Server:

`npm start`   

To Visit App:

`localhost:3000/movies`  


#### Node - Server folder:

`npm install`  

To Start Server:

`nodemon` 

**********************************************************************************************************************

## About the project
This is a kind of IMDB, where it has two modules, one is Actors and another one is Movies.

#### Relationship between them -
Actor can act in multiple movies, 
Movie can have multiple actors

#### Application contains -
Screen to list all movies with Name, Year of release and all Actors of that movie and also a search bar for searching of movies.
Screen to ‘add’ a new movie with the necessary fields with existing actors. If the user wants to add
new ‘Actors’ while creating the movie which are not present in the database then he should be able to
do so while being on the same screen.
