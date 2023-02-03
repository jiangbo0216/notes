## https://github.com/mysticatea/npm-run-all

https://github.com/bcomnes/npm-run-all2 是 npm-run-all 的一个 fork


npm install npm-run-all --save-dev

使用 glob-like 简化多个命令的执行

shorten it by glob-like patterns 

Examples:
    $ npm-run-all --serial clean lint build:**
    $ npm-run-all --parallel watch:**
    $ npm-run-all clean lint --parallel "build:** -- --watch"
    $ npm-run-all -l -p start-server start-browser start-electron

### CLI Commands

**【z】run-s run-p 是 serial parallel 的简写**


This `npm-run-all` package provides 3 CLI commands.

- [npm-run-all](https://github.com/mysticatea/npm-run-all/blob/master/docs/npm-run-all.md)
- [run-s](https://github.com/mysticatea/npm-run-all/blob/master/docs/run-s.md)
- [run-p](https://github.com/mysticatea/npm-run-all/blob/master/docs/run-p.md)

The main command is [npm-run-all](https://github.com/mysticatea/npm-run-all/blob/master/docs/npm-run-all.md). We can make complex plans with [npm-run-all](https://github.com/mysticatea/npm-run-all/blob/master/docs/npm-run-all.md) command.

Both [run-s](https://github.com/mysticatea/npm-run-all/blob/master/docs/run-s.md) and [run-p](https://github.com/mysticatea/npm-run-all/blob/master/docs/run-p.md) are shorthand commands. [run-s](https://github.com/mysticatea/npm-run-all/blob/master/docs/run-s.md) is for sequential, [run-p](https://github.com/mysticatea/npm-run-all/blob/master/docs/run-p.md) is for parallel. We can make simple plans with those commands.

## https://github.com/open-cli-tools/concurrently


npm i -D concurrently	

Examples:

 - Output nothing more than stdout+stderr of child processes

     $ concurrently --raw "npm run watch-less" "npm run watch-js"

 - Normal output but without colors e.g. when logging to file

     $ concurrently --no-color "grunt watch" "http-server" > log

 - Custom prefix

     $ concurrently --prefix "{time}-{pid}" "npm run watch" "http-server"

 - Custom names and colored prefixes

     $ concurrently --names "HTTP,WATCH" -c "bgBlue.bold,bgMagenta.bold"
     "http-server" "npm run watch"

 - Auto varying colored prefixes

     $ concurrently -c "auto" "npm run watch" "http-server"

 - Mixing auto and manual colored prefixes

     $ concurrently -c "red,auto" "npm run watch" "http-server" "echo hello"

 - Configuring via environment variables with CONCURRENTLY_ prefix

     $ CONCURRENTLY_RAW=true CONCURRENTLY_KILL_OTHERS=true concurrently "echo
     hello" "echo world"

 - Send input to default

     $ concurrently --handle-input "nodemon" "npm run watch-js"
     rs  # Sends rs command to nodemon process

 - Send input to specific child identified by index

     $ concurrently --handle-input "npm run watch-js" nodemon
     1:rs

 - Send input to specific child identified by name

     $ concurrently --handle-input -n js,srv "npm run watch-js" nodemon
     srv:rs

 - Shortened NPM run commands

     $ concurrently npm:watch-node npm:watch-js npm:watch-css

 - Shortened NPM run command with wildcard (make sure to wrap it in quotes!)

     $ concurrently "npm:watch-*"

 - Exclude patterns so that between "lint:js" and "lint:fix:js", only "lint:js"
 is ran

     $ concurrently "npm:*(!fix)"

 - Passthrough some additional arguments via '{<number>}' placeholder

     $ concurrently -P "echo {1}" -- foo

 - Passthrough all additional arguments via '{@}' placeholder

     $ concurrently -P "npm:dev-* -- {@}" -- --watch --noEmit

 - Passthrough all additional arguments combined via '{*}' placeholder

     $ concurrently -P "npm:dev-* -- {*}" -- --watch --noEmit