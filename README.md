<p align="center">
  <a href="https://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  Scalable backend system for managing and discovering audiovisual content,
  built with <a href="http://nodejs.org" target="_blank">Node.js</a> and NestJS.
</p>

---

## Description

This project implements a **Content Platform Backend** designed as part of a
Senior Backend Engineer technical assignment.

The system is composed of two main components:

- **Content Management System (CMS)**  
  Internal APIs used by editors and administrators to create, manage, and publish content.

- **Discovery System**  
  Public-facing APIs allowing users to browse, search, and discover published content.

The architecture focuses on **scalability**, **low coupling**, and **future extensibility**.

---

## Tech Stack

- **Language:** TypeScript
- **Framework:** NestJS
- **Database:** PostgreSQL
- **Architecture:** Modular Monolith
- **Other Concepts:**
    - Role-based authorization
    - Background jobs
    - Event-driven patterns
    - Pagination & filtering
    - Internationalization (i18n)

---

## Project Structure

src/  
├─ modules/  
│  ├─ auth          # Authentication & authorization  
│  ├─ users         # Users & roles  
│  ├─ programs      # Programs (podcasts / documentaries)  
│  ├─ episodes      # Episodes under programs  
│  ├─ categories    # Content categorization  
│  └─ imports       # (Future) external content imports  
│  
├─ common/           # Guards, decorators, base utilities  
├─ shared/           # Shared DTOs & interfaces  
├─ database/         # Database config & entities  
├─ events/           # Domain events  
├─ jobs/             # Background jobs  
├─ i18n/             # Localization  
├─ health/           # Health checks  
└─ main.ts

Each module owns its domain logic and does not depend on the internal
implementation of other modules.

---

## Content Management System (CMS)

The CMS allows internal users (editors, admins) to:

- Create and update programs (podcasts, documentaries, etc.)
- Manage episodes under each program
- Assign categories
- Control metadata such as:
    - Title
    - Description
    - Language
    - Duration
    - Publish date
    - Visibility and status (draft / published)

All CMS endpoints are protected using authentication and role-based guards.

---

## Discovery System

The Discovery system exposes **read-only APIs** for public users, including:

- Listing programs
- Viewing program details
- Browsing episodes
- Searching content using filters and keywords

Only **published content** is exposed through the Discovery APIs.

This separation ensures:
- Safe public access
- Optimized read operations
- Clear responsibility boundaries

---

## Search Strategy

The current implementation relies on PostgreSQL with indexed columns and
paginated queries.

The architecture supports future improvements such as:

- PostgreSQL Full-Text Search using `tsvector` and GIN indexes
- Dedicated search engines (e.g., Elasticsearch)
- Read-optimized denormalized views for high-traffic endpoints

---

## Importing External Content (Future Extension)

The system is designed to support importing content from external sources such as:

- YouTube
- RSS feeds
- CSV files
- External APIs

A dedicated `imports` module can be introduced to:

- Track import jobs
- Normalize external content into internal models
- Process imports asynchronously using background jobs

This design prevents tight coupling between CMS logic and external integrations.

---

## Scalability Considerations

The system is designed to scale up to **millions of users per hour** through:

- Clear separation of read and write operations
- Pagination on all list endpoints
- Proper database indexing
- Ability to add:
    - Caching (Redis)
    - Read replicas
    - CDN for media delivery
    - Rate limiting for public APIs

---

## SOLID & Low Coupling

Key principles applied:

- **Single Responsibility:** Each module handles one domain concern
- **Open/Closed:** Modules are extendable without modification
- **Dependency Inversion:** Controllers depend on services, not implementations
- **Low Coupling:** Shared logic lives in `common` and `shared` layers

---

## Trade-offs & Future Improvements

Given more time, the following improvements would be implemented:

- Separate CMS and Discovery into independent services
- Introduce CQRS with dedicated read models
- Add recommendation and personalization features
- Add analytics and content performance tracking
- Implement fine-grained editor permissions

---

## Project Setup

npm install

---

## Compile and Run

development  
npm run start

watch mode  
npm run start:dev

production  
npm run start:prod

---

## Run Tests

unit tests  
npm run test

e2e tests  
npm run test:e2e

coverage  
npm run test:cov

---

## Conclusion

This project prioritizes clarity, scalability, and maintainability over
over-engineering.  
The architecture is intentionally designed to evolve with future requirements
while maintaining clean boundaries and low coupling.

---

## License

This project is licensed under the MIT License.
