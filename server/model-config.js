import {randomString, ttl} from "./utils/utils";
import CryptoJS from "crypto-js";
import app from "./index";

const modelConfigs = [
    {
        name: "AccessToken",
        schema: {
            access_token: {type: String, default: CryptoJS.HmacSHA1(randomString(), "production")},
            refresh_token: {type: String, default: CryptoJS.HmacSHA1(randomString(), "production")},
            ttl: {type: Number, default: ttl()},
            createdAt: {type: String, default: new Date()},
            userId: {type: String, required: true}
        },
        schemaName: "access_token",
        collection: "access_token"
    },
    {
        name: "User",
        schema: {
            emails: {
                type: String,
                required: true
            },
            username: {type: String},
            password: {type: String, required: true},
            profile: {type: Object},
            createdAt: {type: String, default: new Date().toISOString()}
        },
        schemaName: "users",
        collection: "users"
    },
    {
        name: "Employee",
        schema: {
            hr_employee_id: {type: String, required: true},
            pr_employee_id: {type: String, required: true},
            first_name: {type: String},
            last_name: {type: String},
            middle_initial: {type: String},
            address1: {type: String},
            address2: {type: String},
            city: {type: String},
            state: {type: String},
            zip: {type: Number},
            email: {
                type: String,
                validate: {
                    validator: function (v) {
                        return (new RegExp((/^[a-z0-9A-Z]{1,}\@[a-z0-9A-Z]{1,}\.[a-z0-9A-Z]{1,}$/))).test(v);
                    },
                    message: '{VALUE} is not a valid email !'
                }
            },
            phone_number: {
                type: "String",
                validate: {
                    validator: (v) => {
                        return (new RegExp(/^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/)).test(v);
                    },
                    message: "{VALUE} is not a valid phone number"
                }
            },
            SSN: {
                type: String,
                required: true
            },
            driver_license: {type: String},
            marital_status: {type: String},
            gender: {type: Boolean},
            shareholder_status: {type: Boolean},
            benefit_plan: {type: Number},
            Ethnicity: {type: String},
            pay_rate: {type: String},
            pay_rates_id_pay_rates: {type: Number},
            vacation_days: {type: Number},
            paid_to_date: {type: Number},
            paid_last_year: {type: Number}
        },
        schemaName: "employee",
        collection: "employee"
    },
    {
        name: "PayRates",
        schema: {
            id_pay_rates: {type: String, required: true},
            pay_rates_name: {type: String},
            value: {type: Number, required: true},
            tax_percentage: {type: Number},
            pay_type: {type: String},
            pay_amount: {type: Number},
            pt_levelC: {type: Number}
        },
        schemaName: "pay_rates",
        collection: "pay_rates"
    },
    {
        name: "Employment",
        schema: {
            hr_employee_id: {type: String, required: true},
            employment_status: {type: String, required: true},
            hire_date: {type: Date},
            workers_comp_code: {type: String},
            termination_date: {type: Date},
            rehire_date: {type: Date},
            last_review_date: {type: Date}
        },
        schemaName: "employment",
        collection: "employment",
    },
    {
        name: "BenefitPlan",
        schema: {
            benefit_plan_id: {type: String, required: true},
            plan_name: {type: String},
            deductible: {type: Number},
            percent_copay: {type: Number}
        },
        schemaName: "benefit_plan",
        collection: "benefit_plan"
    },
    {
        name: "JobHistory",
        schema: {
            ID: {type: String, required: true},
            hr_employee_id: {type: String, required: true},
            department: {type: String},
            division: {type: String},
            start_date: {type: Date},
            end_date: {type: Date},
            job_title: {type: String},
            supervisor: {type: String},
            job_category: {type: String},
            location: {type: String},
            department_code: {type: String},
            salary_type: {type: Number},
            pay_period: {type: String},
            hour_per_week: {type: Number},
            hazardous_training: {type: Boolean}
        },
        schemaName: "job_history",
        collection: "job_history"
    }
];

export default modelConfigs;