"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.resource = void 0;
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
            },
        },
        date: {
            due: {
                displayName: "Due Date",
                name: "taskDueDate",
                type: "string",
                default: "",
                description: "Due date (string, typically ISO 8601)",
            },
        },
        content: {
            title: {
                displayName: "Title",
                name: "contentTitle",
                type: "string",
                default: "",
                description: "Assign title to the object",
            },
            message: {
                displayName: "Message Body",
                name: "contentMessage",
                type: "string",
                default: "",
                required: true,
                description: "Message body or content",
            },
        },
        input: {
            emptyStringAsNull: {
                displayName: "Pass Null To Clear Fields",
                name: "emptyStringAsNull",
                type: "boolean",
                default: false,
                description: "Whether to send empty string fields as null values to clear the fields from the record",
            },
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
            },
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
            },
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
            },
        },
        contact: {
            id: {
                displayName: "Contact ID",
                name: "contactId",
                type: "string",
                default: "",
                required: true,
                description: "The ID of the contact",
            },
            fields: {
                displayName: "Contact Fields",
                name: "contactFields",
                type: "collection",
                default: {},
                placeholder: "Add Field",
                description: "The fields to update for the contact",
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
            },
        },
        note: {
            id: {
                displayName: "Note ID",
                name: "noteId",
                type: "string",
                default: "",
                required: true,
                description: "The ID of the note",
            },
        },
        task: {
            id: {
                displayName: "Task ID",
                name: "taskId",
                type: "string",
                default: "",
                required: true,
                description: "The ID of the task",
            },
        },
        tag: {
            tags: {
                displayName: "Tags",
                name: "tagTags",
                type: "string",
                default: "",
                required: true,
                description: "Comma-separated tags (e.g. vip, lead, booked)",
            },
        },
        conversation: {
            id: {
                displayName: "Conversation ID",
                name: "conversationId",
                type: "string",
                default: "",
                required: true,
                description: "The ID of the conversation",
            },
        },
        user: {
            id: {
                displayName: "User ID",
                name: "userId",
                type: "string",
                default: "",
                description: "Assign this to a user with User ID",
            },
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
            },
        }
    }
};
function createResource() {
    return {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
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
    };
}
function createOperation(name, definitions) {
    const operation = {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: { show: { resource: [name] } },
        default: "",
        options: definitions.map(({ option: opt, action: act, output: out }) => {
            return {
                name: opt.name,
                value: opt.value,
                action: opt.name,
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
                            const mode = $parameter.outputFormat 
                            const body = $response.body
                            const data = $response.body.${out.extract} ?? {}

                            let res = {}
                            if(mode === 'raw') res = body
                            if(mode === 'sanitizedFull') res = (${out.sanitizedFull})
                            if(mode === 'sanitizedSimple') res = (${out.sanitizedSimple})

                            return { ${name}: res };
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
                operation: [def.option.value],
            },
        },
    })));
    return { operation, fields };
}
exports.resource = createResource();
exports.location = createOperation("location", [
    {
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
            f.cmn.auth.apiKey,
            f.obj.location.id,
            f.cmn.output.format
        ],
    },
]);
//# sourceMappingURL=objects.js.map