type MakeSpec = {
  op: string                 // operation value, e.g. 'locationGet'
  key: string                // output root key, e.g. 'location'
  pre?: string               // optional setup code inside expression
  full: string               // JS expression returning FULL object/array
  simple: string             // JS expression returning SIMPLE object/array
}

function makeOutput(spec: MakeSpec): string
{
  return `={{(() => {
		const mode = $parameter.outputFormat ?? 'sanitizedSimple';
		const op = $parameter.operation;
		const body = $response.body ?? {};

		// Debug Mode (RAW)
		if (mode === 'raw') return body;

		// Make sure output is action-specific
		if (op !== '${spec.op}') return body;

		${spec.pre ?? ''}

		const data = (mode === 'sanitizedFull')
			? (${spec.full})
			: (${spec.simple});

		return { ${spec.key}: data };
	})()}}`
}

export const helpers = {
  output: {
    contact: {
      get: makeOutput({
        op: 'contactGet',
        key: 'contact',
        pre: `const d = body.contact ?? body ?? {};`,
        full: `d`,
        simple: `({
          id: d?.id ?? null,
          name: d?.name ?? null,
          firstName: d?.firstName ?? null,
          lastName: d?.lastName ?? null,
          email: d?.email ?? null,
          phone: d?.phone ?? null,
          website: d?.website ?? null,
          assignedTo: d?.assignedTo ?? null,
          dateOfBirth: d?.dateOfBirth ?? null,
          address: {
            line1: d?.address1 ?? null,
            city: d?.city ?? null,
            state: d?.state ?? null,
            zipCode: d?.postalCode ?? null,
            country: d?.country ?? null,
          },
          tags: Array.isArray(d?.tags) ? d.tags : [],
          customFields: Array.isArray(d?.customFields)
            ? d.customFields.map((f) => ({
                id: f?.id ?? null,
                value: f?.value ?? null,
              }))
            : []
        })`,
      }),
      update: makeOutput({
        op: 'contactUpdate',
        key: 'contact',
        pre: `const d = body.contact ?? body ?? {};`,
        full: `d`,
        simple: `({
          id: d?.id ?? null,
          name: d?.name ?? null,
          firstName: d?.firstName ?? null,
          lastName: d?.lastName ?? null,
          email: d?.email ?? null,
          phone: d?.phone ?? null,
          website: d?.website ?? null,
          assignedTo: d?.assignedTo ?? null,
          dateOfBirth: d?.dateOfBirth ?? null,
          address: {
            line1: d?.address1 ?? null,
            city: d?.city ?? null,
            state: d?.state ?? null,
            zipCode: d?.postalCode ?? null,
            country: d?.country ?? null,
          },
          tags: Array.isArray(d?.tags) ? d.tags : [],
          customFields: Array.isArray(d?.customFields)
            ? d.customFields.map((f) => ({
                id: f?.id ?? null,
                value: f?.value ?? null,
              }))
            : []
        })`,
      }),
    },
    location: {
      get: makeOutput({
        op: 'locationGet',
        key: 'location',
        pre: `const d = body.location ?? {}`,
        full: `({
          id        : d?.id ?? null,
          name      : d?.name ?? null,
          website   : d?.website ?? null,
          timezone  : d?.timezone ?? null,
          email     : d?.email ?? null,
          phone     : d?.phone ?? null,
          address: {
            line1   : d?.address ?? null,
            city    : d?.city ?? null,
            state   : d?.state ?? null,
            zipCode : d?.postalCode ?? null,
            country : d?.country ?? null,
          },
          })`,
        simple: `({
          id        : d?.id ?? null,
          name      : d?.name ?? null,
        })`,
      }),
    },
    phoneNumber: {
      getAll: makeOutput({
        op: 'phoneNumberGetAll',
        key: 'phoneNumber',
        pre: `const list = body.numbers ?? [];`,
        full: `list.map((n) => ({
				id      : n?.sid ?? null,
				name    : n?.friendlyName ?? null,
				number  : n?.phoneNumber ?? null,
				type    : n?.type ?? null,
				capable : n?.capabilities ?? null,
				country : n?.countryCode ?? null,
			}))`,
        simple: `list.map((n) => ({
				id: n?.sid ?? null,
				number: n?.phoneNumber ?? null,
			}))`,
      }),
    },
    pipeline: {
      getAll: makeOutput({
        op: 'pipelineGetAll',
        key: 'pipeline',
        pre: `const list = body.pipelines ?? [];`,
        full: `list`,
        simple: `(
          Array.isArray(list)
            ? list.map((p) => ({
                id: p?.id ?? p?._id ?? null,
                name: p?.name ?? null,
                stages: Array.isArray(p?.stages)
                  ? p.stages.map((s) => ({
                      id: s?.id ?? s?._id ?? null,
                      name: s?.name ?? null,
                    }))
                  : [],
              }))
            : list
        )`,
      }),
    },
    customField: {
      getAll: makeOutput({
        op: 'customFieldGetAll',
        key: 'customField',
        pre: `const list = body.customFields ?? [];`,
        full: `list`,
        simple: `list.map((f) => ({
                id    : f?.id ?? null,
                name  : f?.name ?? null,
                model : f?.model ?? null,
                fieldKey   : f?.fieldKey ?? null
            }))`,
      }),
    },
    note: {
      get: makeOutput({
        op: 'noteGet',
        key: 'note',
        pre: `const d = body.note ?? {}`,
        full: `d`,
        simple: `({
          id        : d?.id ?? null,
          body      : d?.bodyText ?? null,
          userId    : d?.userId ?? null,
          dateAdded : d?.dateAdded ?? null,
        })`,
      }),
      getAll: makeOutput({
        op: 'noteGetAll',
        key: 'note',
        pre: `const list = body.notes ?? [];`,
        full: `list`,
        simple: `(
          Array.isArray(list)
            ? list.map((n) => ({
                id        : n?.id ?? null,
                body      : n?.bodyText ?? null,
                userId    : n?.userId ?? null,
                dateAdded : n?.dateAdded ?? null,
              }))
            : list
        )`,
      }),
      create: makeOutput({
        op: 'noteCreate',
        key: 'note',
        pre: `const d = body.note ?? {}`,
        full: `d`,
        simple: `({
          id        : d?.id ?? null,
          body      : d?.bodyText ?? null,
          userId    : d?.userId ?? null,
          dateAdded : d?.dateAdded ?? null,
        })`,
      }),
      update: makeOutput({
        op: 'noteUpdate',
        key: 'note',
        pre: `const d = body.note ?? {}`,
        full: `d`,
        simple: `({
          id        : d?.id ?? null,
          body      : d?.bodyText ?? null,
          userId    : d?.userId ?? null,
          dateAdded : d?.dateAdded ?? null,
        })`,
      }),
      delete: makeOutput({
        op: 'noteDelete',
        key: 'note',
        pre: ``,
        full: `body`,
        simple: `({
          succeded: body?.succeded ?? null,
        })`,
      }),
    },
    tag: {
      add: makeOutput({
        op: 'tagAdd',
        key: 'tag',
        pre: `const list = body.tags ?? [];`,
        full: `list`,
        simple: `(Array.isArray(list) ? list : [])`,
      }),
      remove: makeOutput({
        op: 'tagRemove',
        key: 'tag',
        pre: `const list = body.tags ?? [];`,
        full: `list`,
        simple: `(Array.isArray(list) ? list : [])`,
      }),
    },
    task: {
      get: makeOutput({
        op: 'taskGet',
        key: 'task',
        pre: `const d = body.task ?? {};`,
        full: `d`,
        simple: `({
          id        : d?.id ?? null,
          title     : d?.title ?? null,
          body      : d?.body ?? null,
          assignedTo: d?.assignedTo ?? null,
          dueDate   : d?.dueDate ?? null,
          completed : d?.completed ?? null,
        })`,
      }),
      getAll: makeOutput({
        op: 'taskGetAll',
        key: 'task',
        pre: `const list = body.tasks ?? [];`,
        full: `list`,
        simple: `(
          Array.isArray(list)
            ? list.map((t) => ({
                id        : t?.id ?? null,
                title     : t?.title ?? null,
                body      : t?.body ?? null,
                assignedTo: t?.assignedTo ?? null,
                dueDate   : t?.dueDate ?? null,
                completed : t?.completed ?? null,
              }))
            : list
        )`,
      }),
      create: makeOutput({
        op: 'taskCreate',
        key: 'task',
        pre: `const d = body.task ?? {};`,
        full: `d`,
        simple: `({
          id        : d?.id ?? null,
          title     : d?.title ?? null,
          body      : d?.body ?? null,
          assignedTo: d?.assignedTo ?? null,
          dueDate   : d?.dueDate ?? null,
          completed : d?.completed ?? null,
        })`,
      }),
      update: makeOutput({
        op: 'taskUpdate',
        key: 'task',
        pre: `const d = body.task ?? {};`,
        full: `d`,
        simple: `({
          id        : d?.id ?? null,
          title     : d?.title ?? null,
          body      : d?.body ?? null,
          assignedTo: d?.assignedTo ?? null,
          dueDate   : d?.dueDate ?? null,
          completed : d?.completed ?? null,
        })`,
      }),
      delete: makeOutput({
        op: 'taskDelete',
        key: 'task',
        pre: ``,
        full: `body`,
        simple: `({
          succeded: body?.succeded ?? null,
        })`,
      }),
    },
    conversation: {
      search: makeOutput({
        op: 'conversationSearch',
        key: 'conversation',
        pre: `const list = body.conversations ?? [];`,
        full: `list`,
        simple: `(
          Array.isArray(list)
            ? list.map((c) => ({
                id: c?.id ?? null,
                contactId: c?.contactId ?? null,
                contactName: c?.contactName ?? c?.fullName ?? null,
                phone: c?.phone ?? null,
                email: c?.email ?? null,
                type: c?.type ?? null,
                unreadCount: c?.unreadCount ?? 0,
                inbox: c?.inbox ?? false,
                lastMessageDate: c?.lastMessageDate ?? null,
                lastMessageDirection: c?.lastMessageDirection ?? null,
              }))
            : []
        )`,
      }),
      create: makeOutput({
        op: 'conversationCreate',
        key: 'conversation',
        pre: `const d = body.conversation ?? null;`,
        full: `d`,
        // Returns an array to match 'search' structure, filling missing fields with null
        simple: `(
          d ? [{
                id: d?.id ?? null,
                contactId: d?.contactId ?? null,
                contactName: null, // Not returned in create response
                phone: null,       // Not returned in create response
                email: null,       // Not returned in create response
                type: null,        // Not returned in create response
                unreadCount: 0,
                inbox: true,
                lastMessageDate: d?.lastMessageDate ?? null,
                lastMessageDirection: null,
              }]
            : []
        )`,
      }),
      delete: makeOutput({
        op: 'conversationDelete',
        key: 'conversation',
        pre: ``,
        full: `body`,
        simple: `({
          success: body?.success ?? false,
          traceId: body?.traceId ?? null,
        })`,
      }),
    },
  },
} as const