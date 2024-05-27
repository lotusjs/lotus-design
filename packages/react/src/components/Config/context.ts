import { createContext } from '@lotus-design/react-primitives/context'

interface ConfigContextValue {
  prefixCls?: string;
  getPrefixCls?: (componentName: string, customPrefix?: string) => string;
}

export const DefaultConfigContextValue: ConfigContextValue = {
  prefixCls: 'lotus',
  getPrefixCls: (componentName: string, customPrefix?: string) =>
    `${customPrefix || 'lotus'}-${componentName}`,
};

const [ConfigContextProvider, useConfigContext] = createContext<ConfigContextValue>('ConfigProvider', DefaultConfigContextValue);

export {
  ConfigContextProvider,
  useConfigContext,
}
