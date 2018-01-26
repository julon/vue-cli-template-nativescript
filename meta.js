module.exports = {
  prompts: {
    name: {
      type: "string",
      required: true,
      message: "Project name (kebab-case only)"
    },
    description: {
      type: "string",
      required: true,
      message: "Project description",
      default: "A Nativescript + Vue.js 2.0 project"
    },
    author: {
      type: "string",
      message: "Author"
    },
    repos: {
      type: "string",
      required: true,
      message: "Github repository URL",
      default: "user/repository"
    },
    semanticRelease: {
      type: "confirm",
      message: "Do you want to use semantic release?",
      default: true
    }
  },
  filters: {
    ".commitlintrc.json": "semanticRelease"
  },
  skipInterpolation: "src/**/*.{html,vue}",
  complete (data) {
    console.log(data)
    // cd dir
    // npm install -g nativescript semantic-release-cli && npm install && tns init && semantic-release-cli setup
  }
}
