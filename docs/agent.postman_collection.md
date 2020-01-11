# API REST API

## Variables
| Variable | Type | Sample value |
| ---- | ---- | ---- |
| HOST | string | http://localhost |
| PORT | string | 4040 |
| DID_asset1 | any | null |
| VERSION | string | api |

## Items
### `GET`: /network
`{{HOST}}:{{PORT}}`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}
```

### `GET`: /network/aquarius/status
`{{HOST}}:{{PORT}}/{{VERSION}}/network/aquarius/status`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/network/aquarius/status
```

### `GET`: /network/brizo/status
Get request to register Brizo network

`{{HOST}}:{{PORT}}/{{VERSION}}/network/brizo/status`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/network/brizo/status
```

### `GET`: /network/gas/status
Get request to check agent eth address and balance

`{{HOST}}:{{PORT}}/{{VERSION}}/network/gas/status`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/network/gas/status
```

### `POST`: /create
`{{HOST}}:{{PORT}}/{{VERSION}}/assets/create`

**Sample**
```shell
$ curl -X POST {{HOST}}:{{PORT}}/{{VERSION}}/assets/create
```

### `GET`: /resolve
`{{HOST}}:{{PORT}}/{{VERSION}}/assets/resolve?did={{DID_asset1}}`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/assets/resolve?did={{DID_asset1}}
```

### `GET`: /search
`{{HOST}}:{{PORT}}/{{VERSION}}/assets/search`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/assets/search
```

### `GET`: /query
`{{HOST}}:{{PORT}}/{{VERSION}}/assets/query`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/assets/query
```

### `GET`: /order
`{{HOST}}:{{PORT}}/{{VERSION}}/assets/order`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/assets/order
```

### `GET`: /consume
`{{HOST}}:{{PORT}}/{{VERSION}}/assets/consume?did={{DID_asset1}}`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/assets/consume?did={{DID_asset1}}
```

### `GET`: /validate
`{{HOST}}:{{PORT}}/{{VERSION}}/assets/validate`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/assets/validate
```

### `GET`: /owner
`{{HOST}}:{{PORT}}/{{VERSION}}/assets/owner`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/assets/owner
```

### `GET`: /ownerList
`{{HOST}}:{{PORT}}/{{VERSION}}/assets/ownerlist`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/assets/ownerlist
```

### `GET`: /comsumerList
`{{HOST}}:{{PORT}}/{{VERSION}}/assets/consumerlist`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/assets/consumerlist
```

### `GET`: /prepare
`{{HOST}}:{{PORT}}/{{VERSION}}/agreements/prepare`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/agreements/prepare
```

### `GET`: /status
`{{HOST}}:{{PORT}}/{{VERSION}}/agreements/status`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/agreements/status
```

### `GET`: /send
`{{HOST}}:{{PORT}}/{{VERSION}}/agreements/send`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/agreements/send
```

