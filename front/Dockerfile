FROM node AS builder

COPY package.json /app/
WORKDIR /app/
RUN npm install

COPY ./ /app/
RUN npm run build


FROM nginx

COPY nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist/ /var/www/app/
