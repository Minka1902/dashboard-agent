const diskSpace = require('diskspace');
const handleResponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))

module.exports.updateMemory = (whatDisk, ip) => {
    diskSpace.check(`${whatDisk}`, function (err, result) {
        if (!err) {
            if (result) {
                let newData = { memoryLeft: result.free, totalMemory: result.total };
                newData.lastChecked = new Date();
                fetch(`http://89.169.96.143:4001/update/${ip}`, {
                    body: JSON.stringify(newData),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    method: 'PUT',
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
