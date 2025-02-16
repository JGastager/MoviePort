import type { Directive } from "vue";

const dragScroll: Directive = {
    mounted(el) {
        let isDown = false;
        let startX: number;
        let startY: number;
        let scrollLeft: number;
        let scrollTop: number;
        let isDragging = false;

        const startDrag = (e: MouseEvent | TouchEvent) => {
            isDown = true;
            isDragging = false; // Reset dragging state
            el.classList.add("dragging");

            if (e instanceof TouchEvent) {
                startX = e.touches[0].pageX - el.offsetLeft;
                startY = e.touches[0].pageY - el.offsetTop;
            } else {
                startX = e.pageX - el.offsetLeft;
                startY = e.pageY - el.offsetTop;
            }

            scrollLeft = el.scrollLeft;
            scrollTop = el.scrollTop;

            // Add global mousemove listener to allow dragging outside the container
            document.addEventListener("mousemove", moveDrag);
            document.addEventListener("mouseup", stopDrag);
            document.addEventListener("mouseleave", stopDrag);
        };

        const moveDrag = (e: MouseEvent | TouchEvent) => {
            if (!isDown) return;
            e.preventDefault();

            isDragging = true; // Mark as dragging

            let x: number, y: number;
            if (e instanceof TouchEvent) {
                x = e.touches[0].pageX - el.offsetLeft;
                y = e.touches[0].pageY - el.offsetTop;
            } else {
                x = e.pageX - el.offsetLeft;
                y = e.pageY - el.offsetTop;
            }

            const walkX = (x - startX) * 1.5; // Adjust speed
            const walkY = (y - startY) * 1.5;

            el.scrollLeft = scrollLeft - walkX;
            el.scrollTop = scrollTop - walkY;
        };

        const stopDrag = () => {
            isDown = false;
            isDragging = false;
            el.classList.remove("dragging");

            // Remove global event listeners after drag ends
            document.removeEventListener("mousemove", moveDrag);
            document.removeEventListener("mouseup", stopDrag);
            document.removeEventListener("mouseleave", stopDrag);
        };

        const preventClick = (e: MouseEvent) => {
            if (isDragging) {
                e.preventDefault(); // Prevent unintended clicks
                e.stopPropagation();
            }
            isDragging = false;
        };

        const preventDrag = (e: DragEvent) => {
            e.preventDefault(); // Prevent default browser drag behavior
        };

        // Event Listeners
        el.addEventListener("mousedown", startDrag);
        el.addEventListener("touchstart", startDrag);

        // Prevent unintended clicks on links and buttons
        el.querySelectorAll("a, button").forEach((child) => {
            child.addEventListener("click", preventClick);
            child.addEventListener("dragstart", preventDrag); // Prevent dragging links
        });
    },
};

export default dragScroll;
