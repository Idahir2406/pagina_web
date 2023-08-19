import {  useContext } from 'react';
import LogContext from '../context/logContext';

export function useLogContext() {
  return useContext(LogContext);
}