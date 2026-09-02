# Smart Employee Service Desk & Ticket Management Portal

**Hackathon Deliverables:**
* 🎥 **Working Demo Video:** [https://drive.google.com/file/d/1HrcJUt4iyi3_dOvQ3HxQrPfbQl8noMqM/view?usp=sharing]
* 🗄️ **Database Schema:** Located in `database.sql`

## 🌟 Beyond the Requirements: Advanced UX
To elevate this project from a standard MVP to a production-ready enterprise tool, several features were engineered **strictly above and beyond the baseline rubric**:
* **Algorithmic Priority Sorting:** Dynamic reordering of the ticket queue to ensure 'High' priority issues automatically surface to the top for immediate triaging.
* **Multi-Dimensional Filtering:** Instant state-based data filtering across Department Categories and Statuses using interactive UI pills.
* **Real-Time Search Engine:** Instantaneous text-matching against Ticket Titles and IDs to locate specific issues without continuous database round-trips.

## ✨ Key Features & Architecture
* **Enterprise-Grade UI:** Fully responsive, modern slate design utilizing Plus Jakarta Sans typography, soft shadows, and Bootstrap Icons.
* **Smart Dashboard & KPIs:** Real-time metrics cards tracking Total, Open, Resolved, and High Priority tickets alongside Category distribution.
* **Frontend:** React.js (Vite), Bootstrap, Custom CSS
* **Backend:** Node.js, Express.js (MVC-style architecture)
* **Database:** PostgreSQL (`pg` connection pool)

### Project Structure
The repository is structured as a monorepo containing distinct frontend and backend sibling directories:
* `/frontend/src/components`: Contains modular UI components (`Navbar.jsx`, `Dashboard.jsx`, `TicketForm.jsx`, `TicketResults.jsx`, `PriorityBadge.jsx`).
* `/backend/controllers`: Contains business logic and strict input validation.
* `/backend/routes`: Defines modular REST API endpoints.
* `/backend/config`: Handles PostgreSQL connection pooling.

## 🚀 Local Setup Instructions

### 1. Database Configuration
1. Open pgAdmin and create a new database named `service_desk_db`.
2. Open the `database.sql` file located in the root directory.
3. Run the SQL script to generate the `Users`, `Categories`, `Tickets`, and `Comments` tables.
4. Manually insert the 5 categories (IT, HR, Facilities, Finance, Access Management) into the `Categories` table.

### 2. Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with your database credentials:
   ```text
   PORT=5000
   PG_USER=postgres
   PG_HOST=localhost
   PG_DATABASE=service_desk_db
   PG_PASSWORD=admin
   PG_PORT=5432
