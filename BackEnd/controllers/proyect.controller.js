const pool = require('../database/config');

module.exports = {
    createProyect: async (req,res,next)=>{
        await pool.query('SELECT * FROM proyectos', (error,result)=>{
            if(error) throw error;
            res.json(result);
        });  
    },
    updateProyect: (req,res)=>{

    },
    deleteProyect: (req,res)=>{
        
    }

}