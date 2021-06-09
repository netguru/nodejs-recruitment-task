import db from "./db/db.js";

const quotaPerMonth = 5;

const getCurrentMonthYear = () => {
    const now = new Date();
    return now.getUTCMonth() + "-" + now.getUTCFullYear();
}

const limitsDBConnection = {
    getUserLimits: async (userId) => {
        return await db("limits")
            .where("userid", userId)
            .where("monthyear", getCurrentMonthYear())
            .first();
    }, 
    insertQuota: async (userId, howMuch) => {
        return await db("limits")
            .insert({
                userid: userId,
                monthyear: getCurrentMonthYear(),
                quota: quotaPerMonth
            });
            
    },
    decrementQuota: async (userId) => {
        return await db("limits")
            .where("userid", userId)
            .where("monthyear", getCurrentMonthYear())
            .decrement({
                quota: 1
            });
    }
}

const limits = {
    isLimited: async (user) => {
        if (user.role === "premium") {
            return false;
        } else {
            const userId = user.userId;
            const userLimits = await limitsDBConnection.getUserLimits(userId);
            if (!userLimits) {
                limitsDBConnection.insertQuota(userId, quotaPerMonth);
                return false;
            } else {
                return userLimits.quota <= 0;
            }
        }
    },
    decrementLimits: async (user) => {
       if (user.role === "basic") {
           return await limitsDBConnection.decrementQuota(user.userId);
       } else {
           return undefined;
       }
    }
};

export default limits;