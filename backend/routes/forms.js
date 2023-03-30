const express = require('express');
const router = express.Router();
const FormModel = require('../models/Forms');

router.get('/getForms', async (req, res) => {
  try {
    const forms = await FormModel.find({});
    res.send(forms);
  } catch (err) {
    console.log(err);
  }
});

router.get('/getForms/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const form = await FormModel.findById(id);
    res.send(form);
  } catch (err) {
    console.error(err);
    res.status(404).send('Not Found');
  }
});

router.post('/createForm', async (req, res) => {
  try {
    const form = req.body;
    const newForm = new FormModel(form);
    await newForm.save();
    res.json(newForm);
  } catch (err) {
    console.log(err);
  }
});

router.put('/editForm/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    console.log('id', id);
    console.log('updatedData', updatedData);
    const result = await FormModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
  } catch (error) {
    console.log('Error updatinng document:', error);
  }
});

router.delete('/deleteForm/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await FormModel.findByIdAndDelete(id);
  } catch (error) {
    console.log('Error deleting document:', error);
  }
});

module.exports = router;
