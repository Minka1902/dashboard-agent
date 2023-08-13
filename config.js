const config =
{
    server: '89.169.96.143',
    PORT: 9000,
    platform: process.platform,
    pathToDisk: process.platform === 'win32' ? 'C' : '/home/user/',
}

module.exports = config;