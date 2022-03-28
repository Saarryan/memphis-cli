#!/usr/bin/env node
const commander = require("commander");

const factory = require("./actions/factory")
const station = require("./actions/station")
const user = require("./actions/users")
const config = require("./actions/config")
const helper = require("./config/helper")

const program = new commander.Command();

program
    .version('0.1.0')
    .description('Memphis CLI')
    .addHelpText('before', `${helper.factoryHelp}\n${helper.stationHelp}\n${helper.userHelp}`)


program
    .command('config')
    .argument('[command]')
    .option("-u, --user <user>", "User")
    .option("-p, --password <password>", "Password")
    .option("-s, --server <server>", "Server")
    .addHelpText('before', helper.configrHelp)
    .action(function () {
        if (Object.keys(this.opts()).length === 0) {
            console.log(program.commands[0].help())
        }
        else if (!this.opts().user || !this.opts().password || !this.opts().server) {
            console.log("Use command: mem config --user <user> --password <password> --server <server>")
        }
        else {
            config(this.opts())
        }
    })

program
    .command('factory')
    .argument('[command]')
    .option("-n, --name <factory-name>", "Factory name")
    .option("-d, --desc <factory-description>", "Factory description")
    .addHelpText('before', helper.factoryHelp)
    .action(function () {
        const factoryActions = ["ls", "create", "edit", "del"]
        if (!this.args?.length || !factoryActions.includes(this.args[0])) {
            console.log(program.commands[1].help())
        }
        else {
            factory.factorynMenu(this.args, this.opts())
        }
    })

program
    .command('station')
    .argument('[command]')
    .option("-n, --name <station-name>", "Station name")
    .option("-f, --factory <factory>", "Factory name", "defultFactory")
    .addHelpText('before', helper.stationHelp)
    .action(function () {
        const stationActions = ["ls", "create", "info", "edit", "del"]
        if (!this.args?.length || !stationActions.includes(this.args[0])) {
            console.log(program.commands[2].help())
        }
        else {
            station.stationMenu(this.args, this.opts())
        }
    })

program
    .command('user')
    .argument('[command]')
    .option("-n, --name <user-name>", "User name")
    .option("-p, --password <user-password>", "User password")
    .option("-t, --type <user-type>", "User type", "application")
    .option("-a, --avatar <avatar-id>", "Avatar id", 1)
    .option("-hu, --hubuser <hub-username>", "Hub user name")
    .option("-hp, --hubpass <hub-password>", "Hub password")
    .addHelpText('before', helper.userHelp)
    .action(function () {
        const userActions = ["ls", "add", "del", "edithubcred"]
        if (!this.args?.length || !userActions.includes(this.args[0])) {
            console.log(program.commands[3].help())
        }
        else {
            user.userMenu(this.args, this.opts())
        }
    })

program.parse(process.argv)
