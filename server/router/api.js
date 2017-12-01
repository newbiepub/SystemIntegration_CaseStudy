import express from "express";
import {sync} from "../utils/synchronize";
import app from "../index";
import HR from "../db/hr";
import * as _ from "lodash";

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
        let HR_DATA = await HR.connect(),
            Employee = await app.models.Employee.find({}).exec(),
            output = [];
        for (let item of Employee) {
            let HR_Employee = await HR_DATA.request().query(`select Benefit_Plans from Personal where Employee_ID=${item.hr_employee_id}`);
            if (!_.isEqual(item.benefit_plan, HR_Employee.recordset[0]["Benefit_Plans"])) {
                let oldBenefitPlans = await HR.request().query(`select Plan_Name from Benefit_Plans where Benefit_Plan_ID=${item.benefit_plan}`),
                    changedBenefitPlans = await HR.request().query(`select Plan_Name from Benefit_Plans where Benefit_Plan_ID=${HR_Employee.recordset[0]["Benefit_Plans"]}`);
                item = item.toJSON();
                item.old_plan_name = oldBenefitPlans.recordset[0]["Plan_Name"];
                item.changed_plan_name = changedBenefitPlans.recordset[0]["Plan_Name"];
                output.push(item);
            }
        }
        await HR.close();
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
   }  catch(e) {
       console.log(e);
       res.statusCode = 500;
       res.end(JSON.stringify({error: {message: "Error"}}));
   }
});

api.get('/benefit/plans', async (req, res, next) => {
   try {
        let plans = await app.models.BenefitPlan.find({}).exec();
        res.end(JSON.stringify(plans));
   } catch(e) {
       console.log(e);
       res.statusCode = 500;
       res.end(JSON.stringify({error: {message: "Error"}}));
   }
});

api.get('/employee', async (req, res, next) => {
    try {
        let employee = await app.models.Employee.find({}).exec();
        res.end(JSON.stringify(employee));
    } catch(e) {
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
        let employees = await app.models.Employee.find({}).exec(),
            result = [];

        for (let employee of employees) {
            employee = employee.toJSON(); // Convert Cursor to JSON
            let jobHistory = await app.models.JobHistory.findOne({hr_employee_id: employee.hr_employee_id}).exec();
            if (jobHistory) {
                jobHistory = jobHistory.toJSON(); // Convert Cursor to JSON
                let end_date = new Date(jobHistory.end_date).getTime(),
                    start_date = new Date(jobHistory.start_date).getTime(),
                    work_days = Math.floor((end_date - start_date) / (1000 * 3600 * 24)),
                    totalIncome = (jobHistory.salary_type * ((work_days) - employee.vacation_days - 4));
                employee.totalIncome = totalIncome;
                result.push(employee);
            }
        }
        res.end(JSON.stringify({employee: result}));
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error"}}));
    }
});

api.get("/employee/totalVacation", async (req, res, next) => {
    try {
        let employees = await app.models.Employee.find({}).exec(),
            result = [];
        for (let employee of employees) {
            employee = employee.toJSON();
            let jobHistory = await app.models.JobHistory.findOne({hr_employee_id: employee.hr_employee_id}).exec(),
                employment = await app.models.Employment.findOne({hr_employee_id: employee.hr_employee_id}).exec();
            if(jobHistory && employment) {
                let totalVacation = (employment.last_review_date * 24 - jobHistory.hour_per_week) / 24;
                employee.totalVacation = totalVacation;
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

api.get("/employee/averageBenefit", async (req, res, next) => {
    try {
        let employees = await app.models.Employee.find({}).exec(),
            result = [];

        for(let employee of employees) {
            employee = employee.toJSON();
            let benefitPlans = await app.models.BenefitPlan.findOne({benefit_plan_id: employee.benefit_plan}).exec();
            employee.averageBenefit = (benefitPlans.percent_copay / benefitPlans.deductible) *  employee.shareholder_status;
            result.push(employee);
        }
        res.end(JSON.stringify(result));
    } catch(e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error"}}));
    }
});

api.get("/employee/detail/:id", async (req, res, next) => {
    try {
        let employee = await app.models.Employee.findOne({_id: req.params.id}).exec();
        if(employee) {
            employee = employee.toJSON();
            res.end(JSON.stringify(employee));
        } else {
            res.end(JSON.stringify({}));
        }
    } catch(e) {
        console.log(e);
        res.statusCode = 500;
        res.end(JSON.stringify({error: {message: "Error"}}));
    }
});

api.post("/employee/update", async (req, res, next) => {
    try {

    } catch (e) {

    }
});

export default api;