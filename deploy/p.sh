#!/usr/bin/env bash

npm run build
NODE_ENV=production node deploy/archive

scp  dist.zip root@www.gxchain.org:/root/www
ssh root@www.gxchain.org  << EOF
    cd /root/www;
    unzip -o -d gxchain_org dist.zip;
    cd gxchain_org;
    bash deploy/start.sh;
    exit;
EOF
