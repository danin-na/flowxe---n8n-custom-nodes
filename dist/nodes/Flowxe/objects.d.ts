import type { INodeProperties } from "n8n-workflow";
export declare const data: {
    resource: INodeProperties;
    contact: {
        operation: INodeProperties;
        fields: {
            displayOptions: {
                show: {
                    resource: string[];
                    operation: string[];
                };
            };
            displayName: string;
            name: string;
            type: import("n8n-workflow").NodePropertyTypes;
            typeOptions?: import("n8n-workflow").INodePropertyTypeOptions;
            default: import("n8n-workflow").NodeParameterValueType;
            description?: string;
            hint?: string;
            disabledOptions?: import("n8n-workflow").IDisplayOptions;
            options?: Array<import("n8n-workflow").INodePropertyOptions | INodeProperties | import("n8n-workflow").INodePropertyCollection>;
            placeholder?: string;
            isNodeSetting?: boolean;
            noDataExpression?: boolean;
            required?: boolean;
            routing?: import("n8n-workflow").INodePropertyRouting;
            credentialTypes?: Array<"extends:oAuth2Api" | "extends:oAuth1Api" | "has:authenticate" | "has:genericAuth">;
            extractValue?: import("n8n-workflow").INodePropertyValueExtractor;
            modes?: import("n8n-workflow").INodePropertyMode[];
            requiresDataPath?: "single" | "multiple";
            doNotInherit?: boolean;
            validateType?: import("n8n-workflow").FieldType;
            ignoreValidationDuringExecution?: boolean;
            allowArbitraryValues?: boolean;
        }[];
    };
    location: {
        operation: INodeProperties;
        fields: {
            displayOptions: {
                show: {
                    resource: string[];
                    operation: string[];
                };
            };
            displayName: string;
            name: string;
            type: import("n8n-workflow").NodePropertyTypes;
            typeOptions?: import("n8n-workflow").INodePropertyTypeOptions;
            default: import("n8n-workflow").NodeParameterValueType;
            description?: string;
            hint?: string;
            disabledOptions?: import("n8n-workflow").IDisplayOptions;
            options?: Array<import("n8n-workflow").INodePropertyOptions | INodeProperties | import("n8n-workflow").INodePropertyCollection>;
            placeholder?: string;
            isNodeSetting?: boolean;
            noDataExpression?: boolean;
            required?: boolean;
            routing?: import("n8n-workflow").INodePropertyRouting;
            credentialTypes?: Array<"extends:oAuth2Api" | "extends:oAuth1Api" | "has:authenticate" | "has:genericAuth">;
            extractValue?: import("n8n-workflow").INodePropertyValueExtractor;
            modes?: import("n8n-workflow").INodePropertyMode[];
            requiresDataPath?: "single" | "multiple";
            doNotInherit?: boolean;
            validateType?: import("n8n-workflow").FieldType;
            ignoreValidationDuringExecution?: boolean;
            allowArbitraryValues?: boolean;
        }[];
    };
    phone: {
        operation: INodeProperties;
        fields: {
            displayOptions: {
                show: {
                    resource: string[];
                    operation: string[];
                };
            };
            displayName: string;
            name: string;
            type: import("n8n-workflow").NodePropertyTypes;
            typeOptions?: import("n8n-workflow").INodePropertyTypeOptions;
            default: import("n8n-workflow").NodeParameterValueType;
            description?: string;
            hint?: string;
            disabledOptions?: import("n8n-workflow").IDisplayOptions;
            options?: Array<import("n8n-workflow").INodePropertyOptions | INodeProperties | import("n8n-workflow").INodePropertyCollection>;
            placeholder?: string;
            isNodeSetting?: boolean;
            noDataExpression?: boolean;
            required?: boolean;
            routing?: import("n8n-workflow").INodePropertyRouting;
            credentialTypes?: Array<"extends:oAuth2Api" | "extends:oAuth1Api" | "has:authenticate" | "has:genericAuth">;
            extractValue?: import("n8n-workflow").INodePropertyValueExtractor;
            modes?: import("n8n-workflow").INodePropertyMode[];
            requiresDataPath?: "single" | "multiple";
            doNotInherit?: boolean;
            validateType?: import("n8n-workflow").FieldType;
            ignoreValidationDuringExecution?: boolean;
            allowArbitraryValues?: boolean;
        }[];
    };
    pipeline: {
        operation: INodeProperties;
        fields: {
            displayOptions: {
                show: {
                    resource: string[];
                    operation: string[];
                };
            };
            displayName: string;
            name: string;
            type: import("n8n-workflow").NodePropertyTypes;
            typeOptions?: import("n8n-workflow").INodePropertyTypeOptions;
            default: import("n8n-workflow").NodeParameterValueType;
            description?: string;
            hint?: string;
            disabledOptions?: import("n8n-workflow").IDisplayOptions;
            options?: Array<import("n8n-workflow").INodePropertyOptions | INodeProperties | import("n8n-workflow").INodePropertyCollection>;
            placeholder?: string;
            isNodeSetting?: boolean;
            noDataExpression?: boolean;
            required?: boolean;
            routing?: import("n8n-workflow").INodePropertyRouting;
            credentialTypes?: Array<"extends:oAuth2Api" | "extends:oAuth1Api" | "has:authenticate" | "has:genericAuth">;
            extractValue?: import("n8n-workflow").INodePropertyValueExtractor;
            modes?: import("n8n-workflow").INodePropertyMode[];
            requiresDataPath?: "single" | "multiple";
            doNotInherit?: boolean;
            validateType?: import("n8n-workflow").FieldType;
            ignoreValidationDuringExecution?: boolean;
            allowArbitraryValues?: boolean;
        }[];
    };
    customField: {
        operation: INodeProperties;
        fields: {
            displayOptions: {
                show: {
                    resource: string[];
                    operation: string[];
                };
            };
            displayName: string;
            name: string;
            type: import("n8n-workflow").NodePropertyTypes;
            typeOptions?: import("n8n-workflow").INodePropertyTypeOptions;
            default: import("n8n-workflow").NodeParameterValueType;
            description?: string;
            hint?: string;
            disabledOptions?: import("n8n-workflow").IDisplayOptions;
            options?: Array<import("n8n-workflow").INodePropertyOptions | INodeProperties | import("n8n-workflow").INodePropertyCollection>;
            placeholder?: string;
            isNodeSetting?: boolean;
            noDataExpression?: boolean;
            required?: boolean;
            routing?: import("n8n-workflow").INodePropertyRouting;
            credentialTypes?: Array<"extends:oAuth2Api" | "extends:oAuth1Api" | "has:authenticate" | "has:genericAuth">;
            extractValue?: import("n8n-workflow").INodePropertyValueExtractor;
            modes?: import("n8n-workflow").INodePropertyMode[];
            requiresDataPath?: "single" | "multiple";
            doNotInherit?: boolean;
            validateType?: import("n8n-workflow").FieldType;
            ignoreValidationDuringExecution?: boolean;
            allowArbitraryValues?: boolean;
        }[];
    };
    tag: {
        operation: INodeProperties;
        fields: {
            displayOptions: {
                show: {
                    resource: string[];
                    operation: string[];
                };
            };
            displayName: string;
            name: string;
            type: import("n8n-workflow").NodePropertyTypes;
            typeOptions?: import("n8n-workflow").INodePropertyTypeOptions;
            default: import("n8n-workflow").NodeParameterValueType;
            description?: string;
            hint?: string;
            disabledOptions?: import("n8n-workflow").IDisplayOptions;
            options?: Array<import("n8n-workflow").INodePropertyOptions | INodeProperties | import("n8n-workflow").INodePropertyCollection>;
            placeholder?: string;
            isNodeSetting?: boolean;
            noDataExpression?: boolean;
            required?: boolean;
            routing?: import("n8n-workflow").INodePropertyRouting;
            credentialTypes?: Array<"extends:oAuth2Api" | "extends:oAuth1Api" | "has:authenticate" | "has:genericAuth">;
            extractValue?: import("n8n-workflow").INodePropertyValueExtractor;
            modes?: import("n8n-workflow").INodePropertyMode[];
            requiresDataPath?: "single" | "multiple";
            doNotInherit?: boolean;
            validateType?: import("n8n-workflow").FieldType;
            ignoreValidationDuringExecution?: boolean;
            allowArbitraryValues?: boolean;
        }[];
    };
    note: {
        operation: INodeProperties;
        fields: {
            displayOptions: {
                show: {
                    resource: string[];
                    operation: string[];
                };
            };
            displayName: string;
            name: string;
            type: import("n8n-workflow").NodePropertyTypes;
            typeOptions?: import("n8n-workflow").INodePropertyTypeOptions;
            default: import("n8n-workflow").NodeParameterValueType;
            description?: string;
            hint?: string;
            disabledOptions?: import("n8n-workflow").IDisplayOptions;
            options?: Array<import("n8n-workflow").INodePropertyOptions | INodeProperties | import("n8n-workflow").INodePropertyCollection>;
            placeholder?: string;
            isNodeSetting?: boolean;
            noDataExpression?: boolean;
            required?: boolean;
            routing?: import("n8n-workflow").INodePropertyRouting;
            credentialTypes?: Array<"extends:oAuth2Api" | "extends:oAuth1Api" | "has:authenticate" | "has:genericAuth">;
            extractValue?: import("n8n-workflow").INodePropertyValueExtractor;
            modes?: import("n8n-workflow").INodePropertyMode[];
            requiresDataPath?: "single" | "multiple";
            doNotInherit?: boolean;
            validateType?: import("n8n-workflow").FieldType;
            ignoreValidationDuringExecution?: boolean;
            allowArbitraryValues?: boolean;
        }[];
    };
    task: {
        operation: INodeProperties;
        fields: {
            displayOptions: {
                show: {
                    resource: string[];
                    operation: string[];
                };
            };
            displayName: string;
            name: string;
            type: import("n8n-workflow").NodePropertyTypes;
            typeOptions?: import("n8n-workflow").INodePropertyTypeOptions;
            default: import("n8n-workflow").NodeParameterValueType;
            description?: string;
            hint?: string;
            disabledOptions?: import("n8n-workflow").IDisplayOptions;
            options?: Array<import("n8n-workflow").INodePropertyOptions | INodeProperties | import("n8n-workflow").INodePropertyCollection>;
            placeholder?: string;
            isNodeSetting?: boolean;
            noDataExpression?: boolean;
            required?: boolean;
            routing?: import("n8n-workflow").INodePropertyRouting;
            credentialTypes?: Array<"extends:oAuth2Api" | "extends:oAuth1Api" | "has:authenticate" | "has:genericAuth">;
            extractValue?: import("n8n-workflow").INodePropertyValueExtractor;
            modes?: import("n8n-workflow").INodePropertyMode[];
            requiresDataPath?: "single" | "multiple";
            doNotInherit?: boolean;
            validateType?: import("n8n-workflow").FieldType;
            ignoreValidationDuringExecution?: boolean;
            allowArbitraryValues?: boolean;
        }[];
    };
    conversation: {
        operation: INodeProperties;
        fields: {
            displayOptions: {
                show: {
                    resource: string[];
                    operation: string[];
                };
            };
            displayName: string;
            name: string;
            type: import("n8n-workflow").NodePropertyTypes;
            typeOptions?: import("n8n-workflow").INodePropertyTypeOptions;
            default: import("n8n-workflow").NodeParameterValueType;
            description?: string;
            hint?: string;
            disabledOptions?: import("n8n-workflow").IDisplayOptions;
            options?: Array<import("n8n-workflow").INodePropertyOptions | INodeProperties | import("n8n-workflow").INodePropertyCollection>;
            placeholder?: string;
            isNodeSetting?: boolean;
            noDataExpression?: boolean;
            required?: boolean;
            routing?: import("n8n-workflow").INodePropertyRouting;
            credentialTypes?: Array<"extends:oAuth2Api" | "extends:oAuth1Api" | "has:authenticate" | "has:genericAuth">;
            extractValue?: import("n8n-workflow").INodePropertyValueExtractor;
            modes?: import("n8n-workflow").INodePropertyMode[];
            requiresDataPath?: "single" | "multiple";
            doNotInherit?: boolean;
            validateType?: import("n8n-workflow").FieldType;
            ignoreValidationDuringExecution?: boolean;
            allowArbitraryValues?: boolean;
        }[];
    };
};
