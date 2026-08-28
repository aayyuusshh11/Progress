import { INTENSITY_COLORS } from "../data/index.js";
/**
 * Get the fill color for a muscle based on its state and hover
 */
export function getMuscleColor(state, isHovered) {
    if (state.intensity > 0) {
        const roundedIntensity = Math.min(Math.round(state.intensity), 10);
        return INTENSITY_COLORS[roundedIntensity] || INTENSITY_COLORS[10];
    }
    return INTENSITY_COLORS[0];
}
//# sourceMappingURL=getMuscleColor.js.map