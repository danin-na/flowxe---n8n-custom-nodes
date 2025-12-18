import type { INodeProperties } from "n8n-workflow"

const field = {
  common: {
    apiKey: {
      displayName: "API Key",
      name: "field.common.auth.apiKey",
      type: "string",
      default: "",
      required: true,
      typeOptions: { password: true },
      description: "Private Integration Token (Authorization: Bearer ...)",
    } as INodeProperties,
    responseFormat: {
      displayName: "Response Format",
      name: "field.common.responseFormat",
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
  },
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
}

/*
const field = {
  common: {

    date: {
      due: {
        displayName: "Due Date",
        name: "field.common.date.due",
        type: "string",
        default: "",
        description: "Due date (string, typically ISO 8601)",
      } as n,
    },
    content: {
      title: {
        displayName: "Title",
        name: "field.common.content.title",
        type: "string",
        default: "",
        description: "Assign title to the object",
      } as n,
      message: {
        displayName: "Message Body",
        name: "field.common.content.message",
        type: "string",
        default: "",
        required: true,
        description: "Message body or content",
      } as n,
    },
    input: {
      emptyStringAsNull: {
        displayName: "Pass Null To Clear Fields",
        name: "field.common.input.emptyStringAsNull",
        type: "boolean",
        default: false,
        description: "Whether to send empty string fields as null values to clear the fields from the record",
      } as n,
    },

    status: {
      completed: {
        displayName: "Completed",
        name: "field.common.status.completed",
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
  object: {
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
*/

// ----------------------------------------------------------------------
// Hepers - Recourse and Operation + Type
// ----------------------------------------------------------------------

type Option = {
  name: string
  value: string
  description: string
}
type Action = {
  method: "GET" | "POST" | "PUT" | "DELETE"
  url: string
  body?: string
  qs?: Record<string, string>
}
type Output = {
  extract: string
  sanitizedFull: string
  sanitizedSimple: string
}
type Operation = {
  option: Option
  action: Action
  output: Output
  fields: INodeProperties[]
}
function createResource(): INodeProperties
{
  return {
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
}
function createOperation(name: string, definitions: Operation[])
{
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
        name: opt.name,
        value: opt.value,
        action: opt.name,
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
                            const mode = $parameter.outputFormat 
                            const body = $response.body
                            const data = $response.body.${out.extract} ?? {}

                            let res = {}
                            if(mode === 'raw') res = body
                            if(mode === 'sanitizedFull') res = (${out.sanitizedFull})
                            if(mode === 'sanitizedSimple') res = (${out.sanitizedSimple})

                            return { ${name}: res };
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
          operation: [def.option.value],
        },
      },
    }))
  )

  return { operation, fields }
}

// ----------------------------------------------------------------------
// 3. EXPORTS
// ----------------------------------------------------------------------

