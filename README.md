[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

<h1 align="center">Agent</h1>

> 🏄‍♀️ The Ocean Agent provides a single interface for an Ocean Protocol stack via a REST API to explore, download, and publish open data sets.
> https://agent.oceanprotocol.com

[![Build Status](https://flat.badgen.net/travis/oceanprotocol/agent?icon=travis)](https://travis-ci.com/oceanprotocol/agent)
[![Maintainability](https://api.codeclimate.com/v1/badges/486682d1818b5ef46f3d/maintainability)](https://codeclimate.com/github/oceanprotocol/agent/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/486682d1818b5ef46f3d/test_coverage)](https://codeclimate.com/github/oceanprotocol/agent/test_coverage)
[![js oceanprotocol](https://flat.badgen.net/badge/js/oceanprotocol/7b1173)](https://github.com/oceanprotocol/eslint-config-oceanprotocol)

- [Architecture](#architecture)
- [Development](#development)
- [Testing](#testing)
- [Production build](#production-build)
- [Deployment](#deployment)
- [Releases](#releases)
- [Changelog](#changelog)
- [License](#license)

## Architecture

The API follows the library architecture as specified in the [squid library specifications](https://github.com/oceanprotocol/dev-ocean/blob/master/doc/architecture/squid-specs/squid-spec_v0.3.md).

The following resources are defined, correlated directly with the libraries. 

'GET' '/api/assets'                                 
'POST' '/api/assets/create'
'GET' '/api/assets/resolve'
'GET' '/api/assets/search'
'GET' '/api/assets/query'
'GET' '/api/assets/order'
'GET' '/api/assets/consume'
'GET' '/api/assets/validate'
'GET' '/api/assets/owner'
'GET' '/api/assets/ownerAssets'
'GET' '/api/assets/consumerAssets'
'GET' '/api/assets/searchtext'
'GET' '/api/assets/samplemetadata'
'GET' '/api/network/aquarius/status'
'GET' '/api/network/brizo/status'
'POST' '/api/general/publishddo'
'POST' '/api/general/publish'
'GET' '/api/general/searchquery'
'GET' '/api/general/searchtext'
'GET' '/api/general/resolve'



| Squid Library   | RESTful Agent |      |
| --------------- | ------------- | ---- |
| /assets/create  | /             |      |
| /assets/resolve | secret_store/ |      |
| /assets/search  |               |      |
|                 |               |      |



- 
- ocean.templates
- ocean.services
- ocean.agreements
- ocean.agreements.conditions

## Development

While you can develop against Nile or Pacific with remote instances, the default is to run against a locally running Spree network orchestrated with Barge:

```bash
git clone git@github.com:oceanprotocol/barge.git
cd barge

# startup with local Spree node
./start_ocean.sh --no-commons --no-agent

# (After compiling and deploying contracts once, to save time, don't deploy again)
./start_ocean.sh --no-commons --no-agent --local-spree-no-deploy
```

Once Barge is running a Spree network, you can continue in this project:

```bash
# populate .env file
cp .env.example .env

# install dependencies
npm install

# will copy artifacts from running barge on spree to local folder
./scripts/keeper.sh

# start live-reloading dev server
npm start
```

## Testing

For running tests, a locally running Ocean network is required. To do so before running the tests, use [Barge](https://github.com/oceanprotocol/barge):

```bash
git clone https://github.com/oceanprotocol/barge
cd barge

./start_ocean.sh --no-commons --no-agent
```

In another terminal window, run this script:

```bash
# copies the contract artifacts once the local Ocean network is up and running
./scripts/keeper.sh
```

Once everything is up, run the tests:

```bash
npm test
```

## Production build

To create a production build, execute:

```bash
npm run build
```

This will create the build output into `./dist`. You can then run and serve from this build output with:

```bash
npm run serve
```

## Deployment

...

## Releases

From a clean `master` branch you can run any release task doing the following:

- bumps the project version in `package.json`
- auto-generates and updates the CHANGELOG.md file from commit messages
- creates a Git tag
- commits and pushes everything
- creates a GitHub release with commit messages as description

You can execute the script using {major|minor|patch} as first argument to bump the version accordingly:

- To bump a patch version: `npm run release`
- To bump a minor version: `npm run release minor`
- To bump a major version: `npm run release major`

By creating the Git tag with these tasks, a new Docker Hub build will be triggered.

For the GitHub releases steps a GitHub personal access token, exported as `GITHUB_TOKEN` is required. [Setup](https://github.com/release-it/release-it#github-releases)

## Changelog

See the [CHANGELOG.md](./CHANGELOG.md) file. This file is auto-generated during the above mentioned release process.

## License

```
Copyright 2019 Ocean Protocol Foundation Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
