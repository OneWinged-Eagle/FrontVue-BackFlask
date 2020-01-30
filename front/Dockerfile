FROM node AS builder

RUN mkdir /usr/src/app/
WORKDIR /usr/src/app/

COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build


FROM nginx

COPY nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /usr/src/app/dist/ /var/www/app/