### `GET`: /create
`{{HOST}}:{{PORT}}/{{VERSION}}/agreements/create`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/agreements/create
```

### `POST`: /publishddo
`{{HOST}}:{{PORT}}/{{VERSION}}/general/publishddo`

**Header**

| Header | type | Value | Description |
| --- | --- | --- | --- |
| Content-Type | text | application/json |  |

**Body**
```json
{
   "publisher": "",
   "metadata": {
      "main": {
         "name": "Test",
         "dateCreated": "2019-12-25T00:00:00Z",
         "author": "No author",
         "license": "MIT",
         "price": "0",
         "files": [
            {
               "index": 0,
               "contentType": "application/zip",
               "checksum": "2bf9d229d110d1976cdf85e9f2256c7f",
               "checksumType": "MD5",
               "contentLength": "12057507",
               "compression": "zip",
               "encoding": "UTF-8",
               "url": "https://s3.com/datacommons-seeding-us-east/10_Monkey_Species_Small/training.zip"
            }
         ],
         "type": "dataset"
      },
      "additionalInformation": {
         "submitter": "",
         "checksum": "",
         "categories": [
            "image"
         ],
         "tags": [
            "image"
         ],
         "description": "sample description",
         "copyrightHolder": "No holder",
         "workExample": "image path, id, label",
         "links": [],
         "inLanguage": "en"
      }
   }
}
```

**Sample**
```shell
$ curl -X POST {{HOST}}:{{PORT}}/{{VERSION}}/general/publishddo \
    -H 'Content-Type: application/json' \
    -d '{
    "publisher": "0xA88b468818501Cf5e49A613C9fA94c4830cF5D88",
    "metadata": {
        "base": {
            "name": "10 Monkey Species Small",
            "dateCreated": "2012-02-01T10:55:11Z",
            "author": "Mario",
            "license": "CC0: Public Domain",
            "price": "0",
            "files": [
                {
                    "index": 0,
                    "contentType": "application/zip",
                    "checksum": "2bf9d229d110d1976cdf85e9f3256c7f",
                    "checksumType": "MD5",
                    "contentLength": 12057507,
                    "compression": "zip",
                    "encoding": "UTF-8",
                    "url": "https://s3.amazonaws.com/datacommons-seeding-us-east/10_Monkey_Species_Small/assets/training.zip"
                },
                {
                    "index": 1,
                    "contentType": "text/txt",
                    "checksum": "354d19c0733c47ef3a6cce5b633116b0",
                    "checksumType": "MD5",
                    "contentLength": 928,
                    "url": "https://s3.amazonaws.com/datacommons-seeding-us-east/10_Monkey_Species_Small/assets/monkey_labels.txt",
                    "resourceId": "test"
                }
            ],
            "checksum": "",
            "categories": [
                "image"
            ],
            "tags": [
                "image data",
                "classification",
                "animals"
            ],
            "type": "dataset",
            "description": "EXAMPLE ONLY ",
            "copyrightHolder": "Unknown",
            "workExample": "image path, id, label",
            "links": [
                {
                    "name": "example model",
                    "url": "https://drive.google.com/open?id=1uuz50RGiAW8YxRcWeQVgQglZpyAebgSM"
                },
                {
                    "name": "example code",
                    "type": "example code",
                    "url": "https://github.com/slothkong/CNN_classification_10_monkey_species"
                },
                {
                    "url": "https://s3.amazonaws.com/datacommons-seeding-us-east/10_Monkey_Species_Small/links/discovery/n5151.jpg",
                    "name": "n5151.jpg",
                    "type": "discovery"
                },
                {
                    "url": "https://s3.amazonaws.com/datacommons-seeding-us-east/10_Monkey_Species_Small/links/sample/sample.zip",
                    "name": "sample.zip",
                    "type": "sample"
                }
            ],
            "inLanguage": "en"
        }
    }
}'
```

### `POST`: /publish
`{{HOST}}:{{PORT}}/{{VERSION}}/general/publish`

**Header**

| Header | type | Value | Description |
| --- | --- | --- | --- |
| Content-Type | text | application/x-www-form-urlencoded |  |

**Body**
```json
{
    "name": "testrest",
    "description": "testdesc",
    "author": "alex",
    "license": "public",
    "copyrightHolder": "alex",
    "price": "0",
    "type": "public",
    "files": [
        {
            "index": 0,
            "contentType": "application/text",
            "url": "http://example.net"
        }
    ],
    "categories": ""
}
```

**Sample**
```shell
$ curl -X POST {{HOST}}:{{PORT}}/{{VERSION}}/general/publish \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d '{
    "name": "testrest",
    "description": "testdesc",
    "author": "alex",
    "license": "public",
    "copyrightHolder": "alex",
    "price": "0",
    "type": "public",
    "files": [
        {
            "index": 0,
            "contentType": "application/text",
            "url": "http://example.net"
        }
    ],
    "categories": ""
}'
```

### `GET`: /consumerAssets
`{{HOST}}:{{PORT}}/{{VERSION}}/assets/consumerAssets`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/assets/consumerAssets
```

### `GET`: /samplemetadata
`{{HOST}}:{{PORT}}/{{VERSION}}/agent/samplemetadata`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/agent/samplemetadata
```

### `GET`: /searchtext?text
`{{HOST}}:{{PORT}}/{{VERSION}}/assets/searchtext?text=monkey`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/assets/searchtext?text=monkey
```

### `GET`: /agent/samplemetadata
`{{HOST}}:{{PORT}}/{{VERSION}}/agent/samplemetadata`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/agent/samplemetadata
```

### `GET`: /searchquery?text
`{{HOST}}:{{PORT}}/{{VERSION}}/general/searchquery?text=monkey`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/general/searchquery?text=monkey
```

### `GET`: /searchtext
`{{HOST}}:{{PORT}}/{{VERSION}}/general/searchtext?text=monkey`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/general/searchtext?text=monkey
```

### `GET`: /resolve?did
`{{HOST}}:{{PORT}}/{{VERSION}}/general/resolve?did={{DID_asset1}}`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/general/resolve?did={{DID_asset1}}
```

### `POST`: /consume
`{{HOST}}:{{PORT}}/{{VERSION}}/general/consume?did={{DID_asset1}}`

**Header**

| Header | type | Value | Description |
| --- | --- | --- | --- |
| Content-Type | text | application/json |  |

**Body**
```json
{
    "did": "did:op:{{token}}"
}
```

**Sample**
```shell
$ curl -X POST {{HOST}}:{{PORT}}/{{VERSION}}/general/consume?did={{DID_asset1}} \
    -H 'Content-Type: application/json' \
    -d '{
    "did": "did:op:{{token}}"
}'
```

### `GET`: /general/samplemetadata
`{{HOST}}:{{PORT}}/{{VERSION}}/general/samplemetadata`

**Sample**
```shell
$ curl -X GET {{HOST}}:{{PORT}}/{{VERSION}}/general/samplemetadata
```

