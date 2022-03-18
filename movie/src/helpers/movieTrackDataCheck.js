const { MovieCreateTrack } = require('../models/movieCreateTrack.model');

const checkMonthlyMovieCreateAccess = async (userId, currentMonth, currentYear) => {
    let checkTrachDataExist = await MovieCreateTrack.findOne({ where: { month: currentMonth, year: currentYear, userId: userId  } }).exec();;
    if(checkTrachDataExist && checkTrachDataExist.count >= 5){
        return false;
    } 
    return true;
}

exports.checkMonthlyMovieCreateAccess = checkMonthlyMovieCreateAccess;