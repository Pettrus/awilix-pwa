#!/bin/bash
set -xe

if [ $TRAVIS_BRANCH == 'master' ] ; then
  eval "$(ssh-agent -s)"
  ssh-add
  git pull
  npm run build
  rm -rf /var/www/awilix/frontend/*
  mv build/* /var/www/awilix/frontend
  service nginx restart
else
  echo "Nao e o master."
fi
