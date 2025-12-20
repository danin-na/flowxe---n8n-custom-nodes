import type { INodeProperties } from "n8n-workflow"
const resourceOptions: Array<{ name: string; value: string }> = []

// ----------------------------------------------------------------------
// 01. Hepers
// ----------------------------------------------------------------------

type Option = {
  name: string
  description: string
}
type Action = {
  method: "GET" | "POST" | "PUT" | "DELETE"
  url: string
  body?: string
  qs?: Record<string, string>
}
type Output = {
  name: string
  extract: string
  sanitizedFull?: string
  simpleTemplate: string
}
type Operation = {
  option: Option
  action: Action
  output: Output
  fields: INodeProperties[]
}
function toTitleCase(str: string)
{
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\s+/g, " ")
    .trim()
}
function toSafeCamelCase(str: string)
{
  return str
    .trim()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, "")
    .replace(/^(.)/, (c) => c.toLowerCase())
}
function createResource(): INodeProperties
{
  return {
    displayName: "Resource",
    name: "resource",
    type: "options",
    noDataExpression: true,
    options: resourceOptions,
    default: "contact",
  }
}
function createOperation(name: string, definitions: Operation[])
{
  resourceOptions.push({
    name: toTitleCase(name),
    value: name,
  })

  // 01 - create operation
  const operation: INodeProperties = {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: { show: { resource: [name] } },
    default: "",
    options: definitions.map(({ option: opt, action: act, output: out }) =>
    {
      // 02 - create option
      return {
        name: toTitleCase(name + " . " + opt.name),
        action: toTitleCase(name + " . " + opt.name),
        value: toSafeCamelCase(name + " " + opt.name),
        description: opt.description,
        // 03 - create action
        routing: {
          request: {
            method: act.method,
            url: act.url,
            ...(act.qs && { qs: act.qs }),
            ...(act.body && { body: act.body }),
          },
          output: {
            // 04 - create output
            postReceive: [{
              type: "set", properties: {
                value: `={{(() => {
                            const mode = $parameter.f_common_responseFormat
                            const body = $response.body
                            const data = $response.body.${out.extract} ?? {}
                            if(mode === 'raw') return { body };
                            if(mode === 'full') return { ${out.name}: data }
                            if(mode === 'simple') return { ${out.name}: ${out.simpleTemplate} }
                          })()}}` }
            }]
          }
        }
      }
    })
  }

  // create fields
  const fields = definitions.flatMap(def =>
    def.fields.map((field) => ({
      ...field,
      displayOptions: {
        show: {
          resource: [name],
          operation: [toSafeCamelCase(name + " " + def.option.name)],
        },
      },
    }))
  )

  return { operation, fields }
}
// ----------------------------------------------------------------------
// 02. FIELDS
// ----------------------------------------------------------------------

