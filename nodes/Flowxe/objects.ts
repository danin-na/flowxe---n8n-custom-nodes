import type { INodeProperties } from "n8n-workflow"

const field = {
  common: {
    apiKey: {
      displayName: "API Keys",
      name: "f_common_apiKey",
      type: "string",
      default: "",
      required: true,
      typeOptions: { password: true },
      description: "Private Integration Token (Authorization: Bearer ...)",
    } as INodeProperties,
    responseFormat: {
      displayName: "Response Format",
      name: "f_common_responseFormat",
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
      name: "f_location_id",
      type: "string",
      default: "",
      required: true,
      description: "The ID of the location",
    } as INodeProperties,
  },
  customField: {
    mode: {
      displayName: "Custom Field Type",
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
  contact: {
    id: {
      displayName: "Contact ID",
      name: "f_contact_id",
      type: "string",
      default: "",
      required: true,
      description: "The ID of the contact",
    } as INodeProperties,
    updateFields: {
      displayName: "Update Fields",
      name: "f_contact_updateFields",
      type: "collection",
      placeholder: "Add Field",
      default: {},
      // eslint-disable-next-line n8n-nodes-base/node-param-collection-type-unsorted-items
      options: [
        {
          displayName: "First Name",
          name: "firstName",
          type: "string",
          default: "",
        },
        {
          displayName: "Last Name",
          name: "lastName",
          type: "string",
          default: "",
        },
        {
          displayName: "Full Name",
          name: "name",
          type: "string",
          default: "",
        },
        {
          displayName: "Email",
          name: "email",
          type: "string",
          placeholder: "name@email.com",
          default: "",
        },
        {
          displayName: "Phone",
          name: "phone",
          type: "string",
          default: "",
        },
        {
          displayName: "Company Name",
          name: "companyName",
          type: "string",
          default: "",
        },
        {
          displayName: "Address 1",
          name: "address1",
          type: "string",
          default: "",
        },
        {
          displayName: "City",
          name: "city",
          type: "string",
          default: "",
        },
        {
          displayName: "State",
          name: "state",
          type: "string",
          default: "",
        },
        {
          displayName: "Postal Code",
          name: "postalCode",
          type: "string",
          default: "",
        },
        {
          displayName: "Country",
          name: "country",
          type: "string",
          default: "",
        },
        {
          displayName: "Timezone",
          name: "timezone",
          type: "string",
          default: "",
        },
        {
          displayName: "Website",
          name: "website",
          type: "string",
          default: "",
        },
        {
          displayName: "Source",
          name: "source",
          type: "string",
          default: "",
        },
        {
          displayName: "Date of Birth",
          name: "dateOfBirth",
          type: "string",
          default: "",
          description: "Format: YYYY-MM-DD",
        },
        {
          displayName: "Gender",
          name: "gender",
          type: "string",
          default: "",
        },
        {
          displayName: "DND",
          name: "dnd",
          type: "boolean",
          default: false,
        },
        {
          displayName: "Assigned To",
          name: "assignedTo",
          type: "string",
          default: "",
          description: "The user ID to whom the contact is assigned",
        },
        {
          displayName: "Custom Fields",
          name: "customFields",
          type: "fixedCollection",
          placeholder: "Add Custom Field",
          default: {},
          typeOptions: {
            multipleValues: true,
          },
          options: [
            {
              name: "customFieldValues",
              displayName: "Custom Field",
              values: [
                {
                  displayName: "Field ID",
                  name: "id",
                  type: "string",
                  default: "",
                  description: "The unique ID of the custom field",
                },
                {
                  displayName: "Value",
                  name: "value",
                  type: "string",
                  default: "",
                  description: "The value to set for the custom field",
                },
              ],
            },
          ],
        },
      ],
      description: "Fields to update on the contact",
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
    title: {
      displayName: "Title",
      name: "f_task_title",
      type: "string",
      default: "",
      required: true,
      description: "The title of the task",
    } as INodeProperties,
    body: {
      displayName: "Body",
      name: "f_task_body",
      type: "string",
      default: "",
      description: "The description of the task",
    } as INodeProperties,
    dueDate: {
      displayName: "Due Date",
      name: "f_task_dueDate",
      type: "dateTime",
      default: "",
      required: true,
      description: "The due date of the task. Format: ISO 8601.",
    } as INodeProperties,
    assignedTo: {
      displayName: "Assigned To",
      name: "f_task_assignedTo",
      type: "string",
      default: "",
      description: "The ID of the user the task is assigned to",
    } as INodeProperties,
    completed: {
      displayName: "Completed",
      name: "f_task_completed",
      type: "boolean",
      default: false,
      description: "Whether the task is completed",
    } as INodeProperties,
    updateFields: {
      displayName: "Update Fields",
      name: "f_task_updateFields",
      type: "collection",
      placeholder: "Add Field",
      default: {},
      options: [
        {
          displayName: "Assigned To",
          name: "assignedTo",
          type: "string",
          default: "",
        },
        {
          displayName: "Body",
          name: "body",
          type: "string",
          default: "",
        },
        {
          displayName: "Completed",
          name: "completed",
          type: "boolean",
          default: false,
        },
        {
          displayName: "Due Date",
          name: "dueDate",
          type: "string",
          default: "",
          description: "Format: ISO 8601",
        },
        {
          displayName: "Title",
          name: "title",
          type: "string",
          default: "",
        },
      ],
    } as INodeProperties,
  },
  tag: {
    id: {
      displayName: "Tag ID",
      name: "f_tag_id",
      type: "string",
      default: "",
      required: true,
      description: "The ID of the tag",
    } as INodeProperties,
    name: {
      displayName: "Name",
      name: "f_tag_name",
      type: "string",
      default: "",
      required: true,
      description: "The name of the tag",
    } as INodeProperties,
    tags: {
      displayName: "Tags",
      name: "f_tag_tags",
      type: "string",
      default: "",
      placeholder: "new customer, ready to buy, vip-member",
      required: true,
      description: "Tags to add/remove, comma-separated",
    } as INodeProperties,
  },
}

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
  name: string
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
                            const mode = $parameter.f_common_responseFormat
                            const body = $response.body
                            const data = $response.body.${out.extract} ?? {}
                            if(mode === 'raw') return { rawResponse:body };
                            if(mode === 'sanitizedFull') return { ${out.name}: ${out.sanitizedFull} }
                            if(mode === 'sanitizedSimple') return { ${out.name}: ${out.sanitizedSimple} }
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
      value: "get",
      description: "Get a location by locationId",
    },
    action: {
      method: "GET",
      url: "=/locations/{{$parameter.f_location_id}}",
    },
    output: {
      name: "location",
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
export const pipeline = createOperation("pipeline", [
  {// pipeline.GetMany
    option: {
      name: "Get Many",
      value: "getMany",
      description: "Get Many pipelines for a location",
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
      sanitizedFull: `data.map((item) => ({
          id: item.id ?? null,
          name: item.name ?? null,
          stages: item.stages ?? [],
          showInFunnel: item.showInFunnel ?? null,
          showInChart: item.showInChart ?? null,
      }))`,
      sanitizedSimple: `data.map((item) => ({
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
])
export const phoneNumber = createOperation("phoneNumber", [
  { // phoneNumber.GetMany
    option: {
      name: "Get Many",
      value: "getMany",
      description: "Get Many phone numbers for a location",
    },
    action: {
      method: "GET",
      url: "=/phone-system/numbers/location/{{$parameter.f_location_id}}",
    },
    output: {
      name: "phoneNumber",
      extract: "numbers",
      sanitizedFull: `data.map((item) => ({
          id          : item.sid ?? null,
          phoneNumber : item.phoneNumber ?? null,
          name        : item.friendlyName ?? null,
          type        : item.type ?? null,
          country : item.countryCode ?? null,
          isDefault   : item.isDefaultNumber ?? null,
          capabilities : item.capabilities ?? [],
      }))`,
      sanitizedSimple: `data.map((item) => ({
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
])
export const customField = createOperation("customField", [
  { // customField.GetMany
    option: {
      name: "Get Many",
      value: "getMany",
      description: "Get Many custom fields for a location",
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
      sanitizedFull: `data.map((item) => ({
          id          : item.id ?? null,
          name        : item.name ?? null,
          fieldKey    : item.fieldKey ?? null,
          dataType    : item.dataType ?? null,
          placeholder : item.placeholder ?? null,
          locationId  : item.locationId ?? null,
          model       : item.model ?? null,
          position    : item.position ?? null,
          documentType: item.documentType ?? null,
          parentId    : item.parentId ?? null,
          dateAdded   : item.dateAdded   ?? null,
          standard    : item.standard    ?? null,
      }))`,
      sanitizedSimple: `data.map((item) => ({
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
])
export const contact = createOperation("contact", [
  { // contact.Get
    option: {
      name: "Get",
      value: "get",
      description: "Get a contact by contactId",
    },
    action: {
      method: "GET",
      url: "=/contacts/{{$parameter.f_contact_id}}",
    },
    output: {
      name: "contact",
      extract: "contact",
      sanitizedFull: `({
          id          : data.id ?? null,
          locationId  : data.locationId ?? null,
          firstName   : data.firstName ?? null,
          lastName    : data.lastName ?? null,
          email       : data.email ?? null,
          phone       : data.phone ?? null,
          type        : data.type ?? null,
          source      : data.source ?? null,
          dateAdded   : data.dateAdded ?? null,
          dateUpdated : data.dateUpdated ?? null,
          tags        : data.tags ?? [],
          customFields: data.customFields ?? [],
          address1    : data.address1 ?? null,
          city        : data.city ?? null,
          state       : data.state ?? null,
          country     : data.country ?? null,
          postalCode  : data.postalCode ?? null,
          timezone    : data.timezone ?? null,
          companyName : data.companyName ?? null,
      })`,
      sanitizedSimple: `({
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
  { // contact.Update
    option: {
      name: "Update",
      value: "update",
      description: "Update a contact by contactId",
    },
    action: {
      method: "PUT",
      url: "=/contacts/{{$parameter.f_contact_id}}",
      body: `={{(() => {
          const body = { ...$parameter.f_contact_updateFields };
          if (body.customFields && body.customFields.customFieldValues) {
            body.customFields = body.customFields.customFieldValues.map((cf) => ({
              ...cf,
              value: cf.value === "" ? null : cf.value,
            }));
          }
          Object.keys(body).forEach((key) => {
            if (key !== "customFields" && body[key] === "") {
              body[key] = null;
            }
          });
          return body;
      })()}}`,
    },
    output: {
      name: "contact",
      extract: "contact",
      sanitizedFull: `({
          id          : data.id ?? null,
          locationId  : data.locationId ?? null,
          firstName   : data.firstName ?? null,
          lastName    : data.lastName ?? null,
          email       : data.email ?? null,
          phone       : data.phone ?? null,
          type        : data.type ?? null,
          source      : data.source ?? null,
          dateAdded   : data.dateAdded ?? null,
          dateUpdated : data.dateUpdated ?? null,
          tags        : data.tags ?? [],
          customFields: data.customFields ?? [],
          address1    : data.address1 ?? null,
          city        : data.city ?? null,
          state       : data.state ?? null,
          country     : data.country ?? null,
          postalCode  : data.postalCode ?? null,
          timezone    : data.timezone ?? null,
          companyName : data.companyName ?? null,
      })`,
      sanitizedSimple: `({
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
])

export const tag = createOperation("tag", [
  { // tag.Add
    option: {
      name: "Add",
      value: "add",
      description: "Add tags to a contact",
    },
    action: {
      method: "POST",
      url: "=/contacts/{{$parameter.f_contact_id}}/tags",
      body: `={{ { tags: ($parameter.f_tag_tags || '').split(',').map(t => t.trim()).filter(t => !!t) } }}`,
    },
    output: {
      name: "tag",
      extract: "tags",
      sanitizedFull: `data`,
      sanitizedSimple: `data`,
    },
    fields: [
      field.common.responseFormat,
      field.common.apiKey,
      field.contact.id,
      field.tag.tags,
    ],
  },
  { // tag.Remove
    option: {
      name: "Remove",
      value: "remove",
      description: "Remove tags from a contact",
    },
    action: {
      method: "DELETE",
      url: "=/contacts/{{$parameter.f_contact_id}}/tags",
      body: `={{ { tags: ($parameter.f_tag_tags || '').split(',').map(t => t.trim()).filter(t => !!t) } }}`,
    },
    output: {
      name: "tag",
      extract: "tags",
      sanitizedFull: `data`,
      sanitizedSimple: `data`,
    },
    fields: [
      field.common.responseFormat,
      field.common.apiKey,
      field.contact.id,
      field.tag.tags,
    ],
  },
  { // tag.Get
    option: {
      name: "Get",
      value: "get",
      description: "Get a tag by tagId",
    },
    action: {
      method: "GET",
      url: "=/locations/{{$parameter.f_location_id}}/tags/{{$parameter.f_tag_id}}",
    },
    output: {
      name: "tag",
      extract: "tag",
      sanitizedFull: `({
          id          : data.id ?? null,
          name        : data.name ?? null,
          locationId  : data.locationId ?? null,
      })`,
      sanitizedSimple: `({
          id    : data.id ?? null,
          name  : data.name ?? null,
      })`,
    },
    fields: [
      field.common.responseFormat,
      field.common.apiKey,
      field.location.id,
      field.tag.id,
    ],
  },
  { // tag.GetMany
    option: {
      name: "Get Many",
      value: "getMany",
      description: "Get many tags for a location",
    },
    action: {
      method: "GET",
      url: "=/locations/{{$parameter.f_location_id}}/tags",
    },
    output: {
      name: "tag",
      extract: "tags",
      sanitizedFull: `data.map((item) => ({
          id          : item.id ?? null,
          name        : item.name ?? null,
          locationId  : item.locationId ?? null,
      }))`,
      sanitizedSimple: `data.map((item) => ({
          id          : item.id ?? null,
          name        : item.name ?? null,
      }))`,
    },
    fields: [
      field.common.responseFormat,
      field.common.apiKey,
      field.location.id,
    ],
  },
  { // tag.Create
    option: {
      name: "Create",
      value: "create",
      description: "Create a new tag for a location",
    },
    action: {
      method: "POST",
      url: "=/locations/{{$parameter.f_location_id}}/tags",
      body: `={{ { name: $parameter.f_tag_name } }}`,
    },
    output: {
      name: "tag",
      extract: "tag",
      sanitizedFull: `({
          id          : data.id ?? null,
          name        : data.name ?? null,
          locationId  : data.locationId ?? null,
      })`,
      sanitizedSimple: `({
          id    : data.id ?? null,
          name  : data.name ?? null,
      })`,
    },
    fields: [
      field.common.responseFormat,
      field.common.apiKey,
      field.location.id,
      field.tag.name,
    ],
  },
  { // tag.Update
    option: {
      name: "Update",
      value: "update",
      description: "Update a tag for a location",
    },
    action: {
      method: "PUT",
      url: "=/locations/{{$parameter.f_location_id}}/tags/{{$parameter.f_tag_id}}",
      body: `={{ { name: $parameter.f_tag_name } }}`,
    },
    output: {
      name: "tag",
      extract: "tag",
      sanitizedFull: `({
          id          : data.id ?? null,
          name        : data.name ?? null,
          locationId  : data.locationId ?? null,
      })`,
      sanitizedSimple: `({
          id    : data.id ?? null,
          name  : data.name ?? null,
      })`,
    },
    fields: [
      field.common.responseFormat,
      field.common.apiKey,
      field.location.id,
      field.tag.id,
      field.tag.name,
    ],
  },
  { // tag.Delete
    option: {
      name: "Delete",
      value: "delete",
      description: "Delete a tag for a location",
    },
    action: {
      method: "DELETE",
      url: "=/locations/{{$parameter.f_location_id}}/tags/{{$parameter.f_tag_id}}",
    },
    output: {
      name: "tag",
      extract: "",
      sanitizedFull: `data`,
      sanitizedSimple: `data`,
    },
    fields: [
      field.common.responseFormat,
      field.common.apiKey,
      field.location.id,
      field.tag.id,
    ],
  },
])

export const task = createOperation("task", [
  { // task.Get
    option: {
      name: "Get",
      value: "get",
      description: "Get a task by taskId",
    },
    action: {
      method: "GET",
      url: "=/contacts/{{$parameter.f_contact_id}}/tasks/{{$parameter.f_task_id}}",
    },
    output: {
      name: "task",
      extract: "task",
      sanitizedFull: `({
          id          : data.id ?? null,
          title       : data.title ?? null,
          body        : data.body ?? null,
          assignedTo  : data.assignedTo ?? null,
          dueDate     : data.dueDate ?? null,
          completed   : data.completed ?? null,
          contactId   : data.contactId ?? null,
      })`,
      sanitizedSimple: `({
          id    : data.id ?? null,
          title : data.title ?? null,
      })`,
    },
    fields: [
      field.common.responseFormat,
      field.common.apiKey,
      field.contact.id,
      field.task.id,
    ],
  },
  { // task.GetMany
    option: {
      name: "Get Many",
      value: "getMany",
      description: "Get many tasks for a contact",
    },
    action: {
      method: "GET",
      url: "=/contacts/{{$parameter.f_contact_id}}/tasks",
    },
    output: {
      name: "task",
      extract: "tasks",
      sanitizedFull: `data.map((item) => ({
          id          : item.id ?? null,
          title       : item.title ?? null,
          body        : item.body ?? null,
          assignedTo  : item.assignedTo ?? null,
          dueDate     : item.dueDate ?? null,
          completed   : item.completed ?? null,
          contactId   : item.contactId ?? null,
      }))`,
      sanitizedSimple: `data.map((item) => ({
          id          : item.id ?? null,
          title       : item.title ?? null,
          completed   : item.completed ?? null,
      }))`,
    },
    fields: [
      field.common.responseFormat,
      field.common.apiKey,
      field.contact.id,
    ],
  },
  { // task.Create
    option: {
      name: "Create",
      value: "create",
      description: "Create a new task for a contact",
    },
    action: {
      method: "POST",
      url: "=/contacts/{{$parameter.f_contact_id}}/tasks",
      body: `={{ {
        title: $parameter.f_task_title,
        body: $parameter.f_task_body || undefined,
        dueDate: $parameter.f_task_dueDate,
        completed: $parameter.f_task_completed,
        assignedTo: $parameter.f_task_assignedTo || undefined
      } }}`,
    },
    output: {
      name: "task",
      extract: "task",
      sanitizedFull: `({
          id          : data.id ?? null,
          title       : data.title ?? null,
          body        : data.body ?? null,
          assignedTo  : data.assignedTo ?? null,
          dueDate     : data.dueDate ?? null,
          completed   : data.completed ?? null,
          contactId   : data.contactId ?? null,
      })`,
      sanitizedSimple: `({
          id    : data.id ?? null,
          title : data.title ?? null,
          completed : data.completed ?? null,
      })`,
    },
    fields: [
      field.common.responseFormat,
      field.common.apiKey,
      field.contact.id,
      field.task.title,
      field.task.dueDate,
      field.task.completed,
      field.task.body,
      field.task.assignedTo,
    ],
  },
  { // task.Update
    option: {
      name: "Update",
      value: "update",
      description: "Update a task for a contact",
    },
    action: {
      method: "PUT",
      url: "=/contacts/{{$parameter.f_contact_id}}/tasks/{{$parameter.f_task_id}}",
      body: `={{(() => {
          const body = { ...$parameter.f_task_updateFields };
          Object.keys(body).forEach((key) => {
            if (body[key] === "") {
              body[key] = null;
            }
          });
          return body;
      })()}}`,
    },
    output: {
      name: "task",
      extract: "task",
      sanitizedFull: `({
          id          : data.id ?? null,
          title       : data.title ?? null,
          body        : data.body ?? null,
          assignedTo  : data.assignedTo ?? null,
          dueDate     : data.dueDate ?? null,
          completed   : data.completed ?? null,
          contactId   : data.contactId ?? null,
      })`,
      sanitizedSimple: `({
          id    : data.id ?? null,
          title : data.title ?? null,
          completed : data.completed ?? null,
      })`,
    },
    fields: [
      field.common.responseFormat,
      field.common.apiKey,
      field.contact.id,
      field.task.id,
      field.task.updateFields,
    ],
  },
  { // task.Delete
    option: {
      name: "Delete",
      value: "delete",
      description: "Delete a task by taskId",
    },
    action: {
      method: "DELETE",
      url: "=/contacts/{{$parameter.f_contact_id}}/tasks/{{$parameter.f_task_id}}",
    },
    output: {
      name: "task",
      extract: "",
      sanitizedFull: `data`,
      sanitizedSimple: `data`,
    },
    fields: [
      field.common.responseFormat,
      field.common.apiKey,
      field.contact.id,
      field.task.id,
    ],
  },
])