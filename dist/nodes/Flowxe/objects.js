"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const resourceOptions = [];
function toTitleCase(str) {
    return str
        .replace(/([A-Z])/g, " $1")
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .replace(/\s+/g, " ")
        .trim();
}
function toSafeCamelCase(str) {
    return str
        .trim()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
        .replace(/[^a-zA-Z0-9]/g, "")
        .replace(/^(.)/, (c) => c.toLowerCase());
}
function createResource() {
    return {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: resourceOptions,
        default: "contact",
    };
}
function createOperation(name, definitions) {
    resourceOptions.push({
        name: toTitleCase(name),
        value: name,
    });
    const operation = {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: { show: { resource: [name] } },
        default: "",
        options: definitions.map(({ option: opt, action: act, output: out }) => {
            return {
                name: toTitleCase(name + " . " + opt.name),
                action: toTitleCase(name + " . " + opt.name),
                value: toSafeCamelCase(name + " " + opt.name),
                description: opt.description,
                routing: {
                    request: {
                        method: act.method,
                        url: act.url,
                        ...(act.qs && { qs: act.qs }),
                        ...(act.body && { body: act.body }),
                    },
                    output: {
                        postReceive: [{
                                type: "set", properties: {
                                    value: `={{(() => {
                            const mode = $parameter.f_common_responseFormat
                            const body = $response.body
                            const data = $response.body.${out.extract} ?? {}
                            if(mode === 'raw') return { body };
                            if(mode === 'full') return { ${out.name}: data }
                            if(mode === 'simple') return { ${out.name}: ${out.simpleTemplate} }
                          })()}}`
                                }
                            }]
                    }
                }
            };
        })
    };
    const fields = definitions.flatMap(def => def.fields.map((field) => ({
        ...field,
        displayOptions: {
            show: {
                resource: [name],
                operation: [toSafeCamelCase(name + " " + def.option.name)],
            },
        },
    })));
    return { operation, fields };
}
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
        },
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
        },
    },
    contact: {
        id: {
            displayName: "Contact ID",
            name: "f_contact_id",
            type: "string",
            default: "",
            description: "Highlevel Contact ID",
        },
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
        },
    },
    location: {
        id: {
            displayName: "Location ID",
            name: "f_location_id",
            type: "string",
            default: "",
            description: "Highlevel Location / Sub-account ID",
        },
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
        },
    },
    tag: {
        id: {
            displayName: "Tag ID",
            name: "f_tag_id",
            type: "string",
            default: "",
            required: true,
            description: "HighLevel Tag ID",
        },
        name: {
            displayName: "Name",
            name: "f_tag_name",
            type: "string",
            default: "",
            required: true,
            description: "HighLevel Tag Name",
            routing: { send: { type: "body", property: "name" } },
        },
        tags: {
            displayName: "Tags",
            name: "f_tag_tags",
            type: "json",
            default: "={{ ['TagOne','TagTwo'] }}",
            placeholder: "new customer, ready to buy, vip-member",
            description: "Array of tags to add/remove, comma-separated",
            routing: { send: { type: "body", property: "tags" } },
        },
    },
    note: {
        id: {
            displayName: "Note ID",
            name: "f_note_id",
            type: "string",
            default: "",
            description: "HighLevel Note ID",
        },
        body: {
            displayName: "Body",
            name: "f_note_body",
            type: "string",
            default: "",
            required: true,
            description: "The content/body of the note",
            routing: { send: { type: "body", property: "body" } },
        },
    },
    task: {
        id: {
            displayName: "Task ID",
            name: "f_task_id",
            type: "string",
            default: "",
            required: true,
            description: "The ID of the task",
        },
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
        },
    },
    conversation: {
        id: {
            displayName: "Conversation ID",
            name: "f_conversation_id",
            type: "string",
            default: "",
            required: true,
            description: "The ID of the conversation",
        },
        updateFields: {
            displayName: "Conversation Fields",
            name: "f_conversation_updateFields",
            type: "collection",
            placeholder: "Add Field",
            default: {},
            options: [
                {
                    displayName: "Starred",
                    name: "starred",
                    type: "boolean",
                    default: false,
                    description: "Whether the conversation is starred",
                    routing: { send: { type: "body", property: "starred" } },
                },
                {
                    displayName: "Unread Count",
                    name: "unreadCount",
                    type: "number",
                    default: 0,
                    description: "The number of unread messages in the conversation",
                    routing: { send: { type: "body", property: "unreadCount" } },
                },
            ],
            description: "Fields to update on the conversation",
        },
    },
    message: {
        type: {
            displayName: "DM Type",
            name: "f_message_type",
            type: "options",
            options: [
                {
                    name: "WhatsApp",
                    value: "WhatsApp",
                },
                {
                    name: "Instagram",
                    value: "IG",
                },
                {
                    name: "Facebook",
                    value: "FB",
                },
                {
                    name: "Custom",
                    value: "Custom",
                },
                {
                    name: "Live Chat",
                    value: "Live_Chat",
                },
                {
                    name: "Internal Comment",
                    value: "Internal_Comment",
                },
            ],
            default: "Live_Chat",
            description: "The type of the message",
            routing: { send: { type: "body", property: "type" } },
        },
        message: {
            displayName: "Message",
            name: "f_message_message",
            type: "string",
            default: "",
            required: true,
            description: "The body text of the message to send",
            routing: { send: { type: "body", property: "message" } },
        },
        fromNumber: {
            displayName: "From Number",
            name: "f_message_fromNumber",
            type: "string",
            default: "",
            description: "The number/ID to send the message from",
            routing: { send: { type: "body", property: "fromNumber" } },
        },
        toNumber: {
            displayName: "To Number",
            name: "f_message_toNumber",
            type: "string",
            default: "",
            description: "The number to send the message to",
            routing: { send: { type: "body", property: "toNumber" } },
        },
        extraFields: {
            displayName: "DM Extra Fields",
            name: "f_message_dm_extraFields",
            type: "collection",
            placeholder: "Add Field",
            default: {},
            options: [
                {
                    displayName: "Attachments",
                    name: "f_message_attachments",
                    type: "json",
                    default: "={{ ['URL_TO_FILE1', 'URL_TO_FILE2'] }}",
                    description: "The attachments to send with the message",
                    routing: { send: { type: "body", property: "attachments" } },
                },
            ],
            description: "Fields to update on the conversation",
        },
        limit: {
            displayName: "Limit",
            name: "f_message_limit",
            type: "number",
            default: 20,
            description: "Number of messages to be fetched from the conversation. Default limit is 20",
            routing: { send: { type: "query", property: "limit" } },
        },
        filterType: {
            displayName: "Message Type Filter",
            name: "f_message_filterType",
            type: "string",
            default: "",
            description: "Types of messages to fetch separated with comma (e.g. TYPE_SMS,TYPE_CALL). Possible values: TYPE_CALL, TYPE_SMS, TYPE_EMAIL, TYPE_FACEBOOK, TYPE_GMB, TYPE_INSTAGRAM, TYPE_WHATSAPP, TYPE_ACTIVITY_APPOINTMENT, TYPE_ACTIVITY_CONTACT, TYPE_ACTIVITY_INVOICE, TYPE_ACTIVITY_PAYMENT, TYPE_ACTIVITY_OPPORTUNITY, TYPE_LIVE_CHAT, TYPE_INTERNAL_COMMENTS, TYPE_ACTIVITY_EMPLOYEE_ACTION_LOG",
            routing: { send: { type: "query", property: "type" } },
        },
    },
    opportunity: {
        id: {
            displayName: "Opportunity ID",
            name: "f_opportunity_id",
            type: "string",
            default: "",
            required: true,
            description: "The HighLevel Opportunity ID",
        },
        name: {
            displayName: "Name",
            name: "f_opportunity_name",
            type: "string",
            default: "",
            required: true,
            description: "The name of the opportunity",
            routing: { send: { type: "body", property: "name" } },
        },
        pipelineId: {
            displayName: "Pipeline ID",
            name: "f_opportunity_pipelineId",
            type: "string",
            default: "",
            required: true,
            description: " The ID of the pipeline",
            routing: { send: { type: "body", property: "pipelineId" } },
        },
        pipelineStageId: {
            displayName: "Stage ID",
            name: "f_opportunity_pipelineStageId",
            type: "string",
            default: "",
            description: "The ID of the stage in the pipeline",
            routing: { send: { type: "body", property: "pipelineStageId" } },
        },
        status: {
            displayName: "Status",
            name: "f_opportunity_status",
            type: "options",
            default: "open",
            options: [
                { name: "Open", value: "open" },
                { name: "Won", value: "won" },
                { name: "Lost", value: "lost" },
                { name: "Abandoned", value: "abandoned" },
            ],
            description: "The status of the opportunity",
            routing: { send: { type: "body", property: "status" } },
        },
        createFields: {
            displayName: "Create Fields",
            name: "f_opportunity_createFields",
            type: "collection",
            placeholder: "Add Field",
            default: {},
            options: [
                {
                    displayName: "Assigned To",
                    name: "f_opportunity_assignedTo",
                    type: "string",
                    default: "",
                    description: "The ID of the user assigned to the opportunity",
                    routing: { send: { type: "body", property: "assignedTo" } },
                },
                {
                    displayName: "Monetary Value",
                    name: "f_opportunity_monetaryValue",
                    type: "number",
                    default: 0,
                    description: "The monetary value of the opportunity",
                    routing: { send: { type: "body", property: "monetaryValue" } },
                },
                {
                    displayName: "Custom Fields",
                    name: "f_opportunity_customFields",
                    type: "json",
                    default: "={{ [ \n{ \n\t id : YOUR_ID, \n\t field_value : YOUR_VALUE \n}, \n] }}",
                    description: "Array of objects: [{ id: 'CUSTOM_FIELD_ID', value: '...' }]. You can use expressions here.",
                    routing: {
                        send: { type: "body", property: "customFields", },
                    },
                },
            ],
            description: "Fields to create on the opportunity",
        },
        updateFields: {
            displayName: "Update Fields",
            name: "f_opportunity_updateFields",
            type: "collection",
            placeholder: "Add Field",
            default: {},
            options: [
                {
                    displayName: "Name",
                    name: "name",
                    type: "string",
                    default: "",
                    routing: { send: { type: "body", property: "name" } },
                },
                {
                    displayName: "Pipeline ID",
                    name: "pipelineId",
                    type: "string",
                    default: "",
                    routing: { send: { type: "body", property: "pipelineId" } },
                },
                {
                    displayName: "Stage ID",
                    name: "pipelineStageId",
                    type: "string",
                    default: "",
                    routing: { send: { type: "body", property: "pipelineStageId" } },
                },
                {
                    displayName: "Status",
                    name: "status",
                    type: "options",
                    default: "open",
                    options: [
                        { name: "Open", value: "open" },
                        { name: "Won", value: "won" },
                        { name: "Lost", value: "lost" },
                        { name: "Abandoned", value: "abandoned" },
                    ],
                    routing: { send: { type: "body", property: "status" } },
                },
                {
                    displayName: "Monetary Value",
                    name: "monetaryValue",
                    type: "number",
                    default: 0,
                    routing: { send: { type: "body", property: "monetaryValue" } },
                },
                {
                    displayName: "Assigned To",
                    name: "assignedTo",
                    type: "string",
                    default: "",
                    routing: { send: { type: "body", property: "assignedTo" } },
                },
                {
                    displayName: "Contact ID",
                    name: "contactId",
                    type: "string",
                    default: "",
                    routing: { send: { type: "body", property: "contactId" } },
                },
                {
                    displayName: "Custom Fields",
                    name: "customFields",
                    type: "json",
                    default: "={{ [ \n{ \n\t id : 'YOUR_ID', \n\t field_value : 'YOUR_VALUE' \n}, \n] }}",
                    description: "Array of objects: [{ id: 'CUSTOM_FIELD_ID', field_value: '...' }]",
                    routing: { send: { type: "body", property: "customFields", }, },
                },
            ],
            description: "Fields to update on the opportunity",
        },
    },
};
exports.data = {
    resource: createResource(),
    contact: createOperation("contact", [
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
    conversation: createOperation("conversation", [
        {
            option: {
                name: "search",
                description: "Search Conversations by contactId and locationId",
            },
            action: {
                method: "GET",
                url: "=/conversations/search",
                qs: {
                    locationId: "={{$parameter.f_location_id}}",
                    contactId: "={{$parameter.f_contact_id}}",
                },
            },
            output: {
                name: "conversation",
                extract: "conversations",
                simpleTemplate: `data.map((item) => ({
          id: item.id ?? null,
          contactId: item.contactId ?? null,
          locationId: item.locationId ?? null,
          lastMessageBody: item.lastMessageBody ?? null,
          lastMessageType: item.lastMessageType ?? null,
          fullName: item.fullName ?? null,
      }))`,
            },
            fields: [
                field.common.responseFormat,
                field.common.apiKey,
                field.location.id,
                field.contact.id,
            ],
        },
        {
            option: {
                name: "get",
                description: "Get a Conversation by conversationId",
            },
            action: {
                method: "GET",
                url: "=/conversations/{{$parameter.f_conversation_id}}",
            },
            output: {
                name: "conversation",
                extract: "conversation",
                simpleTemplate: `data`,
            },
            fields: [
                field.common.responseFormat,
                field.common.apiKey,
                field.conversation.id,
            ],
        },
        {
            option: {
                name: "create",
                description: "Create a Conversation by contactId and locationId",
            },
            action: {
                method: "POST",
                url: "=/conversations/",
            },
            output: {
                name: "conversation",
                extract: "conversation",
                simpleTemplate: `data`,
            },
            fields: [
                field.common.responseFormat,
                field.common.apiKey,
                { ...field.location.id, routing: { send: { type: "body", property: "locationId" } }, },
                { ...field.contact.id, routing: { send: { type: "body", property: "contactId" } }, },
            ],
        },
        {
            option: {
                name: "update",
                description: "Update a Conversation by conversationId",
            },
            action: {
                method: "PUT",
                url: "=/conversations/{{$parameter.f_conversation_id}}",
            },
            output: {
                name: "conversation",
                extract: "conversation",
                simpleTemplate: `data`,
            },
            fields: [
                field.common.responseFormat,
                field.common.apiKey,
                field.conversation.id,
                { ...field.location.id, routing: { send: { type: "body", property: "locationId" } }, },
                field.conversation.updateFields,
            ],
        },
        {
            option: {
                name: "delete",
                description: "Delete a Conversation by conversationId",
            },
            action: {
                method: "DELETE",
                url: "=/conversations/{{$parameter.f_conversation_id}}",
            },
            output: {
                name: "success",
                extract: "success",
                simpleTemplate: `data`,
            },
            fields: [
                field.common.responseFormat,
                field.common.apiKey,
                field.conversation.id,
            ],
        },
    ]),
    message: createOperation("message", [
        {
            option: {
                name: "send dm",
                description: "Send a Direct Message by contactId",
            },
            action: {
                method: "POST",
                url: "=/conversations/messages",
            },
            output: {
                name: "message",
                extract: "messageId",
                simpleTemplate: `data`,
            },
            fields: [
                { ...field.common.responseFormat, required: true },
                { ...field.common.apiKey, required: true },
                { ...field.contact.id, routing: { send: { type: "body", property: "contactId" } }, required: true },
                { ...field.message.type, required: true },
                { ...field.message.message, required: true },
                field.message.extraFields
            ],
        },
        {
            option: {
                name: "send sms",
                description: "Send an SMS Message by contactId",
            },
            action: {
                method: "POST",
                url: "=/conversations/messages",
                body: { type: "SMS", },
            },
            output: {
                name: "message",
                extract: "messageId",
                simpleTemplate: `data`,
            },
            fields: [
                { ...field.common.responseFormat, required: true },
                { ...field.common.apiKey, required: true },
                { ...field.contact.id, routing: { send: { type: "body", property: "contactId" } }, required: true },
                { ...field.message.message, required: true },
                { ...field.message.fromNumber, required: true },
                { ...field.message.toNumber, required: true },
                field.message.extraFields
            ],
        },
        {
            option: {
                name: "get many",
                description: "Get many Messages by conversationId",
            },
            action: {
                method: "GET",
                url: "=/conversations/{{$parameter.f_conversation_id}}/messages",
            },
            output: {
                name: "messages",
                extract: "messages.messages",
                simpleTemplate: `data.map((item) => ({
          id: item.id ?? null,
          messageType: item.messageType ?? null,
          body: item.body ?? null,
          direction: item.direction ?? null,
          status: item.status ?? null,
          dateAdded: item.dateAdded ?? null,
          from: item.from ?? null,
          to: item.to ?? null,
      }))`,
            },
            fields: [
                field.common.responseFormat,
                field.common.apiKey,
                field.conversation.id,
                field.message.limit,
                field.message.filterType,
            ],
        },
    ]),
    opportunity: createOperation("opportunity", [
        {
            option: {
                name: "get",
                description: "Get an Opportunity by opportunityId",
            },
            action: {
                method: "GET",
                url: "=/opportunities/{{$parameter.f_opportunity_id}}",
            },
            output: {
                name: "opportunity",
                extract: "opportunity",
                simpleTemplate: `({
          id: data.id ?? null,
          name: data.name ?? null,
          monetaryValue: data.monetaryValue ?? null,
          pipelineId: data.pipelineId ?? null,
          pipelineStageId: data.pipelineStageId ?? null,
          assignedTo: data.assignedTo ?? null,
          status: data.status ?? null,
          customFields: data.customFields ?? null,
      })`,
            },
            fields: [
                field.common.responseFormat,
                field.common.apiKey,
                field.opportunity.id,
            ],
        },
        {
            option: {
                name: "search",
                description: "Search Opportunities by locationId and contactId",
            },
            action: {
                method: "GET",
                url: "=/opportunities/search",
                qs: {
                    location_id: "={{$parameter.f_location_id}}",
                    contact_id: "={{$parameter.f_contact_id}}",
                },
            },
            output: {
                name: "opportunity",
                extract: "opportunities",
                simpleTemplate: `data.map((item) => ({
          id: item.id ?? null,
          name: item.name ?? null,
          monetaryValue: item.monetaryValue ?? null,
          pipelineId: item.pipelineId ?? null,
          pipelineStageId: item.pipelineStageId ?? null,
          assignedTo: item.assignedTo ?? null,
          status: item.status ?? null,
          customFields: item.customFields ?? null,
      }))`,
            },
            fields: [
                field.common.responseFormat,
                field.common.apiKey,
                field.location.id,
                field.contact.id,
            ],
        },
        {
            option: {
                name: "create",
                description: "Create an Opportunity",
            },
            action: {
                method: "POST",
                url: "=/opportunities/",
            },
            output: {
                name: "opportunity",
                extract: "opportunity",
                simpleTemplate: `({
          id: data.id ?? null,
          name: data.name ?? null,
          monetaryValue: data.monetaryValue ?? null,
          pipelineId: data.pipelineId ?? null,
          pipelineStageId: data.pipelineStageId ?? null,
          assignedTo: data.assignedTo ?? null,
          status: data.status ?? null,
          customFields: data.customFields ?? null,
      })`,
            },
            fields: [
                field.common.responseFormat,
                field.common.apiKey,
                { ...field.location.id, required: true, routing: { send: { type: "body", property: "locationId" } } },
                { ...field.contact.id, required: true, routing: { send: { type: "body", property: "contactId" } } },
                { ...field.opportunity.pipelineId, required: true },
                { ...field.opportunity.pipelineStageId, required: true },
                { ...field.opportunity.name, required: true },
                { ...field.opportunity.status, required: true },
                field.opportunity.createFields,
            ],
        },
        {
            option: {
                name: "update",
                description: "Update an Opportunity by opportunityId",
            },
            action: {
                method: "PUT",
                url: "=/opportunities/{{$parameter.f_opportunity_id}}",
            },
            output: {
                name: "opportunity",
                extract: "opportunity",
                simpleTemplate: `({
          id: data.id ?? null,
          name: data.name ?? null,
          monetaryValue: data.monetaryValue ?? null,
          pipelineId: data.pipelineId ?? null,
          pipelineStageId: data.pipelineStageId ?? null,
          assignedTo: data.assignedTo ?? null,
          status: data.status ?? null,
          customFields: data.customFields ?? null,
      })`,
            },
            fields: [
                field.common.responseFormat,
                field.common.apiKey,
                field.opportunity.id,
                field.opportunity.updateFields,
            ],
        },
        {
            option: {
                name: "delete",
                description: "Delete an Opportunity by opportunityId",
            },
            action: {
                method: "DELETE",
                url: "=/opportunities/{{$parameter.f_opportunity_id}}",
            },
            output: {
                name: "success",
                extract: "success",
                simpleTemplate: `data`,
            },
            fields: [
                field.common.responseFormat,
                field.common.apiKey,
                field.opportunity.id,
            ],
        },
    ]),
};
//# sourceMappingURL=objects.js.map