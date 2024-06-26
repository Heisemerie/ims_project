#!/bin/bash



# docker run --name postgres -e POSTGRES_PASSWORD=150048 -d postgres

docker run -d \
    --name postgres \
    -e POSTGRES_PASSWORD=150048 \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_DB=postgres \
    -p 5432:5432 \
    postgres