const diskSpace = require('diskspace');
const handleResponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))

module.exports.updateMemory = (whatDisk, ip) => {
    diskSpace.check(`${whatDisk}`, function (err, result) {
        if (!err) {
            if (result) {
                let newData = { memoryLeft: result.free, totalMemory: result.total };
                newData.lastChecked = new Date();
                updateSource(ip, newData)
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

module.exports.addEntryToCollection = (whatDisk, ip) => {
    diskSpace.check(`${whatDisk}`, function (err, result) {
        if (!err) {
            if (result) {
                let newData = { memoryLeft: result.free, totalMemory: result.total, collectionName: `${ip}` };
                newData.checkedAt = new Date();
                fetch(`http://89.169.96.143:4001/add-entry`, {
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

module.exports.checkWebsite = (address) => {
    fetch(`http://${address}`)
        .then((res) => {
            if (res.ok) {
                const newData = { isActive: true, status: res.status };
                newData.lastChecked = new Date();
                newData.lastActive = new Date();
                updateSource(address, newData)
                    .then((data) => {
                        if (data.message === 'Successfully updated.') {
                            let dataObj = { status: 200, isActive: true, collectionName: `${address}` };
                            dataObj.checkedAt = new Date();
                            fetch(`http://localhost:4001/add-entry`, {
                                body: JSON.stringify(dataObj),
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
                    })
                    .catch((err) => {
                        if (err) {
                            const newData = { isActive: false, status: err.statusCode || 500 };
                            newData.lastChecked = new Date();
                            updateSource(address, newData)
                                .catch((err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                        }
                    });
            } else {
                const newData = { isActive: false, status: err.statusCode || 500 };
                newData.lastChecked = new Date();
                updateSource(address, newData)
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
                newData.lastActive = new Date();
                updateSource(address, newData)
                    .catch((err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
            }
        });
};

const updateSource = (address, data) => {
    return fetch(`http://89.169.96.143:4001/update/${address}`, {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        method: 'PUT',
    }).then(handleResponse)
};