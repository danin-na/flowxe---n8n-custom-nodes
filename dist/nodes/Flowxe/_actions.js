"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const _helpers_1 = require("./_helpers");
const ac = {
    location: {
        get: {
            name: 'Get',
            action: 'Get',
            value: 'locationGet',
            description: 'Get a location by locationId',
            routing: {
                request: {
                    method: 'GET',
                    url: '=/locations/{{$parameter.locationId}}',
                },
                output: {
                    postReceive: [{ type: 'set', properties: { value: _helpers_1.helpers.output.location.get } }],
                },
            },
        },
    },
    phoneNumber: {
        getAll: {
            name: 'Get All',
            action: 'Get All',
            value: 'phoneNumberGetAll',
            description: 'Get all phone numbers by locationId',
            routing: {
                request: {
                    method: 'GET',
                    url: '=/phone-system/numbers/location/{{$parameter.locationId}}',
                },
                output: {
                    postReceive: [{ type: 'set', properties: { value: _helpers_1.helpers.output.phoneNumber.getAll } }],
                },
            },
        },
    },
    pipeline: {
        getAll: {
            name: 'Get All',
            action: 'Get All',
            value: 'pipelineGetAll',
            description: 'Get all pipelines by locationId',
            routing: {
                request: {
                    method: 'GET',
                    url: '=/opportunities/pipelines?locationId={{$parameter.locationId}}',
                },
                output: {
                    postReceive: [{ type: 'set', properties: { value: _helpers_1.helpers.output.pipeline.getAll } }],
                },
            },
        },
    },
    customField: {
        getAll: {
            name: 'Get All',
            action: 'Get All',
            value: 'customFieldGetAll',
            description: 'Get All custom fields by locationId',
            routing: {
                request: {
                    method: 'GET',
                    url: '=/locations/{{$parameter.locationId}}/customFields',
                    qs: {
                        model: '={{$parameter.customFieldsModel}}',
                    },
                },
                output: {
                    postReceive: [{ type: 'set', properties: { value: _helpers_1.helpers.output.customField.getAll } }],
                },
            },
        },
    },
    note: {
        get: {
            name: 'Get',
            action: 'Get',
            value: 'noteGet',
            description: 'Get a note by contactId + noteId',
            routing: {
                request: {
                    method: 'GET',
                    url: '=/contacts/{{$parameter.contactId}}/notes/{{$parameter.noteId}}',
                },
                output: {
                    postReceive: [{ type: 'set', properties: { value: _helpers_1.helpers.output.note.get } }],
                },
            },
        },
        getAll: {
            name: 'Get All',
            action: 'Get All',
            value: 'noteGetAll',
            description: 'Get All notes for a contact by contactId',
            routing: {
                request: {
                    method: 'GET',
                    url: '=/contacts/{{$parameter.contactId}}/notes',
                },
                output: {
                    postReceive: [{ type: 'set', properties: { value: _helpers_1.helpers.output.note.getAll } }],
                },
            },
        },
        create: {
            name: 'Create',
            action: 'Create',
            value: 'noteCreate',
            description: 'Create a note for a contact by contactId',
            routing: {
                request: {
                    method: 'POST',
                    url: '=/contacts/{{$parameter.contactId}}/notes',
                    body: `={{(() => {
            const body = { body: $parameter.message };
            const userId = $parameter.userId;
            if (userId !== undefined && userId !== '') body.userId = userId;
            return body;
          })()}}`,
                },
                output: {
                    postReceive: [{ type: 'set', properties: { value: _helpers_1.helpers.output.note.create } }],
                },
            },
        },
        update: {
            name: 'Update',
            action: 'Update',
            value: 'noteUpdate',
            description: 'Update a note by contactId + noteId',
            routing: {
                request: {
                    method: 'PUT',
                    url: '=/contacts/{{$parameter.contactId}}/notes/{{$parameter.noteId}}',
                    body: `={{(() => {
            const body = { body: $parameter.message };
            const userId = $parameter.userId;
            if (userId !== undefined && userId !== '') body.userId = userId;
            return body;
          })()}}`,
                },
                output: {
                    postReceive: [{ type: 'set', properties: { value: _helpers_1.helpers.output.note.update } }],
                },
            },
        },
        delete: {
            name: 'Delete',
            action: 'Delete',
            value: 'noteDelete',
            description: 'Delete a note by contactId + noteId',
            routing: {
                request: {
                    method: 'DELETE',
                    url: '=/contacts/{{$parameter.contactId}}/notes/{{$parameter.noteId}}',
                },
                output: {
                    postReceive: [{ type: 'set', properties: { value: _helpers_1.helpers.output.note.delete } }],
                },
            },
        },
    },
};
exports.actions = {
    location: [ac.location.get],
    phoneNumber: [ac.phoneNumber.getAll],
    pipeline: [ac.pipeline.getAll],
    customField: [ac.customField.getAll],
    note: [ac.note.get, ac.note.getAll, ac.note.create, ac.note.update, ac.note.delete],
};
//# sourceMappingURL=_actions.js.map