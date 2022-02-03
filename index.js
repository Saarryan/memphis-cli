#!/usr/bin/env node
const commander = require("commander"); // include commander in git clone of commander repo
const project = require("./actions/project")
const factory = require("./actions/factory")
const user = require("./actions/users")
const program = new commander.Command();

program
    .version('0.1.0')
    .description('Strech CLI')

program
    .command('project')
    .description('Project description')
    .argument('[action]',["ls", "create", "edit", "remove", "del"])
    .option("-n, --name <project-name>", "Project or queue name")
    .option("-d, --desc <description>", "Project description")//, "default description")
    .action(function () {
        if (!this.args?.length)
            program.help();
        else {
            project.projectMenu(this.args, this.opts())
        }
    })

program
    .command('factory')
    .description('Factory description')
    .argument('[action]',["ls", "create", "edit", "remove", "del"])
    .option("-n, --name <facroty-name>", "Factory name")
    .option("-p, --project <project>", "Project name")
    .action(function () {
        if (!this.args?.length)
            program.help();
        else {
            factory.factoryMenu(this.args, this.opts())
        }
    })

program
    .command('user')
    .description('User description')
    .argument('[action]',["ls", "create", "edit", "remove", "del", "regeneratepass"])
    .action(function () {
        if (!this.args?.length)
            program.help();
        else {
            user.userMenu(this.args, this.opts())
        }
    })

program.parse(process.argv)

