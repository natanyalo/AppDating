'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsers = getUsers;
exports.addWant = addWant;

var _profile = require('../models/profile');

var _friends = require('../models/friends');

var _friends2 = _interopRequireDefault(_friends);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUsers(req, res, next) {
  (0, _profile.find)(function (err, pro) {
    if (err) res.status(400).json({ messege: "cant find a profile" });else {
      res.status(200).json({ users: pro });
    }
  });
}

async function createfriend(req, result) {
  var friends = new _friends2.default({
    match: [],
    want: [req.body.wantId],
    creator: req.userData.userId
  });
  await friends.save().then(function (resul) {
    result = resul;
  });
  return result;
}

async function addWant(req, res, next) {
  try {
    var result = await _friends2.default.findOne({ creator: req.body.creatorId });
    if (result === null) {
      result = await createfriend(req, result);
      if (result === null) throw "add friend is fail";
    }

    var listFriends = void 0;
    await _friends2.default.findOne({ want: req.body.creatorId }, function (err, item) {
      if (err) throw "add friend is fail";
      listFriends = item;
    });

    if (listFriends && result !== null) {
      listFriends.want = await listFriends.want.map(function (id) {
        if (id == req.body.creatorId) {
          result.match.push(req.body.wantId);
          listFriends.match.push(req.body.creatorId);
          return null;
        } else return id;
      }).filter(function (i) {
        return i != null;
      });

      var index = result.want.indexOf(req.body.wantId);
      if (index !== -1) result.want.splice(index, 1);

      result.save(function (err, item) {
        if (err) throw "add friend is fail";
      });

      listFriends.save(function (err, item) {
        if (err) throw "add friend is fail";
      });

      res.status(200).json({});
    } else {
      res.status(200).json(result);
    }
  } catch (message) {
    res.status(400).json({ message: message });
  }
}