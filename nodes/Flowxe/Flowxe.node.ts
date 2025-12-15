import { INodeType, INodeTypeDescription } from 'n8n-workflow'
import * as obj from './object'

export class Flowxe implements INodeType
{
	description: INodeTypeDescription = {
		displayName: 'Flowxe',
		name: 'flowxe',
		icon: 'file:flowxe.svg',
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter["resource"] + " - " + $parameter["operation"]}}',
		description: 'GoHighLevel Declarative',
		defaults: { name: 'HighLevel' },
		inputs: ['main'],
		outputs: ['main'],

		requestDefaults: {
			baseURL: 'https://services.leadconnectorhq.com',
			headers: {
				Accept: 'application/json',
				Authorization: '={{"Bearer " + $parameter.apiKey}}',
				Version: '2021-07-28',
			},
		},

		properties: [
			obj.resource,
			...obj.location,
			...obj.phoneNumber,
			...obj.pipeline,
			...obj.customField,
			...obj.note,
		],
	};
}