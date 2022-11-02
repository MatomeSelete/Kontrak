const pool = require("../../../backend/src/configs/database");


//=================task creator==================
module.exports.createTasks=(req,res)=>{

const {task_name,task_status,job_id,user_id}=req.body;

    try{
pool.query(`insert into task (task_name,task_status,user_id,job_id) values ($1,$2,$3,$4)`,[task_name,task_status,user_id,parseInt(job_id)],
(err) => {
    if (err) {
     
      console.error(err);
      return res.status(500).json({     //if there is an error display database error
        error: "Database error",
      });
    } else {
      
      res.status(200).send({ message: "task added to database" });   // if the isertion is successful show this
    }})
}catch(err){

    console.log(err)
}

}
//================task getter================
module.exports.getTasks=(req,res)=>{

  //changed
    const job_id=req.params.id;
    try{
        pool.query(`select task_id,task_name,task_status from task where job_id=$1 and task_status = 'pending'`,[job_id],(error, results) => {
            //returns all 
            if (error) {
              //checks for errors and return them
              res.status(200).json(error);//Throw the error in the terminal
            }
            res.status(200).json(results.rows); //Return a status 200 and the rows if there is no error
          })
        }catch(err){
        
            console.log(err)
        }
}
//===============update statusnof the task===============
module.exports.updateTaskStatus=(req,res)=>{
   const {task_status}=req.body
   const task_id = req.params.id
    try{
        pool.query(`update task set task_status = $1 where task_id=$2 `,[task_status,task_id],(err) => {
            if (err) {
             
              console.error(err);
              return res.status(500).json({  //if there is an error display database error
                error: "Database error",
              });
            } else {
              
              res.status(200).send({ message: "task updated" }); //display if task update is successful
            }})
        }catch(err){
        
            console.log(err)
        }
}
//===========done tasks getter==========
module.exports.getDoneTasks=(req,res)=>{

 
    const job_id=req.params.id;
    try{
        pool.query(`select task_id,task_name,task_status from task where job_id=$1 and task_status = 'complete'`,[job_id],(error, results) => {
            //returns all 
            if (error) {
              //checks for errors and return them
              res.status(500).json(error);
            }
            res.status(200).json(results.rows); //Return a status 200 and the rows if there is no error
          })
        }catch(err){
        
            console.log(err)
        }
}