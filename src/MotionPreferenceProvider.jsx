import { useEffect, useState } from 'react';
import { MotionConfig, useReducedMotion } from 'motion/react';
import { MotionPreferenceContext } from './motion-preferences';
export default function MotionPreferenceProvider({children}) {
  const systemReduced = useReducedMotion();
  const [disabled,setDisabled] = useState(false);
  const reduced = !!systemReduced || disabled;
  useEffect(()=> { document.documentElement.dataset.motion = reduced ? 'off' : 'on'; return ()=> { delete document.documentElement.dataset.motion; }; },[reduced]);
  return <MotionPreferenceContext.Provider value={{reduced,disabled,toggle:()=>setDisabled(value=>!value),systemReduced}}><MotionConfig reducedMotion={reduced ? 'always' : 'user'}>{children}</MotionConfig></MotionPreferenceContext.Provider>;
}
