const { Service }= require('node-windows');

// Create a new service object
const svc = new Service({
  name:'G-Dashboard background windows',
  description: 'G-Dashboard windows machine background checker.',
  script: 'C:\\source-server\\server.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();
