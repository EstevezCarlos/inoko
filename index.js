const mttj			=	require('mttj')
const pug			=	require('pug')
const path			=	require('path')
const markdownIt	=	require('markdown-it')
const highlightjs	=	require('markdown-it-highlightjs')
const fs			=	require('node:fs')
// const df			=	require('data-forge')

// const data = new df.DataFrame([
// 	{ name: 'Alice', age: 25, city: 'New York' },
// 	{ name: 'Bob', age: 30, city: 'Los Angeles' },
// 	{ name: 'Charlie', age: 35, city: 'Chicago' },
// ])

// console.log(data.where(row => row.age > 25).toArray())
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

	content 	:	( beast,individual		)	=>	md.render(readMd(`./models/content/${beast}s/${individual}.md`))
	,pugList	:	( beast,obj				)	=> 	write(`./public/dist/lists/${beast}.html`,pugjs(`./views/lists/${beast}.pug`,obj))
	,pugSingle	:	( beast,individual,obj	)	=>	write(`./public/dist/singles/${beast}s/${individual}.html`,pugjs(`./views/singles/${beast}.pug`,obj))
	,pugPage	:	( page,obj				)	=>	write(`./public/${page}.html`,pugjs(`./views/${page}.pug`,obj))
	,model		:	( 						)	=>	mttj.parseFileSync('./models/data.md')

}
