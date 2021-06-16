const Persona = require('../../models/Persona')
const Usuario = require('../../models/Usuario')

let  codigo = 0

exports.validate = async(req,res)=> {

    try{

        const {correo} = req.body

        console.log(correo);
        const result = await Persona.findOne({where: {correo : correo}})
        
        if(!result){
            codigo = 1
           /*  throw new Error('El correo no existe'); */
            res.status(200).json({ 'message' : 'El correo no existe', 'codigo' : codigo  });
            
        }
        console.log(result);
        const idFirebase = await Usuario.findOne({where: {personaId : result.id}})
        console.log(idFirebase);
        if(idFirebase.idFirebase === null){
            codigo = 2
           /*  throw new Error('El id de firebase es null'); */
             res.status(200).json({ 'message' : 'El id de firebase es null', 'codigo' : codigo  });
        }

        codigo = 3

        res.status(200).json({ 'message' : 'existe el correo y el id de firebase', 'codigo' : codigo  });



    }catch(error){

        res.status(400).json({'error': error.message,'codigo': codigo})
        
    }

}

