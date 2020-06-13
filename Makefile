
dev: 
	npm run dev

migrate:
	npm run knex:migrate

migrate-build:
	npm run build:knex:migrate

seed:
	npm run knex:seed

seed-build:
	npm run build:knex:seed

run:
	npm run start

build-server:
	npm run build