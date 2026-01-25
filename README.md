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
  Public-facing APIs consumed by frontend applications to browse, search,
  and discover published content.

The architecture focuses on **scalability**, **low coupling**, and
**future extensibility**, while remaining simple and maintainable.

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
│  └─ imports       # External content imports (CMS only)  
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

The CMS is an **internal system** used by editors and administrators to
manage audiovisual content.

It allows internal users to:

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

### CMS API Responsibilities

CMS APIs are designed for **internal usage only** and are consumed by
editors and administrators.

These APIs are responsible for:
- Creating and updating programs and episodes
- Managing content metadata
- Controlling publication status
- Managing categories and relationships
- Triggering content import operations

CMS endpoints are:
- Authenticated using JWT
- Authorized using role-based access control (Admin / Editor)

CMS APIs are **write-heavy** and optimized for data integrity,
validation, and correctness rather than high traffic.

---

## Discovery System

The Discovery system represents the **public-facing API layer** consumed
by frontend applications (web and mobile).

It exposes **read-only APIs** for public users, including:

- Listing programs
- Viewing program details
- Browsing episodes
- Searching content using filters and keywords

Only **published content** is exposed through Discovery APIs.

### Discovery API Responsibilities

Discovery APIs are responsible for:
- Browsing published programs
- Viewing program and episode details
- Searching and filtering content
- Supporting pagination for large datasets

Discovery APIs are:
- Public
- Read-only
- Do not require authentication
- Strictly limited to published content

This ensures frontend clients can safely consume content
without any exposure to CMS or administrative logic.

### Discovery Design Decision

Although Discovery is described as a separate system conceptually,
it is implemented within the same backend application.

The separation between CMS and Discovery is enforced logically through:
- Read-only endpoints
- Strict role-based access control
- Query-level filtering of published content

This approach keeps the architecture simple while preserving a clear
boundary between content management and content discovery.

If traffic or product requirements grow, the Discovery layer can be
extracted into a standalone service without impacting CMS logic.

---

## Search Strategy

The current implementation relies on PostgreSQL with indexed columns and
paginated queries.

The architecture supports future improvements such as:
- PostgreSQL Full-Text Search using `tsvector` and GIN indexes
- Dedicated search engines (e.g., Elasticsearch)
- Read-optimized denormalized views for high-traffic endpoints

---

## Importing External Content (CMS Extension)

The system supports importing content from external sources such as:
- YouTube
- RSS feeds
- CSV files
- External APIs

Importing content is considered part of the **CMS domain** and is not
exposed through Discovery APIs.

A dedicated `imports` module is responsible for:
- Creating and tracking import jobs
- Normalizing external data into internal content models
- Processing imports asynchronously using background jobs

Imported content becomes visible to Discovery APIs only
after successful processing and publication.

---

## Scalability Considerations

The system is designed to scale up to **millions of users per hour** by:

- Separating read and write concerns
- Applying pagination to all list endpoints
- Using proper database indexing
- Allowing future introduction of:
    - Caching layers (Redis)
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

## CMS vs Discovery Overview

| Aspect            | CMS                          | Discovery                    |
|-------------------|------------------------------|------------------------------|
| Audience          | Editors / Admins             | Public users (Frontend)      |
| Access            | Authenticated & Authorized   | Public (Read-only)           |
| Operations        | Create / Update / Publish    | Browse / Search / View       |
| Traffic Profile   | Low to medium                | High (Millions/hour)         |
| Optimization Goal | Data integrity & validation  | Performance & scalability   |

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

The system clearly separates **content management concerns** from
**content discovery concerns**, while keeping the implementation simple
and adaptable for future growth.

---

## License

This project is licensed under the MIT License.
