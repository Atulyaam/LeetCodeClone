// requird routes
const adminMiddleware = require("../middleware/adminMiddleware")
const express = require('express');
const Problem = require('../models/problems');

const problemRouter = express.Router();


// problem creation
problemRouter.post("/create",adminMiddleware ,createProblem)
// problem fetch
problemRouter.get("/:id",fetchProblembyId)
problemRouter.get("/",fetchAllProblem)


// above all wants admin middleware
// problem update
problemRouter.patch("/:id",updateProblem)
// problem delete
problemRouter.delete("/:id",deleteProblembyId)

problemRouter.get("/user",solvedProblembyUser)

module.exports = problemRouter;
