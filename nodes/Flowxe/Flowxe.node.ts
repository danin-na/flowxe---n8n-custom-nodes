import { INodeType, INodeTypeDescription } from 'n8n-workflow'
import { data } from './objects'

export class Flowxe implements INodeType
{
	description: INodeTypeDescription = {
		displayName: 'Flowxe',
		name: 'flowxe',
		icon: 'file:flowxe.svg',
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter.operation}}',
		description: 'GoHighLevel Declarative',
		defaults: { name: 'HighLevel' },
		inputs: ['main'],
		outputs: ['main'],

		requestDefaults: {
			baseURL: 'https://services.leadconnectorhq.com',
			headers: {
				Accept: 'application/json',
				Authorization: '={{"Bearer " + $parameter.f_common_apiKey}}',
				Version: '2021-07-28',
			},
		},

		properties: [
			data.resource,
			// contact
			data.contact.operation,
			...data.contact.fields,
			// location
			data.location.operation,
			...data.location.fields,
			// phone
			data.phone.operation,
			...data.phone.fields,
			// pipeline
			data.pipeline.operation,
			...data.pipeline.fields,
			// customField
			data.customField.operation,
			...data.customField.fields,
			// tag
			data.tag.operation,
			...data.tag.fields,
			// note
			data.note.operation,
			...data.note.fields,
			// task
			data.task.operation,
			...data.task.fields,
			// conversation
			data.conversation.operation,
			...data.conversation.fields,
			// message
			data.message.operation,
			...data.message.fields,
		],
	};
}