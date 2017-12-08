import express from "express";
import {sync} from "../utils/synchronize";
import app from "../index";
import HR from "../db/hr";
import payroll from "../db/payroll";
import * as _ from "lodash";
import faker from 'faker';
import {BenefitHistory} from "../models/benefitHistory";

const api = express.Router();

api.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});

api.post("/sync", async (req, res, next) => {
    try {
        await sync();
        res.end(JSON.stringify({success: true}));
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error while sync Database"}}));
    }
});

api.get("/birthday", async (req, res, next) => {
    try {

    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error"}}));
    }
});

api.get("/hiredate", async (req, res, next) => {
    try {
        let today = new Date(),
            tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
        let employement = await app.models.Employment.find({
                $or: [
                    {hire_date: {$gte: today, $lt: tomorrow}},
                    {
                        rehire_date: {$gte: today, $lt: tomorrow}
                    }]
            }).exec(),
            output = [];
        if (employement.length) {
            for (let item of employement) {
                let employee = await app.models.Employee.findOne({hr_employee_id: item.hr_employee_id}).exec();
                employee = employee.toJSON();
                employee.hire_date = item.hire_date;
                employee.rehire_date = item.rehire_date;
                output.push(employee);
            }
            res.end(JSON.stringify(output));
        } else {
            res.end(JSON.stringify([]));
        }
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error"}}));
    }
});

api.get("/change/benefit", async (req, res, next) => {
    try {
        let output = await BenefitHistory.find({}).exec();
        res.end(JSON.stringify(output));
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error"}}));
    }
});

api.get("/payrates", async (req, res, next) => {
    try {
        let payRate = await app.models.PayRates.find({}).exec();
        res.end(JSON.stringify(payRate));
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error"}}));
    }
});

api.get('/benefit/plans', async (req, res, next) => {
    try {
        let plans = await app.models.BenefitPlan.find({}).exec();
        res.end(JSON.stringify(plans));
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error"}}));
    }
});

RegExp.escape = function (s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

api.get('/employee', async (req, res, next) => {
    try {

        let filter = {};
        if (req.query.filter === "shareholder") {
            filter = {shareholder_status: true}
        } else if (req.query.filter === "employee") {
            filter = {shareholder_status: false}
        }
        if (req.query.search) {
            Object.assign(filter, {
                $or: [
                    {first_name: {$regex: RegExp.escape(req.query.search), $options: 'i'}},
                    {last_name: {$regex: RegExp.escape(req.query.search), $options: 'i'}},
                    {middle_initial: {$regex: RegExp.escape(req.query.search), $options: 'i'}},
                    {city: {$regex: RegExp.escape(req.query.search), $options: 'i'}}
                ]
            })
        }
        let employee = await app.models.Employee.find(filter).exec();
        res.end(JSON.stringify(employee));
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: 'Error'}}))
    }
});

api.get("/employee/birthday", async (req, res, next) => {
    try {
        let employee = await app.models.Employee.find({}).exec(),
            result = [];
        for (let item of employee) {
            let birthday = item.birthday;
            if (birthday != undefined) {
                if (birthday.getMonth() === (new Date()).getMonth() &&
                    birthday.getDate() >= (new Date()).getDate()) {
                    result.push(item);
                }
            }
        }
        res.end(JSON.stringify(result));
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: 'Error'}}))
    }
});

api.get('/employee/accumulated/vacation', async (req, res, next) => {
    try {
        let employees = await app.models.Employee.find({}).exec(),
            result = [];
        for (let employee of employees) {
            employee = employee.toJSON();
            if (employee.shareholder_status) {
                employee.accumulated_vacations = employee.vacation_days < 15 ? 15 - employee.vacation_days : 0;
            } else {
                employee.accumulated_vacations = employee.vacation_days < 12 ? 12 - employee.vacation_days : 0;
            }
            result.push(employee);
        }
        res.end(JSON.stringify(result));
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: 'Error'}}))
    }
});

api.get("/employee/count", async (req, res, next) => {
    try {
        let employeeCount = await app.models.Employee.find({}).count().exec();
        res.end(JSON.stringify({employeeCount}));
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {}}))
    }
});

