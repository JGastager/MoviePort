import type { Directive } from "vue";

const dragScroll: Directive = {
    mounted(el) {
        if (el.classList.contains("initialized")) return;

        let initialX: number | null = null;
        let initialScroll: number | null = null;

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
                initialX = e.clientX;
                initialScroll = el.scrollLeft;

                const onPointerMove = (moveEvent: PointerEvent) => {
                    if (initialX !== null && initialScroll !== null) {
                        const moveX = moveEvent.clientX;
                        const moveDiff = initialX - moveX;
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

        el.addEventListener("pointerdown", onPointerDown);
    },
};

export default dragScroll;
