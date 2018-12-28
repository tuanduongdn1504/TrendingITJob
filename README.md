# Setup environment

1.  install docker:
    \$brew install docker docker-compose docker-machine xhyve docker-machine-driver-xhyve

2.  install postgreSQL:
    $brew install
    $brew services start postgres
    $psql
    (if show is database "name" does not exist)
    $createDb tuanbear
    $psql
    tuanbear=#
    (Ex: $psql > tuanbear=# \q > \$psql -d vietphan > add new DB if exist other DB)

3.  download pgadmin:
    https://www.postgresql.org/ftp/pgadmin/pgadmin4/v3.4/macos/
    (>>>tag web: http://127.0.0.1:50384/browser/ will be show when you open "pgAdmin 4")

> > > Create a Server: Right-click "Server" > "create>server" > input "Name" > input "Host name/address" you want at Tag:Connection > input <nameOfAdmin> (ex: duongtuan) into 2 field "Maintenancedatabase +Username" > Save.

4.  Servers.serverName.Databases.databaseName.Schemas.public.Tables > right-click > "create" (table)

    > > > right-click "tableName" > "view>All rows"

5.  clone and config to open code:
    $cd /{your_path}/projectName
    $yarn install
    (if show <project> expect ver "8.11.3". Got(ver in MacOS) "10.11.0")
    => del three row:  
     "engines": {
    "node": "8.11.3"
    }, // in packagejson
    \$yarn install

$createDb tuanbear //bỏ qua dòng này nếu đã tạo db
$knex migrate:latest
(if not found: knex) => $npm install -g knex
$knex migrate:latest
$knex seed:run
$yarn dev
(if show ECONNREFUSED) => $brew reinstall redis
$redis-server

!!!) IF $ psql
psql: could not connect to server: No such file or directory
Is the server running locally and accepting
connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
This solution is little tricky, but it works:
$rm /usr/local/var/postgres/postmaster.pid
\$brew services restart postgresql
(then, restart pgAdmin 4)

# TrendingITJob

<div align="center">

- Use pg and knex for database setup and objectionjs for orm (https://knexjs.org/, https://vincit.github.io/objection.js/)
- Use joi for validation (https://github.com/hapijs/joi)
- Log rotation and log management using [Bunyan](https://github.com/trentm/node-bunyan)
- A super small and optimized [Docker](https://www.docker.com/) image based on Alpine image
- [Swagger](https://swagger.io/) API documentation based on JSDoc
- Continuous integration and delivery using [CircleCI](https://circleci.com/)
- Unit Test and Integration Test along with Test Coverage using [Jest](https://facebook.github.io/jest/) testing framework

---

## Getting Started

```zsh
$ yarn
$ yarn start
```

## Commands

### Run

```zsh
# Setup postgresdb
# Run normally
$ yarn start
# Run the application with nodemon for development
$ yarn dev
#Run migration-up
$ knex migrate:latest
#Run migration-down
$ knex migrate:rollback
#Run seed files
$ knex seed:run
#Create a named migration or seed file
# Exampke: knex migrate:make create_role
# Exampke: knex seed:make ztag
$ knex migrate:make <name>
$ knex seed:make <make>
```

### Test

```zsh
# Test
$ yarn test                           # Run all test
$ yarn test:unit                      # Run only unit test
$ yarn test:integration               # Run only integration test
# Test (Watch Mode for development)
$ yarn test:watch                     # Run all test with watch mode
$ yarn test:watch:unit                # Run only unit test with watch mode
$ yarn test:watch:integration         # Run only integration test with watch mode
# Test Coverage
$ yarn test:coverage                  # Calculate the coverage of all test
$ yarn test:coverage:unit             # Calculate the coverage of unit test
$ yarn test:coverage:integration      # Calculate the coverage of integration test
# Test consistent coding style (Lint)
$ yarn lint                           # Lint all sourcecode
$ yarn lint:app                       # Lint app sourcecode
$ yarn lint:test                      # Lint test sourcecode
```

### Archive

```zsh
$ yarn pack
```
