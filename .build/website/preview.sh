#!/usr/bin/env bash

set -e

pr="${1}"
if [ -z "${pr}" ]; then
    echo "Usage: $0 <PR_ID>"
    exit 1
fi

if [ ! -f local-pages/.git/config ]; then
    git clone --depth 1 git@github.com:everscale-org/preview.git local-pages
else
    git -C local-pages pull
fi

export SITE_URL="https://everscale-org.github.io"
export SITE_BASE_URL="/preview/PR-${pr}/"
git remote remove gh-pages || true
yarn clear
yarn build
rm -fr "local-pages/PR-${pr}"
mv build "local-pages/PR-${pr}"
git -C local-pages add .
ref=$(git log -n 1 --pretty=format:%h)
git -C local-pages commit -m "up https://github.com/everscale-org/docs/pull/${pr} by https://github.com/everscale-org/docs/commit/${ref}"
git -C local-pages push
