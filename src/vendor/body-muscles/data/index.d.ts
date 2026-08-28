import { FRONT_MUSCLES } from "./muscles.front";
import { BACK_MUSCLES } from "./muscles.back";
export { MUSCLE_GROUPS } from "./muscle-groups";
export type { MuscleDef } from "./types";
/**
 * Complete muscle map - all 70+ anatomical regions
 * Combines front and back view muscle definitions
 */
export declare const MUSCLE_MAP: import("./types").MuscleDef[];
/**
 * Pre-filtered front view muscles for performance
 */
export { FRONT_MUSCLES };
/**
 * Pre-filtered back view muscles for performance
 */
export { BACK_MUSCLES };
/**
 * Intensity color gradient mapping (0-10 scale)
 * Colors progress from yellow (low) → orange (mid) → red (high)
 */
export declare const INTENSITY_COLORS: Record<number, string>;
//# sourceMappingURL=index.d.ts.map