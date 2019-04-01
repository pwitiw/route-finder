FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80

# docker build . -t frontwit-routes -f ../dockerfile
# docker run -d -p 9999:80 --name frontwit-routes frontwit-routes