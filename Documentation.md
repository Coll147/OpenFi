# OpenFi Set Up Guide
> OpenFi its just a alpha / testing / development / thing, so do not expect nothing to work

### 1. Create database
Create a MySQL database with your favorite gestor / tool, for development I used Wampserver
If you use phpmyadmin (db manager used in wampserver) just get the default-database.sql file and follow [this guide](https://help.one.com/hc/en-us/articles/115005588189-How-do-I-import-a-database-to-phpMyAdmin)

### 2. Environment variables
In this repo there is a .env.example file, rename it to .env and fill the variables for the database connection
Inside /backend folder there is settings.json file where you can change some settings

### 3. Start the server
This proyect uses nodejs 24, install it on your system and run `npm i` to install all the dependences
To start the server `node start.js <port>` You can specify the port where the webserver is going to run, by default is 3000.




Default password is `admin`