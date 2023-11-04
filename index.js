const mttj = require('mttj')
const pug = require('pug')
const path = require('path')
const markdownIt = require('markdown-it')
const highlightjs = require('markdown-it-highlightjs')
const meta = require('markdown-it-meta')
const fs = require('node:fs')



const md = markdownIt({ breaks: true, html: true })
    .use(highlightjs, { inline: true })
    .use(meta)


/**
 * Display standard info.
 * @param  {...any} args Things to display
 */
function λ(...args) {
    console.log(`🐗: 👍 ⇒ {`, ...args, `}`)
}


/**
 * Display error message.
 * @param  {...any} args Things to display
 */
function Λ(...args) {
    console.log(`🐗: ❌ ⇒ {`, ...args, `}`)
}

/**
 * Callback function, that display error if any occured.
 * @param {Error} err 
 */
function fun(err) {
    if (err) Λ(err)
}


/**
 * Writes a string content into output file.
 * @param {string} out output file
 * @param {string} str string content
 */
function write(out, str) {
    fs.mkdirSync(path.dirname(out), { recursive: true, flag: 'w' });
    fs.writeFile(out, str, fun)
}


function pug2html(file, out, obj) {
    try {
        write(`./public/${out}.html`, pugjs(`./views/${file}.pug`, obj))
        λ(`Compiled ${file}`)
    } catch (error) {
        let locals_str = ''
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                locals_str += ` ${key} `
            }
        }
        Λ(`Can not compile ${file} into ${out}, with locals: ${locals_str}`)
        
    }
    
}


/**
 * Converts markdown file content to string
 * @param {string} path input path
 */
function readMd(path) {
    fs.existsSync(path) ? fs.readFileSync(path).toString() : '???'
}


/**
 * Compile pug file using `obj` as pug locals.
 * Assumes `./views` is a basedir for pug files.
 * @param {string} file input file
 * @param {Object} obj pug locals
 */
function pugjs(file, obj) {
    pug.compileFile(file, { basedir: './views' })(obj)
}



module.exports = {

    content: (beast, individual) => {
        const path = `./models/content/${beast}s/${individual}.md`
        const content = md.render(readMd(path))
        return content
    }
    // , pugLone: (beast, individual, obj) => write(`./public/${beast}s/${individual.$}.html`, pugjs(`./views/beasts/${beast}/lone.pug`, { ...obj, $: individual }))
    // , pugList: (beast, obj)             => write(`./public/${beast}s.html`, pugjs(`./views/beasts/${beast}/list.pug`, obj))
    // , pugPage: (page, obj)              => write(`./public/${page}.html`, pugjs(`./views/pages/${page}.pug`, obj))
    , pugLone: (beast, individual, obj) => pug2html(    `beasts/${beast}/lone`,     `${beast}s/${individual.$}`,    { ...obj, $: individual }   )
    , pugList: (beast, obj)             => pug2html(    `beasts/${beast}/list`,     `${beast}s`,                    obj                         )
    , pugPage: (page, obj)              => pug2html(    `pages/${page}`,            `${page}`,                      obj                         )
    // ,model		:	( 						)	=>	mttj.parseFileSync('./models/data.md')
    , model: () => mttj.parseDirSync('./models/')
    , say: (err, msg = '') => λ(err ? err : msg)
    , error: (err, msg = '') => Λ(err ? err : msg)
}
