# g-Dashboard agent
The Capacity Collection Agent, meticulously crafted by Geomage 2003, is a remarkable Node.js-based solution designed to effortlessly gather and record capacity data from servers. This agent demonstrates an exemplary fusion of functionality and transparency, ensuring seamless data retrieval while maintaining a comprehensive log of every data fetch operation.

## Windows
### Install
1) Make sure you have nodejs and npm installed on your machine.
2) If you have them installed you can ignore the next step.

### Nodejs and npm installation
1) Download nodejs from the official website "https://nodejs.org/en/download".
2) Open the command prompt and check the version of node and npm `node -v` and `npm -v`.

### Creating the new nodejs app
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

### installing packages
`npm install body-parser celebrate cors diskspace dotenv express scharff node-windows`

At this point you move all the files and folders into the directory (g-agent).

### Creating the Service:
`node windowsInstall.js` ==> this will start the Windows service and will add a folder named 'daemon' to your root.

## Linux
### Install
1) `wget https://github.com/Minka1902/dashboard-agent/releases/download/v1.0.4/install.sh -P /`
2) `/bin/bash /install.sh`.

### Restart
1) `sudo nano /geomage/agent/config.json`
2) Make your changes in the config file.
3) `/bin/bash /geomage/agent/restart.sh`.

### Uninstall
1) `/bin/bash /geomage/agent/uninstall.sh`.

## config.json
### Properties
 1) name: name of the resource that will be created.
 2) description: g-Dashboard background checker for `YOUR MACHINE` machine. 
 3) server: hostname and port of the server we report to.
 4) address: URL or IP of the resource (machine) (server or website), without https:// or any '/'.
 5) pathToDisk: Path to the directory the agent should check.
 6) isMemoryCheck: Boolean indicating whether the agent needs to do a memory&capacity check or just update the status and activity.
 7) shouldUpdate: Boolean indicating whether this resource should be updated or not, DEFAULT: true.
 8) secondsToUpdateSource: Seconds between every resource update.
 9) secondsToAddStats: Seconds between every statistic created by the agent.
10) additionalRoute: Any URL extension you may want/need (authentication/routes/paths etc...).

### Structure
[</br>
&nbsp;&nbsp;&nbsp;&nbsp;{</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "OBJECT 1",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"description": "g-Dashboard background checker for <YOUR MACHINE> machine.",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"address": "www.example.com",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"additionalRoute": "/another/example",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"isMemoryCheck": true,</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"shouldUpdate": true,</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"secondsToUpdateSource": 20,</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"secondsToAddStats": 3600,</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"server": {</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hostname": "255.255.255.255",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"PORT": 3000</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</br>
&nbsp;&nbsp;&nbsp;&nbsp;},</br>
&nbsp;&nbsp;&nbsp;&nbsp;{</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "OBJECT 2",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...</br>
&nbsp;&nbsp;&nbsp;&nbsp;},</br>
]</br>

## Resource states
1) Active and status 200 - everything is working.
2) Active and status 500 - resource active with a bad response.
3) Active and status 400 - resource is active, we have a problem with the server.
4) Not active and status 404 - resource not active.