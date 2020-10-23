const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const itemsModel = require("../model/itemsModel");
const usersModel = require("../model/usersModel");
const transactionsModel = require("../model/transactionModel");

// ⚠️ propietary code, don't change it ⚠️
// this code will create db.json automatically if your folder doesn't have one
// courious? 👀 search for "IIFE function"
let db;
(async () => {
  try {
    const fs = require("fs");
    const util = require("util");
    const readdir = util.promisify(fs.readdir);
    const path = require("path").resolve();
    const dir = await readdir(path);
    if (!dir.includes("db.json")) fs.writeFile(path + "db.json", "", () => 1);

    const adapter = new FileSync("db.json");
    db = low(adapter);
    // we will call each key in lowdb object as "table"
    db.defaults({
      // 👇 table names
      items: [],
      users: [],
      transactions: [],
    }).write();
  } catch (error) {
    console.log(error);
  }
})();

function validator(body, model) {
  let result = {};
  let modelCounter = model.length;
  let counter = 0;
  for (const key in body) {
    if (model.includes(key)) {
      result[key] = body[key];
      counter++;
    }
  }
  if (counter < modelCounter) {
    return false;
  }
  return result;
}

/**
 * Get data
 * @param {String} tableName table name
 * @returns {Object} data
 */
function get(tableName, query) {
  if (query && Object.keys(query).length) {
    return db.get(tableName).find(query).value();
  }
  return db.get(tableName).value();
}

/**
 * Add data
 * @param {String} tableName table name
 * @param {Object} body inserted data
 */
function add(tableName, body) {
  let parsedBody;
  if (tableName == "items") {
    parsedBody = validator(body, itemsModel);
  }
  if (tableName == "users") {
    parsedBody = validator(body, usersModel);
  }
  if (tableName == "transactions") {
    parsedBody = validator(body, transactionsModel);
  }
  if (!parsedBody) {
    return false;
  }
  return db.get(tableName).push(body).write();
}

/**
 * Add a data
 * @param {String} tableName table name
 * @param {String|Number} id data id
 * @param {Object} body updated data
 */
function edit(tableName, id, body) {
  const parsedId = parseInt(id);
  db.get(tableName).find({ id: parsedId }).assign(body).write();
}

/**
 * Remove a data
 * @param {String} tableName table name
 * @param {String|Number} id data id
 */
function remove(tableName, id) {
  const parsedId = parseInt(id);
  db.get(tableName).remove({ id: parsedId }).write();
}

/**
 * Remove all data
 * @param {String} tableName table name
 * @param {String|Number} id data id
 */
function removeAll(tableName) {
  db.get(tableName).remove({}).write();
}

module.exports = {
  get,
  add,
  edit,
  remove,
  removeAll,
};
