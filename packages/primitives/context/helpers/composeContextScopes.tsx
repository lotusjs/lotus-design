import { useMemo } from 'react'
import type { CreateScope } from '../types'

export function composeContextScopes(...scopes: CreateScope[]) {
  const baseScope = scopes[0];

  if (scopes.length === 1) return baseScope;

  const createScope: CreateScope = () => {
    const scopeHooks = scopes.map((createScope) => ({
      useScope: createScope(),
      scopeName: createScope.scopeName,
    }));

    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes, { useScope, scopeName }) => {
        // We are calling a hook inside a callback which React warns against to avoid inconsistent
        // renders, however, scoping doesn't have render side effects so we ignore the rule.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes, ...currentScope };
      }, {});

      return useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  }

  createScope.scopeName = baseScope.scopeName;

  return createScope;
}
