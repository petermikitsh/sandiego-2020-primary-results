#!/bin/bash

# Log Each command
set -x

# Bail on first error
set -e

SCRIPT_DIR=$(dirname $0)

node $SCRIPT_DIR/build.js

cat $SCRIPT_DIR/../data/sandiego.txt | \
  npx --no-install mapshaper \
  -i /dev/stdin \
  -dissolve 'CONSNAME' \
  -o $SCRIPT_DIR/../data/consolidations.geojson
