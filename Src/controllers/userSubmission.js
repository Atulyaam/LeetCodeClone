const Problem = require("../models/problems");
const Submission = require("../models/ProblemSubmission");
const { getLanguageById, submitBatch, submitToken } = require("../utils/problemUtalitiy");

const submitCode = async (req , res)=>{
   // 
   try {
      const userId = req.result._id;
      const problemId = req.params.id;
      const {code,language} = req.body;
      if(!userId||!code||!problemId||!language){
         return res.status(400).send("Some Field is Missing")
      }
      // Feching the problem by id
     const problem = await Problem.findById(problemId);
     const submitedResult = await Submission.create({
      userId,
      problemId,
      code,
      language,
      testCasesPassed:0,
      status:'pending',
      testCasesTotal:problem.hiddenTestCases.length
     })

   //   Judge Zero ko code submit karenge
   const languageId = getLanguageById(language)
    const submission = await problem.hiddenTestCases.map((testCases)=>({
      source_code:code,
      language_id: languageId,
      stdin: testCases.input,
      expected_output: testCases.output
     }))

     const submitResult = await submitBatch(submission)
     const resultToken  =submitResult.map((value)=>value.map);

     const testResult = await submitToken(resultToken)
     console.log(testResult)

   //   now update the submission result 
   let testCasesPassed = 0;
   let runtime=0
   let memory = 0
   let status = null
   let errorMessage = ''
      for(const test of testResult){
         if(test.status_id==3){
            testCasesPassed++;
            runtime = runtime+parseFloat(test.time)
            memory = Math.max(memory,test.memory) 

         }else{
            if(test.status_id==4){
               status='error'
               errorMessage = test.stderr
            }
            else{
               status='wrong'
            }
         }
      }

      // Storre the result in data base
      submitedResult.status = status
      submitResult.testCasesPassed = testCasesPassed
      submitedResult.errorMessage = errorMessage
      submitResult.runtime = runtime,
      submitedResult.memory = memory

      await submitedResult.save();

      res.status(201).send(submitedResult)


   

      
   } catch (error) {
      res.status(500).send("Internal Server Error");
      
   }

}

module.exports = submitCode