/**
 * Pokemons.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
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
  },
};
