const config = require('./config.js');
const { Service } = require(`node-${config.platform === 'win32' ? 'windows' : 'linux'}`);

// Create a new service object
const svc = new Service({
    name: `g-Agent${config.name !== '' ? `_${config.name}` : ''}`,
    description: config.description ? config.description : `g-Dashboard background checker for ${config.platform === 'win32' ? 'Windows' : 'Linux'} machine.`,
    script: config.pathToScript
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
    console.log('Install complete.');
    console.log('The service exists: ', svc.exists());
    svc.start();
});

svc.on('uninstall', function () {
    console.log('Uninstall complete.');
    console.log('The service exists: ', svc.exists());
});

svc.install();
