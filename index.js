#!/usr/bin/env node
const commander = require("commander");
const project = require("./actions/project")
const factory = require("./actions/factory")
const user = require("./actions/users")
const helper = require("./config/helper")
const program = new commander.Command();

program
    .version('0.1.0')
    .description('Strech CLI')
    .addHelpText('before', `${helper.projectHelp}\n${helper.factoryHelp}\n${helper.userHelp}`)

program
    .command('project')
    .argument('[command]')
    .option("-n, --name <project-name>", "Project name")
    .option("-d, --desc <description>", "Project description")//, "default description")
    .addHelpText('before', helper.projectHelp)
    .action(function () {
        const projectActions = ["ls", "create", "edit", "del"]
        if (!this.args?.length|| !projectActions.includes(this.args[0])) {
            console.log(program.commands[0].help())
        }
        else {
            project.projectMenu(this.args, this.opts())
        }
    })

program
    .command('factory')
    .argument('[command]')
    .option("-n, --name <facroty-name>", "Factory name")
    .option("-p, --project <project>", "Project name", "defultProject")
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
    .addHelpText('before', helper.userHelp)
    .action(function () {
        const userActions = ["ls", "add", "del", "regeneratepass"]
        if (!this.args?.length || !userActions.includes(this.args[0])) {
            console.log(program.commands[2].help())
        }
        else {
            user.userMenu(this.args, this.opts())
        }
    })

program.parse(process.argv)

