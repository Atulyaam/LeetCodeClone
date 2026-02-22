const Problem = require("../models/problems");
const {getLanguageById,submitBatch,submitToken} = require("../utils/problemUtalitiy")


const createProblem = async (req,res)=>{
   const {title,description,difficulty,tags,visibalTestCases, hiddenTestCases,startCode,problemCreator,referenceSolution} = req.body;

   try {
      // Validate required fields
      if (!referenceSolution || !Array.isArray(referenceSolution) || referenceSolution.length === 0) {
         return res.status(400).send("referenceSolution is required and must be a non-empty array");
      }
      if (!visibalTestCases || !Array.isArray(visibalTestCases) || visibalTestCases.length === 0) {
         return res.status(400).send("visibalTestCases is required and must be a non-empty array");
      }

      for(const {language,code} of referenceSolution){
         // source code
         // language_id
          const languageId = getLanguageById(language);
         // stdin
         // expectedoutput


         
         const submission = visibalTestCases.map((testCases)=>({
            source_code:code,
            language_id : languageId,
            stdin : testCases.input,
            expected_output: testCases.output
         }));
         const submitResult = await submitBatch(submission);
         if (!submitResult || !Array.isArray(submitResult)) {
            return res.status(400).send("Failed to submit code to judge");
         }
         const resultToken = submitResult.map((value)=>value.token);

         const testResult = await  submitToken(resultToken)

         for(const test of testResult){
            if(test.status_id!=3){
               return res.status(400).send("Error Occured")
            }
         }
         // console.log(testResult)

         // after correction now we can store it on our DB
      }
      // now for loop is completed all corect now store in DB
      
      await Problem.create({
         ...req.body,
         problemCreator: req.user._id
      })


      res.status(201).send("Succssfully Stored in db")
      
   } catch (error){
      res.status(400).send("Error: "+error)
      
   }



}

const fetchProblembyId = async (req,res)=>{

}

const fetchAllProblem  =async (req,res)=>{

}

const updateProblem = async (req,res)=>{

}

const deleteProblembyId = async (req,res)=>{

}


const solvedProblembyUser = async (req,res)=>{

}

module.exports = {createProblem,deleteProblembyId,updateProblem,solvedProblembyUser,fetchAllProblem,fetchProblembyId}