const field = {
  common: {
    apiKey: {
      displayName: "API Keys",
      name: "f_common_apiKey",
      type: "string",
      default: "",
      required: true,
      typeOptions: { password: true },
      description: "Highlevel Private Integration Token",
    } as INodeProperties,
    responseFormat: {
      displayName: "Response Format",
      name: "f_common_responseFormat",
      type: "options",
      noDataExpression: true,
      default: "simple",
      description: "Format / Template of the response from this node",
      options: [
        { name: "Raw", value: "raw" },
        { name: "Full", value: "full" },
        { name: "Simple", value: "simple" },
      ],
    } as INodeProperties,
  },
  contact: {
    id: {
      displayName: "Contact ID",
      name: "f_contact_id",
      type: "string",
      default: "",
      description: "Highlevel Contact ID",
    } as INodeProperties,
    updateFields: {
      displayName: "Update Fields",
      name: "f_contact_updateFields",
      type: "collection",
      placeholder: "Add Field",
      default: {},
      options: [
        {
          displayName: "First Name",
          name: "firstName",
          type: "string",
          default: "",
          routing: { send: { type: "body", property: "firstName" } },
        },
        {
          displayName: "Last Name",
          name: "lastName",
          type: "string",
          default: "",
          routing: { send: { type: "body", property: "lastName" } },
        },
        {
          displayName: "Full Name",
          name: "name",
          type: "string",
          default: "",
          routing: { send: { type: "body", property: "fullName" } },
        },
        {
          displayName: "Email",
          name: "email",
          type: "string",
          placeholder: "name@email.com",
          default: "",
          routing: { send: { type: "body", property: "email" } },
        },
        {
          displayName: "Phone",
          name: "phone",
          type: "string",
          default: "",
          routing: { send: { type: "body", property: "phone" } },
        },
        {
          displayName: "Address 1",
          name: "address1",
          type: "string",
          default: "",
          routing: { send: { type: "body", property: "address1" } },
        },
        {
          displayName: "City",
          name: "city",
          type: "string",
          default: "",
          routing: { send: { type: "body", property: "city" } },
        },
        {
          displayName: "State",
          name: "state",
          type: "string",
          default: "",
          routing: { send: { type: "body", property: "state" } },
        },
        {
          displayName: "Postal Code",
          name: "postalCode",
          type: "string",
          default: "",
          routing: { send: { type: "body", property: "postalCode" } },
        },
        {
          displayName: "Country",
          name: "country",
          type: "string",
          default: "",
          routing: { send: { type: "body", property: "country" } },
        },
        {
          displayName: "Timezone",
          name: "timezone",
          type: "string",
          default: "",
          routing: { send: { type: "body", property: "timezone" } },
        },
        {
          displayName: "Website",
          name: "website",
          type: "string",
          default: "",
          routing: { send: { type: "body", property: "website" } },
        },
        {
          displayName: "Source",
          name: "source",
          type: "string",
          default: "",
          routing: { send: { type: "body", property: "source" } },
        },
        {
          displayName: "Date of Birth",
          name: "dateOfBirth",
          type: "dateTime",
          default: "",
          description: "The birth date of the contact. Supported formats: YYYY/MM/DD, MM/DD/YYYY, YYYY-MM-DD, MM-DD-YYYY, YYYY.MM.DD, MM.DD.YYYY, YYYY_MM_DD, MM_DD_YYYY",
          routing: { send: { type: "body", property: "dateOfBirth" } },
        },
        {
          displayName: "Assigned To",
          name: "assignedTo",
          type: "string",
          default: "",
          description: "The user ID to whom the contact is assigned",
          routing: { send: { type: "body", property: "assignedTo" } },
        },
        {
          displayName: "Custom Fields",
          name: "f_contact_customFields",
          type: "json",
          default: "={{ [ \n{ \n\t id : YOUR_ID, \n\t field_value : YOUR_VALUE \n}, \n] }}",
          description: "Array of objects: [{ id: 'CUSTOM_FIELD_ID', value: '...' }]. You can use expressions here.",
          routing: {
            send: { type: "body", property: "customFields", },
          },
        },
      ],
      description: "Fields to update on the contact",
    } as INodeProperties,
  },
  location: {
    id: {
      displayName: "Location ID",
      name: "f_location_id",
      type: "string",
      default: "",
      description: "Highlevel Location / Sub-account ID",
    } as INodeProperties,
  },
  customField: {
    mode: {
      displayName: "Custom Field Mode",
      name: "f_customField_mode",
      type: "options",
      default: "all",
      options: [
        { name: "All", value: "all" },
        { name: "Contact", value: "contact" },
        { name: "Opportunity", value: "opportunity" },
      ],
      description: "Model of the custom field you want to retrieve",
    } as INodeProperties,
  },
  tag: {
    id: {
      displayName: "Tag ID",
      name: "f_tag_id",
      type: "string",
      default: "",
      required: true,
      description: "HighLevel Tag ID",
    } as INodeProperties,
    name: {
      displayName: "Name",
      name: "f_tag_name",
      type: "string",
      default: "",
      required: true,
      description: "HighLevel Tag Name",
      routing: { send: { type: "body", property: "name" } },
    } as INodeProperties,
    tags: {
      displayName: "Tags",
      name: "f_tag_tags",
      type: "json",
      default: "={{ ['TagOne','TagTwo'] }}",
      placeholder: "new customer, ready to buy, vip-member",
      description: "Array of tags to add/remove, comma-separated",
      routing: { send: { type: "body", property: "tags" } },
    } as INodeProperties,
  },
  note: {
    id: {
      displayName: "Note ID",
      name: "f_note_id",
      type: "string",
      default: "",
      description: "HighLevel Note ID",
    } as INodeProperties,
    body: {
      displayName: "Body",
      name: "f_note_body",
      type: "string",
      default: "",
      required: true,
      description: "The content/body of the note",
      routing: { send: { type: "body", property: "body" } },
    } as INodeProperties,
  },
  task: {
    id: {
      displayName: "Task ID",
      name: "f_task_id",
      type: "string",
      default: "",
      required: true,
      description: "The ID of the task",
    } as INodeProperties,
    updateFields: {
      displayName: "Task Fields",
      name: "f_task_updateFields",
      type: "collection",
      placeholder: "Add Field",
      default: {},
      options: [
        {
          displayName: "Title",
          name: "title",
          type: "string",
          default: "",
          description: "The title of the task",
          routing: { send: { type: "body", property: "title" } },
        },
        {
          displayName: "Body",
          name: "body",
          type: "string",
          default: "",
          description: "The description/body of the task",
          routing: { send: { type: "body", property: "body" } },
        },
        {
          displayName: "Due Date",
          name: "dueDate",
          type: "dateTime",
          default: "",
          description: "The due date of the task. Format: ISO 8601",
          routing: { send: { type: "body", property: "dueDate" } },
        },
        {
          displayName: "Assigned To",
          name: "assignedTo",
          type: "string",
          default: "",
          description: "The ID of the user the task is assigned to",
          routing: { send: { type: "body", property: "assignedTo" } },
        },
        {
          displayName: "Completed",
          name: "completed",
          type: "boolean",
          default: false,
          description: "Whether the task is completed",
          routing: { send: { type: "body", property: "completed" } },
        },
      ],
      description: "Fields to update on the task",
    } as INodeProperties,
  },
}

