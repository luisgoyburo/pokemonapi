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

    for (let z = 0; z < headers.length; z++) {
      // if (headers[z] === "Sp. Atk") {
      //   headers[z] = "SpecialAtk";
      // }
      // if (headers[z] === "Sp. Def") {
      //   headers[z] = "SpecialDef";
      // }
      // if (headers[z] === "#") {
      //   headers[z] = "Number";
      // }
      // if (headers[z] === "Type 1") {
      //   headers[z] = "Type_1";
      // }
      // if (headers[z] === "Type 2") {
      //   headers[z] = "Type_2";
      // }
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

    console.log(headers);
    // Since headers are separated, we
    // need to traverse remaining n-1 rows.
    for (let i = 1; i < array.length - 1; i++) {
      let obj = {};

      // Create an empty object to later add
      // values of the current row to it
      // Declare string str as current array
      // value to change the delimiter and
      // store the generated string in a new
      // string s
      let str = array[i];

      // let s = "";

      // By Default, we get the comma separated
      // values of a cell in quotes " " so we
      // use flag to keep track of quotes and
      // split the string accordingly
      // If we encounter opening quote (")
      // then we keep commas as it is otherwise
      // we replace them with pipe |
      // We keep adding the characters we
      // traverse to a String s

      // let flag = 0;
      // for (let ch of str) {
      //   if (ch === '"' && flag === 0) {
      //     flag = 1;
      //   } else if (ch === '"' && flag == 1) flag = 0;
      //   if (ch === ", " && flag === 0) ch = "|";
      //   if (ch !== '"') s += ch;
      // }

      // Split the string using pipe delimiter |
      // and store the values in a properties array
      let properties = str.split(",");

      // For each header, if the value contains
      // multiple comma separated data, then we
      // store it in the form of array otherwise
      // directly the value is stored

      // for (let j in headers) {
      //   if (properties[j].includes(", ")) {
      //     obj[headers[j]] = properties[j]
      //       .split(", ")
      //       .map((item) => item.trim());
      //   } else obj[headers[j]] = properties[j];
      // }

      for (let j in headers) {
        obj[headers[j]] = properties[j];
      }
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
    // generate the JSON output file.
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
