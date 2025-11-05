# UPSTDC Multi-Container Integration Guide

This document describes how to wire the Angular frontend, Spring Boot backend, and PostgreSQL database containers for local development and production.

## 1) Frontend (Angular) API Base URL

- Dev server: Angular runs at http://localhost:3000
- Backend server: Spring Boot runs at http://localhost:3001

Angular environment is configured to call the backend at:
- Development: http://localhost:3001/api
- Production: Set `environment.prod.ts` to your reverse-proxied API origin, e.g., https://api.example.com/api

The Angular services reference `environment.apiBaseUrl`. No additional changes are needed in the services.

## 2) Backend (Spring Boot) CORS

Ensure Spring Boot allows the Angular origin and exposes the Authorization header:

Example (Java config):
```java
@Bean
public WebMvcConfigurer corsConfigurer() {
  return new WebMvcConfigurer() {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
      registry.addMapping("/api/**")
          .allowedOrigins("http://localhost:3000")
          .allowedMethods("GET","POST","PUT","DELETE","PATCH","OPTIONS")
          .allowedHeaders("*")
          .exposedHeaders("Authorization")
          .allowCredentials(true)
          .maxAge(3600);
    }
  };
}
```

Alternatively, in `application.properties` (Spring 6+ with spring.autoconfigure for CORS):
```
# Example for Spring Web MVC CORS configuration properties if used
# management.endpoints.web.cors.allowed-origins=http://localhost:3000
```

Note: For production, replace origins with your actual site URL(s).

## 3) Database (PostgreSQL) Datasource

The PostgreSQL container is exposed on port 5001 (based on the preview listing). Use these defaults unless your environment dictates otherwise:

- Host: localhost
- Port: 5001
- Database: myapp
- Username: appuser
- Password: myapp

Spring Boot `application.properties` (or `application.yml`) should include:
```
spring.datasource.url=jdbc:postgresql://localhost:5001/myapp
spring.datasource.username=appuser
spring.datasource.password=myapp
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

If your project’s DB is actually on 5000, update the `spring.datasource.url` to use 5000. The current environment indicates 5001.

## 4) Hibernate DDL Strategy

To use schema created by the DB container and preserve data, set:
```
spring.jpa.hibernate.ddl-auto=validate
```

If you need Hibernate to auto-create or evolve schema in development:
```
spring.jpa.hibernate.ddl-auto=update
```

Recommendation:
- Development: `update`
- Production: `validate` (apply DDL via migrations such as Flyway/Liquibase)

If using Flyway:
```
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
```

## 5) JWT and Authorization Header

The Angular app sends `Authorization: Bearer <token>` via an HTTP interceptor. Ensure your backend security config:
- Accepts Bearer tokens
- Sends `WWW-Authenticate` or appropriate 401/403 responses
- Includes `Authorization` in `exposedHeaders` for CORS as above

## 6) Reverse Proxy and SSL (Production)

Front your application with Nginx or Apache:
- Terminate SSL at the proxy
- Proxy Angular (static) and API requests to the respective services
- Use HSTS and secure headers

Example Nginx (simplified):
```
server {
  listen 443 ssl http2;
  server_name app.example.com;

  ssl_certificate     /etc/letsencrypt/live/app.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/app.example.com/privkey.pem;

  # Frontend SPA
  location / {
    proxy_pass http://frontend:4000; # Angular SSR or static hosting upstream
    proxy_set_header Host $host;
  }
}

server {
  listen 443 ssl http2;
  server_name api.example.com;

  ssl_certificate     /etc/letsencrypt/live/api.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;

  # Backend API
  location /api/ {
    proxy_pass http://spring-backend:8080/; # Spring Boot upstream
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

If serving both app and API on the same domain:
- Use path-based routing (e.g., `/` to frontend, `/api/` to Spring).
- Configure CORS origins appropriately (if same origin, CORS can be simplified).

## 7) Local Development Quickstart

- Start PostgreSQL container (listening on 5001 with appuser/myapp).
- Start Spring Boot backend on port 3001 with datasource and CORS configured as above.
- Start Angular:
  ```
  cd angular_frontend
  npm install
  npm start
  ```
  Open http://localhost:3000

Verify API calls from the Angular app go to `http://localhost:3001/api`.

## 8) Environment Variables

Do not hardcode credentials in code. Use environment files:
- Spring: set via environment variables or externalized `application.properties`.
- Angular: use environment.ts for development; override with CI/CD for production builds.

Keep secrets out of version control.

---
Checklist:
- [ ] Angular environment.apiBaseUrl -> http://localhost:3001/api
- [ ] Spring CORS allows http://localhost:3000 and exposes Authorization
- [ ] Spring datasource points to Postgres on port 5001 with appuser/myapp
- [ ] Hibernate ddl-auto set appropriately (validate/update) or use Flyway
- [ ] Reverse proxy/SSL configured for production
