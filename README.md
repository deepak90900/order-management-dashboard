# Order Management Dashboard

This project is an Order Management Dashboard built using Next.js, MongoDB, and Clerk for authentication. It provides a user-friendly interface to manage orders through different stages such as Design, Print, Delivery, and Finished Orders. The project includes features like search and filter functionality, responsive design, and sticky UI components to enhance user experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [Folder Structure](#folder-structure)
- [Assumptions](#assumptions)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Integrated with Clerk for user authentication.
- **Order Stages**: Manage orders through Design, Print, Delivery, and Finished stages.
- **Search & Filter**: Sticky search and filter bar for easy navigation.
- **Responsive Design**: Fully responsive UI for all devices.
- **Error Handling**: Comprehensive error handling across the application.
- **File Upload**: Allows users to upload files associated with orders.

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, MongoDB, Multer (for file uploads)
- **Authentication**: Clerk

## Setup Instructions

### Prerequisites

- Node.js (version 16 or above)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)
- Clerk Account for authentication

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/order-management-dashboard.git
   cd order-management-dashboard
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root directory and add the following environment variables:

   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Setup Clerk Middleware:**
   Ensure the `middleware.ts` file is set up correctly in the root or `src/` directory:

   ```typescript
   import { clerkMiddleware } from "@clerk/nextjs/server";

   export default clerkMiddleware();

   export const config = {
     matcher: [
       "/((?!_next|[^?]*.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
       "/(api|trpc)(.*)",
     ],
   };
   ```

## Running the Project

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Access the application:**
   Open your browser and go to `http://localhost:3000`.

## Folder Structure

```bash
/src
  /app
    /api
      /orders
        route.js        # API routes for handling order operations
    /dashboard
      layout.js         # Layout for the dashboard with sticky sidebar navigation
      /[stage]
        page.js         # Individual pages for Design, Print, Delivery, and Finished Orders
  /components
    SearchAndFilter.js  # Reusable component for search and filter functionality
```

## Assumptions

- The MongoDB URI is correctly configured in the `.env.local` file.
- Clerk is used for authentication, and the necessary API keys are set up.
- The project assumes a basic understanding of Node.js, React, and Next.js for setup and troubleshooting.
