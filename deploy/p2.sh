#!/usr/bin/env bash

npm run build
NODE_ENV=production node deploy/archive

scp  dist.zip root@hqs.link:/root/node-application
ssh root@hqs.link  << EOF
    cd /root/node-application;
    unzip -o -d gxb_www dist.zip;
    cd gxb_www;
    bash deploy/start.sh;
    exit;
EOF
