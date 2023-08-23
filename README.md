# g-Dashboard agent
The Capacity Collection Agent, meticulously crafted by Geomage 2003, is a remarkable Node.js-based solution designed to effortlessly gather and record capacity data from servers. This agent demonstrates an exemplary fusion of functionality and transparency, ensuring seamless data retrieval while maintaining a comprehensive log of every data fetch operation.

## Installation
1) Make sure you have nodejs and npm installed on your machine.
2) If you have them installed you can ignore the next step.

### Windows - Nodejs and npm installation
1) Download nodejs from the official website "https://nodejs.org/en/download".
2) Open the command prompt and check the version of node and npm `node -v` and `npm -v`.
### Linux - Nodejs and npm installation
1) `sudo apt-get install nodejs`
2) `sudo apt-get install npm`

## Creating the new nodejs app
1) `mkdir g-agent`
2) `cd g-agent`
3) `npm init`

package name: g-agent </br>
version: ENTER </br>
description: g-Dashboard background checker for `YOUR MACHINE` machine </br>
entry point: server.js </br>
test command: ENTER </br>
git repository: ENTER </br>
keywords: ENTER </br>
author: ENTER </br>
license: ENTER </br>

### At the end it should look like this:
{</br>
&nbsp;&nbsp;&nbsp;&nbsp;"name": "g-agent",</br>
&nbsp;&nbsp;&nbsp;&nbsp;"version": "1.0.0",</br>
&nbsp;&nbsp;&nbsp;&nbsp;"description": "g-Dashboard background checker for `YOUR MACHINE` machine",</br>
&nbsp;&nbsp;&nbsp;&nbsp;"main": "server.js",</br>
&nbsp;&nbsp;&nbsp;&nbsp;"scripts": {</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"test": "echo \"Error: no test specified\" && exit 1"</br>
&nbsp;&nbsp;&nbsp;&nbsp;},</br>
&nbsp;&nbsp;&nbsp;&nbsp;"author": "",</br>
&nbsp;&nbsp;&nbsp;&nbsp;"license": "ISC"</br>
}</br>
Is this OK? ENTER

## installing packages
### Windows
`npm install body-parser celebrate cors diskspace dotenv express scharff node-windows`
### Linux
`npm install body-parser celebrate cors diskspace dotenv express scharff node-linux`

At this point you move all the files and folders into the directory (g-agent).

## Creating the Service:
### Windows
`node windowsInstall.js` ==> this will start the Windows service and should add a folder named 'daemon'
### Linux
`sudo node linuxInstall.js` ==> this will start the Linux service and will add a file named gagent.service to /etc/systemd/system

## config.js Settings
 1) name: g-Agent_service.
 2) description: g-Dashboard background checker for `YOUR MACHINE` machine. 
 3) server: IP address of the main server to which all agents will report.
 4) PORT: Port of the main server to which all agents report.
 5) platform: operating system of the agent.
 6) pathToDisk: Path to the directory the agent should check.
 7) pathToScript: Path to the script of the service (server.js).
 8) websitesToCheck: An Array of URLs that the agent will check and update.
 9) isMemoryCheck: Boolean indicating whether the agent needs to do a memory check.
10) secondsToCheckResources: Seconds between every check.
11) secondsToUpdateResources: Seconds between every update.
