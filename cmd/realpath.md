用来看文件或者目录的真实path

对于软连接非常有用

```
➜  ~ man realpath

SYNOPSIS
     realpath [-q] [path ...]

DESCRIPTION
     The realpath utility uses the realpath(3) function to resolve all symbolic
     links, extra ‘/’ characters and references to /./ and /../ in path.  If
     path is absent, the current working directory (‘.’) is assumed.

     If -q is specified, warnings will not be printed when realpath(3) fails.

EXIT STATUS
     The realpath utility exits 0 on success, and >0 if an error occurs.

EXAMPLES
     Show the physical path of the /dev/log directory silencing warnings if any:

           $ realpath -q /dev/log
           /var/run/log
```
