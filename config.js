const config =
{
    name: '',
    description: `g-Dashboard background checker for ${config.platform === 'win32' ? 'Windows' : 'Linux'} machine.`,
    server: '89.169.96.143',
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