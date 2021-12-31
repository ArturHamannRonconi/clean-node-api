FROM node:14

WORKDIR /usr/app
EXPOSE 3000

COPY package.json .
RUN npm install --only=prod

COPY dist/ /usr/app/dist
CMD ["npm", "run", "debug"]