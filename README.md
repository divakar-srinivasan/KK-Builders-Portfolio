# Live Server

https://kk-builders-portfolio-frontend.onrender.com

---

# 🏗️ KK Builders Portfolio Platform

KK Builders Portfolio Platform is a full-stack web system for presenting a construction company's brand, services, project portfolio, and blog content, with a separate admin interface for managing website content. The repository is organized as a multi-application codebase with:

- 🌐 a public-facing React website for prospective customers
- 🛠️ a dedicated React admin console for internal content operations
- 🚀 an Express + MongoDB backend for authentication, content persistence, and contact email workflows

The business problem it addresses is straightforward and practical: construction businesses need a digital presence that does more than act as a static brochure. This system combines lead capture, portfolio discovery, company storytelling, and lightweight CMS capabilities so the business can market services and keep content fresh without redeploying the frontend for every update.

## 👥 Target users

- 🏠 Prospective residential or commercial customers exploring services and past work
- 👷 Internal business users managing projects and blog posts
- 📢 Marketing or operations teams maintaining website content

## 1. 📝 Project Overview

The platform is designed for a construction and architecture business operating as a service-led company with a portfolio-driven sales funnel. The public website highlights:

- 🛎️ Service offerings
- 🏆 Project categories such as `Prestigious`, `Ongoing`, `Completed`, and `Upcoming`
- ✍️ Blog content for credibility and thought leadership
- 🏢 Company profile, process flow, and location details
- 📬 A structured contact form for inquiry capture

The admin application provides a simple internal workspace to:

- 🔐 Authenticate as an administrator
- 🏗️ Create, update, and delete projects
- 📰 Create, update, and delete blog posts
- 🖼️ Upload images alongside portfolio and blog content

## 2. 🏛️ Architecture Overview

### 🖥️ System Style

This is a client-server architecture with three deployable applications in one repository:

1. `frontend/`: 🌐 public single-page application
2. `admin/`: 🛠️ internal single-page application
3. `backend/`: 🚀 REST-style API and email service

At a high level, the backend behaves as a lightweight monolith. It centralizes API routing, authentication, database access, and email integration in one Express service.

### 🏗️ Architectural Characteristics

- ⚛️ Frontend pattern: React SPA with route-based views using `react-router-dom`
- 🗂️ Backend pattern: layered Express application with `routes -> controllers -> models`
- 🗄️ Data access pattern: Mongoose models for MongoDB persistence
- 🔑 Authentication pattern: username/password login that returns a JWT
- 📝 Content management pattern: admin-managed portfolio and blog CRUD
- ✉️ Integration pattern: email notifications via Nodemailer for contact submissions

### 🔄 Data Flow

```text
Public User
   |
   v
Frontend SPA (React/Vite)
   |
   +---- GET /api/admin/get ---------> Projects from MongoDB
   |
   +---- GET /api/blog/get ----------> Blogs from MongoDB
   |
   +---- POST /api/contact/send-email -> Email notification + customer confirmation

Admin User
   |
   v
Admin SPA (React/Vite)
   |
   +---- POST /api/admin/login ------> JWT token
   |
   +---- POST /api/admin/add --------> Create project
   |
   +---- PUT /api/admin/update/:id --> Update project
   |
   +---- DELETE /api/admin/delete/:id -> Delete project
   |
   +---- POST /api/blog/add ---------> Create blog
   |
   +---- PUT /api/blog/update/:id ---> Update blog
   |
   +---- DELETE /api/blog/delete/:id -> Delete blog
   |
   v
Express API
   |
   +---- MongoDB via Mongoose
   |
   +---- Gmail SMTP via Nodemailer
```

### 💡 Notable Design Decisions Visible in Code

- The public site and admin site are separated into different React applications instead of role-based routing inside a single bundle.
- Images are uploaded via `multer` in memory and stored directly in MongoDB as `Buffer` fields.
- Lead inquiries are processed as email transactions rather than being stored in a database collection.
- The backend exposes focused content APIs rather than a generalized CMS abstraction.

## 3. 🧰 Tech Stack

### ⚛️ Frontend

