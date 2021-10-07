const { NetworkAuthenticationRequire } = require('http-errors');
const pool = require('../database/config');


module.exports = {
    getAllPatroncinadores: async (req,res)=>{
        try {
            const consultarPatrocinadores =  await  pool.query('SELECT * FROM patrocinadores')
            if(consultarPatrocinadores.length){
                return res.status(200).send(consultarPatrocinadores);
            }
            return res.status(404).send({message: "no hay patrocinadores para mostrar"});
        } catch (error) {
            console.error(error);
        }
    },
    getPatroncinador:async (req,res)=>{
        const  { id } = req.params;
         try {
            const consultarPatrocinador =  await  pool.query('SELECT * FROM patrocinadores WHERE idPatrocinador = ?',[id]);
            if(consultarPatrocinador.length){
                return res.status(200).send(consultarPatrocinador[0]);
            }
            return res.status(404).send({message: `El patrocinador con el ID:${id} no existe`});
        } catch (error) {
            console.error(error);
        }
    },
    createPatrocinador: async (req,res)=>{
        const newPatrocinador = {
            nombre: req.body.nombre,
            Descripcion: req.body.descripcion,
            logotipo: req.body.logotipo
        }
   

        try {
            const consultPatrocinador = await pool.query('SELECT * FROM patrocinadores WHERE nombre = ?',[newPatrocinador.nombre]);
            if(consultPatrocinador.length){
                return res.status(409).send({Message: "El patrocinador ya existe"})
            }

            const insertPatrocinador = await pool.query('INSERT INTO patrocinadores SET ?',[newPatrocinador]);
            return res.status(201).send({ Message: 'se creó correctamente!', patrocinador: insertPatrocinador });

        } catch (error) {
            console.log(error)
        }
    },
    updatePatrocinador:async (req,res)=>{
        const {id} = req.params;
        const Patrocinador = {
            nombre: req.body.nombre,
            Descripcion: req.body.descripcion,
            logotipo: req.body.logotipo
        }
        try {
            const consultarPatrocinador =  await  pool.query('SELECT * FROM patrocinadores WHERE idPatrocinador = ?',[id]);
            if(consultarPatrocinador.length){
                await pool.query('UPDATE  patrocinadores SET ? WHERE idPatrocinador = ?',[Patrocinador,id])
                return res.status(201).send({Message: "Actualizado correctamente..!"});
            }
            return res.status(404).send({message: `El patrocinador con el ID:${id} no existe`});
        } catch (error) {
            console.error(error);
        }
    },
    deletePatrocinador:async (req,res)=>{
        const {id }= req.params;
        try{
            const consultarPatrocinador =  await  pool.query('SELECT * FROM patrocinadores WHERE idPatrocinador = ?',[id]);
            if(consultarPatrocinador.length){
                await pool.query('DELETE FROM  patrocinadores WHERE idPatrocinador = ?',[id])
                return res.status(201).send({Message: "Se elimino el patrocinador correctamente..!"});
            }
            return res.status(404).send({message: `El patrocinador con el ID:${id} no existe`});
        } catch (error){
            console.error(error);
        }
    }

}