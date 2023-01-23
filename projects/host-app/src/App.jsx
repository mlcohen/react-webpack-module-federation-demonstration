import React from 'react'
import * as ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
  import RemoteComponentContainer from './RemoteComponentContainer';

// const FeatureFooContainer = () => {
//     const [remoteModuleLoaded, setRemoteModuleLoaded] = useState(false);
//     const [loadingRemoteModule, setLoadingRemoteModule] = useState(false);
//     const [remoteModule, setRemoteModule] = useState(null);

//     useEffect(() => {
//         if (remoteModuleLoaded || loadingRemoteModule || remoteModule) {
//             return;
//         }

//         import("FeatureFoo/Foo")
//             .then((m) => {
//                 setRemoteModuleLoaded(true);
//                 setLoadingRemoteModule(false);
//                 setRemoteModule(m);
//             });

//         setLoadingRemoteModule(true);
//     }, [remoteModuleLoaded, loadingRemoteModule, remoteModule]);

//     console.log("RENDER FEATURE FOO CONTAINER", remoteModule);
//     return (
//         <div>
//             {loadingRemoteModule && (
//                 <div>Loading Foo...</div>
//             )}
//             {remoteModule && (() => {
//                 const Foo = remoteModule.Foo;
//                 return <Foo />;
//             })()}
//         </div>
//     );
// };

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <h1>Hello World</h1>
                <ul>
                    <li><Link to="about">About Us</Link></li>
                    <li><Link to="foo">Feature Foo</Link></li>
                    <li><Link to="bar">Feature bar</Link></li>
                </ul>
            </div>
        ),
    },
    {
        path: "foo",
        element: <RemoteComponentContainer
            remoteModule={() => import("FeatureFoo/Foo")}
            componentName="Foo"
        />,
    },
    {
        path: "bar",
        element: <RemoteComponentContainer 
            remoteModule={() => import("FeatureBar/Bar")}
            componentName="Bar"
        />,
    },
    {
        path: "about",
        element: <div>About</div>,
    },
]);

export function mount() {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<RouterProvider router={router} />);
}