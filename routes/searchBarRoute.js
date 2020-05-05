const router = require('express').Router();

const SearchGoal = require('../models/searchGoal');
const SearchSpace = require('../models/searchSpace');



// To get search results
router.get('/', async (req, res) => {
    try {
        const { userType, catType, searchTerm } = req.query;
        // const resArray = [];
        // const spaces = await SearchGoal.find({ userType: userType, catType: catType }).select('spaceId');
            
        let result = await SearchSpace.find({
            $text:
            {
                $search: searchTerm,
                $caseSensitive: false,
                $diacriticSensitive: true
            }
        },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });
                    
                // resArray.push(result);
            
            
    
        res.status(200).send(result);
    }
    catch (e) {
        res.status(500).send(e.message);
    }

});
module.exports = router;