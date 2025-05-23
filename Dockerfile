FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm run build

CMD [ "pnpm", "start" ]
# End of Selection
