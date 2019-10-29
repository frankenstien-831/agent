#!/usr/bin/env bash
export OCEAN_HOME="${HOME}/.ocean"
export KEEPER_ARTIFACTS_FOLDER="${OCEAN_HOME}/keeper-contracts/artifacts"


cp ${KEEPER_ARTIFACTS_FOLDER}/*.spree.json ./node_modules/@oceanprotocol/keeper-contracts/artifacts/