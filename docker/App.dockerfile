FROM ubuntu:rolling

RUN mkdir /app

RUN apt-get update && apt-get -y install curl

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app
