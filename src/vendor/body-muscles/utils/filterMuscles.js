import { FRONT_MUSCLES, BACK_MUSCLES } from "../data/index.js";
import { ViewSide } from "../types.js";
/**
 * Get muscle definitions filtered by anatomical view
 */
export function filterMuscles(view) {
    return view === ViewSide.FRONT ? FRONT_MUSCLES : BACK_MUSCLES;
}
//# sourceMappingURL=filterMuscles.js.map