api.get("/employee/totalIncome", async (req, res, next) => {
    try {
        let filter = {};
        if (req.query.filter === "shareholder") {
            filter = {shareholder_status: true}
        } else if (req.query.filter === "employee") {
            filter = {shareholder_status: false}
        }

        let employees = await app.models.Employee.find(filter).exec(),
            result = [];

        for (let employee of employees) {
            employee = employee.toJSON(); // Convert Cursor to JSON
            employee.totalIncome = parseInt(employee.paid_to_date) + parseInt(employee.paid_last_year);
            result.push(employee);
        }
        res.end(JSON.stringify(result));
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error"}}));
    }
});

api.get("/employee/totalVacation", async (req, res, next) => {
    try {
        let filter = {};
        if (req.query.filter === "shareholder") {
            filter = {shareholder_status: true}
        } else if (req.query.filter === "employee") {
            filter = {shareholder_status: false}
        }
        let employees = await app.models.Employee.find(filter).exec();
        res.end(JSON.stringify(employees));
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error"}}));
    }
});

api.get("/employee/averageBenefit", async (req, res, next) => {
    try {
        let filter = {};
        if (req.query.filter === "shareholder") {
            filter = {shareholder_status: true}
        } else if (req.query.filter === "employee") {
            filter = {shareholder_status: false}
        }
        let employees = await app.models.Employee.find(filter).exec(),
            result = [];

        for (let employee of employees) {
            employee = employee.toJSON();
            if (employee.benefit_plan != undefined) {
                let benefitPlans = await app.models.BenefitPlan.findOne({benefit_plan_id: employee.benefit_plan}).exec(),
                    totalIncome = parseInt(employee.paid_to_date) + parseInt(employee.paid_last_year);
                if (employee.shareholder_status) {
                    employee.averageBenefit = (benefitPlans.percent_copay / benefitPlans.deductible) * employee.shareholder_status * totalIncome;
                } else {
                    employee.averageBenefit = (benefitPlans.percent_copay / benefitPlans.deductible) * totalIncome;
                }
                result.push(employee);
            }
        }
        res.end(JSON.stringify(result));
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error"}}));
    }
});

api.get("/employee/detail/:id", async (req, res, next) => {
    try {
        let employee = await app.models.Employee.findOne({_id: req.params.id}).exec();
        if (employee) {
            employee = employee.toJSON();
            res.end(JSON.stringify(employee));
        } else {
            res.end(JSON.stringify({}));
        }
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error"}}));
    }
});

function mySqlQuery(query) {
    return new Promise((resolve, reject) => {
        payroll.query(query, function (error, results, fields) {
            if (error) reject(error);
            else {
                resolve(results);
            }
        });
    });
}

api.post("/employee/create", async (req, res, next) => {
    try {
        let employee = req.body;
        let HR_DATA = await HR.connect();
        let hr_id = faker.random.number();

        await HR_DATA.request().query(
            `INSERT INTO [dbo].[Personal]([Employee_ID], [First_Name], [Last_Name], [Middle_Initial], [Address1], [Address2], [City], [State], [Zip], [Email], [Phone_Number], [Social_Security_Number], [Drivers_License], [Marital_Status], [Gender], [Shareholder_Status], [Benefit_Plans], [Ethnicity], [Birthday]) 
            VALUES (${hr_id}, N'${employee['first_name']}', N'${employee['last_name']}', N'${employee['middle_initial']}', N'${employee['address1']}', N'${employee['address2']}', N'${employee['city']}', N'${employee['state']}', ${employee['zip']}, N'${employee['email']}', N'${employee['phone_number']}', N'${employee['SSN']}', N'${employee['driver_license']}', N'${employee['marital_status']}', '${employee['gender'] ? 1 : 0}', '${employee['shareholder_status'] ? 1 : 0}', ${employee['benefit_plan']}, N'${employee['Ethnicity']}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}');`
        );
        await HR.close();
        await sync();
        res.end(JSON.stringify({success: true}))
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error"}}));
    }
});

