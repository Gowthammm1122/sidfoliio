import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        // Disable strict scroll restoration logic
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // Force disable smooth scrolling temporarily to ensure instant jump
        const html = document.documentElement;
        const originalScrollBehavior = html.style.scrollBehavior;
        html.style.scrollBehavior = 'auto';

        // Instant scroll to top
        window.scrollTo(0, 0);

        // Restore scroll behavior (optional, but good for in-page links)
        // We use a small timeout to let the jump happen
        const timeout = setTimeout(() => {
            html.style.scrollBehavior = originalScrollBehavior;
        }, 0);

        return () => clearTimeout(timeout);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
