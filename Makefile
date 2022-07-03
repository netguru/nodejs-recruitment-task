dist.docker.compose = -f docker/docker-compose.yml
build.docker.compose = -f docker/docker-compose.yml -f docker/docker-compose.build.yml
dev.docker.compose = --env-file=.env -f docker/docker-compose.yml -f docker/docker-compose.dev.yml
test.docker.compose = --env-file=.env -f docker/docker-compose.yml -f docker/docker-compose.dev.yml -f docker/docker-compose.test.yml

####

build:
	docker compose $(build.docker.compose) build

####

dist.up:
	docker compose $(dist.docker.compose) up

dist.upd:
	docker compose $(dist.docker.compose) up -d

dist.down:
	docker compose $(dist.docker.compose) down

dist.start:
	docker compose $(dist.docker.compose) start

dist.stop:
	docker compose $(dist.docker.compose) stop

dist.logs:
	docker compose $(dist.docker.compose) logs

####

dev.up:
	docker compose $(dev.docker.compose) up

dev.upd:
	docker compose $(dev.docker.compose) up -d

dev.down:
	docker compose $(dev.docker.compose) down

dev.start:
	docker compose $(dev.docker.compose) start

dev.stop:
	docker compose $(dev.docker.compose) stop

dev.shell:
	docker compose $(dev.docker.compose) exec movies-service sh

dev.logs:
	docker compose $(dev.docker.compose) logs

####

test.up:
	docker compose $(test.docker.compose) up --abort-on-container-exit

test.down:
	docker compose $(test.docker.compose) down
