type Action =
  | { type: 'next'}
  | { type: 'linear', value: boolean }
  | { type: 'speed', value: number }
  | { type: 'tick', delta: number }
  ;

type State = {
  a: number;
  b: number;

  linear: boolean;
  speed: number;
  progress: number;
}

const reducer = (state: State, action: Action): State => {
  switch(action.type) {
    case 'next': {
      if (state.linear) {
        return {
          ...state,
          a: state.a === 10 ? 1 : state.a + 1,
          b: state.b === 10 ? 1 : state.a === 10 ? state.b + 1 : state.b,
          progress: 0,
        };
      } else {
        return {
          ...state,
          a: Math.round(Math.random() * 10),
          b: Math.round(Math.random() * 10),
          progress: 0,
        }
      }
    }
    case 'linear': 
      return {
        ...state,
        linear: action.value,
      };
    case 'speed':
      return {
        ...state,
        speed: action.value,
      };
    case 'tick': 
      return {
        ...state,
        progress: state.progress + action.delta,
      };
    default: 
      return state;
  }
}

export default reducer;