- React `18.3.1` in `frontend/`
- React `19.0.0` in `admin/`
- Vite `6.x`
- Tailwind CSS `4.1.5`
- React Router DOM `7.1.5`
- Axios `1.7.9`
- Framer Motion `12.x`
- GSAP `3.12.7` in the public app
- React Slick + Slick Carousel for slideshows
- React CountUp
- React Intersection Observer
- React Icons
- React Dropzone in the admin app

### 🛠️ Backend

- Node.js
- Express `4.21.2`
- Mongoose `8.10.0`
- JSON Web Token `9.0.2`
- bcryptjs `3.0.0` included in dependencies
- Multer `1.4.5-lts.1`
- Nodemailer `6.10.1`
- CORS `2.8.5`
- dotenv `16.4.7`

### 🗄️ Database

- MongoDB
- Mongoose ODM with two persisted content models:
  - `Project`
  - `Blog`

### 🛠️ Tooling

- ESLint `9.x`
- `@vitejs/plugin-react-swc`
- `@tailwindcss/vite`

### 🚀 DevOps / Operations

- No Dockerfiles are committed
- No CI/CD workflow files are committed
- No infrastructure-as-code manifests are present in the repository

## 4. ✨ Features & Functionalities

### 🌐 Public Website

- Animated landing experience with a session-based intro screen
- Homepage storytelling sections for company positioning and trust building
- Service catalog with modal-based detail expansion
- Process-flow visualization for customer onboarding and delivery stages
- Project showcase with category-based filtering
- Blog listing with date-based sorting
- Architecture/design page featuring 3D elevation, structural, and plumbing design presentation
- About page with company vision, mission, team profile, and FAQ
- Embedded Google Maps location section
- Lead capture form for construction inquiries

### 🛠️ Admin Console

- Credential-based admin login
- Session-based route protection in the browser
- Project CRUD with image upload and category assignment
- Blog CRUD with image upload, author, publication date, and content fields
- Modal-driven edit and delete confirmation flows

### 🚀 Backend Services

- MongoDB persistence for projects and blogs
- JWT issuance for admin login
- Multipart form handling for media uploads
- Email notification to the business on inquiry submission
- Automatic confirmation email sent back to the customer

### 🌍 Real-World Relevance

This is not a generic CMS. The product is tailored for a construction business sales journey:

- project categories help communicate delivery maturity
- service modules support top-of-funnel exploration
- blog content adds authority and SEO value
- inquiry forms convert visitors into leads
- admin CRUD keeps marketing content current without code changes

## 5. 📁 Folder Structure

The structure is intentionally split by runtime responsibility rather than forcing all code into a single app. That keeps the public site lightweight, the admin UX isolated, and the backend independently deployable.

```text
.
|-- admin/
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   |   |-- blogPages/
|   |   |   `-- projectPages/
|   |   |-- assets/
|   |   |-- App.jsx
|   |   `-- main.jsx
|   |-- package.json
|   `-- vite.config.js
|
|-- backend/
|   |-- src/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- middleware/
|   |   |-- models/
|   |   `-- routes/
|   |-- server.js
|   `-- package.json
|
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- assets/
|   |   |-- components/
|   |   |   |-- child-components/
|   |   |   |   `-- home-components/
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- package.json
|   `-- vite.config.js
|
`-- README.md
```

### 🤔 Why This Structure Works

- `frontend/` isolates customer-facing concerns such as storytelling, portfolio browsing, and lead generation.
- `admin/` keeps internal operational workflows separate from the public bundle and avoids exposing admin code paths in the main app.
- `backend/src/routes/` defines HTTP boundaries clearly.
- `backend/src/controllers/` contains request orchestration and business actions.
- `backend/src/models/` keeps persistence contracts explicit and small.
- `backend/src/config/` centralizes environment and database bootstrapping.
- `backend/src/middleware/` provides a place for cross-cutting concerns such as auth verification.

This is a maintainable shape for a small business platform because teams can evolve the marketing site, operations console, and API somewhat independently.

## 6. 🛠️ Key Engineering Decisions

### 🔀 Separate Public and Admin Applications

The repo uses two Vite applications instead of one application with role-aware routes.

Why it helps:

