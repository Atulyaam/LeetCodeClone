const {getLanguageById,submitBatch} = require("../utils/problemUtalitiy")


const createProblem = async (req,res)=>{
   const {title,description,difficulty,tags,visibalTestCases, hiddenTestCases,startCode,problemCreator,referenceSolution} = req.body;



   try {
      for(const {langauage,completeCode} of referenceSolution){
         // source code
         // langauage_id
          const langauageId = getLanguageById(langauage);
         // stdin
         // expectedoutput


         
         const submission = visibalTestCases.map((input,output)=>({
            sourceCode:completeCode,
            langauage_id : langauageId,
            stdin : input,
            expected_output: output
         }));


         const submitResult = await submitBatch(submission);  

        


      }
      
   } catch (error){
      
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