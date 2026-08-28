import { ViewSide, MuscleId, BodyState } from "./types";
/**
 * Configuration options for the BodyChart
 */
export interface BodyChartOptions {
    /** Current anatomical view (FRONT or BACK) */
    view: ViewSide;
    /** State mapping for all body parts with intensity and selection */
    bodyState: BodyState;
    /** Callback fired when a muscle is clicked */
    onMuscleClick?: (id: MuscleId, name: string) => void;
    /** Callback fired when a muscle hover state changes */
    onMuscleHover?: (id: MuscleId | null) => void;
    /** Optional className for the container element */
    className?: string;
    /** Optional aria-label for accessibility */
    ariaLabel?: string;
    /** Show view indicator label (default: false) */
    showViewLabel?: boolean;
    /** Enable smooth transitions (default: true) */
    enableTransitions?: boolean;
}
/**
 * BodyChart — Framework-agnostic interactive SVG body map
 *
 * Renders a detailed human body with 70+ clickable muscle regions into any DOM element.
 * Supports dual views (anterior/posterior), intensity visualization (0-10 scale),
 * and interactive selection states with visual feedback.
 *
 * @example
 * ```ts
 * const chart = new BodyChart(document.getElementById('container')!, {
 *   view: ViewSide.FRONT,
 *   bodyState: { 'biceps-left': { intensity: 7, selected: true } },
 *   onMuscleClick: (id, name) => console.log(`Clicked: ${name}`),
 * });
 *
 * // Update state
 * chart.update({ bodyState: newState });
 *
 * // Switch view
 * chart.update({ view: ViewSide.BACK });
 *
 * // Cleanup
 * chart.destroy();
 * ```
 */
export declare class BodyChart {
    private container;
    private options;
    private hoveredMuscle;
    private wrapperEl;
    private svgEl;
    private labelEl;
    private musclePaths;
    private muscleData;
    private eventCleanup;
    constructor(container: HTMLElement, options: BodyChartOptions);
    /**
     * Update chart options. Partial updates are merged with current options.
     * Changing `view` triggers a full re-render; other changes update in-place.
     */
    update(options: Partial<BodyChartOptions>): void;
    /**
     * Remove the chart from the DOM and clean up all event listeners.
     */
    destroy(): void;
    private build;
    private buildDefs;
    private buildMusclePath;
    private refreshAllPaths;
    private refreshPath;
    private buildViewLabel;
}
//# sourceMappingURL=BodyChart.d.ts.map