const fs = require('fs');
const path = require('path');
let jsonData;
const filePath = path.join('src', 'data/category_data.json');
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        jsonData = JSON.parse(data);
    }
});

const handleGetChildrenTags = (req, res) => {
    let tag = req.params.tag;
    tag = tag.replace(/_/g, ' ');
    let childrenTags = [];
    if (tag in jsonData) {
        childrenTags = jsonData[tag];
    }
    res.status(200).json({"childrenTags": childrenTags});
}
module.exports = {
    handleGetChildrenTags
}