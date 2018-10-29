FROM node:8

WORKDIR /usr/app

COPY package.json .
RUN npm install --only=production  --no-cache
RUN npm install pm2 -g

COPY . .
EXPOSE 7071
CMD ["pm2", "start", "--no-daemon", "processes.json"]
