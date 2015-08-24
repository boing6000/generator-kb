'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');


var Generator = module.exports = function Generator() {
    ScriptBase.apply(this, arguments);

    this.option('module', {
        desc: 'Nome do módulo',
        type: String,
        required: true
    });

    // if the controller name is suffixed with ctrl, remove the suffix
    // if the controller name is just "ctrl," don't append/remove "ctrl"
    if (this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl') {
        this.name = this.name.slice(0, -4);
    }
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
    var module = [];
    if(this.options.module){
        module.push('modules');
        module.push(this.options.module);
    }
    module.push('controllers');
    this.generateSourceAndTest(
        'controller',
        module.join('/'),
        this.options['skip-add'] || false
    );
};