#!/bin/bash

# Log Each command
set -x

# Bail on first error
set -e

SCRIPT_DIR=$(dirname $0)

node $SCRIPT_DIR/build.js

sed 's/-VBM//g' $SCRIPT_DIR/../data/sandiego.txt | \
  npx --no-install mapshaper \
  -i /dev/stdin \
  -dissolve2 'CONSNAME' \
  -o $SCRIPT_DIR/../data/consolidations.geojson

cat $SCRIPT_DIR/../data/Major_Roads.geojson | \
  npx --no-install mapshaper \
  -i /dev/stdin \
  -filter 'StateHwy === 1' \
  -o $SCRIPT_DIR/../data/highways.geojson
