const config =
{
    name: '15.12 build share',
    description: 'Disk space left on build shared folder.',
    server: '89.169.96.143',
    // server: 'localhost',
    PORT: 4001,
    platform: process.platform,
    pathToDisk: process.platform === 'win32' ? 'C' : '/home/prod/',
    pathToScript: process.platform === 'win32' ? 'C:\\g-agent\\server.js' : '/home/prod/g-Agent/server.js',
    websitesToCheck: ['www.geomage.com'],
    isMemoryCheck: true,
    secondsToCheckResources: 20,
    secondsToUpdateResources: 3600,
}

module.exports = config;