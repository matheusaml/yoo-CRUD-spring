'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Seja bem vindo ao gerador ${chalk.red('generator-yoo')}. Esse gerador utiliza o PostgreSQL como Banco de dados. Certifique-se de que já tenha criado.`)
    );

    var prompts = [
      {
                type: 'input',
                name: 'projectName',
                message: 'Qual o nome do Projeto?',
                default: 'app-postgresql'
            }, {
                type: 'input',
                name: 'tipo',
                message: 'O sistema irá gerenciar o que?',
                default: 'produto'
            }, {
                type: 'input',
                name: 'description',
                message: 'Qual a descrição do Projeto?',
                default: 'Projeto CRUD de produtos'
            }, {
                type: 'input',
                name: 'ip',
                message: 'Qual o ip do banco de dados no PostgreSQL?',
                default: 'localhost'
            },
            {
              type: 'input',
              name: 'nameDB',
              message: 'Qual o nome do banco de dados?',
              default: 'yoo'
          }, {
                type: 'input',
                name: 'userDB',
                message: 'Qual o usuario do banco de dados?',
                default: 'root'
            }, {
                type: 'input',
                name: 'porta',
                message: 'Qual a porta do banco de dados?',
                default: '5432'
            }, {
                type: 'input',
                name: 'passDB',
                message: 'Qual a senha do banco de dados?',
                default: 'root'
            }];

    return this.prompt(prompts).then(function(props){
      this.props = props;
    }.bind(this));
  }

  writing() {

    var options = {
      projectName : this.props.projectName,
      tipo : this.props.tipo,
      description : this.props.description,
      nameDB : this.props.nameDB,
      userDB : this.props.userDB,
      passDB : this.props.passDB,
      ip : this.props.ip,
      porta : this.props.porta
    };
    this.fs.copy(
      this.templatePath('produtos/**'),
      this.destinationPath(this.props.projectName + '/'),
    { globOptions: { dot: true } }
    )
    this.fs.copyTpl(
      this.templatePath('produtos/src/main/resources/application.properties'),
      this.destinationPath(this.props.projectName + '/src/main/resources/application.properties'),
      options
    )
    this.fs.copyTpl(
      this.templatePath('produtos/src/main/resources/templates/product/'),
      this.destinationPath(this.props.projectName + '/src/main/resources/templates/product/'),
      options
    );
    this.fs.copyTpl(
      this.templatePath('./bower.json'),
      this.destinationPath('./bower.json'),
      options
    );
  }

  install() {
    this.installDependencies();
  }
};
