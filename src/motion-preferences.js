import { createContext, useContext } from 'react';
export const MotionPreferenceContext = createContext({ reduced: false, disabled: false, toggle: () => {} });
export function useMotionPreference() { return useContext(MotionPreferenceContext).reduced; }
export function useMotionControls() { return useContext(MotionPreferenceContext); }
