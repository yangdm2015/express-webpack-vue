const Luna = require('../server/lib/core');
let prjPath = '/Users/yangshan/Documents/repo/mall-fe-pc-product/src';
const ln = new Luna({ dir: prjPath, abPath: true });


let result = {};

function tree(req, res) {
    console.log(1)
    if (result.pages) {
        console.log(2)
        res.json(result);
    } else {
        console.log(3)
        ln.getTree().then(rs => {
            console.log(4)
            res.json(rs);
            result = rs;
        });
    }
}

module.exports = tree;