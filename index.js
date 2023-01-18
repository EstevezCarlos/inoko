const mttj			=	require('mttj')
const pug			=	require('pug')
const path			=	require('path')
const markdownIt	=	require('markdown-it')
const highlightjs	=	require('markdown-it-highlightjs')
const fs			=	require('node:fs')


const

	fun			=	err => { if (err) throw err }
	,write		=	(out,str) => {
		fs.mkdirSync(path.dirname(out), { recursive: true , flag:'w'});
		fs.writeFile(out,str,fun)
	}

	,readMd		=	path => fs.existsSync(path) ? fs.readFileSync(path).toString() : '???'
	,md			=	markdownIt({breaks: true}).use(highlightjs, {inline:true})
	,pugjs		= 	(file,obj) => pug.compileFile(file, {basedir:'./'})(obj)

module.exports  = {

	md 			:	file => md.render(readMd(file))
	,content 	:	(component,instance)		=>	md.render(readMd(`./models/content/${component}s/${instance}.md`))
	,pugList	:	(component,obj)				=> 	write(`./public/dist/${component}.html`,pugjs(`./views/${component}.pug`,obj))
	,pugSingle	:	(component,instance,obj)	=>	write(`./public/dist/${component}s/${instance}.html`,pugjs(`./views/${component}.pug`,obj))
	,model		:	() => { return {
		
		...mttj.parseFileSync('./models/data.md')
		,readMd		:	path => fs.existsSync(path) ? fs.readFileSync(path).toString() : '???'
		
	}}
}
