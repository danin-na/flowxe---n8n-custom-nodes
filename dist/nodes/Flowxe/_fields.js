"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
function forOp(base) {
    return (resource, operation) => {
        var _a;
        const ops = Array.isArray(operation) ? operation : [operation];
        return {
            ...base,
            displayOptions: {
                ...((_a = base.displayOptions) !== null && _a !== void 0 ? _a : {}),
                show: {
                    resource: [resource],
                    operation: ops,
                },
            },
        };
    };
}
const fl = {
    global: {
        apiKey: forOp({
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            default: '',
            required: true,
            typeOptions: { password: true },
            description: 'Private Integration Token (Authorization: Bearer ...)',
        }),
        outputFormat: forOp({
            displayName: 'Output Format',
            name: 'outputFormat',
            type: 'options',
            noDataExpression: true,
            default: 'sanitizedSimple',
            description: 'RAW returns the full API response. Sanitized returns a cleaned object output.',
            options: [
                { name: 'Debug Mode (RAW)', value: 'raw' },
                { name: 'Sanitized Full', value: 'sanitizedFull' },
                { name: 'Sanitized Simple', value: 'sanitizedSimple' },
            ],
        }),
        emptyStringAsNull: forOp({
            displayName: 'Pass Null To Clear Fields',
            name: 'emptyStringAsNull',
            type: 'boolean',
            default: false,
            description: 'Whether to send empty string fields as null values to clear the fields from the record',
        }),
        message: forOp({
            displayName: 'Message',
            name: 'message',
            type: 'string',
            default: '',
            required: true,
            description: 'Message body or content',
        }),
        userId: forOp({
            displayName: 'User ID',
            name: 'userId',
            type: 'string',
            default: '',
            description: 'Assign this to a user with User ID',
        }),
    },
    contact: {
        id: forOp({
            displayName: 'Contact ID',
            name: 'contactId',
            type: 'string',
            default: '',
            required: true,
            description: 'The ID of the contact',
        }),
        fields: forOp({
            displayName: 'Contact Fields',
            name: 'contactFields',
            type: 'collection',
            default: {},
            placeholder: 'Add Field',
            description: 'The fields to update for the contact',
            options: [
                { displayName: 'First Name', name: 'firstName', type: 'string', default: '' },
                { displayName: 'Last Name', name: 'lastName', type: 'string', default: '' },
                { displayName: 'Email', name: 'email', type: 'string', default: '', placeholder: '' },
                { displayName: 'Phone', name: 'phone', type: 'string', default: '' },
                { displayName: 'Company Name', name: 'companyName', type: 'string', default: '' },
                { displayName: 'Address Line 1', name: 'address1', type: 'string', default: '' },
                { displayName: 'Address Line 2', name: 'address2', type: 'string', default: '' },
                { displayName: 'City', name: 'city', type: 'string', default: '' },
                { displayName: 'State', name: 'state', type: 'string', default: '' },
                { displayName: 'Postal Code', name: 'postalCode', type: 'string', default: '' },
                { displayName: 'Country', name: 'country', type: 'string', default: '' },
                { displayName: 'Website', name: 'website', type: 'string', default: '' },
                { displayName: 'Timezone', name: 'timezone', type: 'string', default: '' },
                {
                    displayName: 'Custom Fields',
                    name: 'customFields',
                    type: 'fixedCollection',
                    default: {},
                    typeOptions: { multipleValues: true },
                    options: [
                        {
                            name: 'customField',
                            displayName: 'Custom Field',
                            values: [
                                { displayName: 'Field ID', name: 'id', type: 'string', default: '', required: true },
                                { displayName: 'Value', name: 'value', type: 'string', default: '' },
                            ],
                        },
                    ],
                },
            ],
        }),
    },
    location: {
        id: forOp({
            displayName: 'Location ID',
            name: 'locationId',
            type: 'string',
            default: '',
            required: true,
            description: 'The ID of the location',
        }),
    },
    customFields: {
        model: forOp({
            displayName: 'Custom Fields Model',
            name: 'customFieldsModel',
            type: 'options',
            noDataExpression: true,
            default: 'all',
            description: 'The model to which the custom field belongs',
            options: [
                { name: 'All', value: 'all' },
                { name: 'Contact', value: 'contact' },
                { name: 'Opportunity', value: 'opportunity' },
            ],
        }),
    },
    note: {
        id: forOp({
            displayName: 'Note ID',
            name: 'noteId',
            type: 'string',
            default: '',
            required: true,
            description: 'The ID of the note',
        }),
    },
    tag: {
        tags: forOp({
            displayName: 'Tags',
            name: 'tags',
            type: 'string',
            default: '',
            required: true,
            description: 'Comma-separated tags (e.g. vip, lead, booked)',
        }),
    },
    task: {
        id: forOp({
            displayName: 'Task ID',
            name: 'taskId',
            type: 'string',
            default: '',
            required: true,
            description: 'The ID of the task',
        }),
        title: forOp({
            displayName: 'Title',
            name: 'taskTitle',
            type: 'string',
            default: '',
            description: 'Task title (required for Create)',
        }),
        dueDate: forOp({
            displayName: 'Due Date',
            name: 'taskDueDate',
            type: 'string',
            default: '',
            description: 'Due date (string, typically ISO 8601)',
        }),
        completed: forOp({
            displayName: 'Completed',
            name: 'taskCompleted',
            type: 'options',
            noDataExpression: true,
            default: 'unset',
            description: 'Set task completion status (Unset will not send the field)',
            options: [
                { name: 'Unset', value: 'unset' },
                { name: 'True', value: 'true' },
                { name: 'False', value: 'false' },
            ],
        }),
    },
};
const fields = {
    location: [
        fl.global.apiKey('location', 'locationGet'),
        fl.location.id('location', 'locationGet'),
        fl.global.outputFormat('location', 'locationGet'),
    ],
    phoneNumber: [
        fl.global.apiKey('phoneNumber', 'phoneNumberGetAll'),
        fl.location.id('phoneNumber', 'phoneNumberGetAll'),
        fl.global.outputFormat('phoneNumber', 'phoneNumberGetAll'),
    ],
    pipeline: [
        fl.global.apiKey('pipeline', 'pipelineGetAll'),
        fl.location.id('pipeline', 'pipelineGetAll'),
        fl.global.outputFormat('pipeline', 'pipelineGetAll'),
    ],
    customField: [
        fl.global.apiKey('customField', 'customFieldGetAll'),
        fl.location.id('customField', 'customFieldGetAll'),
        fl.customFields.model('customField', 'customFieldGetAll'),
        fl.global.outputFormat('customField', 'customFieldGetAll'),
    ],
    note: [
        fl.global.apiKey('note', 'noteGetAll'),
        fl.contact.id('note', 'noteGetAll'),
        fl.global.outputFormat('note', 'noteGetAll'),
        fl.global.apiKey('note', 'noteCreate'),
        fl.contact.id('note', 'noteCreate'),
        fl.global.message('note', 'noteCreate'),
        fl.global.userId('note', 'noteCreate'),
        fl.global.outputFormat('note', 'noteCreate'),
        fl.global.apiKey('note', 'noteGet'),
        fl.contact.id('note', 'noteGet'),
        fl.note.id('note', 'noteGet'),
        fl.global.outputFormat('note', 'noteGet'),
        fl.global.apiKey('note', 'noteUpdate'),
        fl.contact.id('note', 'noteUpdate'),
        fl.note.id('note', 'noteUpdate'),
        fl.global.message('note', 'noteUpdate'),
        fl.global.userId('note', 'noteUpdate'),
        fl.global.outputFormat('note', 'noteUpdate'),
        fl.global.apiKey('note', 'noteDelete'),
        fl.contact.id('note', 'noteDelete'),
        fl.note.id('note', 'noteDelete'),
        fl.global.outputFormat('note', 'noteDelete'),
    ],
};
exports.fields = fields;
//# sourceMappingURL=_fields.js.map