#!/usr/bin/env node
const commander = require("commander");

const application = require("./actions/application")
const factory = require("./actions/factory")
const user = require("./actions/users")
const config = require("./actions/config")
const helper = require("./config/helper")

const program = new commander.Command();

program
    .version('0.1.0')
    .description('Strech CLI')
    .addHelpText('before', `${helper.applicationHelp}\n${helper.factoryHelp}\n${helper.userHelp}`)


program
    .command('config')
    .argument('[command]')
    .option("-u, --user <user>", "User")
    .option("-p, --password <password>", "Password")//, "default description")
    .option("-s, --server <server>", "Server")
    .addHelpText('before', helper.applicationHelp)
    .action(function () {
        config(this.opts())
    })

program
    .command('application')
    .argument('[command]')
    .option("-n, --name <application-name>", "Application name")
    .option("-d, --desc <description>", "Application description")//, "default description")
    .addHelpText('before', helper.applicationHelp)
    .action(function () {
        const applicationActions = ["ls", "create", "edit", "del"]
        if (!this.args?.length|| !applicationActions.includes(this.args[0])) {
            console.log(program.commands[0].help())
        }
        else {
            application.applicationMenu(this.args, this.opts())
        }
    })

program
    .command('factory')
    .argument('[command]')
    .option("-n, --name <facroty-name>", "Factory name")
    .option("-p, --application <application>", "Application name", "defultApplication")
    .addHelpText('before', helper.factoryHelp)
    .action(function () {
        const factoryActions = ["ls", "create", "edit", "del"]
        if (!this.args?.length || !factoryActions.includes(this.args[0])) {
            console.log(program.commands[1].help())
        }
        else {
            factory.factoryMenu(this.args, this.opts())
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
        // console.log(this.args)
        // console.log(this.opts())
        if (!this.args?.length || !userActions.includes(this.args[0])) {
            console.log(program.commands[2].help())
        }
        else {
            user.userMenu(this.args, this.opts())
        }
    })

program.parse(process.argv)
