# Spin up 10 Nodejs containers and 2 Nginx containers. Ng1 load balance nodeapp1-5 and ng2 load balance nodeapp6-10

## Build nodeapp image 
_Create node server_

const express = require("express");
const app = express();
const os = require("os");

app.get("/", (req, res) => res.send("Hello from " + os.hostname()));
app.listen(8080, () => console.log("Listening on port 8080 from " + os.hostname()));

_Pre create Dockerfile_

npm init -y
npm install express 

_Dockerfile_

FROM node:12
WORKDIR /home/node/app
COPY app /home/node/app
RUN npm install 
CMD node index.js 

_Build image_

docker build . -t nodeapp

## Docker create network

docker network create backendnet

## Docker run nodeapp containers

docker run --name nodeapp1 --hostname nodeapp1 --network=backendnet -d nodeapp

## Config nginx for ng1 and ng2

mkdir ng1
cd ng1
vim nginx.conf

http {
	upstream nodebackend {
		server nodeapp1:8080;
		server nodeapp2:8080;
		server nodeapp3:8080;
		server nodeapp4:8080;
		server nodeapp5:8080;
	}

	server {
		listen 8080;
		location / {
			proxy_pass http://nodebackend/;
		}
	}
}

events {}

mkdir ng2
cd ng2
vim nginx.conf

http {
	upstream nodebackend {
		server nodeapp6:8080;
		server nodeapp7:8080;
		server nodeapp8:8080;
		server nodeapp9:8080;
		server nodeapp10:8080;
	}

	server {
		listen 8080;
		location / {
			proxy_pass http://nodebackend/;
		}
	}
}

events {}

## Docker run ng1 and ng2

docker run --name ng1 --hostname ng1 --network=backendnet -v <path_ng1_conf>:/etc/nginx/nginx.conf -p 80:8080 -d nginx

docker run --name ng2 --hostname ng2 --network=backendnet -v <path_ng2_conf>:/etc/nginx/nginx.conf -p 81:8080 -d nginx
