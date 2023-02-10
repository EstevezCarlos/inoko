const mttj			=	require('mttj')
const pug			=	require('pug')
const path			=	require('path')
const markdownIt	=	require('markdown-it')
const highlightjs	=	require('markdown-it-highlightjs')
const meta			=	require('markdown-it-meta')
const fs			=	require('node:fs')
const df			=	require('data-forge')

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
	,pugjs		= 	(file,obj) => pug.compileFile(file, {basedir:'./views'})(obj)
	,md			=	markdownIt({breaks: true})
		.use(highlightjs, {inline:true})
		.use(meta)



module.exports  = {

	content 	:	( beast,individual		)	=>	{
		const path = `./models/content/${beast}s/${individual}.md`
		const content = md.render(readMd(path))
		// console.log(path,'-',content)
		return content
	}
	,pugList	:	( beast,obj				)	=> 	write(	`./public/${beast}s.html`,					pugjs(`./views/beasts/${beast}/list.pug`,	obj)	)
	,pugLone	:	( beast,individual,obj	)	=>	write(	`./public/${beast}s/${individual}.html`,	pugjs(`./views/beasts/${beast}/lone.pug`,	obj)	)
	,pugPage	:	( page,obj				)	=>	write(	`./public/${page}.html`,					pugjs(`./views/pages/${page}.pug`,				obj)	)
	,model		:	( 						)	=>	{
		input = mttj.parseFileSync('./models/data.md')
		output = {}
		for (const [k,v] of Object.entries(data)) {
			output[k] = df.DataFrame(input[k])
		}
		return output
	}
}
