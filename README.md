# Laboratory Management System - Backend

A Node.js/Express backend API for managing laboratory studies, tests, and results using TypeScript and Sequelize ORM.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Sequelize
- **Database**: MySQL
- **Dev Tools**: ts-node

## Project Structure

```
back/
├── src/
│   ├── index.ts                 # Application entry point
│   ├── controllers/             # API route handlers
│   │   ├── LabController.ts
│   │   ├── ResultController.ts
│   │   ├── StudyController.ts
│   │   ├── TestController.ts
│   │   └── UserController.ts
│   └── models/                  # Database models
│       ├── index.ts             # Sequelize configuration
│       ├── Lab.ts
│       ├── Result.ts
│       ├── Study.ts
│       ├── Test.ts
│       └── User.ts
├── package.json
└── tsconfig.json
```

## Database Models

### User
- `id`: Integer (Primary Key, Auto Increment)
- `name`: String (Required)
- `email`: String (Required, Unique)
- `password`: String (Required)

### Lab
- `id`: Integer (Primary Key, Auto Increment)
- `name`: String (Required)
- `location`: String (Required)

### Study
- `id`: Integer (Primary Key, Auto Increment)
- `title`: String (Required)
- `description`: Text (Optional)

### Test
- `id`: Integer (Primary Key, Auto Increment)
- `name`: String (Required)
- `studyId`: Integer (Required, Foreign Key)

### Result
- `id`: Integer (Primary Key, Auto Increment)
- `testId`: Integer (Required, Foreign Key)
- `value`: String (Required)

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd back
```

2. Install dependencies:
```bash
npm install
```

3. Configure database connection:

Update the database credentials in [`src/models/index.ts`](src/models/index.ts) and [`src/index.ts`](src/index.ts):

```typescript
const sequelize = new Sequelize('lab_database', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});
```

4. Create the MySQL database:
```sql
CREATE DATABASE lab_database;
```

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with ts-node on `http://localhost:3000`

### Build
```bash
npm run build
```
Compiles TypeScript to JavaScript in the `dist/` directory

### Start Production
```bash
npm start
```
Runs the compiled JavaScript from `dist/index.js`

## API Endpoints

### Labs
- `GET /api/labs` - Get all labs (from [`LabController.getAllLabs`](src/controllers/LabController.ts))
- `POST /api/labs` - Create a new lab (from [`LabController.createLab`](src/controllers/LabController.ts))

### Users
- `GET /api/users` - Get all users (from [`UserController.getAllUsers`](src/controllers/UserController.ts))
- `POST /api/users` - Create a new user (from [`UserController.createUser`](src/controllers/UserController.ts))

### Studies
- `GET /api/studies` - Get all studies (from [`StudyController.getAllStudies`](src/controllers/StudyController.ts))
- `POST /api/studies` - Create a new study (from [`StudyController.createStudy`](src/controllers/StudyController.ts))

### Tests
- `GET /api/tests` - Get all tests (from [`TestController.getAllTests`](src/controllers/TestController.ts))
- `POST /api/tests` - Create a new test (from [`TestController.createTest`](src/controllers/TestController.ts))

### Results
- `GET /api/results` - Get all results (from [`ResultController.getAllResults`](src/controllers/ResultController.ts))
- `POST /api/results` - Create a new result (from [`ResultController.createResult`](src/controllers/ResultController.ts))

**Note**: Routes need to be implemented in [`src/index.ts`](src/index.ts)

## Development Setup

1. The application uses Sequelize ORM with auto-sync enabled
2. Database tables are automatically created on server start
3. Default sync mode: `{ force: false }` (preserves existing data)

## TypeScript Configuration

The project uses the following TypeScript configuration (from [`tsconfig.json`](tsconfig.json)):
- Target: ES6
- Module: CommonJS
- Strict mode enabled
- Output directory: `./dist`

## Environment Variables

Consider creating a `.env` file for configuration:
```env
DB_NAME=lab_database
DB_USER=root
DB_PASSWORD=password
DB_HOST=localhost
PORT=3000
```

## Future Improvements

- [ ] Add routing for controllers in [`src/index.ts`](src/index.ts)
- [ ] Implement authentication and authorization
- [ ] Add input validation middleware
- [ ] Implement error handling middleware
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Add unit and integration tests
- [ ] Implement environment variables support
- [ ] Add model relationships (associations)
- [ ] Implement pagination for GET endpoints
- [ ] Add logging system

## License

ISC