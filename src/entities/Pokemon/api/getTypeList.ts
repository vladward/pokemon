import { findTypes } from './typeRepository';

export async function getTypeList() {
  const types = await findTypes();
  return types.map((t) => t.name);
}
