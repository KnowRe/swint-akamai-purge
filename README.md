# swint-akamai-purge
Sending purge request on akamai for Swint batch task manager(swint-task)

**Warning: This is not the final draft yet, so do not use this until its official version is launched**

## Installation
```sh
$ npm install --save swint-akamai-purge
```

## Testing
You may save your secret credentials for the test at `$HOME/.swint/swint-akamai-purge-test.json` in the format below:
```json
{
	"user": "myemail@example.com",
	"password": "mypassword",
	"prefix": "http://myAkamaiEdge.example.com.edgesuite.net"
}
```

## Options
* `urlPrefix`: `String`, default: `'http://www.example.com'`
* `dir` : `String`, default: `path.join(path.dirname(require.main.filename), '../out')`
* `walkOption` : `Object`, default: `{}`
* `akInfo`
  * `user` : `String`, default: `'user'`
  * `password` : `String`, default: `'password'`

## Usage
```javascript
swintAkamaiPurge({
	dir: path.join(__dirname, '../out'),
	urlPrefix: 'http://myAkamaiEdge.example.com.edgesuite.net',
	akInfo: {
		user: 'myemail@example.com',
		password: 'mypassword'
	}
}, function(err, res) {
	// afterwards...
});
```
