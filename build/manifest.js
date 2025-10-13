// build/manifest.js

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const manifest_1 = require("./manifest");
class BuildManifest extends manifest_1.default {
    constructor() {
        super();
        this.components = [];
    }
    addComponent(id) {
        this.components.push(id);
    }
    getComponent(id) {
        return this.components.find(component => component === id);
    }
}
exports.default = BuildManifest;
const buildManifest = new BuildManifest();
buildManifest
    .addComponent('TodoList')
    .addComponent('Task')
    .addComponent('ProductList');

Object.assign(exports, {
    manifest: buildManifest,
    components: ['TodoList', 'Task', 'ProductList'],
});