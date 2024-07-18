import {create, all} from 'mathjs';

const config = {};
const math = create(all, config);

export const initialState = {
  displayValue: '0',
  expression: '',
};

const handleNumber = (value, state) => {
  const {displayValue, expression} = state;
  return {
    ...state,
    displayValue: displayValue === '0' ? String(value) : displayValue + value,
    expression: expression + value,
  };
};

const handleOperator = (operator, state) => {
  const {displayValue, expression} = state;
  if (['+', '-', '*', '/'].includes(expression.slice(-1))) {
    return {
      ...state,
      expression: expression.slice(0, -1) + operator,
    };
  }
  return {
    ...state,
    displayValue: '0',
    expression: expression + operator,
  };
};

const handleEqual = state => {
  const {expression} = state;
  try {
    const result = math.evaluate(expression);
    return {
      displayValue: String(result),
      expression: String(result),
    };
  } catch {
    return {
      ...state,
      displayValue: 'Error',
      expression: '',
    };
  }
};

const calculator = (type, value, state) => {
  switch (type) {
    case 'number':
      return handleNumber(value, state);
    case 'clear':
      return initialState;
    case 'posneg':
      return {
        ...state,
        displayValue: String(parseFloat(state.displayValue) * -1),
        expression: String(parseFloat(state.displayValue) * -1),
      };
    case 'percentage':
      return {
        ...state,
        displayValue: String(parseFloat(state.displayValue) * 0.01),
        expression: state.expression + '*0.01',
      };
    case 'operator':
      return handleOperator(value, state);
    case 'equal':
      return handleEqual(state);
    default:
      return state;
  }
};

export default calculator;
