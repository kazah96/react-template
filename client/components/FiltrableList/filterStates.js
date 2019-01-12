
const stateMachines = {
  bool: {
    initial: {
      isActive: false,
    },
    transitions: [
      { name: "on", from: { isActive: false }, to: { isActive: true } },
      { name: "off", from: { isActive: true }, to: { isActive: false } },
    ],
  },
  asc: {
    initial: {
      isActive: false,
      direction: ASC,
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
        to: { isActive: false },
      },
    ],
  },
};

function getColumnInitState(type) {
  return stateMachines[type].initial;
}

function isObj(obj1, obj2) {
  return !Object.keys(obj1).some(item => obj1[item] !== obj2[item]);
}

function getColumnNextState(column) {
  const stateMachine = stateMachines[column.type];

  const result = stateMachine.transitions.find(transition =>
    isObj(transition.from, column),
  );
  return result ? result.to : stateMachine.initial;
}

function getDefaultColumnState(columnDefinitions) {
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
