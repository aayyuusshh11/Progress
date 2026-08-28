/**
 * Anatomical view direction for the body map
 * @enum
 */
export declare enum ViewSide {
    /** Anterior (front) view of the body */
    FRONT = "FRONT",
    /** Posterior (back) view of the body */
    BACK = "BACK"
}
/**
 * Unique identifier for a muscle or body part
 * Format: {muscle_group}-{side} or {muscle_group}-{sub_group}-{side}
 *
 * @example
 * 'biceps-left'
 * 'shoulder-front-left'
 * 'abs-upper-right'
 * 'spine' // Central/singular parts
 */
export type MuscleId = string;
/**
 * State data for a single body part
 */
export interface BodyPartState {
    /** Intensity level from 0-10 (0 = inactive, 10 = maximum) */
    intensity: number;
    /** Whether this body part is currently selected/highlighted */
    selected: boolean;
}
/**
 * Complete body state mapping muscle IDs to their state
 * Partial record allows sparse representation (only tracked muscles need entries)
 */
export type BodyState = Partial<Record<MuscleId, BodyPartState>>;
/**
 * Intensity level type guard
 * @param value - Number to check
 * @returns true if value is a valid intensity (0-10)
 */
export declare function isValidIntensity(value: number): boolean;
/**
 * Create a new BodyPartState with default values
 * @param intensity - Initial intensity (default: 0)
 * @param selected - Initial selection state (default: false)
 * @returns New BodyPartState object
 */
export declare function createBodyPartState(intensity?: number, selected?: boolean): BodyPartState;
/**
 * Utility type for muscle side extraction
 */
export type MuscleSide = "left" | "right" | "central";
/**
 * Extract side from muscle ID
 * @param muscleId - Muscle identifier
 * @returns 'left', 'right', or 'central'
 */
export declare function extractMuscleSide(muscleId: MuscleId): MuscleSide;
/**
 * Extract muscle group from muscle ID
 * @param muscleId - Muscle identifier
 * @returns Base muscle group name
 */
export declare function extractMuscleGroup(muscleId: MuscleId): string;
//# sourceMappingURL=types.d.ts.map