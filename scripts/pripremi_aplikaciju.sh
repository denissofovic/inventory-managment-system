#!/bin/bash

docker network create denis


docker build -t backend ../backend
docker build -t frontend ../frontend

