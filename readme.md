# line-length-stream

**A transform stream that returns the length of each line** and the amount of indentation.

```javascript
const lineLengthStream = require('line-length-stream')
let s = lineLengthStream({tabSize: 4})
s.on('data', console.log)

s.write('foo')
s.write('')
s.write('	bar') // indented by 1 tab
s.end('  quux')   // indented by 2 spaces
```

`[0, 3]`, `[0, 0]`, `[4, 3]` and `[0, 3]` will be logged.

[![build status](https://img.shields.io/travis/derhuerst/line-length-stream.svg)](https://travis-ci.org/derhuerst/line-length-stream)
[![dependency status](https://img.shields.io/david/derhuerst/line-length-stream.svg)](https://david-dm.org/derhuerst/line-length-stream#info=dependencies)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/line-length-stream.svg)](https://david-dm.org/derhuerst/line-length-stream#info=devDependencies)


## Installing

```
npm install line-length-stream
```


## Usage

`lineLengthStream` takes accepts an optional `options` argument. It returns a [transform stream](https://nodejs.org/docs/latest/api/stream.html#stream_class_stream_transform). `options` can have the following properties.

- `tabSize`: The number of chars that `'\n'` stands for.



## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/line-length-stream/issues).
