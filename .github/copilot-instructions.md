# Copilot Instructions

## Project Guidelines
- Admin API endpoints use '/api/properties' (client should call '/properties' on adminApi base) — avoid '/poweradmin/properties' path. Also do not set Content-Type manually when sending FormData in adminApi requests.