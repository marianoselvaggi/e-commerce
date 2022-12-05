# TESLO

First, run the development server:

## Install Mongodb
```bash
docker-compose up -d
```

## Configure .env
```
cp .env.template .env
```
Add the values in the .env file

## Load the data in the db
```
    http:\\localhost:3000\seed
```

## run the app
```bash
yarn dev
```