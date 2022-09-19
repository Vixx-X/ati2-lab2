# ATI2 Lab2

Example of a todo CRUD using Express and React

Installation tested on Ubuntu 20.04.1 LTS.

## Table of contents

- [Install pre-installation dependencies](#install-pre-installation-dependencies)
- [Create .env file](#create-env)
- [Setup dev enviroment](#setup-dev-env)
- [Install yarn dependencies](#setup-venv)
- [Setup de Database](#setup-db)
- [Start the server](#start-server)
- [References](#references)

## Steps by Virtual env <a name="virtualenv"></a>

This method is tested to work on linux, and is the most confortable for developing, because is faster in dev time, but need some pre working to start the enviroments

### Install pre-installation dependencies <a name="install-pre-installation-dependencies"></a>

- Yarn and node
  Installation on Ubuntu
  `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - `

  `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`

  `sudo apt update && sudo apt install yarn`

- Postgres
  If done with docker this work with example settings
  `docker run --name postgres -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres`

  You can also try to install it normally
  `sudo apt-get install libpq-dev postgresql-12`

### Create .env file <a name="create-env"></a>

Edit `.env.example` with your own settings and rename it `.env`

### Setup dev enviroment <a name="setup-dev-env"></a>

```bash
source ./scripts/start.sh
```

### Install yarn dependencies <a name="setup-venv"></a>

```bash
setup_venv
```

### Setup de Database and migrate tables <a name="setup-db"></a>

```bash
setup_db
```

### Start the server <a name="start-server"></a>

Run the development server (express and react)

```bash
run
```

Or run the production server (only express with static react)

```bash
runserver
```

## References <a name="references"></a>

- [Steps followed to setup yarn][yarn]

[postgres]: https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-14-04
[yarn]: https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable
