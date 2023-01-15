const fs			=	require(	"fs"				)
const path			=	require(	"path"				)
const { exec }		=	require(	"child_process"		)

const cmd = {

	dirs: [
		'controllers',
		'models',
		'routes',
		'views',
		'views/singles',
		'views/lists',
		'views/bases',
		'public',
		'public/css',
		'public/js',
		'public/img',
	]

	//method to create a new project
	, init: () => this.dirs.forEach(dir => fs.mkdirSync(dir))
	
	
	
}