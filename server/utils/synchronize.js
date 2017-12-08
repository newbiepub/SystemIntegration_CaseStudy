import HR from "../db/hr";
import app from "../index";
import payroll from "../db/payroll";
import * as _ from "lodash";
import {BenefitHistory} from "../models/benefitHistory";

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

export async function sync() {
    try {
        let HR_DATA = await HR.connect(),
            employement = await HR_DATA.request().query("select * from Employment");
        employement = employement.recordset;
        let personal = await HR_DATA.request().query("select * from Personal");
        personal = personal.recordset;
        let benefitPlans = await HR_DATA.request().query("select * from Benefit_Plans");
        benefitPlans = benefitPlans.recordset;
        let jobHistory = await HR_DATA.request().query("select * from Job_History");
        jobHistory = jobHistory.recordset;

        let employee = await mySqlQuery("select * from Employee"),
            payRate = await mySqlQuery("select * from `Pay Rates`");

        // Sync Benefit History
        let Employee = await app.models.Employee.find({}).exec(),
            output = [];
        for(let item of Employee) {
            let HR_Employee = await HR_DATA.request().query(`select Benefit_Plans from Personal where Employee_ID=${item.hr_employee_id}`);
            if (HR_Employee.recordset.length > 0 &&
                item.benefit_plan != undefined &&
                HR_Employee.recordset[0].hasOwnProperty("Benefit_Plans") &&
                !_.isEqual(item.benefit_plan, HR_Employee.recordset[0]["Benefit_Plans"])) {

                let oldBenefitPlans = await HR.request().query(`select Plan_Name from Benefit_Plans where Benefit_Plan_ID=${item.benefit_plan}`),
                    changedBenefitPlans = await HR.request().query(`select Plan_Name from Benefit_Plans where Benefit_Plan_ID=${HR_Employee.recordset[0]["Benefit_Plans"]}`);
                item = item.toJSON();
                item.old_plan_name = oldBenefitPlans.recordset[0]["Plan_Name"];
                item.changed_plan_name = changedBenefitPlans.recordset[0]["Plan_Name"];
                await new BenefitHistory(item).save();
            }
        }

        // Sync Employment
        for (let item of employement) {
            await app.models.Employment.findOneAndUpdate({hr_employee_id: item['Employee_ID']}, {
                $set: {
                    hr_employee_id: item['Employee_ID'],
                    employment_status: item['Employment_Status'],
                    hire_date: item['Hire_Date'],
                    workers_comp_code: item['Workers_Comp_Code'],
                    termination_date: item['Termination_Date'],
                    rehire_date: item['Rehire_Date'],
                    last_review_date: item['Last_Review_Date']
                }
            }, {upsert: true, multi: true}).exec();
        }

        // Sync Employee and Personal
        for (let item of personal) {
            let insertItem = {};
            let getEmployee = _.find(employee, employee => employee['Employee Number'] === item['Employee_ID']);
            Object.assign(insertItem, {
                hr_employee_id: item['Employee_ID'],
                first_name: item['First_Name'],
                last_name: item['Last_Name'],
                middle_initial: item['Middle_Initial'],
                address1: item['Address1'],
                address2: item['Address2'],
                city: item['City'],
                state: item['State'],
                zip: item['Zip'],
                email: item['Email'],
                phone_number: item['Phone_Number'],
                SSN: item['Social_Security_Number'],
                driver_license: item['Drivers_License'],
                marital_status: item['Marital_Status'],
                gender: item['Gender'],
                shareholder_status: item['Shareholder_Status'],
                benefit_plan: item['Benefit_Plans'],
                Ethnicity: item['Ethnicity'],
                birthday: item['Birthday'] != undefined ? new Date(item['Birthday']) : new Date()
            });

            if (getEmployee) {
                Object.assign(insertItem, {
                    pr_employee_id: getEmployee['idEmployee'],
                    pay_rates_id_pay_rates: getEmployee['Pay Rates_idPay Rates'],
                    vacation_days: getEmployee['Vacation Days'],
                    paid_to_date: getEmployee['Paid To Date'],
                    pay_rate: getEmployee['Pay Rate'],
                    paid_last_year: getEmployee['Paid Last Year'],
                });
            }
            await app.models.Employee.findOneAndUpdate({hr_employee_id: item['Employee_ID']}, insertItem, {
                upsert: true,
                multi: true
            }).exec();
        }

        for (let getEmployee of employee) {
            let insertItem = {};
            if (_.find(personal, (item) => item["Employee_ID"] === getEmployee["Employee Number"]) == undefined) {
                Object.assign(insertItem, {
                    hr_employee_id: getEmployee['Employee Number'],
                    pr_employee_id: getEmployee['idEmployee'],
                    first_name: getEmployee['First Name'],
                    last_name: getEmployee['Last Name'],
                    pay_rates_id_pay_rates: getEmployee['Pay Rates_idPay Rates'],
                    vacation_days: getEmployee['Vacation Days'],
                    paid_to_date: getEmployee['Paid To Date'],
                    pay_rate: getEmployee['Pay Rate'],
                    paid_last_year: getEmployee['Paid Last Year'],
                });
                await app.models.Employee.findOneAndUpdate({pr_employee_id: getEmployee['idEmployee']}, insertItem, {
                    upsert: true,
                    multi: true
                }).exec();
            }
        }


        // Benefit Plans
        for (let item of benefitPlans) {
            await app.models.BenefitPlan.findOneAndUpdate({benefit_plan_id: item['Benefit_Plan_ID']}, {
                benefit_plan_id: item['Benefit_Plan_ID'],
                plan_name: item['Plan_Name'],
                deductible: item['Deductable'],
                percent_copay: item['Percentage_CoPay']
            }, {upsert: true, multi: true}).exec();
        }

        //Job History
        for (let item of jobHistory) {
            await app.models.JobHistory.findOneAndUpdate({ID: item["ID"]}, {
                ID: item["ID"],
                hr_employee_id: item['Employee_ID'],
                department: item['Department'],
                division: item['Division'],
                start_date: new Date(item['Start_Date']),
                end_date: new Date(item['End_Date']),
                job_title: item['Job_Title'],
                supervisor: item['Supervisor'],
                job_category: item['Job_Category'],
                location: item['Location'],
                department_code: item['Departmen_Code'],
                salary_type: item['Salary_Type'],
                pay_period: item['Pay_Period'],
                hour_per_week: item['Hours_per_Week'],
                hazardous_training: item['Hazardous_Training']
            }, {upsert: true, multi: true}).exec();
        }

        //PayRate
        for (let item of payRate) {
            await app.models.PayRates.findOneAndUpdate({id_pay_rates: item['idPay Rates']}, {
                id_pay_rates: item['idPay Rates'],
                pay_rates_name: item['Pay Rate Name'],
                value: item['Value'],
                tax_percentage: item['Tax Percentage'],
                pay_type: item['Pay Type'],
                pay_amount: item['Pay Amount'],
                pt_levelC: item['PT - Level C']
            }, {upsert: true, multi: true}).exec();
        }

        await HR.close();
    } catch (e) {
        console.log(e);
        throw e;
    }
}