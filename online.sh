#!/bin/bash
node packver.js
git checkout online
git merge master
git push
git checkout master