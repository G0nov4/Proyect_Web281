const pool = require('../database/config');
const bcrypt  =require('bcryptjs');
const jwt =require('jsonwebtoken')
module.exports = {
    listUsers: async (req,res,next)=>{
        await pool.query('SELECT * FROM usuario_cliente', (error,result)=>{
            if(error) throw error;
            res.json(result);
        });  
    },
    createUser: async (req,res)=>{
        let newUserClient = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            tipo: "usuario"
        };

        try {
            const consultUser = await pool.query('SELECT * FROM usuario_cliente WHERE username = ?;', [newUserClient.username]);
            console.log(consultUser.length)
            if(consultUser.length){
                return res.status(409).send({ Message: 'El usuario ya existe!' });
            }
            
            const hash = await bcrypt.hash(newUserClient.password,  10);
            newUserClient.password = hash;
            
            console.log(newUserClient)
            // Si el usuario no existe el usuario se crea
            const insertarUsuario = await pool.query('INSERT INTO usuario_cliente SET ?',[newUserClient]);
            console.log(insertarUsuario)
            return res.status(201).send({
                Mensaje: "Se creo el usuario correctamente",
                user: insertarUsuario
            })
        } catch (error) {
            console.error(error)
        }
    },
    Ingreso: async (req,res,next)=>{
        const { username, password } = req.body;
        try {
            const usersAdmin = await pool.query('SELECT * FROM usuario_root WHERE username = ?;', [username]);
            if(usersAdmin.length > 0){
                const passwordIsValidate = await bcrypt.compare(password, usersAdmin[0].password);
                if(passwordIsValidate)
                {
                    const token = jwt.sign(
                        {
                            username: usersAdmin[0].username,
                            userId: usersAdmin[0].idusuario,
                            rol: usersAdmin[0].tipo
                        },
                        '_secret_|_proyect_',
                        {
                            expiresIn: '1d'
                        }
                    );
                    return res.status(200).send({ Message: 'Logged Admin!', token, rol: usersAdmin[0].tipo});
                }
                return res.send({Message: "Contraseña incorrecta..",status: 401, statusText: "ERROR"})
            }

            const usersGerencial = await pool.query('SELECT * FROM usuario_gerencial WHERE username = ?;', [username]);
            if(usersGerencial.length > 0){
                const passwordIsValidate = await bcrypt.compare(password, usersGerencial[0].password);
                if(passwordIsValidate)
                {
                    const token = jwt.sign(
                        {
                            username: usersGerencial[0].username,
                            userId: usersGerencial[0].idusuario,
                            rol: usersGerencial[0].tipo
                        },
                        '_secret_|_proyect_',
                        {
                            expiresIn: '1d'
                        }
                    );
                    return res.status(200).send({ Message: 'Logged Gerente!', token, rol: usersGerencial[0].tipo});
                }
                return res.send({Message: "Contraseña incorrecta..",status: 401, statusText: "ERROR"})
            }

            const userClient = await pool.query('SELECT * FROM usuario_cliente WHERE username = ?;', [username]);
            if(userClient.length > 0){
                const passwordIsValidate = await bcrypt.compare(password, userClient[0].password);
                if(passwordIsValidate)
                {
                    const token = jwt.sign(
                        {
                            username: userClient[0].username,
                            userId: userClient[0].idusuario,
                            rol: userClient[0].tipo
                        },
                        '_secret_|_proyect_',
                        {
                            expiresIn: '1d'
                        }
                    );
                    return res.status(200).send({ Message: 'Logged Client!', token, rol: userClient[0].tipo});
                }
                return res.send({Message: "Contraseña incorrecta..",status: 401, statusText: "ERROR"})
            }

            res.send({statusText: "ERROR", status: 401, Message: 'No se encontro el usuario' });
        } catch (error) {
            console.log("Error en consulta de usuarios")
            console.error(error)
        }
    },
    deleteUser: async (req,res)=>{
        const { id } = req.params;

        const consultUsuario =  await pool.query('SELECT * FROM usuario_cliente WHERE idCliente = ?',[id]);

        if(consultUsuario.length > 0){
            const consultaCliente = `SELECT * FROM usuario_cliente WHERE username = ?`;
                const verificarCliente = await pool.query(consultaCliente, [consultUsuario[0].username]);
                if(verificarCliente.length)
                {
                    return res.status(200).send({ Message: 'Logged User!', token, user: consultarUsuario[0] });
                }
        }
        res.status(404).send({ Message: 'El usuario no existe o ya se eliminó' });
    }

}