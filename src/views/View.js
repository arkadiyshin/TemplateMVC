const path = require("path");
const ejs = require("ejs");

const templatePrefix = path.join(__dirname, "../templates/pages/");

class View {

    constructor(res, template) {
        this.res = res;
        this.template = template;
    }

    render(data) {
        ejs.renderFile(
            path.join(templatePrefix, this.template),
            { data },
            { async: true }
        )
            .then((html) => {
                this.res.send(html);
            });
    }

}

module.exports = View;