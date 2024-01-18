const express = require('express');
const router = express.Router();

const Libro = require('../models/Libro');

//Obtener todos los libros
router.get("/", async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los libros" });
    }
});

//Obtener un libro
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const libro = await Libro.findById(id);
        if (!libro) {
            const error = new Error('Libro no encontrado');
            error.status = 404;
            throw error;
        }
        res.json(libro);
    } catch (err) {
        next(err);
    }
});

//Crear nuevo libro
router.post("/", async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el Libro" });
    }
});


//Actualizar libro
router.put('/:id', async (req, res) => {
    try {
        const libro = await Libro.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
            });
        res.json(Libro);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el Libro" });
    }
});

//Eliminar libro
router.delete('/:id', async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el Libro' });
    }
});

module.exports = router;