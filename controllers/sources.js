const diskSpace = require('diskspace');
const os = require('os');
const handleResponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))

module.exports.checkMemory = (whatDisk, config, isEntry = false) => {
    diskSpace.check(`${whatDisk}`, async (err, result) => {
        if (!err && result) {
            const freeMem = os.freemem();
            const totalMem = os.totalmem();
            let newData = { capacityLeft: result.free, totalCapacity: result.total, totalMemory: totalMem, freeMemory: freeMem };
            newData.checkedAt = new Date();
            if (config.shouldUpdate) {
                updateSource(config, newData);
            }
            if (isEntry) {
                newData.collectionName = `${config.address}`;
                createEntry(newData, config);
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
                updateSource(config, newData, true)
                    .then((data) => {
                        if (data.message === 'Successfully updated.') {
                            if (isEntry) {
                                let dataObj = { status: 200, isActive: true, collectionName: `${config.address}` };
                                dataObj.checkedAt = new Date();
                                createEntry(dataObj, config);
                            }
                        }
                    })
                    .catch((err) => {
                        if (err) {
                            if (isEntry) {
                                let dataObj = { status: 400, isActive: true, collectionName: `${config.address}` };
                                dataObj.checkedAt = new Date();
                                createEntry(dataObj, config);
                            }
                            const newData = { isActive: true, status: 400 };
                            newData.lastChecked = new Date();
                            updateSource(config, newData);
                        }
                    });
            } else {
                if (isEntry) {
                    let dataObj = { status: 500, isActive: true, collectionName: `${config.address}` };
                    dataObj.checkedAt = new Date();
                    createEntry(dataObj, config);
                }
                const newData = { isActive: true, status: 500 };
                newData.lastChecked = new Date();
                updateSource(config, newData);
            }
        })
        .catch((err) => {
            if (err) {
                if (isEntry) {
                    let dataObj = { status: 404, isActive: false, collectionName: `${config.address}` };
                    dataObj.checkedAt = new Date();
                    createEntry(dataObj, config);
                }
                const newData = { isActive: false, status: 404 };
                newData.lastChecked = new Date();
                updateSource(config, newData);
            }
        });
};

module.exports.createResource = (config) => {
    fetch(`http://${config.server.hostname}:${config.server.PORT}/add-source`, {
        body: JSON.stringify({ name: config.name, url: config.address, lastActive: new Date('1-1-1970'), isActive: false, status: 404, lastChecked: new Date("1-1-1970"), isMachine: !config.shouldUpdate }),
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

const updateSource = (config, data, isThen = false) => {
    if (!isThen) {
        fetch(`http://${config.server.hostname}:${config.server.PORT}/update/${config.name}`, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            method: 'PUT',
        }).then(handleResponse)
            .then((data) => {
                if (data) {
                    console.log(data);
                }
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                }
            });
    } else {
        return fetch(`http://${config.server.hostname}:${config.server.PORT}/update/${config.name}`, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            method: 'PUT',
        }).then(handleResponse)
    }
};

const createEntry = (body, config) => {
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
