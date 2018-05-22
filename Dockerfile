FROM node:8-alpine
LABEL name=cinema version=latest

# Install yarn and other dependencies via apk
RUN apk update \
    && apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/US/Eastern /etc/localtime \
    && echo "US/Eastern" > /etc/timezone \
    && apk del tzdata \
    && apk add yarn python g++ make \
    && rm -rf /var/cache/apk/*

WORKDIR /app

COPY src/ src/
COPY tsconfig.json tslint.json package.json yarn.lock swagger.json ./

RUN yarn

EXPOSE 1337

CMD yarn test-ci