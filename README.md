# Currency Convert

A telegram bot that convert CAD to HKD.

## Features

* Automatic exchange rates update
* Provide amount after sales tax 

## Deploy

* Create .env files
  > api/.env
    ```javascipt
    FIXER_API_KEY = "YOUR_FIXER_API_KEY"  //sign up at https://fixer.io/
    API_URL = 'localhost'
    REDIS_URL = 'redissever'
    ```
    
  > tg_bot/.env
    ```javascipt
    TG_BOT_TOKEN = 'YOUR_TG_BOT_TOKEN'
    API_URL = 'api'
    ```
* Docker compose

    ```console
    docker-compose up
    ```
