FROM node:14-slim

WORKDIR /usr/src/app

COPY . .

RUN apt-get update && apt-get install -y apt-transport-https
RUN apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

ENV NODE_OPTIONS --max-old-space-size=4096
RUN yarn install

#RUN yarn build

ENV MONGO_DB_CONN_STRING "mongodb+srv://himanshu:Welcome@1@vlogr-cluster.ghf9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
ENV MONGO_DB_NAME "Vlogr-cluster"
ENV PORT "8080"
ENV HOST "0.0.0.0"
ENV AWS_ACCESS_KEY_ID ""
ENV AWS_SECRET_ACCESS_KEY ""
ENV AWS_BUCKET_NAME ""
ENV CDN_BASE ""
ENV PROXY_BASE ""
ENV GOOGLE_FONTS_API_KEY ""
ENV PIXABAY_KEY ""
ENV PEXELS_KEY ""
ENV ICONSCOUT_SECRET ""
ENV ICONSCOUT_CLIENT_ID ""

ENV GOOGLE_CLIENT_ID ""
ENV GOOGLE_CLIENT_SECRET ""
ENV GOOGLE_CLIENT_REDIRECT_URL ""
ENV FACEBOOK_CLIENT_ID ""
ENV FACEBOOK_CLIENT_SECRET ""
ENV FACEBOOK_CLIENT_REDIRECT_URL ""
ENV CLIENT_AUTH_REDIRECT ""

RUN yarn build

EXPOSE 8080

CMD  [ "yarn", "start" ]
