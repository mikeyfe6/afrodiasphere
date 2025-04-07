import * as React from "react";

const Sidebar: React.FC<SidebarProps> = ({ profile, loadingData }) => {
    return (
        <h5 style={{ filter: loadingData ? "blur(2px)" : "none" }}>
            Hallo, {profile}
        </h5>
    );
};

export default Sidebar;
