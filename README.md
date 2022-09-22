#Requirements
docker, docker-compose, prisma-cli, Node, NPM

Make sure your local postgres is down and 5432 port is available or change port in docker-compose.yml
#Development set up

```mv .env.example .env```

```docker-compose run app```

```docker-compose run postgres```

Run migrations
``npx prisma migrate dev``
