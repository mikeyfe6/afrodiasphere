import * as React from "react";

import * as spinnerStyles from "../../styles/modules/ui/spinner.module.scss";

const Spinner = () => (
    <div className={spinnerStyles.spinner} id="spinner">
        <span className={spinnerStyles.spinnerCircle} />
    </div>
);

export default Spinner;
