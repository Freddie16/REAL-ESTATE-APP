const express = require('express');
const router = express.Router();
const client = require('../db');

router.get('/', async (req, res) =>{
    try{
        const estates = await client.db().collection('estates').find().toArray();
        res.json(estates);
    } catch (error) {
        console.error('Failed to fetch estates', error);
        res.status(500).json({error: "Failed to fetch estates"});
    }
});

// Fetch all estates
router.get('/', async (req, res) => {
    try {
      const estates = await client.db().collection('estates').find().toArray();
      res.json(estates);
    } catch (error) {
      console.error('Failed to fetch estates', error);
      res.status(500).json({ error: 'Failed to fetch estates' });
    }
  });
  
  // Create an estate
  router.post('/', async (req, res) => {
    try {
      const { name, location, description } = req.body;
      const estate = {
        name,
        location,
        description
      };
      const result = await client.db().collection('estates').insertOne(estate);
      res.json(result.ops[0]);
    } catch (error) {
      console.error('Failed to create estate', error);
      res.status(500).json({ error: 'Failed to create estate' });
    }
  });
  
  // Fetch a specific estate by ID
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const estate = await client.db().collection('estates').findOne({ _id: id });
      if (estate) {
        res.json(estate);
      } else {
        res.status(404).json({ error: 'Estate not found' });
      }
    } catch (error) {
      console.error('Failed to fetch estate', error);
      res.status(500).json({ error: 'Failed to fetch estate' });
    }
  });
  
  // Update a specific estate by ID
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, location, description } = req.body;
      const update = {
        $set: {
          name,
          location,
          description
        }
      };
      const result = await client.db().collection('estates').updateOne({ _id: id }, update);
      if (result.modifiedCount === 1) {
        res.json({ message: 'Estate updated successfully' });
      } else {
        res.status(404).json({ error: 'Estate not found' });
      }
    } catch (error) {
      console.error('Failed to update estate', error);
      res.status(500).json({ error: 'Failed to update estate' });
    }
  });
  
  // Delete a specific estate by ID
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await client.db().collection('estates').deleteOne({ _id: id });
      if (result.deletedCount === 1) {
        res.json({ message: 'Estate deleted successfully' });
      } else {
        res.status(404).json({ error: 'Estate not found' });
      }
    } catch (error) {
      console.error('Failed to delete estate', error);
      res.status(500).json({ error: 'Failed to delete estate' });
    }
  });
  
  module.exports = router;