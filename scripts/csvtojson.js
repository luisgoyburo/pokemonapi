module.exports = {
  friendlyName: "Csvtojson",

  description: "Csv to json conversion.",

  fn: async function () {
    // Reading the file using default
    // fs npm package
    const fs = require("fs");
    csv = fs.readFileSync("./scripts/pokemon.csv");

    // Convert the data to String and
    // split it in an array
    //var array = csv.toString().split("\r");
    var array = csv.toString().split("\n");
    //console.log(array);

    // All the rows of the CSV will be
    // converted to JSON objects which
    // will be added to result in an array
    let result = [];

    // The array[0] contains all the
    // header columns so we store them
    // in headers array
    let headers = array[0].split(",");

    // First we curate the header columns, so the system could work properly
    for (let z = 0; z < headers.length; z++) {

      switch (headers[z]) {
        case "Sp. Atk":
          headers[z] = "SpecialAtk";
          break;
        case "Sp. Def":
          headers[z] = "SpecialDef";
          break;
        case "#":
          headers[z] = "Number";
          break;
        case "Type 1":
          headers[z] = "Type_1";
          break;
        case "Type 2":
          headers[z] = "Type_2";
          break;
      }
    }

  
    // Since headers are separated, we
    // need to traverse remaining n-1 rows.
    for (let i = 1; i < array.length - 1; i++) {
      let obj = {};


      let str = array[i];


      // Split the string 
      // and store the values in a properties array
      let properties = str.split(",");

      for (let j in headers) {
        obj[headers[j]] = properties[j];
      }

      // Add new fields
      const date = new Date();
      obj["createdAt"] = date.getTime();
      obj["updatedAt"] = date.getTime();
      obj["id"] = i;
      obj["_id"] = i;
      // Add the generated object to our
      // result array
      result.push(obj);
    }

    // Convert the resultant array to json and
    // generate the JSON output file, and prepare it to function as a file database
    let json = JSON.stringify(result);
    let json_01 = json.replace(/},{/g, "}\n{");
    let json_02 = json_01.replace("[", "");
    let json_03 = json_02.replace("]", "");
    let json_04 =
      json_03 +
      '\n{"$$indexCreated":{"fieldName":"id","unique":true,"sparse":false}}';
    fs.writeFileSync("./.tmp/localDiskDb/pokemons.db", json_04);

    sails.log("Running custom shell script... (`sails run csvtojson`)");
  },
};
