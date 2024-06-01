import { createContextScope } from '../context'
import { AVATAR_NAME } from './constants'

import type { AvatarContextValue } from './types'

const [createAvatarContext, createAvatarScope] = createContextScope(AVATAR_NAME);
const [AvatarProvider, useAvatarContext] = createAvatarContext<AvatarContextValue>(AVATAR_NAME);

export {
  createAvatarScope,
  AvatarProvider,
  useAvatarContext
}
