Secure Task Management System

⸻

Project Overview

This project is a Secure Task Management System built as a full-stack application. It demonstrates secure authentication, role-based authorization, organization-level data access, and task lifecycle management.

The purpose of this project is to showcase:
	•	Secure backend architecture
	•	Scalable modular design
	•	Role-based access control (RBAC)
	•	Modern Angular frontend integration

⸻

Tech Stack

Backend
	•	NestJS
	•	TypeScript
	•	TypeORM
	•	PostgreSQL / SQLite
	•	JWT Authentication
	•	Passport Strategy

Frontend
	•	Angular (Standalone Components)
	•	Nx Workspace
	•	REST API Integration

Styling
	•	Custom CSS

⸻

Architecture

The backend follows a modular structure:

Auth Module
	•	User authentication
	•	JWT generation
	•	Token validation

Users Module
	•	User entity management
	•	Role assignment

Organizations Module
	•	Multi-tenant organization grouping

Tasks Module
	•	CRUD operations
	•	Role-restricted access

Frontend communicates with backend via secured REST APIs using JWT tokens.

⸻

Role-Based Access Control

OWNER
	•	Create tasks
	•	Update task status
	•	Delete tasks

ADMIN
	•	View organization tasks
	•	Update task status
	•	Cannot delete tasks

VIEWER
	•	Read-only access to tasks

⸻

Key Features
	•	Secure JWT authentication
	•	Role-based authorization
	•	Organization-level multi-tenancy
	•	Task creation, updating, and deletion
	•	Status tracking:
	•	TODO
	•	IN_PROGRESS
	•	DONE
	•	Responsive dashboard UI

⸻

API Endpoints

Authentication

POST /api/auth/login

Authenticate user and receive JWT token.

⸻

Tasks

GET /api/tasks

Retrieve organization tasks.

POST /api/tasks

Create new task.

PATCH /api/tasks/:id

Update task status.

DELETE /api/tasks/:id

Delete task (OWNER role only).

⸻

Setup Instructions

Backend
	1.	Install dependencies:
      npm install
  2. Configure environment variables
      	•	JWT_SECRET
      	•	Database configuration
  3. Run backend:
        cd dashboard

Frontend
   1. Navigate to dashboard:
        cd dashboard
   2. Install dependencies:
        npm install
   3. Start application:
        npx nx serve dashboard
Security Considerations
	•	JWT validation using authentication strategy
	•	Role-based authorization guards
	•	Organization-level filtering prevents data leaks
	•	Unauthorized requests return HTTP 403

⸻

Demo Flow (Video Guide)
	1.	Login as OWNER:

	•	Create task
	•	Update status
	•	Delete task

	2.	Login as ADMIN:

	•	Update task status
	•	Cannot delete tasks

	3.	Login as VIEWER:

	•	Read-only dashboard access

	4.	Demonstrate token-based authentication workflow.

⸻

Future Improvements
	•	Pagination support
	•	Real-time updates (WebSockets)
	•	Advanced filtering and search
	•	Enhanced UI styling
