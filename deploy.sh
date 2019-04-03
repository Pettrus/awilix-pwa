#!/bin/bash
set -xe

eval "$(ssh-agent -s)"
ssh-add
git pull
npm run build
rm -rf /var/www/awilix/frontend/*
mv build/* /var/www/awilix/frontend
service nginx restart