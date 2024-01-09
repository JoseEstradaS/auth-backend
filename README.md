# Auth App

This project is a simple Node.js application featuring user authentication with three main routes: `/api/v1/user/info`, `/api/v1/user/register`, and `/api/v1/user/login`.

## Setup

### Installation

Run the following command to install project dependencies:

```bash
yarn install
```

### Environment Variables

Ensure to set up the following environment variables in the `.env` file:

```env
PORT=8080
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=Your_JWT_secret_here
JWT_EXPIRATION=1m
MAX_LOGIN_ATTEMPTS=3
LOCKOUT_DURATION=300000
```

You can use the provided `.env-example` file as a template to create your `.env` file with the necessary environment variables. Replace the placeholder values with your actual configurations and secrets.

- `PORT`: The port on which the server will run.
- `MONGODB_URI`: URI for your MongoDB database.
- `JWT_SECRET`: Secret key for JWT token generation.
- `JWT_EXPIRATION`: Token expiration time. Expressed in seconds or a string describing a time span [vercel/ms ]([https://link-url-here.org](https://github.com/vercel/ms))
- `MAX_LOGIN_ATTEMPTS`: Maximum login attempts before lockout.
- `LOCKOUT_DURATION`: Duration of lockout in milliseconds.

## Usage

### Running the Application

To start the application, run:

```
yarn dev
```

This will start the server on the specified port.

## Routes

### Register (POST `/api/v1/user/register`)

Registers a new user.

**Payload Example**:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login (POST `/api/v1/user/login`)

Logs in a user and generates an authentication token.

**Payload Example**:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Info (GET `/api/v1/user/info`)

This route retrieves information for the authenticated user.

To access this route:
1. Use the `/login` route to authenticate and receive a bearer token.
2. Include the obtained bearer token in the Authorization field of the request headers when accessing the `/api/v1/user/info` route.

Example Request Header:
```
Authorization: Bearer <your_obtained_token_here>
```

This route retrieves information for the authenticated user.
