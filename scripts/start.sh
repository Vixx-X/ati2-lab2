if [[ ! -f "./.env" ]]; then
    echo "ERROR: .env file does not exits in current directory."
    return 1 2> /dev/null || exit 1
fi

# Get the location path of this script file
CURRENT_DIR=$(dirname $(realpath ${BASH_SOURCE[0]:-$0}))

BACK_DIR=$(dirname $CURRENT_DIR)/backend
FRONT_DIR=$(dirname $CURRENT_DIR)/frontend

source ./.env
cp ./.env $BACK_DIR

# initial setup on Postgres DB
function setup_db {
    psql -h $DATABASE_HOST -p ${DATABASE_PORT:-5432} -U postgres \
        -c "CREATE DATABASE ${DATABASE_NAME};" \
        -c "CREATE USER ${DATABASE_USER} WITH PASSWORD '${DATABASE_PASSWORD}';" \
        -c "ALTER ROLE ${DATABASE_USER} set client_encoding to 'utf8';" \
        -c "ALTER ROLE ${DATABASE_USER} SET default_transaction_isolation TO 'read committed';" \
        -c "ALTER ROLE ${DATABASE_USER} SET timezone TO 'America/Caracas';" \
        -c "GRANT ALL PRIVILEGES ON DATABASE ${DATABASE_NAME} TO ${DATABASE_USER};"
    psql -h $DATABASE_HOST -p ${DATABASE_PORT:-5432} -U postgres \
        -c "CREATE DATABASE ${SHADOW_DATABASE_NAME};" \
        -c "CREATE USER ${DATABASE_USER} WITH PASSWORD '${DATABASE_PASSWORD}';" \
        -c "ALTER ROLE ${DATABASE_USER} set client_encoding to 'utf8';" \
        -c "ALTER ROLE ${DATABASE_USER} SET default_transaction_isolation TO 'read committed';" \
        -c "ALTER ROLE ${DATABASE_USER} SET timezone TO 'America/Caracas';" \
        -c "GRANT ALL PRIVILEGES ON DATABASE ${SHADOW_DATABASE_NAME} TO ${DATABASE_USER};"

    cd $BACK_DIR
    echo "migrate"
    yarn prisma migrate dev
    cd -
}

# setup initial venv and pip install the project
function setup_venv {
    cd $BACK_DIR
    yarn install
    cd -

    cd $FRONT_DIR
    yarn install
    yarn build
    cd -
}

# alias for common developer commnads
alias runserver="yarn --cwd ${BACK_DIR} dev"
alias runclient="yarn --cwd ${FRONT_DIR} start"
alias run='runserver & runclient && fg; fg'

function help {
    echo "runserver      - run express server"
    echo "runclient      - run react server"
    echo "run            - run django and react server"
    echo ""
    echo "setup_venv     - initial install dependencies of the project"
    echo "setup_db       - initial setup and migrate on Postgres DB"
}

echo "All done!"
echo "Use 'help' for the list of commands"
