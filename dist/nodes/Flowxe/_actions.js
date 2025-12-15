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
    tag: {
        add: {
            name: 'Add',
            action: 'Add',
            value: 'tagAdd',
            description: 'Add tags to a contact by contactId',
            routing: {
                request: {
                    method: 'POST',
                    url: '=/contacts/{{$parameter.contactId}}/tags',
                    body: `={{(() => {
            const tags = ($parameter.tagTags ?? '')
              .split(',')
              .map((t) => t.trim())
              .filter((t) => t !== '');
            return { tags };
          })()}}`,
                },
                output: {
                    postReceive: [{ type: 'set', properties: { value: _helpers_1.helpers.output.tag.add } }],
                },
            },
        },
        remove: {
            name: 'Remove',
            action: 'Remove',
            value: 'tagRemove',
            description: 'Remove tags from a contact by contactId',
            routing: {
                request: {
                    method: 'DELETE',
                    url: '=/contacts/{{$parameter.contactId}}/tags',
                    body: `={{(() => {
            const tags = ($parameter.tagTags ?? '')
              .split(',')
              .map((t) => t.trim())
              .filter((t) => t !== '');
            return { tags };
          })()}}`,
                },
                output: {
                    postReceive: [{ type: 'set', properties: { value: _helpers_1.helpers.output.tag.remove } }],
                },
            },
        },
    },
    task: {
        get: {
            name: 'Get',
            action: 'Get',
            value: 'taskGet',
            description: 'Get a task by contactId + taskId',
            routing: {
                request: {
                    method: 'GET',
                    url: '=/contacts/{{$parameter.contactId}}/tasks/{{$parameter.taskId}}',
                },
                output: {
                    postReceive: [{ type: 'set', properties: { value: _helpers_1.helpers.output.task.get } }],
                },
            },
        },
        getAll: {
            name: 'Get All',
            action: 'Get All',
            value: 'taskGetAll',
            description: 'Get all tasks for a contact by contactId',
            routing: {
                request: {
                    method: 'GET',
                    url: '=/contacts/{{$parameter.contactId}}/tasks',
                },
                output: {
                    postReceive: [{ type: 'set', properties: { value: _helpers_1.helpers.output.task.getAll } }],
                },
            },
        },
        create: {
            name: 'Create',
            action: 'Create',
            value: 'taskCreate',
            description: 'Create a task for a contact by contactId',
            routing: {
                request: {
                    method: 'POST',
                    url: '=/contacts/{{$parameter.contactId}}/tasks',
                    body: `={{(() => {
            const body = {};
            const title = $parameter.title;
            const message = $parameter.message;
            const dueDate = $parameter.taskDueDate;
            const completed = $parameter.taskCompleted;
            const userId = $parameter.userId;

            if (title !== undefined && title !== '') body.title = title;
            if (message !== undefined && message !== '') body.body = message;
            if (dueDate !== undefined && dueDate !== '') body.dueDate = dueDate;

            if (userId !== undefined && userId !== '') body.assignedTo = userId;

            if (completed !== undefined && completed !== '' && completed !== 'unset') {
              body.completed = completed === 'true';
            }

            return body;
          })()}}`,
                },
                output: {
                    postReceive: [{ type: 'set', properties: { value: _helpers_1.helpers.output.task.create } }],
                },
            },
        },
        update: {
            name: 'Update',
            action: 'Update',
            value: 'taskUpdate',
            description: 'Update a task by contactId + taskId',
            routing: {
                request: {
                    method: 'PUT',
                    url: '=/contacts/{{$parameter.contactId}}/tasks/{{$parameter.taskId}}',
                    body: `={{(() => {
            const body = {};
            const title = $parameter.title;
            const message = $parameter.message;
            const dueDate = $parameter.taskDueDate;
            const completed = $parameter.taskCompleted;
            const userId = $parameter.userId;

            if (title !== undefined && title !== '') body.title = title;
            if (message !== undefined && message !== '') body.body = message;
            if (dueDate !== undefined && dueDate !== '') body.dueDate = dueDate;

            if (userId !== undefined && userId !== '') body.assignedTo = userId;

            if (completed !== undefined && completed !== '' && completed !== 'unset') {
              body.completed = completed === 'true';
            }

            return body;
          })()}}`,
                },
                output: {
                    postReceive: [{ type: 'set', properties: { value: _helpers_1.helpers.output.task.update } }],
                },
            },
        },
        delete: {
            name: 'Delete',
            action: 'Delete',
            value: 'taskDelete',
            description: 'Delete a task by contactId + taskId',
            routing: {
                request: {
                    method: 'DELETE',
                    url: '=/contacts/{{$parameter.contactId}}/tasks/{{$parameter.taskId}}',
                },
                output: {
                    postReceive: [{ type: 'set', properties: { value: _helpers_1.helpers.output.task.delete } }],
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
    tag: [ac.tag.add, ac.tag.remove],
    task: [ac.task.get, ac.task.getAll, ac.task.create, ac.task.update, ac.task.delete],
};
//# sourceMappingURL=_actions.js.map