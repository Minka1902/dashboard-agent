const diskSpace = require('diskspace');
const handleResponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))

module.exports.updateMemory = (whatDisk, config) => {
    diskSpace.check(`${whatDisk}`, function (err, result) {
        if (!err) {
            if (result) {
                let newData = { memoryLeft: result.free, totalMemory: result.total };
                newData.lastChecked = new Date();
                updateSource(config, newData)
                    .then((data) => {
                        if (data) {
                            console.log(data.message);
                        }
                    })
                    .catch((err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
            }
        }
    });
};

module.exports.createServerEntry = (whatDisk, config) => {
    diskSpace.check(`${whatDisk}`, function (err, result) {
        if (!err) {
            if (result) {
                let newData = { memoryLeft: result.free, totalMemory: result.total, collectionName: `${config.address}` };
                newData.checkedAt = new Date();
                fetch(`http://${config.server.hostname}:${config.server.PORT}/add-entry`, {
                    body: JSON.stringify(newData),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    method: 'POST',
                }).then(handleResponse)
                    .then((data) => {
                        if (data) {
                            console.log(data.message);
                        }
                    })
                    .catch((err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
            }
        }
    });
};

module.exports.checkWebsite = (config, isEntry = false) => {
    fetch(`http://${config.address}`)
        .then((res) => {
            if (res.ok) {
                const newData = { isActive: true, status: res.status };
                newData.lastChecked = new Date();
                newData.lastActive = new Date();
                updateSource(config, newData)
                    .then((data) => {
                        if (data.message === 'Successfully updated.') {
                            if (isEntry) {
                                let dataObj = { status: 200, isActive: true, collectionName: `${config.address}` };
                                dataObj.checkedAt = new Date();
                                createWebEntry(dataObj, config);
                            }
                        }
                    })
                    .catch((err) => {
                        if (err) {
                            const newData = { isActive: false, status: err.statusCode || 500 };
                            newData.lastChecked = new Date();
                            updateSource(config, newData)
                                .catch((err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                        }
                    });
            } else {
                const newData = { isActive: false, status: res.statusCode || 500 };
                newData.lastChecked = new Date();
                updateSource(config, newData)
                    .catch((err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
            }
        })
        .catch((err) => {
            if (err) {
                const newData = { isActive: false, status: err.status || 500 };
                newData.lastChecked = new Date();
                updateSource(config, newData)
                    .catch((err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
            }
        });
};

module.exports.createResource = (config) => {
    fetch(`http://${config.server.hostname}:${config.server.PORT}/add-source`, {
        body: JSON.stringify({ name: config.name, url: config.address, lastActive: new Date('1-1-1970'), isActive: false, status: 404, lastChecked: new Date("1-1-1970") }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        method: 'POST',
    }).then(handleResponse)
        .catch((err) => {
            if (err) {
                console.log(err);
            }
        });
};

const updateSource = (config, data) => {
    return fetch(`http://${config.server.hostname}:${config.server.PORT}/update/${config.name}`, {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        method: 'PUT',
    }).then(handleResponse)
};

const createWebEntry = (body, config) => {
    fetch(`http://${config.server.hostname}:${config.server.PORT}/add-entry`, {
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        method: 'POST',
    }).then(handleResponse)
        .then((data) => {
            if (data) {
                console.log(data.message);
            }
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            }
        });
};
