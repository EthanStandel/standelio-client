import React, { useState, Dispatch, SetStateAction, useEffect } from "react";

/**
 * Viewport is a series of utility components for managing the 
 * intended viewport of the client.
 */
export namespace Viewport {

    // Props type where children are required
    type ChildrenRequired = { children: React.ReactElement; }

    // A hook that manages state updates using a getState function
    type SelfUpdatingHook = <T>(getState: () => T) => [T, Dispatch<SetStateAction<T>>];

    // A function which returns a FunctionalComponent<Props> based on input of type T
    type ComponentGenerator<T, Props> = (value: T) => React.FC<Props>;

    export enum State {
        Mobile = "mobile",
        Tablet = "tablet",
        Desktop = "desktop"
    }

    // The max width for mobile displays
    const mobileMaxWidth = 840;

    // The max width for tablet displays, anything beyond is desktop
    const tabletMaxWidth = 1280;

    // Test if current viewport is mobile
    const isMobile = () =>
        window.innerWidth <= mobileMaxWidth;

    // Test if current viewport is tablet
    const isTablet = () => 
        window.innerWidth > mobileMaxWidth && window.innerWidth <= tabletMaxWidth;

    // Test if current viewport is desktop
    const isDesktop = () =>
        window.innerWidth > tabletMaxWidth;

    // Get the current state as a string-based enum
    const currentState = () =>
        window.innerWidth <= mobileMaxWidth ? State.Mobile :
        window.innerWidth <= tabletMaxWidth ? State.Tablet :
        State.Desktop;

    // Update a peice of on resize if it has changed based upon a getter function
    const useStateAfterResize: SelfUpdatingHook = getState => {
        const [ state, setState ] = useState(getState());

        const onResize = () => {
            const newState = getState();
            if (newState !== state) {
                window.removeEventListener("resize", onResize);
                setState(newState);
            }
        }

        window.addEventListener("resize", onResize);
        useEffect(() => () => window.removeEventListener("resize", onResize));

        return [ state, setState ];
    }

    // A component generator for conditional rendering based on a test argument
    const windowResizeConditionalRender: ComponentGenerator<() => boolean, ChildrenRequired> = test => {
        return ({ children }) => {
            const [ shouldRender ] = useStateAfterResize(test);

            return shouldRender ? children : null;
        }
    }

    // Gets the viewport state as a hook
    export const useViewState = () => useStateAfterResize(currentState);

    // Render children if viewport is mobile
    export const MobileView: React.FC<ChildrenRequired> = windowResizeConditionalRender(isMobile);

    // Render children if viewport is tablet
    export const TabletView: React.FC<ChildrenRequired> = windowResizeConditionalRender(isTablet);

    // Render children if viewport is desktop
    export const DesktopView: React.FC<ChildrenRequired> = windowResizeConditionalRender(isDesktop);

    /**
     * When app is wrapped with Viewport.Root, there will always be
     * a class at the root identifying the viewport state for styles.
     * 
     * A style root-targetted with .Root and then .mobile,
     * .tablet or .desktop will create styles targetted at only 
     * viewports assumed to be those platforms.
     */ 
    export const Root: React.FC = ({ children }) => {

        const [ viewportState ] = useStateAfterResize(currentState);

        return <div className={`${Root.name} ${viewportState}`}>
            { children }
        </div>
    }

}
