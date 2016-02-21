dpStrEql =         require 'deep-strict-equal'
isStream =         require 'is-stream'
sinkStream =       require 'stream-sink'

lineLengthStream = require './index.js'
{lineLength} =     lineLengthStream





tabSize = '    '

module.exports =

	lineLength:

		'code-only line': (test) ->
			test.ok dpStrEql lineLength('foo bar', tabSize), [0, 7]
			test.done()

		'spaces-only line': (test) ->
			test.ok dpStrEql lineLength('  ', tabSize), [2, 0]
			test.done()

		'tab-only line': (test) ->
			test.ok dpStrEql lineLength('\t', tabSize), [4, 0]
			test.done()

		'empty line': (test) ->
			test.ok dpStrEql lineLength('', tabSize), [0, 0]
			test.done()

		'line indented by spaces': (test) ->
			test.ok dpStrEql lineLength('  foo', tabSize), [2, 3]
			test.done()

		'line indented by tabs': (test) ->
			test.ok dpStrEql lineLength('\tfoo', tabSize), [4, 3]
			test.ok dpStrEql lineLength('\t\tfoo', tabSize), [8, 3]
			test.done()

		'kitchen sink': (test) ->
			test.ok dpStrEql lineLength('\t  foo bar qux', tabSize), [6, 11]
			test.done()

	lineLengthStream:

		'returns a duplex steam': (test) ->
			test.ok isStream.duplex lineLengthStream()
			test.done()

		'test with empty line': (test) ->
			lls = lineLengthStream()
			sink = sinkStream objectMode: true
			lls.pipe sink

			sink.on 'data', (d) ->
				test.ok dpStrEql d, [[0, 3], [0, 0], [2, 7]]
				test.done()
			lls.end 'foo\n\n  bar baz'

		'test with different indentations': (test) ->
			lls = lineLengthStream tabSize: 4
			sink = sinkStream objectMode: true
			lls.pipe sink

			sink.on 'data', (d) ->
				test.ok dpStrEql d, [[0, 3], [2, 3], [4, 3], [6, 4]]
				test.done()
			lls.end 'foo\n  bar\n    baz\n  \tquux'
