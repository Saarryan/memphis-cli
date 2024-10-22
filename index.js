#!/usr/bin/env node
const commander = require('commander');

const factory = require('./actions/factory')
const station = require('./actions/station')
const user = require('./actions/users')
const connect = require('./actions/connect')
const helper = require('./config/helper')
const producer = require('./actions/producer')
const consumer = require('./actions/consumer')
const init = require('./actions/init')

const program = new commander.Command();

program
    .version('0.1.0')
    .usage('<command> [options]')
    // .description('Memphis CLI')
    .addHelpText('after', `
${helper.factoryDesc}
${helper.factoryHelp}
${helper.stationDesc}
${helper.stationHelp}
${helper.userDesc}
${helper.userHelp}
${helper.producerDesc}
${helper.producerHelp}
${helper.consumerDesc}
${helper.consumerHelp}
`)
//TODO: add ${helper.hubDesc} ${helper.hubHelp}
    .configureHelp({
        sortSubcommands: true,
        subcommandTerm: (cmd) => cmd.name() // Just show the name, instead of short usage.
    });

program
    .command('connect')
    .description('Connection to Memphis server')
    .argument('[command]')
    .option("-u, --user <user>", "User")
    .option("-p, --password <password>", "Password")
    .option("-s, --server <server>", "Memphis server")
    .usage('<command> [options]')
    .showHelpAfterError()
    .addHelpText('before', helper.connectDesc)
    .action(function () {
        if (Object.keys(this.opts()).length === 0) {
            console.log(program.commands[0].help())
        }
        else if (!this.opts().user || !this.opts().password || !this.opts().server) {
            console.log("Use command: mem connect --user <user> --password <password> --server <server>")
        }
        else {
            connect(this.opts())
        }
    })

program
    .command('factory')
    .description('Factories usage commands')
    .argument('<command>')
    .option("-n, --name <factory-name>", "Factory name")
    .option("-d, --desc <factory-description>", "Factory description")
    .usage('<command> [options]')
    .showHelpAfterError()
    .configureHelp({
        sortSubcommands: true,
        subcommandTerm: (cmd) => cmd.name() // Just show the name, instead of short usage.
    })
    .addHelpText('before', helper.factoryDesc)
    .addHelpText('after', `\n${helper.factoryHelp}`)
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
    .command('station')
    .description('Stations usage commands')
    .argument('<command>')
    .option("-n, --name <station-name>", "Station name")
    .option("-f, --factory <factory>", "Factory name", "defultFactory")
    .option("-rt, --retentiontype <retention-type>", "Retention type")
    .option("-rv, --retentionvalue <retention-value>", "Retention value")
    .option("-s, --storage <storage-type>", "Storage type")
    .option("-r, --replicas <replicas>", "Replicas")
    .option("-de, --dedupenabled <dedup-enabled>", "Dedup enabled")
    .option("-dw, --dedupwindow <dedup-window-in-ms>", "Dedup window in ms")
    .usage('<command> [options]')
    .showHelpAfterError()
    .configureHelp({
        sortSubcommands: true,
        subcommandTerm: (cmd) => cmd.name() // Just show the name, instead of short usage.
    })
    .addHelpText('before', helper.stationDesc)
    .addHelpText('after', `\n${helper.stationHelp}`)
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
    .description('Users usage commands')
    .argument('<command>')
    .option("-n, --name <user-name>", "User name")
    .option("-p, --password <user-password>", "User password")
    .option("-t, --type <user-type>", "User type", "management")
    .option("-a, --avatar <avatar-id>", "Avatar id", 1)
    // .option("-hu, --hubuser <hub-username>", "Hub user name")
    // .option("-hp, --hubpass <hub-password>", "Hub password")
    .usage('<command> [options]')
    .showHelpAfterError()
    .configureHelp({
        sortSubcommands: true,
        subcommandTerm: (cmd) => cmd.name() // Just show the name, instead of short usage.
    })
    .addHelpText('before', helper.userDesc)
    .addHelpText('after', `\n${helper.userHelp}`)
    .action(function () {
        const userActions = ["ls", "add", "del"]
        if (!this.args?.length || !userActions.includes(this.args[0])) {
            console.log(program.commands[3].help())
        }
        else {
            user.userMenu(this.args, this.opts())
        }
    })

program
    .command('producer')
    .description('Producers usage commands')
    .option("-s, --station <station-name>", "Producers by station")
    .argument('<command>')
    .usage('<command> [options]')
    .showHelpAfterError()
    .configureHelp({
        sortSubcommands: true,
        subcommandTerm: (cmd) => cmd.name() // Just show the name, instead of short usage.
    })
    .addHelpText('before', helper.producerDesc)
    .addHelpText('after', `\n${helper.producerHelp}`)
    .action(function () {
        const producerActions = ["ls"]
        if (!this.args?.length || !producerActions.includes(this.args[0])) {
            console.log(program.commands[1].help())
        }
        else {
            producer.producerMenu(this.args, this.opts())
        }
    })

program
    .command('consumer')
    .description('Consumer usage commands')
    .option("-s, --station <station-name>", "Consumers by station")
    .argument('<command>')
    .usage('<command> [options]')
    .showHelpAfterError()
    .configureHelp({
        sortSubcommands: true,
        subcommandTerm: (cmd) => cmd.name() // Just show the name, instead of short usage.
    })
    .addHelpText('before', helper.consumerDesc)
    .addHelpText('after', `\n${helper.consumerHelp}`)
    .action(function () {
        const consumerActions = ["ls"]
        if (!this.args?.length || !consumerActions.includes(this.args[0])) {
            console.log(program.commands[1].help())
        }
        else {
            consumer.consumerMenu(this.args, this.opts())
        }
    })

program
    .command('init')
    .description('Creates an example project for working with Memphis')
    .option("-l, --lang <language>", "Language of project", "nodejs")
    .argument('[command]')
    .usage('[options]')
    .showHelpAfterError()
    .action(function () {
        init.initMenu(this.args, this.opts())
    })

//Prepare to hub command
// program
//     .command('hub')
//     .description('Memphis hub usage commands')
//     .argument('<command>')
//     .usage('<command> [options]')
//     .showHelpAfterError()
//     .configureHelp({
//         sortSubcommands: true,
//         subcommandTerm: (cmd) => cmd.name() // Just show the name, instead of short usage.
//     })
//     .addHelpText('before', helper.hubDesc)
//     .addHelpText('after', `\n${helper.hubHelp}`)
//     .action(function () {
//         const userActions = ["login"]
//         if (!this.args?.length || !userActions.includes(this.args[0])) {
//             console.log(program.commands[4].help())
//         }
//         else {
//             return
//         }
//     })


program.parse(process.argv)
