import type { INodeProperties, INodePropertyOptions } from "n8n-workflow"
import { helpers } from "./_helpers"

// ----------------------------------------------------------------------
// 1. Definitions
// ----------------------------------------------------------------------

const bodies = {
  note: `={{(() => {
    const body = { body: $parameter.message };
    const userId = $parameter.userId;
    if (userId !== undefined && userId !== '') body.userId = userId;
    return body;
  })()}}`,
  task: `={{(() => {
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
  tag: `={{(() => {
    const tags = ($parameter.tagTags ?? '')
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t !== '');
    return { tags };
  })()}}`,
}


// fields
// recource


const fieldDefs = {
  apiKey: {
    displayName: "API Key",
    name: "apiKey",
    type: "string",
    default: "",
    required: true,
    typeOptions: { password: true },
    description: "Private Integration Token (Authorization: Bearer ...)",
  } as INodeProperties,
  outputFormat: {
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
  } as INodeProperties,
  emptyStringAsNull: {
    displayName: "Pass Null To Clear Fields",
    name: "emptyStringAsNull",
    type: "boolean",
    default: false,
    description: "Whether to send empty string fields as null values to clear the fields from the record",
  } as INodeProperties,
  message: {
    displayName: "Message",
    name: "message",
    type: "string",
    default: "",
    required: true,
    description: "Message body or content",
  } as INodeProperties,
  userId: {
    displayName: "User ID",
    name: "userId",
    type: "string",
    default: "",
    description: "Assign this to a user with User ID",
  } as INodeProperties,
  title: {
    displayName: "Title",
    name: "title",
    type: "string",
    default: "",
    description: "Assign title to the object",
  } as INodeProperties,
  contactId: {
    displayName: "Contact ID",
    name: "contactId",
    type: "string",
    default: "",
    required: true,
    description: "The ID of the contact",
  } as INodeProperties,
  locationId: {
    displayName: "Location ID",
    name: "locationId",
    type: "string",
    default: "",
    required: true,
    description: "The ID of the location",
  } as INodeProperties,
  noteId: {
    displayName: "Note ID",
    name: "noteId",
    type: "string",
    default: "",
    required: true,
    description: "The ID of the note",
  } as INodeProperties,
  taskId: {
    displayName: "Task ID",
    name: "taskId",
    type: "string",
    default: "",
    required: true,
    description: "The ID of the task",
  } as INodeProperties,
  tags: {
    displayName: "Tags",
    name: "tagTags",
    type: "string",
    default: "",
    required: true,
    description: "Comma-separated tags (e.g. vip, lead, booked)",
  } as INodeProperties,
  taskDueDate: {
    displayName: "Due Date",
    name: "taskDueDate",
    type: "string",
    default: "",
    description: "Due date (string, typically ISO 8601)",
  } as INodeProperties,
  taskCompleted: {
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
  customFieldsModel: {
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
  contactFields: {
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
}

type FieldKey = keyof typeof fieldDefs

// ----------------------------------------------------------------------
// 2. RESOURCE BUILDER
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
    fields: FieldKey[]
  }[]
): INodeProperties[]
{
  // 1. Convert ActionConfigs to INodePropertyOptions (NodePropertyOptions)
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

  // 2. Create the Operation Selection Field
  const operationField: INodeProperties = {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: { show: { resource: [resourceName] } },
    default: "",
    options: n8nOperations,
  }

  // 3. Aggregate usage of fields across operations
  const fieldUsage = new Map<FieldKey, Set<string>>()

  for (const op of operations)
  {
    for (const fieldKey of op.fields)
    {
      if (!fieldUsage.has(fieldKey))
      {
        fieldUsage.set(fieldKey, new Set())
      }
      fieldUsage.get(fieldKey)!.add(op.action.value)
    }
  }

  // 4. Build the actual field objects
  const fieldObjects: INodeProperties[] = []

  for (const [fieldKey, operationSet] of fieldUsage.entries())
  {
    const baseField = fieldDefs[fieldKey]
    if (baseField)
    {
      fieldObjects.push({
        ...baseField,
        displayOptions: {
          ...(baseField.displayOptions ?? {}),
          show: {
            resource: [resourceName],
            operation: Array.from(operationSet),
          },
        },
      })
    }
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
  options: [
    { name: "Custom Field", value: "customField" },
    { name: "Location", value: "location" },
    { name: "Note", value: "note" },
    { name: "Phone Number", value: "phoneNumber" },
    { name: "Pipeline", value: "pipeline" },
    { name: "Tag", value: "tag" },
    { name: "Task", value: "task" },
  ],
  default: "location",
}
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
    fields: ["apiKey", "locationId", "outputFormat"],
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
    fields: ["apiKey", "locationId", "outputFormat"],
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
    fields: ["apiKey", "locationId", "outputFormat"],
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
    fields: ["apiKey", "locationId", "customFieldsModel", "outputFormat"],
  },
])
export const note = operation("note", [
  {// note.GetAll     
    action: {
      name: "Get All",
      value: "noteGetAll",
      description: "Get All notes for a contact by contactId",
      method: "GET",
      url: "=/contacts/{{$parameter.contactId}}/notes",
      outputHelper: helpers.output.note.getAll,
    },
    fields: ["apiKey", "contactId", "outputFormat"],
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
    fields: ["apiKey", "contactId", "message", "userId", "outputFormat"],
  },
  {// note.Get
    action: {
      name: "Get",
      value: "noteGet",
      description: "Get a note by contactId + noteId",
      method: "GET",
      url: "=/contacts/{{$parameter.contactId}}/notes/{{$parameter.noteId}}",
      outputHelper: helpers.output.note.get,
    },
    fields: ["apiKey", "contactId", "noteId", "outputFormat"],
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
    fields: ["apiKey", "contactId", "noteId", "message", "userId", "outputFormat"],
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
    fields: ["apiKey", "contactId", "noteId", "outputFormat"],
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
    fields: ["apiKey", "contactId", "tags", "outputFormat"],
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
    fields: ["apiKey", "contactId", "tags", "outputFormat"],
  },
])
export const task = operation("task", [
  {// task.GetAll
    action: {
      name: "Get All",
      value: "taskGetAll",
      description: "Get all tasks for a contact by contactId",
      method: "GET",
      url: "=/contacts/{{$parameter.contactId}}/tasks",
      outputHelper: helpers.output.task.getAll,
    },
    fields: ["apiKey", "contactId", "outputFormat"],
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
    fields: ["apiKey", "contactId", "title", "message", "taskDueDate", "taskCompleted", "userId", "outputFormat",],
  },
  {// task.Get
    action: {
      name: "Get",
      value: "taskGet",
      description: "Get a task by contactId + taskId",
      method: "GET",
      url: "=/contacts/{{$parameter.contactId}}/tasks/{{$parameter.taskId}}",
      outputHelper: helpers.output.task.get,
    },
    fields: ["apiKey", "contactId", "taskId", "outputFormat"],
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
    fields: ["apiKey", "contactId", "taskId", "title", "message", "taskDueDate", "taskCompleted", "userId", "outputFormat",],
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
    fields: ["apiKey", "contactId", "taskId", "outputFormat"],
  },
])

