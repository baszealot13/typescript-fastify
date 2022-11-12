# typescript-fastify

- NodeJS 14

## Deploy with local
```
npm install
npm run dev
```

## Deploy with Docker
```
docker build -f Dockerfile -t typescript-fastify-backend .
docker run --name main_api_service -d -p 3030:3030 typescript-fastify-backend

# Docker basic command
docker images # Check image have run
docker image rm -f {image name or ID} # remove image
docker ps # Check container have run
docker rm -f {contain name or ID} # remove container

# Open container terminal
docker exec -it {CONTAINER_ID} /bin/bash 
```

## Deploy with Docker compose
```
docker-compose up -d --build
```