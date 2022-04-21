# Hugo Theme Bootstrap Skeleton

The starter template for [Hugo Bootstrap Theme](https://github.com/razonyang/hugo-theme-bootstrap), which install the theme as a Hugo module.

## Usage

Please make sure you have install the [build tools](https://hbs.razonyang.com/en/docs/getting-started/#build-tools) prior to using this template.

**1. Clone this repository**

```shell
$ git clone https://github.com/razonyang/hugo-theme-bootstrap-skeleton.git blog
$ cd blog
$ rm -rf .git
$ git init -b main
```

> The `rm -rf .git` is a dangerous action, please make sure that you enter the right folder.

**2. Modify the `go.mod`**

Replace the following line to yours, such as `module github.com/user/repo`.

```text
module github.com/razonyang/hugo-theme-bootstrap-skeleton
```

**3. Commit and push changes to your repository**

```shell
$ git add -A
$ git commit -m 'First commit'
$ git remote set-url origin github.com/user/repo
$ git push origin main
```

## Go Proxy(Optional)

If you're located at China mainland without VPN, the Hugo module download may fail.

There are two proxies for this: [GOPROXY.CN](https://goproxy.cn/) and [GOPROXY.IO](https://goproxy.io/).

```shell
$  go env -w GOPROXY=https://goproxy.cn,direct
```

or 

```shell
$ go env -w GOPROXY=https://goproxy.io,direct
```

## Server

**1. Install dependencies**

```shell
$ npm i
```

Generally, this step only needs to be performed once for each local project.

**2. Start server**

```shell
$ hugo server
```

## Upgrade theme

```shell
$ hugo mod get -u
$ hugo mod npm pack
$ npm i
$ git add go.mod go.sum
$ git commit -m 'Update the theme'
```

## Documentations

- [English](https://hbs.razonyang.com/en)
- [简体中文](https://hbs.razonyang.com/zh-cn)
- [繁體中文](https://hbs.razonyang.com/zh-tw)