- simpler mental model
- cleaner separation of public vs internal UI concerns
- smaller public bundle
- easier permission boundary at deployment time

Trade-off:

- duplicated frontend tooling and dependency management
- separate environment configuration for each app

### 🗄️ MongoDB for Content Storage

Projects and blogs are modeled as document entities, which fits the flexible shape of marketing content well.

Why it helps:

- schema evolution is lightweight
- blog/project documents are naturally document-oriented
- fast iteration for small teams

Trade-off:

- no relational enforcement between content entities
- binary image storage inside documents can increase document size and reduce portability compared with object storage

### 🖼️ In-Database Image Storage

Uploaded images are stored as `Buffer` fields in MongoDB and converted to base64 on the client.

Why it may have been chosen:

- simple initial implementation
- avoids separate file storage infrastructure
- keeps project/blog data self-contained

Trade-off:

- higher payload sizes
- increased memory pressure in API and browser
- less cache-friendly than CDN/object storage approaches

### ✉️ Email-First Lead Handling

Contact submissions are sent directly through Nodemailer rather than persisted to a leads table.

Why it helps:

- immediate operational usefulness
- minimal backend complexity
- no admin CRM screen required

Trade-off:

- no inquiry audit trail in the application database
- harder reporting and follow-up automation

## 7. ⚙️ Setup & Installation

### 📝 Prerequisites

- Node.js `18+` recommended
- npm
- MongoDB instance, local or cloud-hosted
- Gmail account or SMTP-compatible credentials for email delivery

### 🔑 Environment Variables

The backend expects the following variables:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password_or_smtp_password
```

The frontend and admin apps reference:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Note:

- most API calls use `VITE_API_BASE_URL`
- the public contact page currently posts directly to `http://localhost:5000/api/contact/send-email`, so production setup should align this endpoint or refactor it to use the same environment-based base URL

