# Hugo Theme Bootstrap Skeleton

The starter template for [Hugo Bootstrap Theme](https://github.com/razonyang/hugo-theme-bootstrap) that install the theme as a Hugo module.

## Demo

| Platform | URL |
|---|---|
| Netlify | https://hbs-skeleton.netlify.app/ |
| GitHub Pages | https://projects.razonyang.com/hugo-theme-bootstrap-skeleton/ |
| Cloudflare Pages | https://hbs-skeleton.pages.dev/ |
| Docker image | See also [Dockerfile](Dockerfile) |

## Usage

Please make sure you have install the [build tools](https://hbs.razonyang.com/v1/en/docs/getting-started/prerequisites/#build-tools) prior to using this template if you're not using Docker to preview site.

**1. Clone this repository**

It's recommending cloning the repo by clicking the `Use this template` button, if you're hosting your code on GitHub.

You can also clone it manually.

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

There are two proxies for this: [GOPROXY.CN](https://goproxy.cn) and [GOPROXY.IO](https://goproxy.io).

```bash
$ export HUGO_MODULE_PROXY=https://goproxy.cn
```

> Please note that, Hugo doesn't respect the `GOPROXY` env var, please use `HUGO_MODULE_PROXY` instead.

You can also set the `module.proxy` instead of using env var.

```yaml
module:
  proxy: https://goproxy.cn
```

## Local Development

### Develop via Docker Compose

**1.Install Dependencies**

```sh
$ docker compose run server npm ci
```

> This step is one-time task per machine, unless you deleted the __node_modules__ folder or introduce new dependencies.

**2. Start server**

```sh
$ docker compose up
```

### Develop with Native Tools

**1. Install dependencies**

```shell
$ npm ci
```

Generally, this step only needs to be performed once for each local project.

**2. Start server**

```shell
$ hugo server
```

## Upgrade theme

```shell
$ hugo mod get github.com/razonyang/hugo-theme-bootstrap@master
$ hugo mod npm pack
$ npm update
$ git add go.mod go.sum package.json package-lock.json
$ git commit -m 'Update the theme'
```

You can also replace the `master` with stable [releases](https://github.com/razonyang/hugo-theme-bootstrap/releases).

## Deployment

> The `baseURL` is very important, the CSS, JS and Sitemap require it to be set.

**Please make sure you've change the `baseURL` on `config/_default/config.yaml` before deploying your site.**

**Please also remove the `-b {url}` from the following files if you're using this template.**

- `.github/workflows/gh-pages.yml`

This template supports GitHub Pages, Docker image, Netlify out-of-box. See also [Deployment](https://hbs.razonyang.com/v1/en/docs/deployment/) for getting more detail.

The following parameters also need to be tweaked.

- Replace the `utterances.*` or `giscus.*` with your own to get notified when someone comments.
- Modify the `repo` to your own, or delete it if it's unused.
- `contact.endpoint`.

There are some hooks under the `layouts/partials/hooks` folder for showing how to use them, please feel free to delete them.

## Documentations

- [English](https://hbs.razonyang.com/v1/en/)
- [简体中文](https://hbs.razonyang.com/v1/zh-hans/)
- [繁體中文](https://hbs.razonyang.com/v1/zh-hant/)
