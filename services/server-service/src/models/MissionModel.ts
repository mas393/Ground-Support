import mongoose, { Document, Schema } from "mongoose";

export interface IMission {
    Name: String;
    IsTest: Boolean;
    LastUpdated: Date;

};

export interface IGenericModel extends IGeneric, Document { };

const GenericSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IGeneric>('Generic', GenericSchema);