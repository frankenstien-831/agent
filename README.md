[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

<h1 align="center">REST API</h1>

> 🏄‍♀️ REST API to explore, download, and publish open data sets.
> https://api.oceanprotocol.com


npm i

./install_artifacts.sh  (will copy artifacts from running barge on spree to local folder)

npm run start


# Architecture

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



# API ENDPOINTS

##Search assets:
```
GET http://localhost:4040/searchtext?text=test


{
    "results": [
        {
            "@context": "https://w3id.org/did/v1",
            "id": "did:op:1e69c2ae7cca4c0e852204443208c12c3aa58bfd67c7451cb1ee770df1dcae2b",
            "publicKey": [
                {
                    "id": "did:op:1e69c2ae7cca4c0e852204443208c12c3aa58bfd67c7451cb1ee770df1dcae2b",
                    "type": "EthereumECDSAKey",
                    "owner": "0x372E3D432e3Ba583E2aD20ED7270ceAAdb7A08d4"
                }
            ],
            "authentication": [
                {
                    "type": "RsaSignatureAuthentication2018",
                    "publicKey": "did:op:1e69c2ae7cca4c0e852204443208c12c3aa58bfd67c7451cb1ee770df1dcae2b"
                }
            ],
            "service": [
                {
                    "type": "Authorization",
                    "serviceEndpoint": "https://secret-store.dev-ocean.com",
                    "purchaseEndpoint": "https://secret-store.dev-ocean.com",
                    "service": "SecretStore",
                    "serviceDefinitionId": "0"
                },
                {
                    "type": "Access",
                    "serviceEndpoint": "https://brizo.marketplace.dev-ocean.com/api/v1/brizo/services/consume",
                    "purchaseEndpoint": "https://brizo.marketplace.dev-ocean.com/api/v1/brizo/services/access/initialize",
                    "serviceDefinitionId": "1",
                    "templateId": "0xfA16d26e9F4fffC6e40963B281a0bB08C31ed40C",
                    "name": "dataAssetAccessServiceAgreement",
                    "creator": "",
                    "serviceAgreementTemplate": {
                        "contractName": "EscrowAccessSecretStoreTemplate",
                        "events": [
                            {
                                "name": "AgreementCreated",
                                "actorType": "consumer",
                                "handler": {
                                    "moduleName": "escrowAccessSecretStoreTemplate",
                                    "functionName": "fulfillLockRewardCondition",
                                    "version": "0.1"
                                }
                            }
                        ],
                        "fulfillmentOrder": [
                            "lockReward.fulfill",
                            "accessSecretStore.fulfill",
                            "escrowReward.fulfill"
                        ],
                        "conditionDependency": {
                            "lockReward": [],
                            "grantSecretStoreAccess": [],
                            "releaseReward": [
                                "lockReward",
                                "accessSecretStore"
                            ]
                        },
                        "conditions": [
                            {
                                "name": "lockReward",
                                "timelock": 0,
                                "timeout": 0,
                                "contractName": "LockRewardCondition",
                                "functionName": "fulfill",
                                "events": [
                                    {
                                        "name": "Fulfilled",
                                        "actorType": "publisher",
                                        "handler": {
                                            "moduleName": "lockRewardCondition",
                                            "functionName": "fulfillAccessSecretStoreCondition",
                                            "version": "0.1"
                                        }
                                    }
                                ],
                                "parameters": [
                                    {
                                        "name": "_rewardAddress",
                                        "type": "address",
                                        "value": "0xeD4Ef53376C6f103d2d7029D7E702e082767C6ff"
                                    },
                                    {
                                        "name": "_amount",
                                        "type": "uint256",
                                        "value": 0
                                    }
                                ]
                            },
                            {
                                "name": "accessSecretStore",
                                "timelock": 0,
                                "timeout": 0,
                                "contractName": "AccessSecretStoreCondition",
                                "functionName": "fulfill",
                                "events": [
                                    {
                                        "name": "Fulfilled",
                                        "actorType": "publisher",
                                        "handler": {
                                            "moduleName": "accessSecretStore",
                                            "functionName": "fulfillEscrowRewardCondition",
                                            "version": "0.1"
                                        }
                                    },
                                    {
                                        "name": "TimedOut",
                                        "actorType": "consumer",
                                        "handler": {
                                            "moduleName": "accessSecretStore",
                                            "functionName": "fulfillEscrowRewardCondition",
                                            "version": "0.1"
                                        }
                                    }
                                ],
                                "parameters": [
                                    {
                                        "name": "_documentId",
                                        "type": "bytes32",
                                        "value": "1e69c2ae7cca4c0e852204443208c12c3aa58bfd67c7451cb1ee770df1dcae2b"
                                    },
                                    {
                                        "name": "_grantee",
                                        "type": "address",
                                        "value": ""
                                    }
                                ]
                            },
                            {
                                "name": "escrowReward",
                                "timelock": 0,
                                "timeout": 0,
                                "contractName": "EscrowReward",
                                "functionName": "fulfill",
                                "events": [
                                    {
                                        "name": "Fulfilled",
                                        "actorType": "publisher",
                                        "handler": {
                                            "moduleName": "escrowRewardCondition",
                                            "functionName": "verifyRewardTokens",
                                            "version": "0.1"
                                        }
                                    }
                                ],
                                "parameters": [
                                    {
                                        "name": "_amount",
                                        "type": "uint256",
                                        "value": 0
                                    },
                                    {
                                        "name": "_receiver",
                                        "type": "address",
                                        "value": ""
                                    },
                                    {
                                        "name": "_sender",
                                        "type": "address",
                                        "value": ""
                                    },
                                    {
                                        "name": "_lockCondition",
                                        "type": "bytes32",
                                        "value": ""
                                    },
                                    {
                                        "name": "_releaseCondition",
                                        "type": "bytes32",
                                        "value": ""
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "type": "Metadata",
                    "serviceEndpoint": "https://aquarius.marketplace.dev-ocean.com/api/v1/aquarius/assets/ddo/did:op:1e69c2ae7cca4c0e852204443208c12c3aa58bfd67c7451cb1ee770df1dcae2b",
                    "purchaseEndpoint": "https://aquarius.marketplace.dev-ocean.com/api/v1/aquarius/assets/ddo/did:op:1e69c2ae7cca4c0e852204443208c12c3aa58bfd67c7451cb1ee770df1dcae2b",
                    "metadata": {
                        "base": {
                            "name": "10 Monkey Species Small",
                            "dateCreated": "2019-03-01T08:38:58Z",
                            "author": "Mario",
                            "license": "CC0: Public Domain",
                            "price": 0,
                            "checksum": "52a2774a8f6b0dafb3677eff83ded866da515b2fb224fbc90553af8c2ea5e997",
                            "categories": [
                                "image"
                            ],
                            "tags": [
                                "image data",
                                " animals"
                            ],
                            "type": "dataset",
                            "description": "Example description",
                            "inLanguage": "en",
                            "files": [
                                {
                                    "index": 0,
                                    "contentType": "test",
                                    "checksum": "test",
                                    "checksumType": "test",
                                    "contentLength": 333
                                },
                                {
                                    "index": 1,
                                    "checksumType": "test",
                                    "contentLength": 23234,
                                    "compression": "test",
                                    "resourceId": "test"
                                },
                                {
                                    "index": 2,
                                    "checksumType": "test"
                                }
                            ],
                            "links": [
                                {
                                    "url": "https://s3.amazonaws.com/datacommons-seeding-us-east/10_Monkey_Species_Small/links/sample/sample.zip",
                                    "name": "sample.zip",
                                    "type": "sample"
                                },
                                {
                                    "url": "https://github.com/slothkong/CNN_classification_10_monkey_species",
                                    "name": "example code",
                                    "type": "example code"
                                },
                                {
                                    "url": "https://s3.amazonaws.com/datacommons-seeding-us-east/10_Monkey_Species_Small/links/discovery/n5151.jpg",
                                    "name": "n5151.jpg",
                                    "type": "discovery"
                                }
                            ],
                            "encryptedFiles": "0x19f8ea52a9fa66ffa510412bfd23307df39ad3c16bc0add59b80e1e6f22c20d6df396177ec537f8152e7bf8545f63c5137b934b934f02e6f244217d0022e1944aace806e1ff6623e2b59bd0ee92492bef79c6d868e1146673ba625a190d25ce44b522e78cd7cb25044eb2b3ad8d3f3633890506d5dcaaf9ca21d9d8aab4eb0abc55875e32ad3e4c5a8df7ee16fc48cab82ccfe1d835dfe8157c27a59485f9a67cdcc18951ec86c435c56aebb922961de7a60fdde244f3a36866b6b04ecdd89c13aec98df5a51d2527fb13d469e1d4f86f4a774ccd3951b7cf86a99ddba525ff5d74dd0637bf4693545c715e6d3b4d5ff6498e8bc1e34eaddeddb0d85532edb3fa8bba91e605a7e35cc133f59dd3d4359df2e8dca94350c755ec4a342c37da4c3e6f23f38add73ca57dba2756576de31d34e77ad22cbdec4c13f1f623f5265d09d38b08ba03e364f7afb8e0815573178fa19402dbcb2b2799ac41c0b8032f05542f31a5bcb58c3ca4ec4ad58acb270c7909e1b52a153083efca3a1fb8ad55c24e5e6c993b055ad01f2e099aa873f7ef816793f44bb558ac05ecad8bb494df164fd288bbecdbdabc590c7376ef5960b70c93f1a9e4807156cd17e8561490dd646bd76ce7cb6dd692511296c9e0f49f29534559ab46da2ec13552364ac4d1fb385b990c6b7280858d7e3ffacf0feab382e13f2e2037124b82c7cf6a11ca13ceee85879767f4f1a7c40364b19fa858af2c2743736ce2277d7f744bea03302fd44fa5803a293e1d43288343ff2e7587847c0562401ce0de260f6292ce3ed0d90101d9756a1fc14f4dd49eee9c2903fd2e1072",
                            "datePublished": "2019-04-05T09:02:59Z"
                        },
                        "curation": {
                            "rating": 0,
                            "numVotes": 0,
                            "isListed": true
                        }
                    },
                    "serviceDefinitionId": "2"
                }
            ],
            "created": "2019-04-05T09:02:55Z",
            "proof": {
                "type": "DDOIntegritySignature",
                "created": "2019-04-05T09:02:58Z",
                "creator": "0x372E3D432e3Ba583E2aD20ED7270ceAAdb7A08d4",
                "signatureValue": "Ok7jOkn/glA++BhI4ncjoCa5Rn9ph5XN/LWLo9HSdKLiRotV+efcZw54zvnniPqFoSRlptfXS4ujMoey3TuF4i1iX/q52LdbA1ig0C8AjWt42/4Skgfpl0uELKHnbyzsocyWQgBbV6Bl1rVqYlZuQt6T3kCRg/fTpvIBzYMszRs="
            },
            "score": 7.699999999999999
        }
    ],
    "page": 1,
    "totalPages": 503,
    "totalResults": 503
}
```

##Sample metadata:
```
GET http://localhost:4040/samplemetadata


{
    "base": {
        "name": "10 Monkey Species Small",
        "dateCreated": "2012-02-01T10:55:11Z",
        "author": "Mario",
        "license": "CC0:Public Domain",
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
            },
            {
                "index": 2
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
        "workExample": "image path, id,label",
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
```
## Resolve DID
```
GET http://localhost:4040/resolve?did=did:op:99380829d1ae47ffb1dc322254dfe6399890861c4a544df38524f94a4f84b22d

{
    "@context": "https://w3id.org/did/v1",
    "id": "did:op:99380829d1ae47ffb1dc322254dfe6399890861c4a544df38524f94a4f84b22d",
    "publicKey": [
        {
            "id": "did:op:99380829d1ae47ffb1dc322254dfe6399890861c4a544df38524f94a4f84b22d",
            "type": "EthereumECDSAKey",
            "owner": "0x13bd67bEC3C7e9ff70413557F97E14E7DA3726A4"
        }
    ],
    "authentication": [
        {
            "type": "RsaSignatureAuthentication2018",
            "publicKey": "did:op:99380829d1ae47ffb1dc322254dfe6399890861c4a544df38524f94a4f84b22d"
        }
    ],
    "service": [
        {
            "type": "Metadata",
            "serviceEndpoint": "https://aquarius.marketplace.dev-ocean.com/api/v1/aquarius/assets/ddo/did:op:99380829d1ae47ffb1dc322254dfe6399890861c4a544df38524f94a4f84b22d",
            "metadata": {
                "curation": {
                    "rating": 0,
                    "numVotes": 0,
                    "isListed": true
                },
                "base": {
                    "name": "Newline Test",
                    "description": "Hello\n\nHello\n\n# Hello",
                    "dateCreated": "2019-11-06T22:29:37Z",
                    "author": "Test",
                    "type": "dataset",
                    "license": "CC BY-NC-SA: Attribution-NonCommercial-ShareAlike 4.0 International",
                    "copyrightHolder": "Test",
                    "workExample": "",
                    "files": [
                        {
                            "contentType": "image/png",
                            "contentLength": 424554,
                            "compression": "png",
                            "index": 0
                        }
                    ],
                    "categories": [
                        "Computer Technology"
                    ],
                    "links": [],
                    "inLanguage": "",
                    "tags": [],
                    "price": "0",
                    "encryptedFiles": "0x611861185b5143415843f414ea14f62fb11cf8538450dc719d2920f74aa95b7bf5c68bb53d159e568ed10771f6728e8779ae69dffc926946e577ac3661bae6e2a69322f26b6e71e90940a4d5fc318c13cb504ecb1017202852734f81e9dc1f709c3bcc60f1ad568959b2bbf59691628d014ce394b3f461fa7b48542234f9ec195e636069dacd7e9b6f01717c41fac73896e327d2adcb1818202add731fe16b46052338184c8385a300c6d58da3",
                    "checksum": "0xc2ee39ff10dbd5d598b89e596abd4490b0ecb03a1df55966e25ab24ec3f0944a",
                    "datePublished": "2019-11-06T22:30:21Z"
                }
            },
            "serviceDefinitionId": "2"
        },
        {
            "type": "Access",
            "creator": "",
            "purchaseEndpoint": "https://brizo.marketplace.dev-ocean.com/api/v1/brizo/services/access/initialize",
            "serviceEndpoint": "https://brizo.marketplace.dev-ocean.com/api/v1/brizo/services/consume",
            "name": "dataAssetAccessServiceAgreement",
            "templateId": "0xfA16d26e9F4fffC6e40963B281a0bB08C31ed40C",
            "serviceAgreementTemplate": {
                "contractName": "EscrowAccessSecretStoreTemplate",
                "events": [
                    {
                        "name": "AgreementCreated",
                        "actorType": "consumer",
                        "handler": {
                            "moduleName": "escrowAccessSecretStoreTemplate",
                            "functionName": "fulfillLockRewardCondition",
                            "version": "0.1"
                        }
                    }
                ],
                "fulfillmentOrder": [
                    "lockReward.fulfill",
                    "accessSecretStore.fulfill",
                    "escrowReward.fulfill"
                ],
                "conditionDependency": {
                    "lockReward": [],
                    "accessSecretStore": [],
                    "escrowReward": [
                        "lockReward",
                        "accessSecretStore"
                    ]
                },
                "conditions": [
                    {
                        "name": "lockReward",
                        "timelock": 0,
                        "timeout": 0,
                        "contractName": "LockRewardCondition",
                        "functionName": "fulfill",
                        "parameters": [
                            {
                                "name": "_rewardAddress",
                                "type": "address",
                                "value": "0x13bd67bEC3C7e9ff70413557F97E14E7DA3726A4"
                            },
                            {
                                "name": "_amount",
                                "type": "uint256",
                                "value": "0"
                            }
                        ],
                        "events": [
                            {
                                "name": "Fulfilled",
                                "actorType": "publisher",
                                "handler": {
                                    "moduleName": "lockRewardCondition",
                                    "functionName": "fulfillAccessSecretStoreCondition",
                                    "version": "0.1"
                                }
                            }
                        ]
                    },
                    {
                        "name": "accessSecretStore",
                        "timelock": 0,
                        "timeout": 0,
                        "contractName": "AccessSecretStoreCondition",
                        "functionName": "fulfill",
                        "parameters": [
                            {
                                "name": "_documentId",
                                "type": "bytes32",
                                "value": "99380829d1ae47ffb1dc322254dfe6399890861c4a544df38524f94a4f84b22d"
                            },
                            {
                                "name": "_grantee",
                                "type": "address",
                                "value": ""
                            }
                        ],
                        "events": [
                            {
                                "name": "Fulfilled",
                                "actorType": "publisher",
                                "handler": {
                                    "moduleName": "accessSecretStore",
                                    "functionName": "fulfillEscrowRewardCondition",
                                    "version": "0.1"
                                }
                            },
                            {
                                "name": "TimedOut",
                                "actorType": "consumer",
                                "handler": {
                                    "moduleName": "accessSecretStore",
                                    "functionName": "fulfillEscrowRewardCondition",
                                    "version": "0.1"
                                }
                            }
                        ]
                    },
                    {
                        "name": "escrowReward",
                        "timelock": 0,
                        "timeout": 0,
                        "contractName": "EscrowReward",
                        "functionName": "fulfill",
                        "parameters": [
                            {
                                "name": "_amount",
                                "type": "uint256",
                                "value": "0"
                            },
                            {
                                "name": "_receiver",
                                "type": "address",
                                "value": ""
                            },
                            {
                                "name": "_sender",
                                "type": "address",
                                "value": ""
                            },
                            {
                                "name": "_lockCondition",
                                "type": "bytes32",
                                "value": ""
                            },
                            {
                                "name": "_releaseCondition",
                                "type": "bytes32",
                                "value": ""
                            }
                        ],
                        "events": [
                            {
                                "name": "Fulfilled",
                                "actorType": "publisher",
                                "handler": {
                                    "moduleName": "escrowRewardCondition",
                                    "functionName": "verifyRewardTokens",
                                    "version": "0.1"
                                }
                            }
                        ]
                    }
                ]
            },
            "serviceDefinitionId": "0"
        },
        {
            "type": "Authorization",
            "service": "SecretStore",
            "serviceEndpoint": "https://secret-store.nile.dev-ocean.com",
            "serviceDefinitionId": "1"
        }
    ],
    "created": "2019-11-06T22:30:15Z",
    "proof": {
        "created": "2019-11-06T22:30:15Z",
        "creator": "0x13bd67bEC3C7e9ff70413557F97E14E7DA3726A4",
        "type": "DDOIntegritySignature",
        "signatureValue": "0x3ffe2df907a02e6becf281ae4b5ecee528d232f5e6535700bb4eea8a7ca2a52838dee667ab14007bc78fb5bd49a9ffb879d54e198866b7316491bc21bc7b663e1c"
    }
}
```


## Publish asset
```
POST http://localhost:4040/publish
Content-type: application/json
{"name":"testrest","description":"testdesc","author":"alex","license":"public","copyrightHolder":"alex","price":"0","type":"public","files":[{"index": 0,"contentType": "application/text","url":"http://example.net"}],"categories":""}


Result: DID or null for error
Example: "did:op:36dc7261ac144ca2a78af131c3910ff20f2acbacc262469b9c4f16e53c4ddc40"
```

## Publish DDO
```
POST http://localhost:4040/publishddo
Content-type: application/json
{"publisher":"0xA88b468818501Cf5e49A613C9fA94c4830cF5D88","metadata":{"base":{"name":"10 Monkey Species Small","dateCreated":"2012-02-01T10:55:11Z","author":"Mario","license":"CC0: Public Domain","price":"0","files":[{"index":0,"contentType":"application/zip","checksum":"2bf9d229d110d1976cdf85e9f3256c7f","checksumType":"MD5","contentLength":12057507,"compression":"zip","encoding":"UTF-8","url":"https://s3.amazonaws.com/datacommons-seeding-us-east/10_Monkey_Species_Small/assets/training.zip"},{"index":1,"contentType":"text/txt","checksum":"354d19c0733c47ef3a6cce5b633116b0","checksumType":"MD5","contentLength":928,"url":"https://s3.amazonaws.com/datacommons-seeding-us-east/10_Monkey_Species_Small/assets/monkey_labels.txt","resourceId":"test"},{"index":2}],"checksum":"","categories":["image"],"tags":["image data","classification","animals"],"type":"dataset","description":"EXAMPLE ONLY ","copyrightHolder":"Unknown","workExample":"image path, id, label","links":[{"name":"example model","url":"https://drive.google.com/open?id=1uuz50RGiAW8YxRcWeQVgQglZpyAebgSM"},{"name":"example code","type":"example code","url":"https://github.com/slothkong/CNN_classification_10_monkey_species"},{"url":"https://s3.amazonaws.com/datacommons-seeding-us-east/10_Monkey_Species_Small/links/discovery/n5151.jpg","name":"n5151.jpg","type":"discovery"},{"url":"https://s3.amazonaws.com/datacommons-seeding-us-east/10_Monkey_Species_Small/links/sample/sample.zip","name":"sample.zip","type":"sample"}],"inLanguage":"en"}}}
```
Result: DID or null for error
Example: "did:op:36dc7261ac144ca2a78af131c3910ff20f2acbacc262469b9c4f16e53c4ddc40"


## Consume asset
```
POST http://localhost:4040/consume
Content-type: application/json
{"did":"did:op:99380829d1ae47ffb1dc322254dfe6399890861c4a544df38524f94a4f84b22d"}

Result:
[
    {
        "index": 0,
        "contentLength": 424554,
        "compression": "png",
        "filename": "ipfs-oceanprotocol.png",
        "data": "iVBORw0K"
    },
        {
        "index": 1,
        "contentLength": 4554,
        "compression": "png",
        "filename": "ipfs-oceanprotocol2.png",
        "data": "XXXX"
    }
]
```


TODO: Error checking, Argument validation

