import {
  useRef,
  useEffect,
  EffectCallback,
  DependencyList,
} from 'react';

export default function useAfterEffect(effect: EffectCallback, deps: DependencyList) {
  const initialRender = useRef(true);

  useEffect(() => {
    const destructor = initialRender.current ? () => {} : effect();
    if (initialRender.current) initialRender.current = false;
    if (typeof destructor === 'function') return destructor();
    return undefined;
  }, deps);
}
