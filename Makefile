TESTS     = $(shell find test -type f -name "*.test.js")
BIN_MOCHA = ./node_modules/.bin/mocha
BIN_NYC   = ./node_modules/.bin/nyc

RELEASE_DIR    = out/release/
RELEASE_COPY   = bin common config controller middleware model router schema service

PROJECT_NAME = $(shell cat package.json | awk -F '"' '/name" *: *"/{print $$4}')
VERSION = $(shell cat package.json | awk -F '"' '/version" *: *"/{print $$4}')

install:
	@npm i --registry http://r.dtwave-inc.com

production:
	@npm i --production --registry http://r.dtwave-inc.com

test:
	NODE_ENV=test $(BIN_MOCHA) -R spec -t 60000 --exit -r ./test/env.js $(TESTS);

test-file:
	NODE_ENV=test $(BIN_MOCHA) -R spec -t 60000 ./test/model/user.test.js;

cov test-cov:
	$(BIN_NYC) --reporter=lcov --reporter=text-summary $(BIN_MOCHA) -R list -t 60000 --exit -r ./test/env.js $(TESTS);

release: production
	@./bin/build.sh prd

package: clean
	@echo 'Copy files...'
	@mkdir -p $(RELEASE_DIR)
	@if [ `echo $$OSTYPE | grep -c 'darwin'` -eq 1 ]; then \
		cp -r $(RELEASE_COPY) $(RELEASE_DIR); \
	else \
		cp -rL $(RELEASE_COPY) $(RELEASE_DIR); \
	fi

	@cp package-lock.json $(RELEASE_DIR)
	@cp package.json $(RELEASE_DIR)
	@cp app.js $(RELEASE_DIR)
	@cp pm2.json $(RELEASE_DIR)
	@cp config/config.prd.js $(RELEASE_DIR)/config/config.js
	@cd $(RELEASE_DIR) && npm install --production --registry http://r.dtwave-inc.com
	@echo "all codes are in \"$(RELEASE_DIR)\""
	@mv $(RELEASE_DIR) out/${PROJECT_NAME}
	@cd out && tar czf ${PROJECT_NAME}_${VERSION}.tgz ${PROJECT_NAME}

eslint:
	@eslint .

tag:
	@cat package.json | xargs -0 node -p 'JSON.parse(process.argv[1]).version' | xargs git tag
	@git push origin --tags

clean:
	@echo 'Clean files...'
	@rm -rf ./out

start:
	@./bin/start.sh

.PHONY: install test
