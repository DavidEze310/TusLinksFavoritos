const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add')
});

router.post('/add', isLoggedIn, async (req, res) => {
    const {titulo, url, descripcion} = req.body;
    const newLink ={
        titulo,
        url,
        descripcion,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Enlace guardado correctamente');
    res.redirect('/links/');
});
router.get('/', isLoggedIn, async (req, res) =>{
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links });
});

router.get('/delete/:id', isLoggedIn, async (req,res) =>{
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?',[id]);
    req.flash('danger', 'Enlace borrado correctamente')
    res.redirect('/links/');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM links WHERE ID = ?', [id]);
    res.render('links/edit', { link:links[0] });
});

router.post('/edit/:id', isLoggedIn, async (req,res) =>{
    const {id} =req.params;
    const { titulo, url, descripcion} = req.body;
    const newLink = {
        titulo,
        url,
        descripcion
    };
    await pool.query('UPDATE links SET ? WHERE id = ?', [newLink, id]);
    req.flash('info', 'Enlace editado correctamente')
    res.redirect('/links');
});

module.exports = router;