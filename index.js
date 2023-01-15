#!/usr/bin/env node

const mttj			=	require('mttj')
const pug			=	require('pug')
const fs			=	require('node:fs')
const path			=	require('path')
const markdownIt	=	require('markdown-it')
const highlightjs	=	require('markdown-it-highlightjs')

const cmd			=	require('./cli/commands.js')


// const program = require("commander");
// const { getPkgVersion } = require("../src/util");

// // const inquirer = require("inquirer");

// program
//   .version(getPkgVersion())
//   .usage("<command> [options]")
//   .command("init [projectName]", "Init a project with default templete")
//   .command("build", "Build a project with options")
//   .command("update", "Update packages of wamuu")
//   .parse(process.argv);

// if (!program.args.length) {
//   program.help();
// }

 


const

	fun			=	err => { if (err) throw err }
	,write		=	(out,str) => {
		fs.mkdirSync(path.dirname(out), { recursive: true , flag:'w'});
		fs.writeFile(out,str,fun)
	}

	,readMd		=	path => fs.existsSync(path) ? fs.readFileSync(path).toString() : '???'
	,md			=	markdownIt({breaks: true}).use(highlightjs, {inline:true})
	,pugjs		= 	(file,obj) => pug.compileFile(file, {basedir:'./'})(obj)

const tools = {

	md 			:	file => md.render(readMd(file))
	,content 	:	(component,instance)		=>	md.render(readMd(`./models/content/${component}s/${instance}.md`))
	,pug		:	(component,obj)				=> 	write(`./public/dist/${component}.html`,pugjs(`./views/${component}.pug`,obj))
	,pugs		:	(component,instance,obj)	=>	write(`./public/dist/${component}s/${instance}.html`,pugjs(`./views/${component}.pug`,obj))
}

const model = () => { return {
	
	...mttj.parseFileSync('./models/data.md')
	,readMd		:	path => fs.existsSync(path) ? fs.readFileSync(path).toString() : '???'
	
}}

module.exports = tools,model