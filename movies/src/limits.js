const quotaPerMonth = 5;
const quotas = {};

const limits = {
    isLimited: (user) => {
        if (user.role === "premium") {
            return false;
        } else {
            const userId = user.userId;
            if (typeof quotas[userId] === "undefined") {
                quotas[userId] = quotaPerMonth;
            }
            return quotas[userId] <= 0;
        }
    },
    decrementLimits: (user) => {
       if (user.role === "basic") {
           quotas[user.userId]--;
       }
    }
};

export default limits;