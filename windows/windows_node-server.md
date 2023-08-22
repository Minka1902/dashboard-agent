mkdir g-dashboard_win_bg_check
cd g-dashboard_win_bg_check

npm init

package name: g-dashboard_win_bg_check
version: ENTER / VERSION
description: ENTER / description
entry point: server.js
test command: ENTER / test
git repository: ENTER / git repo
keywords: ENTER / keywords
author: ENTER / author
license: ENTER / license

at the end it should look like this
{
  "name": "g-dashboard_win_bg_check",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
Is this OK? ENTER

npm install body-parser celebrate cors diskspace dotenv express node-windows

node install.js ====> this will start the windows Service and should add a folder named 'daemon'
