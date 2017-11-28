import modelConfigs from "../model-config";
import { Schema } from "mongoose"
import db from "../db/database";
import * as _ from "lodash";
module.exports = (app) => {
    try {
        app.models = {};
        _.each(modelConfigs, (model) => {
            app.models[model.name] = db.model(model.schemaName, new Schema(model.schema), model.collection);
        })
    } catch(e) {
        console.log(e);
    }
};