import type { INodeProperties, INodePropertyOptions } from "n8n-workflow"
import { helpers } from "./_helpers"

// ----------------------------------------------------------------------
// 1. Definitions
// ----------------------------------------------------------------------

const bodies = {
  note: `={{(() => {
    const body = { body: $parameter.contentMessage };
    const userId = $parameter.userId;
    if (userId !== undefined && userId !== '') body.userId = userId;
    return body;
  })()}}`,
  task: `={{(() => {
    const body = {};
    const title = $parameter.contentTitle;
    const message = $parameter.contentMessage;
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
  tag: `={{(() => {
    const tags = ($parameter.tagTags ?? '')
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t !== '');
    return { tags };
  })()}}`,
  conversation: `={{(() => {
    const body = {};
    const locationId = $parameter.locationId;
    const contactId = $parameter.contactId;

    if (locationId !== undefined && locationId !== '') body.locationId = locationId;
    if (contactId !== undefined && contactId !== '') body.contactId = contactId;
    
    return body;
  })()}}`,
  contactUpdate: `={{(() => {
    const data = $parameter.contactFields;
    const body = {};

    // List of standard fields available in the contactFields collection
    const keys = [
      'firstName', 'lastName', 'email', 'phone', 'companyName', 
      'address1', 'address2', 'city', 'state', 'postalCode', 
      'country', 'website', 'timezone'
    ];

    // Iterate over keys. If defined in parameters:
    // Check if empty string -> send null (to clear). Otherwise send value.
    keys.forEach((key) => {
      if (data[key] !== undefined) {
        body[key] = data[key] === '' ? null : data[key];
      }
    });

    // Pass Custom Fields through if they exist
    if (data.customFields && data.customFields.customField) {
      body.customFields = data.customFields.customField;
    }

    return body;
  })()}}`,
}

type n = INodeProperties

const f = {
  cmn: {
    auth: {
      apiKey: {
        displayName: "API Key",
        name: "apiKey",
        type: "string",
        default: "",
        required: true,
        typeOptions: { password: true },
        description: "Private Integration Token (Authorization: Bearer ...)",
      } as n,
    },
    date: {
      due: {
        displayName: "Due Date",
        name: "taskDueDate",
        type: "string",
        default: "",
        description: "Due date (string, typically ISO 8601)",
      } as n,
    },
    content: {
      title: {
        displayName: "Title",
        name: "contentTitle",
        type: "string",
        default: "",
        description: "Assign title to the object",
      } as n,
      message: {
        displayName: "Message Body",
        name: "contentMessage",
        type: "string",
        default: "",
        required: true,
        description: "Message body or content",
      } as n,
    },
    input: {
      emptyStringAsNull: {
        displayName: "Pass Null To Clear Fields",
        name: "emptyStringAsNull",
        type: "boolean",
        default: false,
        description: "Whether to send empty string fields as null values to clear the fields from the record",
      } as n,
    },
    output: {
      format: {
        displayName: "Output Format",
        name: "outputFormat",
        type: "options",
        noDataExpression: true,
        default: "sanitizedSimple",
        description: "RAW returns the full API response. Sanitized returns a cleaned object output.",
        options: [
          { name: "Debug Mode (RAW)", value: "raw" },
          { name: "Sanitized Full", value: "sanitizedFull" },
          { name: "Sanitized Simple", value: "sanitizedSimple" },
        ],
      } as n,
    },
    status: {
      completed: {
        displayName: "Completed",
        name: "taskCompleted",
        type: "options",
        noDataExpression: true,
        default: "unset",
        description: "Set task completion status (Unset will not send the field)",
        options: [
          { name: "Unset", value: "unset" },
          { name: "True", value: "true" },
          { name: "False", value: "false" },
        ],
      } as INodeProperties,
    }
  },
  obj: {
    location: {
      id: {
        displayName: "Location ID",
        name: "locationId",
        type: "string",
        default: "",
        required: true,
        description: "The ID of the location",
      } as INodeProperties,
    },
    contact: {
      id: {
        displayName: "Contact ID",

        name: "contactId",
        type: "string",
        default: "",
        required: true,
        description: "The ID of the contact",
      } as INodeProperties,
      fields: {
        displayName: "Contact Fields",
        name: "contactFields",
        type: "collection",
        default: {},
        placeholder: "Add Field",
        description: "The fields to update for the contact",
        // eslint-disable-next-line n8n-nodes-base/node-param-collection-type-unsorted-items
        options: [
          { displayName: "First Name", name: "firstName", type: "string", default: "" },
          { displayName: "Last Name", name: "lastName", type: "string", default: "" },
          { displayName: "Email", name: "email", type: "string", default: "", placeholder: "" },
          { displayName: "Phone", name: "phone", type: "string", default: "" },
          { displayName: "Company Name", name: "companyName", type: "string", default: "" },
          { displayName: "Address Line 1", name: "address1", type: "string", default: "" },
          { displayName: "Address Line 2", name: "address2", type: "string", default: "" },
          { displayName: "City", name: "city", type: "string", default: "" },
          { displayName: "State", name: "state", type: "string", default: "" },
          { displayName: "Postal Code", name: "postalCode", type: "string", default: "" },
          { displayName: "Country", name: "country", type: "string", default: "" },
          { displayName: "Website", name: "website", type: "string", default: "" },
          { displayName: "Timezone", name: "timezone", type: "string", default: "" },
          {
            displayName: "Custom Fields",
            name: "customFields",
            type: "fixedCollection",
            default: {},
            typeOptions: { multipleValues: true },
            options: [
              {
                name: "customField",
                displayName: "Custom Field",
                values: [
                  { displayName: "Field ID", name: "id", type: "string", default: "", required: true },
                  { displayName: "Value", name: "value", type: "string", default: "" },
                ],
              },
            ],
          },
        ],
      } as INodeProperties,
    },
    note: {
      id: {
        displayName: "Note ID",
        name: "noteId",
        type: "string",
        default: "",
        required: true,
        description: "The ID of the note",
      } as INodeProperties,
    },
    task: {
      id: {
        displayName: "Task ID",
        name: "taskId",
        type: "string",
        default: "",
        required: true,
        description: "The ID of the task",
      } as INodeProperties,
    },
    tag: {
      tags: {
        displayName: "Tags",
        name: "tagTags",
        type: "string",
        default: "",
        required: true,
        description: "Comma-separated tags (e.g. vip, lead, booked)",
      } as INodeProperties,
    },
    conversation: {
      id: {
        displayName: "Conversation ID",
        name: "conversationId",
        type: "string",
        default: "",
        required: true,
        description: "The ID of the conversation",
      } as INodeProperties,
    },
    user: {
      id: {
        displayName: "User ID",
        name: "userId",
        type: "string",
        default: "",
        description: "Assign this to a user with User ID",
      } as INodeProperties,
    },
    customField: {
      model: {
        displayName: "Custom Fields Model",
        name: "customFieldsModel",
        type: "options",
        noDataExpression: true,
        default: "all",
        description: "The model to which the custom field belongs",
        options: [
          { name: "All", value: "all" },
          { name: "Contact", value: "contact" },
          { name: "Opportunity", value: "opportunity" },
        ],
      } as INodeProperties,
    }
  }
}

// ----------------------------------------------------------------------
// 2. RESOURCE BUILDER (Refactored)
// ----------------------------------------------------------------------

function operation(
  resourceName: string,
  operations: {
    action: {
      name: string
      value: string
      description: string
      method: "GET" | "POST" | "PUT" | "DELETE"
      url: string
      outputHelper: string
      body?: string
      qs?: Record<string, string>
    }
    // CHANGE: Now accepts the actual objects, not string keys
    fields: INodeProperties[]
  }[]
): INodeProperties[]
{
  const n8nOperations: INodePropertyOptions[] = operations.map((op) => ({
    name: op.action.name,
    value: op.action.value,
    action: op.action.name,
    description: op.action.description,
    routing: {
      request: {
        method: op.action.method,
        url: op.action.url,
        ...(op.action.qs && { qs: op.action.qs }),
        ...(op.action.body && { body: op.action.body }),
      },
      output: {
        postReceive: [{ type: "set", properties: { value: op.action.outputHelper } }],
      },
    },
  }))

  const operationField: INodeProperties = {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: { show: { resource: [resourceName] } },
    default: "",
    options: n8nOperations,
  }

  // Map stores the Actual Object -> List of Operations using it
  const fieldUsage = new Map<INodeProperties, Set<string>>()

  for (const op of operations)
  {
    for (const field of op.fields)
    {
      if (!fieldUsage.has(field))
      {
        fieldUsage.set(field, new Set())
      }
      fieldUsage.get(field)!.add(op.action.value)
    }
  }

  const fieldObjects: INodeProperties[] = []

  for (const [fieldRef, operationSet] of fieldUsage.entries())
  {
    fieldObjects.push({
      ...fieldRef, // Copy the definition
      displayOptions: {
        ...(fieldRef.displayOptions ?? {}),
        show: {
          resource: [resourceName],
          operation: Array.from(operationSet),
        },
      },
    })
  }

  return [operationField, ...fieldObjects]
}

// ----------------------------------------------------------------------
// 3. EXPORTS
// ----------------------------------------------------------------------

export const resource: INodeProperties = {
  displayName: "Resource",
  name: "resource",
  type: "options",
  noDataExpression: true,
  // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
  options: [
    { name: "Contact", value: "contact" },
    { name: "Location", value: "location" },
    { name: "Phone Number", value: "phoneNumber" },
    { name: "Custom Field", value: "customField" },
    { name: "Pipeline", value: "pipeline" },
    { name: "Tag", value: "tag" },
    { name: "Note", value: "note" },
    { name: "Task", value: "task" },
    { name: "Conversation", value: "conversation" },
  ],
  default: "contact",
}
export const contact = operation("contact", [
  {// contact.Get
    action: {
      name: "Get",
      value: "contactGet",
      description: "Get a contact by contactId",
      method: "GET",
      url: "=/contacts/{{$parameter.contactId}}",
      outputHelper: helpers.output.contact.get,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.contact.id,
      f.cmn.output.format
    ],
  },
  {// contact.Update
    action: {
      name: "Update",
      value: "contactUpdate",
      description: "Update a contact (Empty strings clear the field)",
      method: "PUT",
      url: "=/contacts/{{$parameter.contactId}}",
      body: bodies.contactUpdate,
      outputHelper: helpers.output.contact.update,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.contact.id,
      f.obj.contact.fields,
      f.cmn.output.format
    ],
  },
])
export const conversation = operation("conversation", [
  {// conversation.Delete
    action: {
      name: "Delete",
      value: "conversationDelete",
      description: "Delete a conversation by conversationId",
      method: "DELETE",
      url: "=/conversations/{{$parameter.conversationId}}",
      outputHelper: helpers.output.conversation.delete,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.conversation.id,
      f.cmn.output.format
    ],
  },
  {// conversation.Search
    action: {
      name: "Search",
      value: "conversationSearch",
      description: "Search for conversations (params in body)",
      method: "GET",
      url: "=/conversations/search",
      qs: {
        locationId: "={{$parameter.locationId}}",
        contactId: "={{$parameter.contactId}}",
      },
      body: bodies.conversation,
      outputHelper: helpers.output.conversation.search,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.location.id,
      f.obj.contact.id,
      f.cmn.output.format
    ],
  },
  {// conversation.Create
    action: {
      name: "Create",
      value: "conversationCreate",
      description: "Create a new conversation",
      method: "POST",
      url: "=/conversations/",
      body: bodies.conversation,
      outputHelper: helpers.output.conversation.create,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.location.id,
      f.obj.contact.id,
      f.cmn.output.format
    ],
  },
])
export const location = operation("location", [
  {// location.Get
    action: {
      name: "Get",
      value: "locationGet",
      description: "Get a location by locationId",
      method: "GET",
      url: "=/locations/{{$parameter.locationId}}",
      outputHelper: helpers.output.location.get,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.location.id,
      f.cmn.output.format
    ],
  },
])
export const phoneNumber = operation("phoneNumber", [
  {// phoneNumber.GetAll
    action: {
      name: "Get All",
      value: "phoneNumberGetAll",
      description: "Get all phone numbers by locationId",
      method: "GET",
      url: "=/phone-system/numbers/location/{{$parameter.locationId}}",
      outputHelper: helpers.output.phoneNumber.getAll,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.location.id,
      f.cmn.output.format
    ],
  },
])
export const pipeline = operation("pipeline", [
  {// pipeline.GetAll
    action: {
      name: "Get All",
      value: "pipelineGetAll",
      description: "Get all pipelines by locationId",
      method: "GET",
      url: "=/opportunities/pipelines?locationId={{$parameter.locationId}}",
      outputHelper: helpers.output.pipeline.getAll,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.location.id,
      f.cmn.output.format
    ],
  },
])
export const customField = operation("customField", [
  {// customField.GetAll  
    action: {
      name: "Get All",
      value: "customFieldGetAll",
      description: "Get All custom fields by locationId",
      method: "GET",
      url: "=/locations/{{$parameter.locationId}}/customFields",
      qs: { model: "={{$parameter.customFieldsModel}}" },
      outputHelper: helpers.output.customField.getAll,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.location.id,
      f.obj.customField.model,
      f.cmn.output.format
    ],
  },
])
export const tag = operation("tag", [
  {// tag.Add
    action: {
      name: "Add",
      value: "tagAdd",
      description: "Add tags to a contact by contactId",
      method: "POST",
      url: "=/contacts/{{$parameter.contactId}}/tags",
      body: bodies.tag,
      outputHelper: helpers.output.tag.add,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.contact.id,
      f.obj.tag.tags,
      f.cmn.output.format
    ],
  },
  {// tag.Remove
    action: {
      name: "Remove",
      value: "tagRemove",
      description: "Remove tags from a contact by contactId",
      method: "DELETE",
      url: "=/contacts/{{$parameter.contactId}}/tags",
      body: bodies.tag,
      outputHelper: helpers.output.tag.remove,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.contact.id,
      f.obj.tag.tags,
      f.cmn.output.format
    ],
  },
])
export const note = operation("note", [
  {// note.Get
    action: {
      name: "Get",
      value: "noteGet",
      description: "Get a note by contactId + noteId",
      method: "GET",
      url: "=/contacts/{{$parameter.contactId}}/notes/{{$parameter.noteId}}",
      outputHelper: helpers.output.note.get,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.contact.id,
      f.obj.note.id,
      f.cmn.output.format
    ],
  },
  {// note.GetAll     
    action: {
      name: "Get All",
      value: "noteGetAll",
      description: "Get All notes for a contact by contactId",
      method: "GET",
      url: "=/contacts/{{$parameter.contactId}}/notes",
      outputHelper: helpers.output.note.getAll,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.contact.id,
      f.cmn.output.format
    ],
  },
  {// note.Create 
    action: {
      name: "Create",
      value: "noteCreate",
      description: "Create a note for a contact by contactId",
      method: "POST",
      url: "=/contacts/{{$parameter.contactId}}/notes",
      body: bodies.note,
      outputHelper: helpers.output.note.create,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.contact.id,
      f.cmn.content.message,
      f.obj.user.id,
      f.cmn.output.format
    ],
  },
  {// note.Update
    action: {
      name: "Update",
      value: "noteUpdate",
      description: "Update a note by contactId + noteId",
      method: "PUT",
      url: "=/contacts/{{$parameter.contactId}}/notes/{{$parameter.noteId}}",
      body: bodies.note,
      outputHelper: helpers.output.note.update,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.contact.id,
      f.obj.note.id,
      f.cmn.content.message,
      f.obj.user.id,
      f.cmn.output.format
    ],
  },
  {// note.Delete
    action: {
      name: "Delete",
      value: "noteDelete",
      description: "Delete a note by contactId + noteId",
      method: "DELETE",
      url: "=/contacts/{{$parameter.contactId}}/notes/{{$parameter.noteId}}",
      outputHelper: helpers.output.note.delete,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.contact.id,
      f.obj.note.id,
      f.cmn.output.format
    ],
  },
])
export const task = operation("task", [
  {// task.Get
    action: {
      name: "Get",
      value: "taskGet",
      description: "Get a task by contactId + taskId",
      method: "GET",
      url: "=/contacts/{{$parameter.contactId}}/tasks/{{$parameter.taskId}}",
      outputHelper: helpers.output.task.get,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.contact.id,
      f.obj.task.id,
      f.cmn.output.format
    ],
  },
  {// task.GetAll
    action: {
      name: "Get All",
      value: "taskGetAll",
      description: "Get all tasks for a contact by contactId",
      method: "GET",
      url: "=/contacts/{{$parameter.contactId}}/tasks",
      outputHelper: helpers.output.task.getAll,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.contact.id,
      f.cmn.output.format
    ],
  },
  {// task.Create
    action: {
      name: "Create",
      value: "taskCreate",
      description: "Create a task for a contact by contactId",
      method: "POST",
      url: "=/contacts/{{$parameter.contactId}}/tasks",
      body: bodies.task,
      outputHelper: helpers.output.task.create,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.contact.id,
      f.cmn.content.title,
      f.cmn.content.message,
      f.cmn.date.due,
      f.cmn.status.completed,
      f.obj.user.id,
      f.cmn.output.format,
    ],
  },
  {// task.Update
    action: {
      name: "Update",
      value: "taskUpdate",
      description: "Update a task by contactId + taskId",
      method: "PUT",
      url: "=/contacts/{{$parameter.contactId}}/tasks/{{$parameter.taskId}}",
      body: bodies.task,
      outputHelper: helpers.output.task.update,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.contact.id,
      f.obj.task.id,
      f.cmn.content.title,
      f.cmn.content.message,
      f.cmn.date.due,
      f.cmn.status.completed,
      f.obj.user.id,
      f.cmn.output.format,
    ],
  },
  {// task.Delete
    action: {
      name: "Delete",
      value: "taskDelete",
      description: "Delete a task by contactId + taskId",
      method: "DELETE",
      url: "=/contacts/{{$parameter.contactId}}/tasks/{{$parameter.taskId}}",
      outputHelper: helpers.output.task.delete,
    },
    fields: [
      f.cmn.auth.apiKey,
      f.obj.contact.id,
      f.obj.task.id,
      f.cmn.output.format
    ],
  },
])