api.post("/employee/update", async (req, res, next) => {
    try {
        let employee = req.body;
        await app.models.Employee.findOneAndUpdate({_id: employee._id}, {$set: _.omit(employee, ['_id'])});
        let HR_DATA = await HR.connect();
        let personal = await HR_DATA.request().query(`select * from Personal where Employee_ID=${employee["hr_employee_id"]}`);
        if (personal.recordset.length) {
            await HR_DATA.request().query(
                `update Personal 
             set First_Name='${employee['first_name']}',
             Last_Name='${employee['last_name']}',
             Middle_Initial='${employee['middle_initial']}',
             Address1='${employee['address1']}',
             Address2='${employee['address2']}',
             City='${employee['city']}',
             State='${employee['state']}',
             Zip='${employee['zip']}',
             Email='${employee['email']}',
             Phone_Number='${employee['phone_number']}',
             Social_Security_Number='${employee['SSN']}',
             Drivers_License='${employee['driver_license']}',
             Marital_Status='${employee['marital_status']}',
             Gender=${employee['gender'] ? 1 : 0},
             Shareholder_Status=${employee['shareholder_status'] ? 1 : 0},
             Benefit_Plans=${employee['benefit_plan']},
             Ethnicity='${employee['Ethnicity']}'
             where Employee_ID=${employee["hr_employee_id"]}`);
        } else {
            await HR_DATA.request().query(`
                INSERT INTO [dbo].[Personal]([Employee_ID], [First_Name], [Last_Name], [Middle_Initial], [Address1], [Address2], [City], [State], [Zip], [Email], [Phone_Number], [Social_Security_Number], [Drivers_License], [Marital_Status], [Gender], [Shareholder_Status], [Benefit_Plans], [Ethnicity], [Birthday]) 
                VALUES (${faker.random.number()}, N'${employee['first_name']}', N'${employee['last_name']}', N'${employee['middle_initial']}', N'${employee['address1']}', N'${employee['address2']}', N'${employee['city']}', N'${employee['state']}', ${employee['zip']}, N'${employee['email']}', N'${employee['phone_number']}', N'${employee['SSN']}', N'${employee['driver_license']}', N'${employee['marital_status']}', '${employee['gender'] ? 1 : 0}', '${employee['shareholder_status'] ? 1 : 0}', 1, N'${employee['Ethnicity']}', '${employee["birthday"]}');
            `)
        }

        // Update Pay Rate
        if (employee.hasOwnProperty("pay_rates_id_pay_rates")) {
            await mySqlQuery("update `Employee` set " +
                "`Employee Number`=" + employee["hr_employee_id"] + ", " +
                "`Last Name`='" + employee["last_name"] + "', " +
                "`First Name`='" + employee["first_name"] + "', " +
                "`SSN`=" + employee["SSN"] + ", " +
                "`Pay Rate`='" + employee["pay_rate"] + "', " +
                "`Pay Rates_idPay Rates`=" + employee["pay_rates_id_pay_rates"] + ", " +
                "`Vacation Days`=" + employee["vacation_days"] + ", " +
                "`Paid To Date`=" + employee["paid_to_date"] + ", " +
                "`Paid Last Year`=" + employee["paid_last_year"] + " where `Employee`.`idEmployee`=" + employee["pr_employee_id"]);
        }

        await HR.close();
        res.end(JSON.stringify({success: true}))
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error"}}));
    }
});

api.post("/employee/remove", async (req, res, next) => {
    try {
        let employeeId = req.body.employeeId;
        let employee = await app.models.Employee.findOne({_id: employeeId});
        let HR_DATA = await HR.connect();
        await HR_DATA.request().query(`delete from Personal where Employee_ID=${employee.hr_employee_id}`);
        await mySqlQuery(`delete from \`Employee\` where idEmployee=${employee.pr_employee_id}`);
        await app.models.Employee.remove({_id: employeeId}).exec();
        await HR.close();
        res.end(JSON.stringify({success: true}));
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error"}}));
    }
});

api.get('/employee/jobHistory', async (req, res, next) => {
    try {
        let jobHistory = await app.models.JobHistory.find({}).exec();
        res.end(JSON.stringify(jobHistory));
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error"}}));
    }
});

export default api;