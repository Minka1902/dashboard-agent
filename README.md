# Installing nodejs and npm
1) Make sure you have nodejs and npm installed on your machine.
2) If you have them installed you can ignore the next step.

## If you don't have
### Windows
1) Download nodejs from the official website "https://nodejs.org/en/download".
2) Open the command prompt and check the version of node and npm `node -v` and `npm -v`.
### Linux
1) sudo apt-get install nodejs
2) sudo apt-get install npm

# Creating the new nodejs app
mkdir g-agent
cd g-agent
npm init

package name: g-agent
version: ENTER
description: g-Dashboard background checker for <YOUR> machine
entry point: server.js
test command: ENTER
git repository: ENTER
keywords: ENTER
author: ENTER
license: ENTER

# at the end it should look like this
{
  "name": "g-agent",
  "version": "1.0.0",
  "description": "g-Dashboard background checker for <YOUR> machine",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
Is this OK? ENTER

# installing packages
npm install body-parser celebrate cors diskspace dotenv express scharff node-windows node-linux

`At this point you move all the files and folders into that directory (g-agent).`

### Windows
`node install.js` ==> this will start the Windows service and should add a folder named 'daemon'
### Linux
`node install.js` ==> this will start the Linux service and will add a file named gagent.service to /etc/systemd/system


## config.js Settings
 1) name: name.
 2) description: description. 
 3) server: IP address of the main server to which all agents will report.
 4) PORT: Port of the main server to which all agents report.
 5) platform: operating system of the agent.
 6) pathToDisk: Path to the directory the agent should check.
 7) websitesToCheck: An array of URLs that the agent will check and update.
 8) isMemoryCheck: Boolean indicating whether the agent needs to do a memory check.
 9) secondsToCheckResources: Number.
10) secondsToUpdateResources: Number.