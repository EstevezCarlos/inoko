const fs		=	require("fs")
const path		=	require("path")
const { exec }	=	require("child_process")
const say		=	require("./say.js")
const prompt	=	require("prompt-sync")

const cmd = {

	cmd: function (kwargs,args) {
		const a = args[0]
		const b = args[1]

		if			(	[a,b] == ['new','project']	)	this.newProject(kwargs,args.slice(3))
		else if 	(	[a,b] == ['fix','project']	)	this.fixProject(kwargs,args.slice(3))
		else if 	(	[a,b] == ['del','project']	)	this.delProject(kwargs,args.slice(3))

		else if		(	[a,b] == ['new','beast']	)	this.newBeast(kwargs,args.slice(3))
		else if 	(	[a,b] == ['fix','beast']	)	this.fixBeast(kwargs,args.slice(3))
		else if 	(	[a,b] == ['del','beast']	)	this.delBeast(kwargs,args.slice(3))
		
		else if		(	[a,b] == ['help','new']		)	say('')
		else if		(	[a,b] == ['help','fix']		)	say('')
		else if		(	[a,b] == ['help','del']		)	say('')

		else if		(	[a,b] == ['help','project']	)	say('')
		else if		(	[a,b] == ['help','beast']	)	say('')

		else											say("Invalid command. Use 'inoko help' to get list of commands.")
	},



	//method to create a new project
	newProject: function (kwargs, args) {
		
		//create the directories
		say('---------- Creating directories ----------');
		for (const dir of Object.values(kwargs.dirs)) {
			if (fs.existsSync(dir)) {
				say(`Directory ${dir} already exists`)
				return
			}
			fs.mkdirSync(dir)
		}
		say('---------- Directories created -----------');
	},



	//method to fix a project
	fixProject: function (kwargs) {
		say('---------- Fixing directories -----------')
		let i = 0
		for (const dir of Object.values(kwargs.dirs))  {
			if (!fs.existsSync(dir)) {
				say(`Creating ${dir}`)
				fs.mkdirSync(dir)
				i += 1
			}
		}
		say(`Fixed ${i} directories.`)
	},



	//method to delete a project
	delProject: function (kwargs, args) {
		let sure = args[0]
		if ( sure != 'DELETE' ) sure = prompt(`🐗 Type 'DELETE' to delete your project`)
		if ( sure != 'DELETE' ) return
		for (const dir of Object.values(kwargs.dirs)) {
			if (fs.existsSync(dir)) {
				say(`Deleting ${dir}`)
				fs.rmSync(dir, {recursive: true, force: true})
			}
		}
		say(`Project deleted`)
	},



	//method to create a new beast
	newBeast(kwargs, name){
		const dirs = kwargs.dirs
		const filesList = [
			`${dirs.vSingles}/${name}.pug`	,
			`${dirs.vLists}/${name}s.pug`	,
			`${dirs.cSingles}/${name}.js`	,
			`${dirs.cLists}/${name}s.js`	,
		]
		const dirList = [
			`${dirs.content}/${name}/`		,
		]

		for (const dir of dirList + filesList) {
			if (fs.existsSync(dir)) return `Beast '${name}' already exists at ${dir}. If it's missing some files, use 'inoko fix beast [name]' to fix.`
		}
		
		for (const dir of dirList) fs.mkdirSync(dir)

		for (const file of filesList) fs.writeFileSync(file)
	},



	//method to fix a beast
}

module.exports = cmd