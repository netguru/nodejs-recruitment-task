const MovieCreateTrack = require('../models').MovieCreateTrack;

const checkMonthlyMovieCreateAccess = async (userId, currentMonth, currentYear) => {
    let checkTrachDataExist = await MovieCreateTrack.findOne({ where: { month: currentMonth, year: currentYear, userId: userId  } });
    if(checkTrachDataExist && checkTrachDataExist.count >= 5){
        return false;
    } 
    return true;
}

exports.checkMonthlyMovieCreateAccess = checkMonthlyMovieCreateAccess;