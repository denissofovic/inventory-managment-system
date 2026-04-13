#!/bin/bash

docker rm -f sql1 backend frontend
docker network rm denis
docker rmi backend frontend