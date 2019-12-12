#!/bin/sh

if [ "${LOCAL_CONTRACTS}" = "true" ]; then
  echo "Waiting for contracts to be generated..."
  while [ ! -f "/usr/src/app/node_modules/@oceanprotocol/keeper-contracts/artifacts/ready" ]; do
    sleep 2
  done
fi
echo "Starting Agent..."
cd /usr/src/app/
npm run build
npm run serve