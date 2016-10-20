'use strict'

const test = require('tape')
const isStream = require('is-stream')
const sink = require('stream-sink')

const lineLengthStream = require('.')
const {lineLength} = lineLengthStream

const tabs = '    '



test('lineLength – code-only line', (t) => {
	t.plan(1)
	t.deepEqual(lineLength('foo bar', tabs), [0, 7])
})

test('lineLength – spaces-only line', (t) => {
	t.plan(1)
	t.deepEqual(lineLength('  ', tabs), [2, 0])
})

test('lineLength – tab-only line', (t) => {
	t.plan(1)
	t.deepEqual(lineLength('\t', tabs), [4, 0])
})

test('lineLength – empty line', (t) => {
	t.plan(1)
	t.deepEqual(lineLength('', tabs), [0, 0])
})

test('lineLength – line indented by spaces', (t) => {
	t.plan(1)
	t.deepEqual(lineLength('  foo', tabs), [2, 3])
})

test('lineLength – line indented by tabs', (t) => {
	t.plan(1)
	t.deepEqual(lineLength('\tfoo', tabs), [4, 3])
})

test('lineLength – kitchen sink', (t) => {
	t.plan(1)
	t.deepEqual(lineLength('\t  foo bar baz', tabs), [6, 11])
})



test('lineLengthStream – is a duplex stream', (t) => {
	t.plan(1)

	t.ok(isStream.duplex(lineLengthStream()))
})

test('lineLengthStream – empty line', (t) => {
	t.plan(1)
	const lls = lineLengthStream()

	lls.pipe(sink('object')).then((data) => {
		t.deepEqual(data, [[0, 3], [0, 0], [2, 7]])
	})
	lls.end('foo\n\n  bar baz')
})

test('lineLengthStream – unequal indentation', (t) => {
	t.plan(1)
	const lls = lineLengthStream({tabSize: 4})

	lls.pipe(sink('object')).then((data) => {
		t.deepEqual(data, [[0, 3], [2, 3], [4, 3], [6, 4]])
	})
	lls.end('foo\n  bar\n    baz\n  \tquux')
})
