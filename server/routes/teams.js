var express = require("express");
var router = express.Router();

var teams = require("../data/teams");
var teamDetail = require("../data/team_detail");
var players = require("../data/players");

router.get("/", function (req, res, next) {
  res.send(teams);
});

router.get("/:id", function (req, res, next) {
  try {
    const team = teamDetail.find((team) => team.team_id === req.params.id);
    res.send(team);
  } catch (err) {
    console.log(err);
    res.status(404);
    res.send({ error: ["team not found"] });
  }
});

router.get("/:team_id/players", function (req, res, next) {
  try {
    const result = players.filter(
      (player) => player.team_id === req.params.team_id
    );
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(404);
    res.send({ error: ["players not found"] });
  }
});

module.exports = router;
