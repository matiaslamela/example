FROM node:18

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the application
ENTRYPOINT ["npm", "run"]