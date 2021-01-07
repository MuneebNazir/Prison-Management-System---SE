const config = {
    user: 'user',
    password: '123456',
    server: 'DESKTOP-CHMNVAU\\SQLEXPRESS',
    database: 'Prison_Database',
}

const types = {
    1: "Jailor",
    2: "Court Officer",
    3: "Jail Officer",
};

const dangerlevel = {
    1: "mildly dangerous",
    2: "moderately dangerous",
    3: "extremely dangerous",
};

const status = {
    1: "Pending",
    2: "Not Approved",
    3: "Approved",
};

const complaintStatus = {
    1: "Pending",
    2: "Action Taken",
    3: "Rejected",
};

module.exports = {config, types, dangerlevel, status, complaintStatus};