module.exports = {
  prompts: {
    name: {
      type: "string",
      required: true,
      label: "Project name (kebab-case only)"
    },
    description: {
      type: "string",
      required: true,
      label: "Project description",
      default: "A Nativescript + Vue.js 2.0 project"
    },
    author: {
      type: "string",
      label: "Author"
    },
    email: {
      type: "string",
      required: true,
      label: "Email"
    },
    repos: {
      type: "string",
      required: true,
      label: "Github repository URL",
      default: "user/repository"
    }
  },
  "skipInterpolation": "src/**/*.vue",
  complete (data) {
    // cd dir
    // npm install -g nativescript semantic-release-cli && npm install && tns init && semantic-release-cli setup
  }
}
