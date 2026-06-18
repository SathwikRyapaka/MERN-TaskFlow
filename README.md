# TaskFlow

TaskFlow is a simple, intuitive project management utility built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows you to track tasks through various phases of the Software Development Lifecycle (SDLC) using a Kanban board, manage users, and view the complete status history of any task.

## Features

*   **Kanban Dashboard:** Visual representation of tasks grouped by status (Backlog, To Do, In Progress, Testing, Done). Supports drag-and-drop status updates.
*   **User Management:** Create, view, and delete users with different roles (Manager, Developer, Tester, Designer).
*   **Task Management:** Create detailed tasks, assign them to users, and set priority levels.
*   **Task History:** Every time a task's status is changed, a history log is maintained with a timestamp and the user who made the change.
*   **Responsive Design:** Modern UI designed to look great on desktops.

## Tech Stack

*   **Frontend:** React (via Vite), React Router, Context API, Axios, Lucide React (for icons), Vanilla CSS.
*   **Backend:** Node.js, Express.js, Mongoose (MongoDB).
*   **Database:** MongoDB.

## Getting Started

### Prerequisites

*   Node.js (v18+ recommended)
*   MongoDB (Local installation or MongoDB Atlas URI)

### Installation & Setup

1.  **Clone the repository** (if applicable) or navigate to the project directory:
    ```bash
    cd taskflow
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    ```
    *   (Optional) Create a `.env` file in the `backend` folder to specify a custom MongoDB URI or Port:
        ```env
        PORT=5000
        MONGO_URI=mongodb://localhost:27017/taskflow
        ```
    *   Start the backend server:
        ```bash
        npm run dev
        ```
        The backend will run on `http://localhost:5000`.

3.  **Frontend Setup:**
    Open a new terminal window/tab:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    The frontend will be accessible at the URL provided by Vite (usually `http://localhost:5173`).

## Design Choices & Architecture

*   **Monorepo Structure:** The project is split into `frontend` and `backend` folders for clear separation of concerns, making it easier to manage dependencies and deploy independently if needed.
*   **UI/UX:** A warm, inviting color palette (browns, oranges) was chosen based on the provided reference design. Vanilla CSS was used exclusively for styling to ensure full control over the aesthetic without relying on heavy frameworks, demonstrating core CSS proficiency.
*   **State Management:** React Context (`TaskContext.jsx`) is used for global state management. This is sufficient for the scope of this application and avoids the boilerplate of Redux.
*   **Simulated Authentication:** A top-bar dropdown allows you to "simulate" being logged in as a specific user. This ID is sent with task updates to track *who* made changes in the task history.

## Future Improvements

Given more time, the following enhancements would be prioritized:

1.  **Real Authentication:** Implement JWT-based authentication (e.g., using Passport.js or a service like Firebase/Auth0) instead of the simulated user dropdown.
2.  **Advanced Drag and Drop:** Integrate a library like `@hello-pangea/dnd` for smoother animations and better accessibility during drag-and-drop operations on the Kanban board.
3.  **Form Validation:** Add robust frontend validation (e.g., Formik + Yup) and backend validation (e.g., Joi or express-validator) for all inputs.
4.  **Pagination & Filtering:** As the number of tasks grows, implement pagination on the backend and advanced filtering (by assignee, priority, date range) on the frontend.
5.  **Mobile Responsiveness:** Enhance the CSS to fully support small screens (stacking Kanban columns, hamburger menu for the sidebar).
