export { EVENTS } from "./registerPixiJs";
import { registerPixiJS } from "./registerPixiJs";

if(typeof PIXI === "undefined"){
  throw new Error("Cannot find PIXI");
}

export default registerPixiJS(PIXI);
