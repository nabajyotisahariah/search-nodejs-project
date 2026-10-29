# Search Service

A small Express service that provides a health check and a sample search response.

## Requirements

- Node.js 24 or later
- npm

## Run locally

Install dependencies and start the development server:

```sh
npm ci
npm run dev
```

The service listens on port `3000` by default. Set the `PORT` environment variable
to use a different port. To start the service with the production script, run
`npm start`.

## API

The routes are available both at the root and under the `/api/search` prefix.

| Method | Path | Response |
| --- | --- | --- |
| GET | `/health` or `/api/search/health` | `{"status":"ok"}` |
| GET | `/getsearch` or `/api/search/getsearch` | `{"status":"ok","data":{"search":"This is a search result"}}` |
| GET | `/` or `/api/search` | `{"message":"Search Service"}` |

## Run with Docker

Build the image and publish the service on port `3000`:

```sh
docker build -t search-service:1.0 .
docker run --rm -p 3000:3000 search-service:1.0

docker tag search-service:1.0 \
      asia-south2-docker.pkg.dev/weather-project-prod-511603/ecommerce-nodejs-app-repo/search-service:1.0

docker push asia-south2-docker.pkg.dev/weather-project-prod-511603/ecommerce-nodejs-app-repo/search-service:1.0
```

Then check the health endpoint at <http://localhost:3000/health>.

## Run with Docker Compose

The Compose configuration builds the image and connects it to the external
`monorepo-network` network. Create that network if it does not already exist:

```sh
docker network create monorepo-network
docker compose up --build
```

Compose exposes port `3000` to containers on its networks, but does not publish
it to the host. Use the Docker command above to access the service from the host,
or add a `ports` mapping to the Compose configuration when host access is needed.