export const resource = createResource()
export const location = createOperation("location", [
  {// location.Get
    option: {
      name: "Get",
      value: "locationGet",
      description: "Get a location by locationId",
    },
    action: {
      method: "GET",
      url: "=/locations/{{$parameter.locationId}}",
    },
    output: {
      extract: "location",
      sanitizedFull: `({
          id        : data.id ?? null,
          name      : data.name ?? null,
          website   : data.website ?? null,
          timezone  : data.timezone ?? null,
          email     : data.email ?? null,
          phone     : data.phone ?? null,
          address: {
            line1   : data.address ?? null,
            city    : data.city ?? null,
            state   : data.state ?? null,
            zipCode : data.postalCode ?? null,
            country : data.country ?? null,
          },
      })`,
      sanitizedSimple: `({
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
])

/*
export const contact = createOperation("contact", [
  { // contact.Get
    option: {
      name: "Get",
      value: "contactGet",
      description: "Get a contact by contactId",
    },
    action: {
      method: "GET",
      url: "=/contacts/{{$parameter.contactId}}",
    },
    output: {
      extract: "contact",
      sanitizedFull: `({
          id        : data.id ?? null,
          firstName : data.firstName ?? null,
          lastName  : data.lastName ?? null,
          email     : data.email ?? null,
          phone     : data.phone ?? null,
          companyName: data.companyName ?? null,
          website   : data.website ?? null,
          timezone  : data.timezone ?? null,
          address: {
            line1   : data.address1 ?? null,
            line2   : data.address2 ?? null,
            city    : data.city ?? null,
            state   : data.state ?? null,
            postalCode : data.postalCode ?? null,
            country : data.country ?? null,
          },
          customFields: data.customFields ?? [],
      })`,
      sanitizedSimple: `({
          id        : data.id ?? null,
          firstName : data.firstName ?? null,
          lastName  : data.lastName ?? null,
          email     : data.email ?? null,
      })`,
    },
    fields: [
      field.common.apiKey,
      f.obj.contact.id,
      f.cmn.output.format,
    ],
  },
  { // contact.Update
    option: {
      name: "Update",
      value: "contactUpdate",
      description: "Update a contact (Empty strings clear the field)",
    },
    action: {
      method: "PUT",
      url: "=/contacts/{{$parameter.contactId}}",
      body: `={{(() => {
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
    },
    output: {
      extract: "contact",
      sanitizedFull: `({
          id        : data.id ?? null,
          firstName : data.firstName ?? null,
          lastName  : data.lastName ?? null,
          email     : data.email ?? null,
          phone     : data.phone ?? null,
          companyName: data.companyName ?? null,
          website   : data.website ?? null,
          timezone  : data.timezone ?? null,
          address: {
            line1   : data.address1 ?? null,
            line2   : data.address2 ?? null,
            city    : data.city ?? null,
            state   : data.state ?? null,
            postalCode : data.postalCode ?? null,
            country : data.country ?? null,
          },
          customFields: data.customFields ?? [],
      })`,
      sanitizedSimple: `({
          id        : data.id ?? null,
          firstName : data.firstName ?? null,
          lastName  : data.lastName ?? null,
          email     : data.email ?? null,
      })`,
    },
    fields: [
      field.common.apiKey,
      f.obj.contact.id,
      f.obj.contact.fields,
      f.cmn.output.format,
    ],
  },
])



export const phoneNumber = createOperation("phoneNumber", [
  {// phoneNumber.GetAll
    option: {
      name: "Get All",
      value: "phoneNumberGetAll",
      description: "Get all phone numbers by locationId",
    },
    action: {
      method: "GET",
      url: "=/phone-system/numbers/location/{{$parameter.locationId}}",
    },
    output: {
      extract: "data",
      sanitizedFull: `(Array.isArray(data) ? data.map(p => ({
          id        : p.id ?? null,
          name      : p.name ?? null,
          number    : p.phone ?? null,
          locationId: p.locationId ?? null,
      })) : [])`,
      sanitizedSimple: `(Array.isArray(data) ? data.map(p => ({
          id        : p.id ?? null,
          number    : p.phone ?? null,
      })) : [])`,
    },
    fields: [
      field.common.apiKey,
      f.obj.location.id,
      f.cmn.output.format
    ],
  },
])
export const pipeline = createOperation("pipeline", [
  {// pipeline.GetAll
    option: {
      name: "Get All",
      value: "pipelineGetAll",
      description: "Get all pipelines by locationId",
    },
    action: {
      method: "GET",
      url: "=/opportunities/pipelines",
      qs: { locationId: "={{$parameter.locationId}}" },
    },
    output: {
      extract: "pipelines",
      sanitizedFull: `(Array.isArray(data) ? data.map(p => ({
          id        : p.id ?? null,
          name      : p.name ?? null,
          stages    : (p.stages ?? []).map(s => ({
              id   : s.id ?? null,
              name : s.name ?? null,
          })),
      })) : [])`,
      sanitizedSimple: `(Array.isArray(data) ? data.map(p => ({
          id        : p.id ?? null,
          name      : p.name ?? null,
      })) : [])`,
    },
    fields: [
      field.common.apiKey,
      f.obj.location.id,
      f.cmn.output.format
    ],
  },
])
export const customField = createOperation("customField", [
  {// customField.GetAll  
    option: {
      name: "Get All",
      value: "customFieldGetAll",
      description: "Get All custom fields by locationId",
    },
    action: {
      method: "GET",
      url: "=/locations/{{$parameter.locationId}}/customFields",
      qs: { model: "={{$parameter.customFieldsModel}}" },
    },
    output: {
      extract: "customFields",
      sanitizedFull: `(Array.isArray(data) ? data.map(cf => ({
          id        : cf.id ?? null,
          name      : cf.name ?? null,
          fieldKey  : cf.fieldKey ?? null,
          dataType  : cf.dataType ?? null,
          model     : cf.model ?? null,
      })) : [])`,
      sanitizedSimple: `(Array.isArray(data) ? data.map(cf => ({
          id        : cf.id ?? null,
          name      : cf.name ?? null,
      })) : [])`,
    },
    fields: [
      field.common.apiKey,
      f.obj.location.id,
      f.obj.customField.model,
      f.cmn.output.format
    ],
  },
])

*/
