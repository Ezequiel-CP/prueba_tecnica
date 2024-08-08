FROM node:latest
WORKDIR /app
EXPOSE 3000
COPY / .
RUN npm update && \
npm install -g express body-parser && \
npm install express
ENTRYPOINT ["node", "app.js"]
