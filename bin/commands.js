const fs		=	require("fs")
const path		=	require("path")
const { exec }	=	require("child_process")
const say		=	require("./say.js")
const prompt	=	require("prompt-sync")

const cmd = {

	cmd: function (kwargs,args) {
		const k = args[0]
		const v = args[1]
		const kv = [k,v].toString()
		if			(	kv == 'new,project'	)	this.newProject(kwargs,args.slice(3))
		else if 	(	kv == 'fix,project'	)	this.fixProject(kwargs,args.slice(3))
		else if 	(	kv == 'del,project'	)	say("Inoko CLI doesn't support deleting projects. You can delete all files of the project via system commands if you wish yo discontinue.")

		else if		(	kv == 'new,beast'	)	this.newBeast(kwargs,args.slice(3))
		else if 	(	kv == 'fix,beast'	)	this.fixBeast(kwargs,args.slice(3))
		else if 	(	kv == 'del,beast'	)	this.delBeast(kwargs,args.slice(3))
		
		else if		(	kv == 'help,new'	)	say('')
		else if		(	kv == 'help,fix'	)	say('')
		else if		(	kv == 'help,del'	)	say('')

		else if		(	kv == 'help,project')	say('')
		else if		(	kv == 'help,beast'	)	say('')

		else									say("Invalid command. Use 'inoko help' to get list of commands.")
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

		fs.writeFileSync()
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