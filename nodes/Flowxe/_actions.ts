import type { INodePropertyOptions } from 'n8n-workflow'
import { helpers } from './_helpers'
type N = INodePropertyOptions

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
          postReceive: [{ type: 'set', properties: { value: helpers.output.location.get } }],
        },
      },
    } satisfies N,
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
          postReceive: [{ type: 'set', properties: { value: helpers.output.phoneNumber.getAll } }],
        },
      },
    } satisfies N,
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
          postReceive: [{ type: 'set', properties: { value: helpers.output.pipeline.getAll } }],
        },
      },
    } satisfies N,
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
          postReceive: [{ type: 'set', properties: { value: helpers.output.customField.getAll } }],
        },
      },
    } satisfies N,
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
          postReceive: [{ type: 'set', properties: { value: helpers.output.note.get } }],
        },
      },
    } satisfies N,
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
          postReceive: [{ type: 'set', properties: { value: helpers.output.note.getAll } }],
        },
      },
    } satisfies N,
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
          postReceive: [{ type: 'set', properties: { value: helpers.output.note.create } }],
        },
      },
    } satisfies N,
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
          postReceive: [{ type: 'set', properties: { value: helpers.output.note.update } }],
        },
      },
    } satisfies N,
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
          postReceive: [{ type: 'set', properties: { value: helpers.output.note.delete } }],
        },
      },
    } satisfies N,
  },
}

export const actions = {
  location: [ac.location.get] as N[],
  phoneNumber: [ac.phoneNumber.getAll] as N[],
  pipeline: [ac.pipeline.getAll] as N[],
  customField: [ac.customField.getAll] as N[],
  note: [ac.note.get, ac.note.getAll, ac.note.create, ac.note.update, ac.note.delete] as N[],
} as const