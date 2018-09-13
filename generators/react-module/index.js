'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const camelCase = require('camelcase');

let username = ' ';
let email = ' ';

try {
  username = cp.execSync('git config user.name').toString();
  email = cp.execSync('git config user.email').toString();
} catch (e) {
  /* istanbul ignore next */
  console.error('Missing git configuration');
}

module.exports = class extends Generator {
  initializing() {
    this.log(
      yosay(
        'Welcome to the prime ' +
          chalk.red('zakodium react component library') +
          ' generator!'
      )
    );
  }

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: path.basename(this.destinationRoot()) // Default to current folder name
      },
      {
        type: 'input',
        name: 'org',
        message: 'GitHub organization',
        default: 'zakodium'
      },
      {
        type: 'input',
        name: 'userName',
        message: 'Your name',
        default: username.substring(0, username.length - 1)
      },
      {
        type: 'input',
        name: 'email',
        message: 'Your email',
        default: email.substring(0, email.length - 1)
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your package description'
      }
    ];

    return this.prompt(prompts).then(
      function(props) {
        // To access props later use this.props.name;
        this.props = props;
      }.bind(this)
    );
  }

  writing() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const camelName = camelCase(this.props.name);
    const prefix = this.props.org === 'mljs' ? 'ml-' : '';
    const includes = {
      npmName: prefix + this.props.name,
      name: this.props.name,
      org: this.props.org,
      userName: this.props.userName,
      email: this.props.email,
      description: this.props.description,
      date: year + '-' + month + '-' + day,
      year: year,
      camelName: camelName
    };

    this.fs.copy(this.templatePath('./copy/**'), this.destinationPath('.'), {
      globOptions: {
        dot: true
      }
    });

    this.fs.copyTpl(
      this.templatePath('./package.template.json'),
      this.destinationPath('./package.json'),
      includes
    );

    this.fs.copyTpl(
      this.templatePath('./README.template.md'),
      this.destinationPath('./READE.md'),
      includes
    );
  }

  install() {
    this.npmInstall(
      [
        '@babel/cli',
        '@babel/core',
        '@babel/preset-env',
        '@babel/preset-react',
        'babel-core@bridge',
        'babel-jest',
        'babel-loader',
        'eslint',
        'eslint-config-cheminfo',
        'eslint-config-neptune-react',
        'eslint-plugin-import',
        'eslint-plugin-jest',
        'eslint-plugin-react',
        'jest',
        'npm-run-all',
        'react',
        'react-dom',
        'react-test-renderer',
        'webpack'
      ],
      { dev: true }
    );

    this.npmInstall(['react', 'react-dom'], { peer: true });
  }
};
