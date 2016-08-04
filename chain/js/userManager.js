var fs = require('fs');
var util = require('util');
var EventEmitter = require('events');
var Async = require('async');

var chainUtils = require(__js+'/util/chainUtils');
var eris = require(__libs+'/eris/eris-wrapper');
var logger = require(__libs+'/eris/eris-logger');
var log = logger.getLogger('eris.chain.userManager');


// ##############
// The following part depends on local files that are generated during contract deployment via EPM
// ##############
var epmJSON = require(__root+'/epm.json');
var accounts = require(__root+'/accounts.json');
var userManagerAbi = JSON.parse(fs.readFileSync(__abi+'/UserManager'));
var userAbi = JSON.parse(fs.readFileSync(__abi+'/User'));

// Instantiate connection
var erisWrapper = new eris.NewWrapper(__settings.eris.chain.host, __settings.eris.chain.port, accounts.simplechain_full_000);
// Create contract objects
var userManagerContract = erisWrapper.createContract(userManagerAbi, epmJSON['UserManager']);
var userContract = erisWrapper.createContract(userAbi, epmJSON['User']);


// Set up event emitter
function ChainEventEmitter () {
    EventEmitter.call(this);
}
util.inherits(ChainEventEmitter, EventEmitter);
var chainEvents = new ChainEventEmitter();


/**
 * _createUserFromContract - Initializes a user object from the given contract.
 *
 * @param  {type} contract - A Solidity contract passed down from the public accessor function.
 * @param  {func} callback - A callback passed down from the public accessor function.
 * @return {callback} - Returns an error & empty object if `err` is not `null`,
 *                      returns `null` & a user object otherwise.
 */
function _createUserFromContract (contract, callback) {
    var user = {};

    /* TODO potential refactor to iterate all keys automatically with `taskKeys` */
    Async.parallel({
        id: function (callback) {
                contract.id( eris.convertibleCallback(callback, [eris.hex2str]) );
            },
        username: function (callback) {
            contract.username( eris.convertibleCallback(callback, [eris.hex2str]) );
        },
        email: function (callback) {
            contract.email( eris.convertibleCallback(callback, [eris.hex2str]) );
        },
        name: function (callback) {
            contract.name( eris.convertibleCallback(callback, [eris.hex2str]) );
        },
        score: function (callback) {
            contract.score( eris.convertibleCallback(callback, [eris.hex2str]) );
        },
        teamId: function (callback) {
            contract.teamId( eris.convertibleCallback(callback, [eris.hex2str]) );
        },
        passwHash: function (callback) {
            contract.passwHash( eris.convertibleCallback(callback, [eris.hex2str]) );
        }
    },
    function (err, results) {
        if (err)
            return callback(err, user);
        user = results;
        user.address = contract.address;
        log.debug("Compiled user object:\n", user);
        return callback(null, user);
    });
}

/**
 * addUser - description
 *
 * @param  {type} user     description
 * @param  {type} callback description
 * @return {type}          description
 */
function addUser (user, callback) {
    var hexUser = chainUtils.marshalForChain(user);

    userManagerContract.addUser(
        hexUser.id,
        hexUser.username,
        hexUser.email,
        hexUser.name,
        hexUser.score,
        hexUser.teamId,
        hexUser.passwHash,
        function (err, address) {
            err ? log.error("addUser() -> Error: " + err.stack) : log.debug("User address: " + address);
            callback(err, address);
        }
    );
}

/**
 * getUserListSize - description
 *
 * @param  {type} callback description
 * @return {type}          description
 */
function getUserListSize (callback) {
    userManagerContract.getUserListSize(function (error, size) {
        error ? log.error("getUserListSize() -> Error: " + error.stack) : log.debug("getUserListSize: " + size);
        callback(error, size);
    });
}


/**
 * getUserAddress - description
 *
 * @param  {type} username description
 * @param  {type} callback description
 * @return {type}          description
 */
function getUserAddress (username, callback) {
    log.debug('getUserAddress() -> username: ' + username);
    userManagerContract.getUserAddress(eris.str2hex(username), function (err, address) {
        err ? log.error("getUserAddress() -> Error: " + err.stack) : log.debug("User address: " + address);
        callback(err, address);
    });
}

/**
 * getUserAtAddress - description
 *
 * @param  {type} address  description
 * @param  {type} callback description
 * @return {type}          description
 */
function getUser (address, callback) {
    log.debug("getUser: Passed address:\n" + address);
    userContract.at(address, function (error, contract) {
        if (error)
            throw error;
        _createUserFromContract(contract, callback);
    });
}


/**
 * linkToTask - description
 *
 * @param  {type} username   description
 * @param  {type} taskAddr description
 * @param  {type} callback description
 * @return {type}          description
 */
function linkToTask (username, taskAddr, callback) {
    log.debug("linkToTask() -> username passed: ", username);
    userManagerContract.linkToTask(eris.str2hex(username), taskAddr, function (error, success) {
        log.debug("linkToTask() -> address returned: ", success);
        callback(error, success);
    });
}

module.exports = {
    addUser: addUser,
    getUserAddress: getUserAddress,
    getUser: getUser,
    getUserListSize: getUserListSize,
    linkToTask: linkToTask
};
