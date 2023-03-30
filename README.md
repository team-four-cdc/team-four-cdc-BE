# Portal Article [BE]

Portal Article is a platform for user to be able to create and share their article. This project is build for Mitrais CDC Project.

## Requirements

- Node.js (v.16)
- Postgre SQL
- SMTP Server

## Initial Setup

1. Setup your postgres in your local
2. Create SMTP account in mailtrap (or can use the on in .env.example)
3. Adjust .env file, can copy from .env.example
4. Install depedencies (npm install)
5. Running migration (npm run migrate)
6. Running local server (npm run dev)

## Deployment

WIP

## Testing

For testing, create the test file in test folder
Run all the test using command :

```
npm run test
```

Check the coverage using command

```
npm run test:coverage
```

## Docker

You can run this project using docker, we already support docker compose

```
docker compose up -d
```
