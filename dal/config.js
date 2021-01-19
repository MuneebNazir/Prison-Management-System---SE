const config = {

    // user: 'user',
    // password: '123456',
    // server: 'DESKTOP-CHMNVAU\\SQLEXPRESS',
    // database: 'Prison_Database',
    user: 'admin',
    password: 'djAGM~2f-C_FLHR',
    server: 'prisondb.cxkh2eowwood.us-east-1.rds.amazonaws.com',
    database: 'prisondb',
    port: 1433,
}

const types = {
    1: "Jailor",
    2: "Jail Officer",
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