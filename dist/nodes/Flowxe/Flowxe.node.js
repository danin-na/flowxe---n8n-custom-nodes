"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flowxe = void 0;
const obj = __importStar(require("./object"));
class Flowxe {
    constructor() {
        this.description = {
            displayName: 'Flowxe',
            name: 'flowxe',
            icon: 'file:flowxe.svg',
            group: ['transform'],
            version: 1,
            usableAsTool: true,
            subtitle: '={{$parameter["resource"] + " - " + $parameter["operation"]}}',
            description: 'GoHighLevel Declarative',
            defaults: { name: 'HighLevel' },
            inputs: ['main'],
            outputs: ['main'],
            requestDefaults: {
                baseURL: 'https://services.leadconnectorhq.com',
                headers: {
                    Accept: 'application/json',
                    Authorization: '={{"Bearer " + $parameter.apiKey}}',
                    Version: '2021-07-28',
                },
            },
            properties: [
                obj.resource,
                ...obj.contact,
                ...obj.conversation,
                ...obj.location,
                ...obj.phoneNumber,
                ...obj.pipeline,
                ...obj.customField,
                ...obj.note,
                ...obj.tag,
                ...obj.task,
            ],
        };
    }
}
exports.Flowxe = Flowxe;
//# sourceMappingURL=Flowxe.node.js.map