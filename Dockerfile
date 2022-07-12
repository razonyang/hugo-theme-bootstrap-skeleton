###############
# Build Stage #
###############
FROM klakegg/hugo:ext-ubuntu as builder

WORKDIR /src
COPY . /src

ENV HUGO_ENV=production
ENV HUGO_BASEURL=/

# Go proxy, optional.
# ENV HUGO_MODULE_PROXY=https://goproxy.io

# NPM mirrors
# RUN npm install -g cnpm --registry=https://registry.npmmirror.com

# Install dependencies
RUN npm install
RUN npm install -g @fullhuman/postcss-purgecss rtlcss

# Build site
RUN hugo --minify --gc --enableGitInfo -b $HUGO_BASEURL

###############
# Final Stage #
###############
FROM nginx
COPY --from=builder /src/public /app
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
