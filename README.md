# pokemonapi

a [Sails v1](https://sailsjs.com) application


### Version info

This app was originally generated on Fri Oct 08 2021 18:32:55 GMT-0500 (GMT-05:00) using Sails v1.5.0.

This API expose a Pokemon file as a database.

Originaly the file is in csv format, but it is curated with a script to convert it to json format.


To install the application:

Install the Sails Framework. Sails is the most popular MVC framework for Node.js, designed to emulate the familiar MVC pattern of frameworks like Ruby on Rails, but with support for the requirements of modern apps: data-driven APIs with a scalable, service-oriented architecture:

 - npm install -g sails

Then clone the repository:

 - git clone https://github.com/luisgoyburo/pokemonapi.git

Go to the directory:

 - cd pokemonapi

Install the packages:

 - npm install

Generate the database, having as input the csv file pokemon.csv. Run the script:

 - sails run csvtojson

This script will change this column headers:

    "Sp. Atk" to  "SpecialAtk"

    "Sp. Def" to "SpecialDef"

    "#" to "Number"

    "Type 1" to "Type_1"

    "Type 2" to "Type_2"

And add createdAt, updatedAt and id filds.

Run the app:

 - sails lift 


The API could be reach at:

http://localhost:1337/pokemons/

It will list the first 30 pokemons
To list all 800 pokemons:

http://localhost:1337/pokemons?limit=800

To get a pokemon by his id (the new generated):

http://localhost:1337/pokemons/50
(To get the pokemon wich id is 50)

To paginate the second page, for 10 items x page:

http://localhost:1337/pokemons?limit=10&skip=10

To create or update a record in the database, this is the model:

{

    Number: { type: "string", required: true },

    Name: { type: "string", required: true },

    Type_1: { type: "string", required: true },

    Type_2: { type: "string", required: false },

    Total: { type: "string", required: true },

    HP: { type: "string", required: true },

    Attack: { type: "string", required: true },

    Defense: { type: "string", required: true },

    SpecialAtk: { type: "string", required: true },

    SpecialDef: { type: "string", required: true },

    Speed: { type: "string", required: true },

    Generation: { type: "string", required: true },

    Legendary: { type: "string", required: true },

}

To access the live demo API, this is the link:

http://sailsback.apercloud.com

http://sailsback.apercloud.com/pokemons/


The live demo is located in a vultr server.
A subdomain "sailsback" has been created within the apercloud.com domain. A site has been enabled on the nginx proxy server that routes the requests to the sails-nodejs server. The nodejs server is managed through the PM2 tool.
