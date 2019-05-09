const Luna = require('../server/lib/core');
// let prjPath = '/Users/yangshan/Documents/repo/mall-fe-pc-product/src';
// const ln = new Luna({ dir: prjPath, abPath: true });


let result = {};
function treeGen({ path, src }) {
    const prjPath = path + src
    const ln = new Luna({ dir: prjPath, abPath: true });
    return function tree(req, res) {
        if (result.pages) {
            res.json(result);
        } else {
            ln.getTree().then(rs => {
                res.json(rs);
                result = rs;
            });
        }
    }
}



module.exports = treeGen;