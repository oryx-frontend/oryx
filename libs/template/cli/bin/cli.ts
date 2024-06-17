#!/usr/bin/env node

import { cliApp } from '@oryx-frontend/cli';

cliApp({ cli: { args: process.argv.slice(2) } }).create();
