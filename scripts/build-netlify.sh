#! /bin/bash
vue-cli-service build
cd dist
echo "/*    /  200" >> _redirects
