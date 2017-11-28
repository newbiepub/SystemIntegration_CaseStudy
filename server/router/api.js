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

});

api.get("/employee/totalVacation", async (req, res, next) => {

});

api.get("/employee/averageBenefit", async (req, res, next) => {

});

export default api;