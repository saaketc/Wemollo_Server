const mongoose = require('mongoose');

const searchGoalSchema = new mongoose.Schema({
    userType: String,
    catType: String,
    title: String,
    description: String,
    spaceId: mongoose.Schema.Types.ObjectId
});

const SearchGoal = mongoose.model('SearchGoal', searchGoalSchema);

module.exports = SearchGoal;