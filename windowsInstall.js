const { Service } = require(`node-windows`);

// Create a new service object
const svc = new Service({
    name: `g-Agent_service`,
    description: `g-Dashboard background checker for Windows machine.`,
    script:'C:\\g-agent\\server.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
    console.log('Install complete.');
    svc.start();
});

svc.on('uninstall', function () {
    console.log('Uninstall complete.');
});

svc.install();