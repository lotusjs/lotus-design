import type React from 'react';

export type Scope<C = any> = { [scopeName: string]: React.Context<C>[] } | undefined;
export type ScopeHook = (scope: Scope) => { [__scopeProp: string]: Scope };
export interface CreateScope {
  scopeName: string;
  (): ScopeHook;
}
