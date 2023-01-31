# 4 reasons to avoid using \`npm link\`

原文来自： <https://hirok.io/posts/avoid-npm-link#what-s-npm-link>

其他的 link 方案：[easylink](https://github.com/hueyhe/easylink)

## TL; DR

Instead of using `npm link`, use [`npm install`](https://hirok.io/posts/avoid-npm-link#use-npm-install-instead) or [`npx link`](https://hirok.io/posts/avoid-npm-link#introducing-npx-link) to symlink a local package as a dependency:

**【z】使用 npm install or npx link 来替代**

```
npx link <package-path>
```

[`npx link`](https://github.com/privatenumber/link) is a tool I developed as a safer and more predictable alternative to `npm link`.

Avoid using `npm link` because of the following footguns:

1. [Error-prone with multiple Node.js versions](https://hirok.io/posts/avoid-npm-link#1-multiple-node-js-versions)
2. [No fail-case and unexpected fallback to npm registry](https://hirok.io/posts/avoid-npm-link#2-non-existent-fail-case)
3. [Unexpected binary installation](https://hirok.io/posts/avoid-npm-link#3-unexpected-binary-installation)
4. [Unexpected link removal](https://hirok.io/posts/avoid-npm-link#4-unexpected-link-removal)

## What’s `npm link`?

[`npm link`](https://docs.npmjs.com/cli/v8/commands/npm-link) is a command-line tool for [symlinking](https://en.wikipedia.org/wiki/Symbolic_link) a local package as a dependency during development. It is commonly used for testing packages before publishing them.

Read more about it in the [official documentation](https://docs.npmjs.com/cli/v8/commands/npm-link).

### Usage

**【z】npm link 需要做两件事：注册到全局 & 安装依赖到具体的项目**

Given the following packages:

- `my-library`: an npm package that you want to test in another package as a dependency.

    The `name` property in `my-library/package.json` should be `my-library`.

- `my-application`: the package/project you want to test in

Here’s how you would link them:

1. **Registration** (Global installation)

    Run `npm link` in `my-library` to install it globally, making it possible to link `my-library` to any local project. Note: this is the same thing as running `npm install --global`.

```
cd ./my-library
npm link
```

2. **Installation**

    Run `npm link my-library` in `my-application` to link it:

```
cd ./my-application
npm link my-library
```

#### Shortcut

**【z】简写形式**

`npm link <package-path>` is a shortcut to automate the two steps by simply passing in the package path.

Using the example above:

```
cd ./my-application
npm link ../my-library
```

The shortcut approach is much easier to use and is less error-prone because it’s a single command that requires an explicit path to the package to link.

## 4 footguns of `npm link`[](https://hirok.io/posts/avoid-npm-link#4-footguns-of-npm-link)

### 1\. Multiple Node.js versions

**【z】因为是全局安装所以当我们用 nvm 切换了 Node 版本的时候，全局注册失效了**

If your environment has multiple Node.js versions using a manager like [nvm](http://nvm.sh/), both `npm link` commands must be run using the same version.

As explained above, the first step of `npm link` is installing the package globally. Since each version of Node.js has its own global package registry, lookups will fail if different versions are used.

You can check if the global package registry is scoped to the Node.js version with the following command. If the Node.js version is in the path, the global package registry is scoped:

```
$ npm root -g
~/.nvm/versions/node/v14.16.1/lib/node_modules
```

When working on multiple packages in separate terminal sessions, it’s very easy to overlook the Node.js version. The version discrepancy can be especially hard to notice since `npm link` doesn’t error when it’s unable to find the local package to link, which is discussed in the next section.

> **Pro tip:** Add the [recommended shell integration](https://github.com/nvm-sh/nvm/blob/2c0c34f/README.md#deeper-shell-integration) to automatically use the appropriate Node.js version when entering a directory with a `.nvmrc` file.

### 2\. Non-existent fail-case

**【z】link 本地不存在的package，仍然会成功，这是不符合预期的，link 远程的不存在包则会报错**

**【z】缺乏适当的失败案例使得使用 npm link 成为一个令人困惑和脆弱的过程。特别是当有多个 Node.js 版本时。**

Try running `npm link a` in a package.

It will succeed despite never registering package `a` to be linkable before:

```
$ npm link a
~/my-package/node_modules/a -> ~/.nvm/versions/node/v14.16.1/lib/node_modules/a
```

This is because when `npm link` can’t find package `a` as a global package, it installs it globally from [the npm registry](https://www.npmjs.com/package/a) and creates a symlink to it.

It only fails when the package is also not found on the remote registry:

```
$ npm link non-existent-package
npm ERR! code E404
npm ERR! 404 Not Found - GET https://registry.npmjs.org/non-existent-package - Not found
npm ERR! 404 
npm ERR! 404  'non-existent-package@*' is not in this registry.
npm ERR! 404 You should bug the author to publish it (or use the name yourself!)
npm ERR! 404 
npm ERR! 404 Note that you can also install from a
npm ERR! 404 tarball, folder, http url, or git url.
```

To tell if the link *actually* succeeded, you can check if the output has two arrows (`->`). (Notice how the false-positive above only has one arrow.) Two arrows means it created a symlink to the global package, which then points to the local package:

```
$ npm link my-linked-package
~/my-package/node_modules/my-linked-package -> ~/.nvm/versions/node/v14.16.1/lib/node_modules/my-linked-package -> ~/my-linked-package
```

This check only works in npm v6. Unfortunately, starting in npm v7, the symlink paths are no longer logged. Looking at the output, it’s impossible to determine if linking the local package succeeded, or if an unintended package was accidentally installed and linked:

```
$ npm link a

up to date, audited 3 packages in 671ms

found 0 vulnerabilities
```

To confirm the package was successfully linked, you can use [`realpath`](https://www.gnu.org/software/coreutils/realpath) to verify the symlink path:

```
$ realpath node_modules/package-name
~/my-linked-package
```

The lack of a proper fail case makes using `npm link` a confusing and frail process. Especially when compounded with having multiple Node.js versions.

### 3\. Unexpected binary installation

**【z】考虑到 npm link 是一个用于测试开发包的工具，全局二进制安装可能是一个意想不到的副作用。考虑到包可以使用任意名称声明二进制文件，这种意外行为的影响可能非常严重。需要使用 `npm uninstall --global a` 来删除全局的二进制（危险，不一定每个人知道）**

The first step of `npm link` installs the package *globally*. This happens in the shortcut as well, because it just automates the two steps.

Global package installation ([`npm install --global ...`](https://docs.npmjs.com/cli/v8/commands/npm-install#global)) is a type of package installation used to make binaries available as a system-wide CLI command. So, if your package has a [`bin` field](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#bin), `npm link`ing it will make it available as a CLI command.

Considering `npm link` is a tool for testing a package in development, global binary installation can be an unexpected and undesired side-effect. The implications of this unexpected behavior can be quite serious given packages can declare binaries with [arbitrary names](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#:~:text=%22bin%22%3A%20%7B-,%22my%2Dprogram%22,-%3A%20%22./path/to/program).

In this example package, an arbitrary binary name `random-command` is specified in the `package.json` file:

```
{
    "name": "my-package",
    "bin": {
        "random-command": "bin.js"
    }
}
```

Running `npm link` installs binary `random-command`:

```
$ random-command
zsh: command not found: random-command

$ cd my-package && npm link
added 1 package, and audited 3 packages in 548ms

found 0 vulnerabilities

$ random-command
Suddenly works!
```

Global install can also override existing binaries depending on your [`PATH` configuration](https://linuxhint.com/path_in_bash/)—the variable of paths the shell uses to lookup commands from. If you’re using [nvm](http://nvm.sh/), your configuration is likely [susceptible to this](https://github.com/nvm-sh/nvm/issues/2140).

In this example, I override the binary `cat`, a [standard Unix utility](https://en.wikipedia.org/wiki/Cat_(Unix)):

```
$ type cat
cat is /bin/cat

$ cd my-package && npm link
added 1 package, and audited 3 packages in 230ms

found 0 vulnerabilities

$ hash cat # Clear cache to "cat" binary
$ type cat
cat is ~/.nvm/versions/node/v16.14.0/bin/cat
```

In regards to software installation, these risks are prevalent in every software manager and aren’t considered too dangerous from a security perspective.

However, `npm link` is not a package installer. It’s supposed to be a simple tool to setup symlinks for development. It’s worth pausing to reflect on how unexpected this behavior is, and what mistakes it could lead to.

By the way, if you ran `npm link a` in the prior section, a binary `a` has been installed to your system. You would think `npm unlink a` will uninstall it, but it only removes the local link and not the globally installed binaries.

Uninstall a global package and its binaries with:

```
npm uninstall --global a
```

### 4\. Unexpected link removal

When linking multiple packages, previously linked packages are removed. This behavior is a regression introduced in npm v7.

In this example, `pkg-a` is linked and confirmed to be in `node_modules`. However, after linking a second package `pkg-b`, `pkg-a` is no longer in `node_modules`:

```
$ npm link ../pkg-a
added 1 package, and audited 5 packages in 684ms
found 0 vulnerabilities

$ ls node_modules 
pkg-a

$ npm link ../pkg-b
added 1 package, removed 1 package, and audited 5 packages in 703ms
found 0 vulnerabilities

$ ls node_modules  
pkg-b
```

Removing previous links can be unexpected and confusing when working with multiple packages. Often times, after linking the second package, we’d continue to run code expecting the links to persist.

To link multiple packages, you must pass in all package paths into one command:

```
$ npm link ../pkg-a ../pkg-b
added 1 package, and audited 6 packages in 645ms
found 0 vulnerabilities
                                                                           
$ ls node_modules 
pkg-a pkg-b
```

While this *works*, it’s not a great developer experience. In development, we don’t always know ahead of time all the packages that need to be linked. Or keep track of the previously linked packages.

This confusing behavior compounds to the poor usability and predictability of `npm link`.

### Potential for accidents

As with any popular package registry, npm has a diverse collection with no standard for quality.

[npm removes malicious packages](https://docs.npmjs.com/reporting-malware-in-an-npm-package), but risks mentioned above are not limited to attacks. When it’s unclear whether the right package was installed, there is always potential for accidents.

Many packages on npm are designed to make changes to the file-system, such as [rimraf](https://www.npmjs.com/package/rimraf) or a code linter. In an accident, the consequences of running file-system altering code can be detrimental.

Installing the wrong package is possible with `npm install` as well, but the risks are higher with `npm link` when the footguns above come together:

- **Package names can collide.** It’s possible to link a local package with a name that’s on the [npm registry](https://www.npmjs.com/). This can happen when developing and testing a new or private package before realizing the name is already taken.
**【z】包名称可能会发生冲突。可以使用 npm 注册表中的名称链接本地包。在意识到名称已被使用之前开发和测试新的或私有的包时，可能会发生这种情况。**

- **No local resolution error.** If the package being linked can’t be locally resolved, it will get resolved from the npm registry. If a package with the same name is found, an unexpected package can get globally installed.

**【z】没有本地解析错误。如果被链接的包无法在本地解析，它将从 npm 注册表中解析。如果找到具有相同名称的包，则可能会全局安装一个意想不到的包。**

- **Binaries are installed.** If the wrong package is installed, it’s unintuitive that binaries get installed and to realize it needs to be uninstalled globally. This leaves unexpected binaries to be left installed and accidentally invoked.

**【z】二进制文件已安装。如果安装了错误的包，安装二进制文件并意识到需要全局卸载它是不直观的。这会留下意想不到的二进制文件，使其被安装并被意外调用。**

## Use `npm install` instead

**【z】然而，这个命令仍然有一个缺点。与 npm link 一样，多次运行 npm install 将删除以前的链接。要链接多个包，请将包路径作为参数传递：**

A better alternative to `npm link` is `npm install` using a package path:

```
npm install --no-save <package-path>
```

This creates a symlink to the package without installing it globally. This behavior is probably closer to what most people expect from `npm link`. The `--no-save` flag is to prevent the package path from getting saved in `package.json`.

However, this command still comes with a drawback. Like `npm link`, running `npm install` multiple times will remove previous links. To link multiple packages, pass in the package paths as arguments:

```
npm install --no-save <package-path-a> <package-path-b> ...
```

## Introducing `npx link`

**【z】npm link 的一个更好的替代品是 npx link**

An even better alternative to `npm link` is [`npx link`](https://github.com/privatenumber/link), a tiny tool I developed to tackle the problems addressed in this post.

Using the command is simple:

```
npx link <package-path>
```

[`npx link`](https://github.com/privatenumber/link) doesn’t globally install the linked package or its binaries. It doesn’t remove previous links. And it works across different versions of Node.js because it makes direct symlinks. It also has a clear fail-state when it can’t resolve the package path.

If you want to use binaries from the package, they will only be installed locally and will only be executable with [npx](https://docs.npmjs.com/cli/v8/commands/npx) or via [package scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts).

As an added benefit for the community, package linking will still work for those who accidentally type in `npx link` instead of `npm link`!
