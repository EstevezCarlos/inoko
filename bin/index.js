#!/usr/bin/env node


const cmd			=	require('./commands.js')

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
cmd.cmd( {dirs:dirs}, process.argv.slice(2) )

// if ( process.argv.length > 2 ) cli.help(process.argv[2])



 
