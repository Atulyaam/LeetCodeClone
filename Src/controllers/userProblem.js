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
   const {id} = req.params;
   try {
      if(!id){
         return res.status(400).send("Id is Missing");
      }
      const getProblem = await Problem.findById(id);
      if(!getProblem){
         return res.status(404).send("Problem is Missing")
      }
      res.status(200).send(getProblem)
   } catch (error) {
      res.status(500).send("Error: "+error)
      
   }

}

const fetchAllProblem  =async (req,res)=>{
   //  Since problem can be thousand and lacks which can create a problem so we use Paginatio here and Lazy Loading in Frontend to avoid the freez problem
   try {
      const getProblem =await Problem.find({});
      if(getProblem.length==0){
         return res.status(404).send("Problem is Missing")
      }
      res.status(200).send(getProblem)
   } catch (error) {
      res.status(500).send("Error: "+error)
      
   }

}

const updateProblem = async (req,res)=>{
   const {id} = req.params;
   const {title,description,difficulty,tags,visibalTestCases, hiddenTestCases,startCode,problemCreator,referenceSolution} = req.body;
   try {
      if(!id){
        return res.status(400).send("Missing Id");
      }
      const DsaProblem = await Problem.findById(id);
      if(!DsaProblem){
         return res.status(404).send("ID is not present in DB");
      }


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
      
      const newProblem = await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true});


      res.status(200).send("Succssfully Stored in db")
      
   } catch (error) {
      res.status(404).send("Error: "+error)
      
   }

}

const deleteProblembyId = async (req,res)=>{
   const {id} = req.params;

   try {
      if(!id){
         return res.status(400).send("id not found")
      }

      const DeletedProblem = await Problem.findByIdAndDelete(id);
      if(!DeletedProblem){
         return res.status(404).send("Problem is Missing")
      }
      res.status(200).send("Succssfully deleted the Problem");
      
   } catch (error) {
      res.status(500).send("Error: "+error)
      
   }

}


const solvedProblembyUser = async (req,res)=>{


}

module.exports = {createProblem,deleteProblembyId,updateProblem,solvedProblembyUser,fetchAllProblem,fetchProblembyId}