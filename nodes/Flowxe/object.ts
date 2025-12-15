import type { INodeProperties } from 'n8n-workflow'
import { fields } from './_fields'
import { actions } from './_actions'
type N = INodeProperties

// ---------- resources
export const resource: N = {
  displayName: 'Resource',
  name: 'resource',
  type: 'options',
  noDataExpression: true,
  //eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
  options: [
    { name: 'Location', value: 'location' },
    { name: 'Phone Number', value: 'phoneNumber' },
    { name: 'Pipeline', value: 'pipeline' },
    { name: 'Custom Field', value: 'customField' },
    { name: 'Note', value: 'note' },
  ],
  default: 'location',
}

export const location =
  [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: { show: { resource: ['location'] } },
      default: '',
      options: [
        ...actions.location,
      ],
    },
    ...fields.location
  ] satisfies N[]

export const phoneNumber =
  [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: { show: { resource: ['phoneNumber'] } },
      default: '',
      options: [
        ...actions.phoneNumber
      ],
    },
    ...fields.phoneNumber
  ] satisfies N[]

export const pipeline =
  [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: { show: { resource: ['pipeline'] } },
      default: '',
      options: [
        ...actions.pipeline,
      ],
    },
    ...fields.pipeline
  ] satisfies N[]

export const customField =
  [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: { show: { resource: ['customField'] } },
      default: '',
      options: [
        ...actions.customField,
      ],
    },
    ...fields.customField
  ] satisfies N[]

export const note =
  [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: { show: { resource: ['note'] } },
      default: '',
      options: [
        ...actions.note,
      ],
    },
    ...fields.note,
  ] satisfies N[]