const config =
{
    name: '15.12 build share',
    description: 'Disk space left on build shared folder.',
    server: '89.169.96.143',
    // server: 'localhost',
    PORT: 9000,
    platform: process.platform,
    pathToDisk: process.platform === 'win32' ? 'C' : '/home/user/',
    websitesToCheck: ['www.geomage.com'],
    isMemoryCheck: true,
}

module.exports = config;