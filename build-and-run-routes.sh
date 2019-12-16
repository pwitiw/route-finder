#!bin/bash
docker build --no-cache . -t frontwit-routes
docker run -d -p 9999:80 --name frontwit-routes frontwit-routes