const ASC = "ASC";
const DESC = "DESC";

const columnStateMachines = {
  bool: {
    getQuery: ({ name, isActive }) => `${name}=${JSON.stringify(!!isActive)}`,
    multiFilterByDefault: true,
    initial: {
      isActive: false,
    },
    transitions: [
      { name: "on", from: { isActive: false }, to: { isActive: true } },
      { name: "off", from: { isActive: true }, to: { isActive: false } },
    ],
  },
  asc: {
    getQuery: ({ name, direction }) => `order[${name}]=${direction}`,
    multiFilterByDefault: false,
    initial: {
      isActive: false,
      direction: DESC,
    },
    transitions: [
      {
        name: "asc",
        from: { isActive: false },
        to: { isActive: true, direction: ASC },
      },
      {
        name: "desc",
        from: { isActive: true, direction: ASC },
        to: { isActive: true, direction: DESC },
      },
      {
        name: "off",
        from: { isActive: true, direction: DESC },
        to: { isActive: false, direction: ASC },
      },
    ],
  },
};

function isObj(obj1, obj2) {
  return !Object.keys(obj1).some(item => obj1[item] !== obj2[item]);
}

function getStateMachine(type) {
  const stateMachine = columnStateMachines[type];
  if (!stateMachine)
    throw new Error(`No such type ${type} in columnStateMachines`);

  return stateMachine;
}

export function getColumnInitState(type) {
  return getStateMachine(type).initial;
}

export function getColumnNextState(column) {
  const stateMachine = getStateMachine(column.type);

  const result = stateMachine.transitions.find(transition =>
    isObj(transition.from, column),
  );

  return result ? result.to : stateMachine.initial;
}

export function getQueryGenerator(type) {
  return getStateMachine(type).getQuery;
}

export function getAllFilterTypes() {
  return Object.keys(columnStateMachines);
}

export function getDefaultColumnsState(columnDefinitions) {
  return columnDefinitions.reduce(
    (acc, prev) => ({
      ...acc,
      [prev.name]: {
        type: prev.type,
        ...getColumnInitState(prev.type),
      },
    }),
    {},
  );
}

export function isMultifilterByDefault(type) {
  return getStateMachine(type).multiFilterByDefault || false;
}
