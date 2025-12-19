"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flowxe = void 0;
const objects_1 = require("./objects");
class Flowxe {
    constructor() {
        this.description = {
            displayName: 'Flowxe',
            name: 'flowxe',
            icon: 'file:flowxe.svg',
            group: ['transform'],
            version: 1,
            usableAsTool: true,
            subtitle: '={{$parameter.operation}}',
            description: 'GoHighLevel Declarative',
            defaults: { name: 'HighLevel' },
            inputs: ['main'],
            outputs: ['main'],
            requestDefaults: {
                baseURL: 'https://services.leadconnectorhq.com',
                headers: {
                    Accept: 'application/json',
                    Authorization: '={{"Bearer " + $parameter.f_common_apiKey}}',
                    Version: '2021-07-28',
                },
            },
            properties: [
                objects_1.data.resource,
                objects_1.data.contact.operation,
                ...objects_1.data.contact.fields,
                objects_1.data.location.operation,
                ...objects_1.data.location.fields,
                objects_1.data.phone.operation,
                ...objects_1.data.phone.fields,
                objects_1.data.pipeline.operation,
                ...objects_1.data.pipeline.fields,
                objects_1.data.customField.operation,
                ...objects_1.data.customField.fields,
                objects_1.data.tag.operation,
                ...objects_1.data.tag.fields,
                objects_1.data.note.operation,
                ...objects_1.data.note.fields,
            ],
        };
    }
}
exports.Flowxe = Flowxe;
//# sourceMappingURL=Flowxe.node.js.map