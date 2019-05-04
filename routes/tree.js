const Luna = require('./server/lib/core');
let prjPath = '/Users/yangshan/Documents/repo/mall-fe-pc-product/src';
const ln = new Luna({ dir: prjPath, abPath: true });



function tree(req, res) {
    if (result.pages) {
        res.send(result);
    } else {
        ln.getTree().then(rs => {
            res.send(rs);
            result = rs;
        });
    }
}

module.exports = tree;