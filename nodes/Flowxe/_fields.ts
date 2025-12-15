import type { INodeProperties } from 'n8n-workflow'
type N = INodeProperties

function forOp(base: N)
{
  return (resource: string, operation: string | string[]): N =>
  {
    const ops = Array.isArray(operation) ? operation : [operation]

    return {
      ...base,
      displayOptions: {
        ...(base.displayOptions ?? {}),
        show: {
          resource: [resource],
          operation: ops,
        },
      },
    }
  }
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
    } as N),
    // in fl.global
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
    } as N),
    emptyStringAsNull: forOp({
      displayName: 'Pass Null To Clear Fields',
      name: 'emptyStringAsNull',
      type: 'boolean',
      default: false,
      description: 'Whether to send empty string fields as null values to clear the fields from the record',
    } as N),
    message: forOp({
      displayName: 'Message',
      name: 'message',
      type: 'string',
      default: '',
      required: true,
      description: 'Message body or content',
    } as N),
    userId: forOp({
      displayName: 'User ID',
      name: 'userId',
      type: 'string',
      default: '',
      description: 'Assign this to a user with User ID',
    } as N),
  },
  contact: {
    id: forOp({
      displayName: 'Contact ID',
      name: 'contactId',
      type: 'string',
      default: '',
      required: true,
      description: 'The ID of the contact',
    } as N),
    fields: forOp({
      displayName: 'Contact Fields',
      name: 'contactFields',
      type: 'collection',
      default: {},
      placeholder: 'Add Field',
      description: 'The fields to update for the contact',
      //eslint-disable-next-line n8n-nodes-base/node-param-collection-type-unsorted-items
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
    } as N),
  },
  location: {
    id: forOp({
      displayName: 'Location ID',
      name: 'locationId',
      type: 'string',
      default: '',
      required: true,
      description: 'The ID of the location',
    } as N),
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
    } as N),
  },
  note: {
    id: forOp({
      displayName: 'Note ID',
      name: 'noteId',
      type: 'string',
      default: '',
      required: true,
      description: 'The ID of the note',
    } as N),
  },
  tag: {
    tags: forOp({
      displayName: 'Tags',
      name: 'tags',
      type: 'string',
      default: '',
      required: true,
      description: 'Comma-separated tags (e.g. vip, lead, booked)',
    } as N),
  },
  task: {
    id: forOp({
      displayName: 'Task ID',
      name: 'taskId',
      type: 'string',
      default: '',
      required: true,
      description: 'The ID of the task',
    } as N),
    title: forOp({
      displayName: 'Title',
      name: 'taskTitle',
      type: 'string',
      default: '',
      description: 'Task title (required for Create)',
    } as N),
    dueDate: forOp({
      displayName: 'Due Date',
      name: 'taskDueDate',
      type: 'string',
      default: '',
      description: 'Due date (string, typically ISO 8601)',
    } as N),
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
    } as N),
  },
} as const

const fields = {
  location: [
    // ----- get
    fl.global.apiKey('location', 'locationGet'),
    fl.location.id('location', 'locationGet'),
    fl.global.outputFormat('location', 'locationGet'),
  ],
  phoneNumber: [
    // ----- getAll
    fl.global.apiKey('phoneNumber', 'phoneNumberGetAll'),
    fl.location.id('phoneNumber', 'phoneNumberGetAll'),
    fl.global.outputFormat('phoneNumber', 'phoneNumberGetAll'),
  ],
  pipeline: [
    // ----- getAll
    fl.global.apiKey('pipeline', 'pipelineGetAll'),
    fl.location.id('pipeline', 'pipelineGetAll'),
    fl.global.outputFormat('pipeline', 'pipelineGetAll'),
  ],
  customField: [
    // ----- getAll
    fl.global.apiKey('customField', 'customFieldGetAll'),
    fl.location.id('customField', 'customFieldGetAll'),
    fl.customFields.model('customField', 'customFieldGetAll'),
    fl.global.outputFormat('customField', 'customFieldGetAll'),
  ],
  note: [
    // ----- getAll
    fl.global.apiKey('note', 'noteGetAll'),
    fl.contact.id('note', 'noteGetAll'),
    fl.global.outputFormat('note', 'noteGetAll'),
    // ----- create
    fl.global.apiKey('note', 'noteCreate'),
    fl.contact.id('note', 'noteCreate'),
    fl.global.message('note', 'noteCreate'),
    fl.global.userId('note', 'noteCreate'),
    fl.global.outputFormat('note', 'noteCreate'),
    // ----- get
    fl.global.apiKey('note', 'noteGet'),
    fl.contact.id('note', 'noteGet'),
    fl.note.id('note', 'noteGet'),
    fl.global.outputFormat('note', 'noteGet'),
    // ----- update
    fl.global.apiKey('note', 'noteUpdate'),
    fl.contact.id('note', 'noteUpdate'),
    fl.note.id('note', 'noteUpdate'),
    fl.global.message('note', 'noteUpdate'),
    fl.global.userId('note', 'noteUpdate'),
    fl.global.outputFormat('note', 'noteUpdate'),
    // ----- delete
    fl.global.apiKey('note', 'noteDelete'),
    fl.contact.id('note', 'noteDelete'),
    fl.note.id('note', 'noteDelete'),
    fl.global.outputFormat('note', 'noteDelete'),
  ],
}

export { fields }