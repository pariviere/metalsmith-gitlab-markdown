
var assert = require('assert');
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var markdown = require('..');

describe('metalsmith-gitlab-markdown', function(){
  it('should convert markdown files', function(done){
    Metalsmith('test/fixtures/basic')
      .use(markdown({
        smartypants: true
      }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/basic/expected', 'test/fixtures/basic/build');
        done();
      });
  });
});
