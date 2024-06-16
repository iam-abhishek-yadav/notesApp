**Running the App with Docker Compose**

- **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

- **Run Docker Compose:**

   ```bash
   docker-compose up
   ```

   This command will start the following containers:
   - `mongo`: MongoDB container
   - `server`: Server container
   - `react`: React container

   Docker Compose will automatically:
   - Create and start the containers defined in the `docker-compose.yml` file.
   - Create a Docker volume for persistent data storage .

- **Accessing the App:**
   - Frontend (React app) might be accessible at `http://localhost:5000`

- **Stopping the App:**

   To stop and remove the containers (but retain data volumes):

   ```bash
   docker-compose down
   ```

   This command will stop and remove the Docker containers defined in `docker-compose.yml`, while preserving any volumes associated with the containers.
