const router = require('express').Router();
const SearchGoal = require('../models/searchGoal');
const SearchSpace = require('../models/searchSpace');
const _ = require('lodash');

// To create a search space
router.post('/create/searchSpace', async (req, res) => {
    try {
        let searchSpace = new SearchSpace(_.pick(req.body, ['tags', 'space']));
        searchSpace = await searchSpace.save();
        
        return res.status(201).send(searchSpace);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

// To add data to created search space
router.post('/add/searchSpace/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let searchSpace = await SearchSpace.findById(id);
        
        searchSpace.space.push(req.body);
        searchSpace = await searchSpace.save();
        
        return res.status(201).send(searchSpace);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
})

// To create a search goal for the search space
router.post('/create/searchGoal', async (req, res) => {
    try {
        let searchGoal = new SearchGoal(_.pick(req.body, ['userType', 'catType', 'title', 'spaceId']));
        searchGoal = await searchGoal.save();

        return res.status(201).send(searchGoal);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
});

// To fetch search goals in search recommendation
router.get('/getSearchGoals', async (req, res) => {
    try {
        const { userType, catType } = req.query;
        let searchGoals;
        
        if (userType === 'parent' && catType === 'highschool'){
             searchGoals = await SearchGoal.find({ userType: 'student', catType: catType });
            return res.status(200).send(searchGoals);
        }

        if (userType === 'student' && catType === 'primaryschool'){
             searchGoals = await SearchGoal.find({ userType: 'parent', catType: catType });
            return res.status(200).send(searchGoals);
        }

        searchGoals = await SearchGoal.find({ userType: userType, catType: catType });
        return res.status(200).send(searchGoals);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
});

// To fetch search space for a search goal
router.get('/getSearchSpace', async (req, res) => {
    try {
        const { spaceId } = req.query;
        let searchSpace = await SearchSpace.findById(spaceId);

        return res.status(200).send(searchSpace); 
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
});

module.exports = router;