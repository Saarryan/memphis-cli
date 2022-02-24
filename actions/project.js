const project = require("../controllers/project")

exports.projectMenu = (action, options) => {
    switch (action[0]) {
        case "ls":
            project.getProjects()
            break;
        case "create":
            if (!action[1])
                console.log("\nProject name is required. Use command:\nstrech project create <project-name> --desc <project-description>")
            else
                project.createProject(action[1], options)
            break;
        case "edit":
            if (!action[1])
                console.log("\nProject name is required. Use command:\nstrech project edit <project-name> --name <new-name> --desc <new-project-name>")
            else if (!(options.name || options.desc))
                console.log("\nSome flag required")
            else
                project.editProject(action[1], options)
            break;
        case "del":
            if (!action[1])
                console.log("\nProject name is required. Use command:\nstrech project del <project-name> ")
            else
                project.removeProject(action[1])
            break;
        default:
            return
    }
};
