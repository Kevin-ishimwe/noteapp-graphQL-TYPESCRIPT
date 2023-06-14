import { User } from "./userFunctions.js";
import { notes } from "./notesFunction.js";
export const rootFunctions = {
  ...User,
  ...notes,
};
