[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

<h1 align="center">Agent</h1>

> 🏄‍♀️ The Ocean Agent provides a single interface for an Ocean Protocol stack via a REST API to explore, download, and publish open data sets.
> https://agent.oceanprotocol.com

[![Build Status](https://flat.badgen.net/travis/oceanprotocol/agent?icon=travis)](https://travis-ci.com/oceanprotocol/agent)
[![js oceanprotocol](https://flat.badgen.net/badge/js/oceanprotocol/7b1173)](https://github.com/oceanprotocol/eslint-config-oceanprotocol) [![Greenkeeper badge](https://badges.greenkeeper.io/oceanprotocol/agent.svg)](https://greenkeeper.io/)

- [Architecture](#architecture)
- [Development](#development)
- [Production build](#production-build)
- [Deployment](#deployment)
- [Releases](#releases)
- [Changelog](#changelog)
- [License](#license)

## Architecture

The API follows the library architecture as specified in the [squid library specifications](https://github.com/oceanprotocol/dev-ocean/blob/master/doc/architecture/squid-specs/squid-spec_v0.3.md).

The following resources are defined;

- ocean
- ocean.assets
- ocean.accounts
- ocean.secret_store
- ocean.tokens
- ocean.templates
- ocean.services
- ocean.agreements
- ocean.agreements.conditions

## Development

Agent is already integrated in Barge, so you can use it for develop against Spree, Nile or Pacific with remote instances

```bash
git clone git@github.com:oceanprotocol/barge.git
cd barge

# startup with local Spree node
./start_ocean.sh --no-commons
```


## ENV Vars

|PRIVATE_KEY| Private key for the eth address that the agent will use to publish/consume. You can use a 12 word seed.|
|nodeUri|
|aquariusUri|
|brizoUri|
|brizoAddress|
|secretstoreUri|

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
