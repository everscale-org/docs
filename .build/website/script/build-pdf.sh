#!/bin/bash

set -o errexit

if [ ! -f .bin/laton ]; then
  mkdir -p .bin/
  curl -L https://raw.githubusercontent.com/aslushnikov/latex-online/master/util/latexonline > .bin/laton && chmod 755 .bin/laton
fi

EVER_VM_VERSION=${1:-"$(jq < package.json -r .externalDocs.EverVM)"}
EVER_VM_REPO="https://raw.githubusercontent.com/tonlabs/ever-vm"
EVER_VM_URL="${EVER_VM_REPO}/${EVER_VM_VERSION}/doc/tvm.tex"
wget --quiet "${EVER_VM_URL}"
./.bin/laton -o static/tvm.pdf tvm.tex
