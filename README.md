# Form builder App

This app allow you to create and build forms with different types and save them, in addition you can edit existing forms or delete them.
* Note that the server may enter sleep so it will require a reload upon entering

## Live Demo

https://form-builder-lior.netlify.app

## Screenshot

![Screenshot of Project](./demo1.png)
![Screenshot of Project](./demo2.png)

## Installation and Usage

1. Clone the repository to your local machine using the command
   `git clone https://github.com/liordesta/form-builder.git`.
2. Navigate to the project directory using `cd form-builder`.
3. Install frontend dependencies using `cd frontend && npm install or yarn install`.
4. Install backend dependencies using `cd backend && npm install or yarn install`.
5. Create a new Mongo cluster and a new collection named `forms`.
6. Create a local `.env` file on the backend root and add `MONGODB_URI`.
7. Start the development on both `frontend` & `backend` using `npm start or yarn start`.

## Technologies

List of technologies/tools used in the project:

- ReactJS
- NodeJS
- Express
- MongoDB