// ----------------------------------------------------------------------
// 03. EXPORTS
// ----------------------------------------------------------------------

export const data = {
  resource: createResource(),
  contact: createOperation("contact", [
    { // contact.get
      option: {
        name: "get",
        description: "Get a Contact by contactId",
      },
      action: {
        method: "GET",
        url: "=/contacts/{{$parameter.f_contact_id}}",
      },
      output: {
        name: "contact",
        extract: "contact",
        simpleTemplate: `({
          id          : data.id ?? null,
          firstName   : data.firstName ?? null,
          lastName    : data.lastName ?? null,
          email       : data.email ?? null,
          phone       : data.phone ?? null,
          customFields: data.customFields ?? [],
      })`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.contact.id,
      ],
    },
    { // contact.update
      option: {
        name: "update",
        description: "Update a Contact by contactId",
      },
      action: {
        method: "PUT",
        url: "=/contacts/{{$parameter.f_contact_id}}",
      },
      output: {
        name: "contact",
        extract: "contact",
        simpleTemplate: `({
          id          : data.id ?? null,
          firstName   : data.firstName ?? null,
          lastName    : data.lastName ?? null,
          email       : data.email ?? null,
          phone       : data.phone ?? null,
          customFields: data.customFields ?? [],
      })`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.contact.id,
        field.contact.updateFields,
      ],
    },
  ]),
  location: createOperation("location", [
    {// location.get
      option: {
        name: "get",
        description: "Get a Location by locationId",
      },
      action: {
        method: "GET",
        url: "=/locations/{{$parameter.f_location_id}}",
      },
      output: {
        name: "location",
        extract: "location",
        simpleTemplate: `({
          id        : data.id ?? null,
          name      : data.name ?? null,
      })`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.location.id,
      ],
    },
  ]),
  phone: createOperation("phone", [
    {// phone.getMany
      option: {
        name: "get many",
        description: "Get many Phone Numbers by locationId",
      },
      action: {
        method: "GET",
        url: "=/phone-system/numbers/location/{{$parameter.f_location_id}}",
      },
      output: {
        name: "phone",
        extract: "numbers",
        simpleTemplate: `data.map((item) => ({
          id          : item.sid ?? null,
          phoneNumber : item.phoneNumber ?? null,
          name        : item.friendlyName ?? null,
      }))`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.location.id,
      ],
    },
  ]),
  pipeline: createOperation("pipeline", [
    {// pipeline.getMany
      option: {
        name: "get many",
        description: "Get many Pipelines by locationId",
      },
      action: {
        method: "GET",
        url: "/opportunities/pipelines",
        qs: {
          locationId: "={{$parameter.f_location_id}}",
        },
      },
      output: {
        name: "pipeline",
        extract: "pipelines",
        simpleTemplate: `data.map((item) => ({
          id: item.id ?? null,
          name: item.name ?? null,
          stages: (item.stages ?? []).map((s) => ({
            id: s.id ?? null,
            name: s.name ?? null,
          })),
      }))`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.location.id,
      ],
    },
  ]),
  customField: createOperation("customField", [
    { // customField.getMany
      option: {
        name: "get many",
        description: "Get many Custom Fields by locationId",
      },
      action: {
        method: "GET",
        url: "=/locations/{{$parameter.f_location_id}}/customFields",
        qs: {
          model: "={{$parameter.f_customField_mode}}",
        },
      },
      output: {
        name: "customField",
        extract: "customFields",
        simpleTemplate: `data.map((item) => ({
          id          : item.id ?? null,
          name        : item.name ?? null,
          fieldKey    : item.fieldKey ?? null,
          model       : item.model ?? null,
      }))`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.location.id,
        field.customField.mode,
      ],
    },
  ]),
  tag: createOperation("tag", [
    { // tag.add
      option: {
        name: "add",
        description: "Add Tag(s) by contactId",
      },
      action: {
        method: "POST",
        url: "=/contacts/{{$parameter.f_contact_id}}/tags",
      },
      output: {
        name: "tag",
        extract: "tags",
        simpleTemplate: `data`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.contact.id,
        field.tag.tags,
      ],
    },
    { // tag.remove
      option: {
        name: "remove",
        description: "Remove Tag(s) by contactId",
      },
      action: {
        method: "DELETE",
        url: "=/contacts/{{$parameter.f_contact_id}}/tags",
      },
      output: {
        name: "tag",
        extract: "tags",
        simpleTemplate: `data`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.contact.id,
        field.tag.tags,
      ],
    },
    { // tag.get
      option: {
        name: "get",
        description: "Get a Tag by locationId and tagId",
      },
      action: {
        method: "GET",
        url: "=/locations/{{$parameter.f_location_id}}/tags/{{$parameter.f_tag_id}}",
      },
      output: {
        name: "tag",
        extract: "tag",
        simpleTemplate: `data`
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.location.id,
        field.tag.id,
      ],
    },
    { // tag.getMany
      option: {
        name: "get many",
        description: "Get many Tags by locationId",
      },
      action: {
        method: "GET",
        url: "=/locations/{{$parameter.f_location_id}}/tags",
      },
      output: {
        name: "tag",
        extract: "tags",
        simpleTemplate: `data`
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.location.id,
      ],
    },
    { // tag.create
      option: {
        name: "create",
        description: "Create a Tag by locationId",
      },
      action: {
        method: "POST",
        url: "=/locations/{{$parameter.f_location_id}}/tags",
      },
      output: {
        name: "tag",
        extract: "tag",
        simpleTemplate: `data`
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.location.id,
        field.tag.name,
      ],
    },
    { // tag.update
      option: {
        name: "update",
        description: "Update a Tag by locationId and tagId",
      },
      action: {
        method: "PUT",
        url: "=/locations/{{$parameter.f_location_id}}/tags/{{$parameter.f_tag_id}}",
      },
      output: {
        name: "tag",
        extract: "tag",
        simpleTemplate: `data`
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.location.id,
        field.tag.id,
        field.tag.name,
      ],
    },
    { // tag.delete
      option: {
        name: "delete",
        description: "Delete a Tag by locationId and tagId",
      },
      action: {
        method: "DELETE",
        url: "=/locations/{{$parameter.f_location_id}}/tags/{{$parameter.f_tag_id}}",
      },
      output: {
        name: "success",
        extract: "succeded",
        simpleTemplate: `data`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.location.id,
        field.tag.id,
      ],
    },
  ]),
  note: createOperation("note", [
    { // note.get
      option: {
        name: "get",
        description: "Get a Note by noteId",
      },
      action: {
        method: "GET",
        url: "=/contacts/{{$parameter.f_contact_id}}/notes/{{$parameter.f_note_id}}",
      },
      output: {
        name: "note",
        extract: "note",
        simpleTemplate: `({
          id    : data.id ?? null,
          body  : data.bodyText ?? null,
      })`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.contact.id,
        field.note.id,
      ],
    },
    { // note.getMany
      option: {
        name: "get many",
        description: "Get many Notes by contactId",
      },
      action: {
        method: "GET",
        url: "=/contacts/{{$parameter.f_contact_id}}/notes",
      },
      output: {
        name: "note",
        extract: "notes",
        simpleTemplate: `data.map((item) => ({
          id          : item.id ?? null,
          body        : item.bodyText ?? null,
      }))`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.contact.id,
      ],
    },
    { // note.create
      option: {
        name: "create",
        description: "Create a Note by contactId",
      },
      action: {
        method: "POST",
        url: "=/contacts/{{$parameter.f_contact_id}}/notes",
      },
      output: {
        name: "note",
        extract: "note",
        simpleTemplate: `({
          id    : data.id ?? null,
          body  : data.bodyText ?? null,
      })`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.contact.id,
        field.note.body,
      ],
    },
    { // note.update
      option: {
        name: "update",
        description: "Update a Note by contactId and noteId",
      },
      action: {
        method: "PUT",
        url: "=/contacts/{{$parameter.f_contact_id}}/notes/{{$parameter.f_note_id}}",
      },
      output: {
        name: "note",
        extract: "note",
        simpleTemplate: `({
          id    : data.id ?? null,
          body  : data.bodyText ?? null,
      })`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.contact.id,
        field.note.id,
        field.note.body,
      ],
    },
    { // note.delete
      option: {
        name: "delete",
        description: "Delete a Note by contactId and noteId",
      },
      action: {
        method: "DELETE",
        url: "=/contacts/{{$parameter.f_contact_id}}/notes/{{$parameter.f_note_id}}",
      },
      output: {
        name: "success",
        extract: "succeded",
        simpleTemplate: `data`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.contact.id,
        field.note.id,
      ],
    },
  ]),
  task: createOperation("task", [
    { // task.get
      option: {
        name: "get",
        description: "Get a Task by taskId",
      },
      action: {
        method: "GET",
        url: "=/contacts/{{$parameter.f_contact_id}}/tasks/{{$parameter.f_task_id}}",
      },
      output: {
        name: "task",
        extract: "task",
        simpleTemplate: `data`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.contact.id,
        field.task.id,
      ],
    },
    { // task.getMany
      option: {
        name: "get many",
        description: "Get many Tasks by contactId",
      },
      action: {
        method: "GET",
        url: "=/contacts/{{$parameter.f_contact_id}}/tasks",
      },
      output: {
        name: "task",
        extract: "tasks",
        simpleTemplate: `data`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.contact.id,
      ],
    },
    { // task.create
      option: {
        name: "create",
        description: "Create a Task by contactId",
      },
      action: {
        method: "POST",
        url: "=/contacts/{{$parameter.f_contact_id}}/tasks",
      },
      output: {
        name: "task",
        extract: "task",
        simpleTemplate: `data`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.contact.id,
        field.task.updateFields,
      ],
    },
    { // task.update
      option: {
        name: "update",
        description: "Update a Task by contactId and taskId",
      },
      action: {
        method: "PUT",
        url: "=/contacts/{{$parameter.f_contact_id}}/tasks/{{$parameter.f_task_id}}",
      },
      output: {
        name: "task",
        extract: "task",
        simpleTemplate: `data`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.contact.id,
        field.task.id,
        field.task.updateFields,
      ],
    },
    { // task.delete
      option: {
        name: "delete",
        description: "Delete a Task by taskId",
      },
      action: {
        method: "DELETE",
        url: "=/contacts/{{$parameter.f_contact_id}}/tasks/{{$parameter.f_task_id}}",
      },
      output: {
        name: "success",
        extract: "succeded",
        simpleTemplate: `data`,
      },
      fields: [
        field.common.responseFormat,
        field.common.apiKey,
        field.contact.id,
        field.task.id,
      ],
    },
  ]),
}