import React, { useEffect, useState } from "react";

const RemoteComponentContainer = ({ remoteModule, componentName }) => {
    const [loadingRemoteModule, setLoadingRemoteModule] = useState(false);
    const [loadedRemoteModule, setLoadedRemoteModule] = useState(null);
    const [remoteModuleLoadError, setRemoteModuleLoadError] = useState(null);

    useEffect(() => {
        if (loadingRemoteModule || loadedRemoteModule || remoteModuleLoadError) {
            return;
        }

        remoteModule()
            .then((m) => {
                setLoadedRemoteModule(m);
                setLoadingRemoteModule(false);
            })
            .catch(err => {
                setRemoteModuleLoadError(err);
                setLoadingRemoteModule(false);
            });

        setLoadingRemoteModule(true);
    }, [loadingRemoteModule, loadedRemoteModule, remoteModuleLoadError]);

    return (
        <div>
            {loadingRemoteModule && (
                <div>Loading {componentName}...</div>
            )}
            {loadedRemoteModule && (() => {
                const Component = loadedRemoteModule[componentName];
                return <Component />;
            })()}
            {remoteModuleLoadError && (
                <div>Failure loading remote module: {`${remoteModuleLoadError}`}</div>
            )}
        </div>
    );
};

export default RemoteComponentContainer