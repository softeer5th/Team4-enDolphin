#!/bin/sh

git config --local core.hooksPath .github/hooks
chmod +x ../.github/hooks/*
