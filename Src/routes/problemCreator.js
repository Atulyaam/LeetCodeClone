// requird routes

const express = require('express');
const Problem = require('../models/problems');

const problemRouter = express.Router();


// problem creation
problemRouter.post("/create",problemCreate)
// problem fetch
problemRouter.get("/:id",problemFetch)
problemRouter.get("/",problemFetchAll)


// above all wants admin middleware
// problem update
problemRouter.patch("/:id",ProblemUpdate)
// problem delete
problemRouter.delete("/:id",problemDelete)

problemRouter.get("/user",solvedProblem)

module.exports = problemRouter;
