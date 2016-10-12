# Workaround for bug in npm@3
# @see https://github.com/npm/npm/issues/9727
shrinkwrap:
	@rm -rf .tmp
	@mkdir .tmp
	@cp package.json .tmp/package.json
	@npm cache clean
	@cd .tmp && npm install --production && npm shrinkwrap
	@rm npm-shrinkwrap.json
	@cp .tmp/npm-shrinkwrap.json npm-shrinkwrap.json
	@rm -rf .tmp
	@npm install
	@npm prune
.PHONY: shrinkwrap
