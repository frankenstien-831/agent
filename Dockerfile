
FROM node:12
LABEL maintainer="Ocean Protocol <devops@oceanprotocol.com>"

ENV PRIVATE_KEY=''
ENV nodeUri='http://localhost:8545'
ENV aquariusUri='http://localhost:5000'
ENV brizoUri='http://localhost:8030'
ENV brizoAddress='0x00bd138abd70e2f00903268f3db08f2d25677c9e'
ENV secretstoreUri='http://localhost:12001'
EXPOSE 4040

COPY package*.json /usr/src/app/
WORKDIR /usr/src/app

RUN npm install -g npm serve \
    && npm install \
    && npm cache clean --force

COPY . /usr/src/app
RUN npm run build

ENTRYPOINT ["/usr/src/app/scripts/docker-entrypoint.sh"]