### 📦 Installation

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../admin
npm install
```

### 🏃 Run Locally

Start the backend:

```bash
cd backend
node server.js
```

Start the public frontend:

```bash
cd frontend
npm run dev
```

Start the admin frontend:

```bash
cd admin
npm run dev
```

### 📝 Local Runtime Notes

- both Vite apps are configured for port `3000` in their respective `vite.config.js`, so they cannot run simultaneously without changing one port
- the public frontend binds to `0.0.0.0`
- the admin frontend binds to `127.0.0.1`

### 🐳 Docker / CI/CD

Docker, pipeline, and deployment manifests are not present in the repository. Operational setup currently appears to be manual.

## 8. 📚 API Documentation

The backend exposes a focused REST-style surface for admin auth, projects, blogs, and contact email handling.

### 🔐 Authentication

#### `POST /api/admin/login`

Authenticates the admin user against environment-configured credentials.

Request:

```json
{
  "username": "admin",
  "password": "secret"
}
```

Response:

```json
{
  "token": "jwt-token"
}
```

### 🛡️ Admin Token Validation

#### `GET /api/admin/protected`

Requires `Authorization: Bearer <token>`.

Response:

```json
{
  "message": "Access granted to admin"
}
```

### 🏗️ Projects

#### `POST /api/admin/add`

Multipart form request:

- `image`: file
- `description`: string
- `projectType`: string

Response:

```json
{
  "message": "Project created successfully",
  "project": {
    "_id": "...",
    "description": "...",
    "projectType": "Completed"
  }
}
```

#### `GET /api/admin/get`

Returns all project documents.

#### `PUT /api/admin/update/:id`

Multipart form request with any updatable fields:

- `image`
- `description`
- `projectType`

#### `DELETE /api/admin/delete/:id`

Deletes a project by id.

### 📰 Blogs

#### `POST /api/blog/add`

Multipart form request:

- `image`: file
- `title`: string
- `author`: string
- `date_published`: date string
- `content`: string

#### `GET /api/blog/get`

Returns all blog documents.

#### `PUT /api/blog/update/:id`

Updates one or more blog fields and optionally replaces the image.

#### `DELETE /api/blog/delete/:id`

Deletes a blog by id.

### 📬 Contact

#### `POST /api/contact/send-email`

Accepts a structured inquiry payload and triggers:

- an internal email to the business
- a confirmation email to the customer

Representative request shape:

```json
{
  "name": "Customer Name",
  "email": "customer@example.com",
  "phone": "1234567890",
  "location": "Erode",
  "constructionType": "New Construction",
  "projectSize": "2400",
  "budget": "50L",
  "timeline": "6 months",
  "additionalQueries": "Need vastu-compliant design",
  "howDidYouHearAboutUs": "Google"
}
```

## 9. 🎨 UI/UX Overview

### 🌐 Public Experience

The public website is built as a visually expressive, animation-heavy marketing experience. It uses:

- full-screen hero sections
- modals for deep content reveal
- animated counters and in-view transitions
- card-based browsing for projects, blogs, and services
- embedded map/location callouts

Key pages:

- `/`: homepage with intro, trust messaging, services, process flow, stats, and location
- `/project`: portfolio exploration with project-type filtering
- `/blog`: blog discovery with chronological sorting
- `/architect`: architecture/design capability showcase
- `/about`: company narrative, FAQ, and CTA
- `/contact`: lead capture form

### 🛠️ Admin Experience

The admin UI is intentionally simple and task-oriented:

- login screen
- project listing and creation flow
- blog listing and creation flow
- modal-based editing and deletion

### 🗂️ State Management

State is managed locally with React hooks:

- `useState` for UI and form state
- `useEffect` for lifecycle-driven data fetching and animation triggers
- `sessionStorage` for intro playback state and admin token storage

There is no global client-side state library such as Redux, Zustand, or React Query.

### 📱 Responsiveness & Accessibility

Observed strengths:

- responsive layouts via Tailwind utility classes
- mobile menu behavior on both public and admin sites
- semantic form controls in most user-facing flows

Current limitations visible in code:

- accessibility is mostly incidental rather than systematically engineered
- no explicit focus management or keyboard interaction strategy for modals
- no shared design system or accessibility primitives

## 10. 📈 Scalability & Performance

### 💪 Existing Strengths

- frontend and admin are split, which reduces unnecessary code in the public experience
- MongoDB models are narrow and easy to evolve
- content fetches are simple and predictable
- Vite-based build tooling keeps local iteration fast

### ⚠️ Current Constraints

- images are stored and returned as binary data from MongoDB, then converted to base64 in the browser
- no server-side pagination for projects or blogs
- no caching layer
- no CDN or object storage integration
- no request throttling, background jobs, or queueing

### 📊 How the System Would Handle Growth Today

The current implementation is suitable for a small to medium content volume and a modest admin workload. It would begin to strain if:

- the image catalog grows significantly
- blog/project records become numerous enough to require paging
- inquiry volume increases and needs workflow tracking
- multiple admins need stronger access controls

## 11. 🔒 Security Considerations

### ✅ Implemented

- admin authentication uses JWTs
- environment variables keep secrets out of source code
- admin client routes are protected in the browser by token presence
- multipart parsing is isolated through Multer

### 👀 Important Observations

- backend token verification middleware exists, but content mutation routes are not currently guarded with `verifyAdmin`
- admin credentials are compared directly against environment variables rather than a persisted user store
- tokens are stored in `sessionStorage`, which is simple but not the strongest browser-side storage strategy for sensitive admin sessions
- request validation is minimal and primarily checks required fields

These choices are reasonable for an early-stage internal admin workflow, but production hardening would require stronger server-side authorization and validation.

## 12. 🧪 Testing Strategy

No automated test suites are committed in this repository.

**What is present:**

- ESLint configuration in both frontend applications

**What is not present:**

- unit tests
- integration tests
- end-to-end tests
- API contract tests

For a production rollout, the most valuable first additions would be:

- controller-level API tests for auth, project CRUD, blog CRUD, and contact submission
- component tests for admin forms and modal workflows
- end-to-end tests covering login, content creation, and public content visibility

## 13. 🚀 Deployment

The repository does not contain deployment manifests, container definitions, or cloud provisioning files, so deployment is not fully codified in source control.

Based on the code structure, the intended deployment model is likely:

- `frontend/`: static hosting for the public SPA
- `admin/`: static hosting for the admin SPA, ideally behind additional access controls
- `backend/`: Node.js process hosting with access to MongoDB and SMTP credentials

**Suggested environment split:**

- Development: local Vite + local/remote API
- Staging: static builds + shared staging API and MongoDB instance
- Production: static builds + hardened API + managed database + SMTP/app-password secrets

## 14. 🔮 Future Improvements

- Protect all create, update, and delete endpoints with server-side JWT verification
- Move image storage to object storage such as S3 or Cloudinary and store URLs instead of binary blobs
- Add pagination, filtering, and query parameters to project/blog APIs
- Normalize API base URL usage across all frontend modules, especially the contact page
- Add schema validation using tools such as Joi or Zod on incoming requests
- Introduce automated tests and CI pipelines
- Add auditability for contact submissions by persisting inquiries in MongoDB
- Support multiple admin users with role-based access control
- Introduce observability with structured logging and error monitoring
- Add deployment manifests and environment-specific build documentation

## 15. 🤝 Contribution Guidelines

1. Fork the repository and create a feature branch from the main development line.
2. Keep changes scoped to one application boundary where possible: `frontend`, `admin`, or `backend`.
3. Preserve the existing layering in the backend: routes should stay thin, controllers should own request handling, and models should define persistence.
4. Prefer environment-driven configuration over hardcoded URLs or secrets.
5. Validate any API or UI changes against both the public site and admin flows when relevant.
6. Run linting and manual smoke checks before opening a pull request.
7. Document any new environment variables, routes, or operational assumptions in this README.

## 16.🖼️ Screenshot 

<img width="1488" height="626" alt="Screenshot 2026-04-13 154124" src="https://github.com/user-attachments/assets/bf0f35d2-fe21-4217-b3b6-feff33dc3297" />
<img width="1902" height="818" alt="Screenshot 2026-04-13 154140" src="https://github.com/user-attachments/assets/5f625b9f-7b1b-4a93-be7c-aa7782ae3c88" />
<img width="1902" height="971" alt="Screenshot 2026-04-13 154158" src="https://github.com/user-attachments/assets/d21aa912-4fb3-456e-a478-02672af7860c" />
<img width="1900" height="971" alt="Screenshot 2026-04-13 154215" src="https://github.com/user-attachments/assets/87084a39-3c4f-47b4-a836-dd6f3f1fe157" />
<img width="1899" height="942" alt="Screenshot 2026-04-13 154235" src="https://github.com/user-attachments/assets/0d07d49e-b979-450b-bb7b-4777874a85e7" />
<img width="1901" height="967" alt="Screenshot 2026-04-13 154255" src="https://github.com/user-attachments/assets/2b8b2bf7-43f6-4ad6-b1bd-2b7374557e1d" />
<img width="1899" height="972" alt="Screenshot 2026-04-13 154323" src="https://github.com/user-attachments/assets/fa169c48-174c-4380-8d1c-6ee1e4150e7b" />
<img width="1903" height="972" alt="Screenshot 2026-04-13 154347" src="https://github.com/user-attachments/assets/b757f3c7-28a3-4097-8e36-f87dd5cbd086" />
<img width="1902" height="970" alt="Screenshot 2026-04-13 154410" src="https://github.com/user-attachments/assets/80103ba0-58bc-44e2-ac0f-7dd7f7342d9f" />
<img width="1902" height="972" alt="Screenshot 2026-04-13 154429" src="https://github.com/user-attachments/assets/8a64bd7f-28a9-4157-b6fd-71e0dc022456" />
<img width="1909" height="970" alt="Screenshot 2026-04-13 154452" src="https://github.com/user-attachments/assets/8f496f32-2020-4243-aba0-cf5416da2b1f" />
<img width="1903" height="973" alt="Screenshot 2026-04-13 154514" src="https://github.com/user-attachments/assets/f7ac7a77-7a96-4cd1-b94b-71d835522799" />

## 17. 🔎 Contact

For any queries or support, feel free to reach out:

- **Email**: sdivakar2005@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/divakar-srinivasan/
- **GitHub**: [divakar-srinivasan](https://github.com/divakar-srinivasan)

---

Made with ❤️ by DIVAKAR S.
