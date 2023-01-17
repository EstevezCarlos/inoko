#!/usr/bin/env node

const mttj			=	require('mttj')
const pug			=	require('pug')
const path			=	require('path')
const markdownIt	=	require('markdown-it')
const highlightjs	=	require('markdown-it-highlightjs')
const fs			=	require('node:fs')
const cmd			=	require('./commands.js')
const say			=	require('./say.js')

const dirs			=	{
	"controllers"	:	"controllers",
	"cSingles"		:	"controllers/singles",
	"cLists"		:	"controllers/lists",
	"models"		:	"models",
	"content"		:	"models/content",
	"data"			:	"models/data",
	"routes"		:	"routes",
	"views"			:	"views",
	"vSingles"		:	"views/singles",
	"vLists"		:	"views/lists",
	"bases"			:	"views/bases",
	"public"		:	"public",
	"css"			:	"public/css",
	"js"			:	"public/js",
	"imgs"			:	"public/imgs"
}


// Command line interface

const cli	=	( key, kwargs, args ) => say( Object.keys(cmd.cmd).includes(key) ? cmd[key]( kwargs, args) : `Command not found: ${key}.` )

if ( process.argv.length > 3 ) cli.cli(process.argv[2], {dirs}, process.argv.slice(3))
// if ( process.argv.length > 2 ) cli.help(process.argv[2])



 
// Module

{
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
}