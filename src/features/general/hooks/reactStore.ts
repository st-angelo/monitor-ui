interface State {
  name: string;
  loading: boolean;
}

const state: State[] = [];

const subscribers: ((state?: State) => void)[] = [];

export const subscribe = (fn: any) => {
  subscribers.push(fn);
  return () => {
    console.log('UNSBSCRB');
    const index = subscribers.indexOf(fn);
    if (index > -1) subscribers.splice(index, 1);
  };
};

export const set = (name: string, loading: boolean) => {
  console.log('name', loading, state);
  let _state = state.find(x => x.name === name);
  if (!_state) {
    _state = { name, loading };
    state.push(_state);
  } else {
    _state.loading = loading;
  }
  console.log(subscribers);
  subscribers.forEach(fn => fn(_state));
};
