# Laravue Skeleton

## Sail Alias

`alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'`

## Install
`composer install`

`cp .env.example .env`

`php artisan key:generate`

`sail up -d`

`sail npm i`

`sail npm run build`

## Run

`sail up -d`

### With hot reload in windows wsl:

`npm run dev` `// not sail npm run dev`