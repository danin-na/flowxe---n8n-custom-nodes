"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.resource = void 0;
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
        },
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
        },
    },
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
            field.common.responseFormat,
            field.common.apiKey,
            field.location.id,
        ],
    },
]);
//# sourceMappingURL=objects.js.map