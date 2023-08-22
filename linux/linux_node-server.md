# Creating the new nodejs app
sudo apt-get install nodejs
sudo apt-get install npm

mkdir g-dashboard_lin_bg_check
cd g-dashboard_lin_bg_check
npm init

package name: g-dashboard_lin_bg_check
version: ENTER
description: g-Dashboard background checker for Linux machine.
entry point: server.js
test command: ENTER
git repository: ENTER
keywords: ENTER
author: ENTER
license: ENTER

# at the end it should look like this
{
  "name": "g-dashboard_lin_bg_check",
  "version": "1.0.0",
  "description": "g-Dashboard background checker for Linux machine.",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
Is this OK? ENTER

# installing packages
npm install body-parser celebrate cors diskspace dotenv express

# # # At this point you move all the files and folders into that directory (g-dashboard_lin_bg_check).

# Move the gd-bg_lin.sh file to ~ next to the g-dashboard_lin_bg_check folder.

sudo chmod +x gd-bg_lin.sh

# Move the gd-bg_lin.service file to /etc/systemd/system or /lib/systemd/system.

sudo systemctl daemon-reload
sudo systemctl enable gd-bg_lin.service
sudo systemctl start gd-bg_lin.service
