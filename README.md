# ChimpTrack: A Manifest-Powered Application

This application provides a simple interface for primatology researchers to track and manage records of chimpanzees. It's built using React for the frontend and powered entirely by Manifest for the backend.

## Features

- **User Authentication**: Secure login for researchers and administrators.
- **Chimp Management**: Full CRUD (Create, Read, Update, Delete) functionality for chimp records.
- **Ownership & Permissions**: Records can only be modified by the researcher who created them or an administrator, ensuring data integrity.
- **Admin Panel**: A complete, auto-generated admin interface for managing all data, users, and permissions.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation & Running

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Default Credentials

- **Admin User**: `admin@manifest.build`
- **Password**: `admin`

Use these credentials on the landing page to access the demo dashboard.
