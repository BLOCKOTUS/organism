#!/bin/bash

source scripts/env.sh

function listChannels() {
    peer channel list
}

function getInfo() {
    peer channel getinfo -c mychannel
}

function peerVersion() {
    peer version
}

# parse flags

while [[ $# -ge 1 ]] ; do
  key="$1"
  echo $key
  case $key in
  -listChannels )
    listChannels
    exit 0
    ;;
  -getInfo )
    getInfo
    exit 0
    ;;
  -peerVersion )
    peerVersion
    exit 0
    ;;
  * )
    echo
    echo "Unknown flag: $key"
    echo
    printHelp
    exit 1
    ;;
  esac
  shift
done