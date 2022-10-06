const path = require("path");
const ejs = require("ejs");
const NodeCache = require("node-cache");


const templatePrefix = path.join(__dirname, "../templates/pages/");
const pageCache = new NodeCache();

class View {

    constructor(res, template) {
        this.res = res;
        this.template = template;
        this.path = path.join(templatePrefix, this.template);
        this.key = this.res.req.url;
    }

    updateViewFromModel(model, method, ...args) {
        model[method](...args)
            .then(([data]) => {
                console.log(`update data: ${this.key}`);
                this.updateCache(data);
            })
    }

    updateCache(data) {
        return ejs
            .renderFile(
                this.path,
                { data },
                { async: true })
            .then((html) => {
                return new Promise((resolve) => {
                    console.log(`update cache: ${this.key}`);
                    pageCache.set(this.key, { html, lastUpdate: new Date });
                    resolve(html);
                });
            });
    }

    deleteCache () {
        pageCache.has(this.key) && pageCache.del(this.key);
    }

    renderView(data) {
        if (pageCache.has(this.key)) {
            console.log(`render cache: ${this.key}`);
            this.res.send(pageCache.get(this.key).html);
        } else {
            this.updateCache(data)
                .then((html) => {
                    console.log(`render data: ${this.key}`);
                    this.res.send(html)
                });
        }
    }

}

module.exports = View;