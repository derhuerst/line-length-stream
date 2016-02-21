'use strict'

const byline =    require('byline')
const objectify = require('through2-objectify')
const connect =   require('stream-connect')



const tabs =        /\t/g
const indentation = /^\s*/

const lineLength = function (l, s) {
	let i = indentation.exec(l)[0]
	let c = l.length - i.length
	i = i.replace(tabs, s).length
	return [i, c]
}

const lineLengthStream = function (options) {
	options = options || {}
	let tabSize = new Array((options.tabSize || 4) + 1).join(' ')

	return connect( // todo: seems to be unelegant
		new byline.LineStream({keepEmptyLines: true}),
		objectify(function (line, _, cb) {
			this.push(lineLength(line.toString(), tabSize))
			cb()
		})
	)
}



lineLengthStream.lineLength = lineLength
module.exports = lineLengthStream
