FROM node

WORKDIR /tmp/vue

COPY . .

RUN yarn install

RUN yarn build

RUN mkdir -p /var/www/html

RUN mv dist/* /var/www/html

WORKDIR /

RUN rm -rf /tmp/vue