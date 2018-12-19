"use strict";
const fs = require("fs");
const request = require("request");
const program = require("commander");
const pkg = require("./package.json");

const fullUrl = (path = '') => {
    let url = `http://${program.host}:${program.port}/`;
    if (program.index) {
        url += program.index + '/';
        if (program.type) {
            url += program.type + '/';
        }
    }
    return url + path.replace(/^\/*/,'');
};

program
  .version(pkg.version)
  .description(pkg.description)
  .usage("[options] <command> [...]")
  .option("-o, --host, <hostname>", "hostname [localhost]", "localhost")
  .option("-p, --port <number>", "port number [9200]", "9200")
  .option("-j, --json", "format output as JSON")
  .option("-i, --index <name>", "which index to use")
  .option("-t, --type <type>", "default type for bulk operations");

program.parse(process.argv);

if (!program.args.filter(arg => typeof arg === "object").length) {
  program.help();
}
