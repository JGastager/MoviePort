import type { Directive } from "vue";

const vDraggable: Directive = {
    mounted(el) {
        if (el.classList.contains("initialized")) return;

        let initialX: number | null = null;
        let initialScroll: number | null = null;
        let isDragging = false; // Track if dragging occurred

        el.classList.add("initialized");

        const updateClasses = () => {
            if (el.scrollLeft <= 30) {
                el.classList.add("start");
            } else {
                el.classList.remove("start");
            }

            if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 30) {
                el.classList.add("end");
            } else {
                el.classList.remove("end");
            }
        };

        updateClasses();
        el.addEventListener("scroll", updateClasses);

        const onPointerDown = (e: PointerEvent) => {
            if (e.pointerType === "touch" || e.pointerType === "mouse") {
                e.preventDefault();
                isDragging = false; // Reset drag state
                initialX = e.clientX;
                initialScroll = el.scrollLeft;

                const onPointerMove = (moveEvent: PointerEvent) => {
                    if (initialX !== null && initialScroll !== null) {
                        const moveX = moveEvent.clientX;
                        const moveDiff = initialX - moveX;

                        // If moveDiff is significant, mark as dragging
                        if (Math.abs(moveDiff) > 5) {
                            isDragging = true;
                        }

                        el.scrollLeft = initialScroll + moveDiff;
                    }
                };

                const onPointerUp = () => {
                    document.removeEventListener("pointermove", onPointerMove);
                    document.removeEventListener("pointerup", onPointerUp);
                    initialX = null;
                    initialScroll = null;
                };

                document.addEventListener("pointermove", onPointerMove);
                document.addEventListener("pointerup", onPointerUp);
            }
        };

        const onClick = (e: Event) => {
            if (isDragging) {
                e.preventDefault();
                e.stopPropagation(); // Prevent triggering child element click events
            }
        };

        el.addEventListener("pointerdown", onPointerDown);
        el.addEventListener("click", onClick, true); // Capture phase to catch events before propagation
    },
};

export default vDraggable;
