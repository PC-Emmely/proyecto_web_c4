const express = require("express");
const HabitacionesSchema = require("../models/habitaciones");
const router = express.Router();


//---------------Operaciones Crud HABITACIONES----------------//

//Traer todos los registros
router.get('/habitaciones', (req, res) => {
    HabitacionesSchema.find(function (err, datos){
        if(err){
            console.error("Error");
        }else{
            res.send(datos)
        }
    });
})


//Traer todos solo un registro
router.get("/habitaciones/:id", (req, res) => {
    const { id } = req.params;
    HabitacionesSchema
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });


//Crear un nuevo registro
router.post('/habitaciones', (req, res) => {
    let NuevaHabitacion = new HabitacionesSchema({
        idHabitacion: req.body.id,
        numeroHabitacion: req.body.numero,
        tipoHabitacion: req.body.tipo,
        costoHabitacion: req.body.costo,
        dispoibilidad:  req.body.disponible
    })
    NuevaHabitacion.save(function (err, datos){
        if(err){
            console.log(err);
        }
        res.send("Todo se fue bien")
    });
})


//Eliminar un registro
router.delete("/habitaciones/:id", (req, res) => {
    const { id } = req.params;
    HabitacionesSchema
      .remove({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });


//Actualizar un registro
router.put("/habitaciones/:id", (req, res) => {
    const { id } = req.params;
    const body = req.body;
    HabitacionesSchema
      .findByIdAndUpdate({ _id: id }, { $set: body })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

  module.exports = router;