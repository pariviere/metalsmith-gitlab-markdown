
# metalsmith-gitlab-markdown

  A Metalsmith plugin to convert markdown files using the Gitlab Markdown API : https://docs.gitlab.com/ee/api/markdown.html.

  You may need to include additional libraries in order to have access to all Gitlab Markdown features. See : https://docs.gitlab.com/ee/user/markdown.html

## Installation

    $ npm install metalsmith-gitlab-markdown

## CLI Usage

  Install via npm and then add the `metalsmith-gitlab-markdown` key to your `metalsmith.json` plugins:

```json
{
  "plugins": {
    "metalsmith-gitlab-markdown": {
      "apiUrl": "http://gitlab/api/v4/markdown",
      "apiOptions": {
        "gfm": true
      }
    }
  }
}
```

## Javascript Usage

  Pass `options` to the Gitlab markdown plugin and pass it to Metalsmith with the `use` method:

```js
var markdown = require('metalsmith-markdown');

metalsmith.use(markdown({
  apiUrl: "http://gitlab/api/v4/markdown",
  apiOptions: {
    gfm: true
  }
}));
```

## License

  MIT
