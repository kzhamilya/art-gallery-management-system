# art-gallery-management-system
This is a full-stack web project where I learned React, Node.js, RestAPI and Express and included a database. This is a simple Art Gallery Management System.

-------------------
Users may view all artworks with images, artist names, prices, and status (Available/Sold).
There is also an admin panel, which manages customers, add/edit/delete paintings (with trigger‑enforced rules).
-------------------
built with:

Frontend: React, React-Bootstrap, CSS3
Backend: Node.js, Express, MySQL2
Database: MySQL (normalized schema in 3NF)
REST API, CORS, dotenv

***

The database includes tables: `Gallery`, `Artist`, `Painting`, `Customer`, `Order`, `OrderLine`, `Payment`, `Event`, `Admin`.  
Key features:
- Triggers: audit logging, prevent deletion of sold paintings.
- Indexes: composite and expression indexes for query performance.
- ACID transactions (e.g., order placement).

***

### Prerequisites
- Node.js (v16+)
- MySQL server

### Database Setup

1.  **Import the Database Schema & Data**:
    *   Open your terminal or MySQL client.
    *   Navigate to the project's root directory.
    *   Run the following command to import the database structure and sample data from the provided dump file:
    ```bash
    mysql -u root -p new_schema > dump.sql

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/art-gallery-management-system.git
   cd art-gallery-management-system
