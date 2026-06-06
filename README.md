# SportNest Client

SportNest is a sports facility booking platform built with Next.js. Users can browse available sports venues, search by facility name, filter by sport type, book time slots, and manage their own listed facilities after signing in.

## Live URL

Client: add your deployed client URL here
Server: add your deployed server URL here

## Purpose

The client side of SportNest provides the full user interface for the booking system. It connects with the Express server for facilities and booking data, and uses Better Auth for email/password and Google authentication.

## Main Features

- Browse all sports facilities
- Search facilities by name
- Filter facilities by sport type
- View detailed facility information
- Book a facility with date, time slot, hours, and total price
- Add a new facility as a logged-in user
- Upload facility images through imgbb
- Manage, update, and delete owned facilities
- View and cancel personal bookings
- Email/password authentication
- Google login
- Protected private routes
- Custom 404 page
- Responsive layout for mobile, tablet, and desktop

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Better Auth
- MongoDB adapter for Better Auth
- imgbb image upload

## NPM Packages Used

- next
- react
- react-dom
- better-auth
- @better-auth/mongo-adapter
- mongodb
- lucide-react
- react-icons
- react-hot-toast
- react-toastify
- tailwindcss
- eslint

## Environment Variables

Create a .env file in the client folder and add the required values:

~~~env
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENTID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
~~~

## Run Locally

Install dependencies:

~~~bash
npm install
~~~

Start the development server:

~~~bash
npm run dev
~~~

The client will run at:

~~~txt
http://localhost:3000
~~~

## Build

~~~bash
npm run build
npm start
~~~

## Notes

Make sure the backend server is running before testing facility creation, booking, update, or delete features. The deployed client URL should also be added to the backend CORS/client configuration when deploying.
