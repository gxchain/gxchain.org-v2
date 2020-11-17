#!/usr/bin/env bash
# npm i
pm2 delete gxb-www
NODE_ENV=production pm2 start npm --name gxb-www -- run start
