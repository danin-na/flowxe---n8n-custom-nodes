"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.note = exports.customField = exports.pipeline = exports.phoneNumber = exports.location = exports.resource = void 0;
const _fields_1 = require("./_fields");
const _actions_1 = require("./_actions");
exports.resource = {
    displayName: 'Resource',
    name: 'resource',
    type: 'options',
    noDataExpression: true,
    options: [
        { name: 'Location', value: 'location' },
        { name: 'Phone Number', value: 'phoneNumber' },
        { name: 'Pipeline', value: 'pipeline' },
        { name: 'Custom Field', value: 'customField' },
        { name: 'Note', value: 'note' },
    ],
    default: 'location',
};
exports.location = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['location'] } },
        default: '',
        options: [
            ..._actions_1.actions.location,
        ],
    },
    ..._fields_1.fields.location
];
exports.phoneNumber = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['phoneNumber'] } },
        default: '',
        options: [
            ..._actions_1.actions.phoneNumber
        ],
    },
    ..._fields_1.fields.phoneNumber
];
exports.pipeline = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['pipeline'] } },
        default: '',
        options: [
            ..._actions_1.actions.pipeline,
        ],
    },
    ..._fields_1.fields.pipeline
];
exports.customField = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['customField'] } },
        default: '',
        options: [
            ..._actions_1.actions.customField,
        ],
    },
    ..._fields_1.fields.customField
];
exports.note = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['note'] } },
        default: '',
        options: [
            ..._actions_1.actions.note,
        ],
    },
    ..._fields_1.fields.note,
];
//# sourceMappingURL=object.js.map