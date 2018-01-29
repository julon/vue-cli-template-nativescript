const path = require('path')
const fs = require('fs')
const spawn = require('child_process').spawn

/**
 * Spawns a child process and runs the specified command
 * By default, runs in the CWD and inherits stdio
 * Options are the same as node's child_process.spawn
 * @param {string} cmd
 * @param {array<string>} args
 * @param {object} options
 */
function runCommand(cmd, args, options) {
  const command = `${cmd} ${args.join(' ')}`;
  console.log('\nExecuting: ${command}\n')
  return new Promise((resolve, reject) => {
    const spwan = spawn(
      cmd,
      args,
      Object.assign(
        {
          cwd: process.cwd(),
          stdio: 'inherit',
          shell: true,
        },
        options
      )
    )

    spwan.on('exit', () => {
      resolve()
    })
  })
}

module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name (kebab-case only)'
    },
    description: {
      type: 'string',
      required: true,
      message: 'Project description',
      default: 'A Nativescript + Vue.js 2.0 project'
    },
    author: {
      type: 'string',
      message: 'Author'
    },
    repos: {
      type: 'string',
      required: true,
      message: 'Github repository URL',
      default: 'user/repository'
    },
    semanticRelease: {
      type: 'confirm',
      message: 'Do you want to use semantic release?',
      default: true
    },
    autoInstall: {
      type: 'confirm',
      message: 'Do you want to auto-install everything with npm?',
      default: true
    }
  },
  filters: {
    '.commitlintrc.json': 'semanticRelease'
  },
  skipInterpolation: 'src/**/*.{html,vue}',
  complete (data) {
    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)
    const instructions = `please execute:\n\n$ cd ${data.destDirName} && npm run dev\n\nAnd in another shell:\n\n$ tns run [platform]`;

    // init global install params
    const params = ['install', '-g', 'nativescript']
    if (data.semanticRelease) {
      // add semantic release
      params.push('semantic-release-cli')
    }

    if (data.autoInstall) {
      // install global packages
      runCommand('npm', params, {cwd})
        // install project local packages
        .then(() => runCommand('npm', ['install'], {cwd}))
        // init project folder as nativescript project
        .then(() => runCommand('tns', ['init'], {cwd}))
        // install nativescript dependencies and init template
        .then(() => runCommand('tns', ['install'], {cwd}))
        // run semantic release setup if needed
        .then(() => (data.semanticRelease ? runCommand('semantic-release-cli', ['setup'], {cwd}) : Promise.resolve()))
        .then(() => console.log(`Install completed. To get started, ${instructions}`))
        .catch(() => console.error('Something went wrong. Please see the log above.'))
    } else {
      // print instructions
      const npmParams = params.join(' ')
      const semanticReleaseCommand = data.semanticRelease ? '&& semantic-release-cli setup' : '';
      console.log(`\nPlease execute the following script to finish the setup process :\n$ cd ${data.destDirName}\n$ npm ${npmParams} && npm install && tns init ${semanticReleaseCommand}\n\n`);
      console.log(`After installation completed, ${instructions}`)
    }
  }
}
