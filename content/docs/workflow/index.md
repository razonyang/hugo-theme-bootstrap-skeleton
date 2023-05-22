+++
title = "Workflow v1"
linkTitle = "Workflow"
linkTitleIcon = '<i class="fas fa-sync fa-fw text-success"></i>'
date = 2022-06-20T17:46:31+08:00
description = "My Workflow"
featured = false
draft = false
comment = true
toc = true
reward = true
pinned = false
carousel = false
categories = ["Stable Diffusion"]
tags = []
series = ["Docs"]
images = []
authors = ["Syncriix"]
navWeight = 30
+++
# Workflow
---
My workflow for generating high quality images with some Tips and Trick I like to forget myself.

<!--more-->

> If you're not sure how to upgrade, see the [Upgradation]({{< ref "/docs/getting-started/upgradation" >}}) guide.

## v1.0

> The older UI design are freezen on `v0` branch that only accepts bug fixes. You can keep using the older UI design with that branch.

### Dependencies

- Bumped Bootstrap from `v5.1` to `v5.2`.

### UI

- Removed the setting panel from top app bar.
- Added the social links on top app bar.
- Placed Docs navigation toggle on top app bar on small screen.

### Layouts

- Removed `layouts/_default/archive.html`, please replace the `layout = archive` with `layout = archives` in front matter.
- Renamed `layouts/partials/docs/catalog.html` to `layouts/partials/docs/nav.html`.

### SCSS

- Deprecated `$variable-prefix`, please use `$prefix` instead.
- Use Bootstrap built-in CSS variables instead of theme-defined CSS variables.

### Docs

- {{< badge-breaking-change >}} use the `navWeight` instead of `weight` for sorting pages on docs nav.

### Shortcodes

#### Alert Shortcode

- {{< badge-breaking-change >}} change `alert` syntax, see also [Alert Shortcode Syntax]({{< ref "docs/shortcodes/alert#syntax" >}}).
