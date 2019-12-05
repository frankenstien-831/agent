[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

<h1 align="center">Agent</h1>

> 🏄‍♀️ The Ocean Agent provides a single interface for an Ocean Protocol stack via a REST API to explore, download, and publish open data sets.
> https://api.oceanprotocol.com

[![Build Status](https://flat.badgen.net/travis/oceanprotocol/agent?icon=travis)](https://travis-ci.com/oceanprotocol/rest-api)
[![js oceanprotocol](https://flat.badgen.net/badge/js/oceanprotocol/7b1173)](https://github.com/oceanprotocol/eslint-config-oceanprotocol)

- [Architecture](#architecture)
- [Development](#development)
- [Production build](#production-build)
- [Deployment](#deployment)
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

```bash
npm i
# will copy artifacts from running barge on spree to local folder
./scripts/keeper.sh

npm run dev
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
