import * as React from "react";

import * as spinnerStyles from "../../styles/modules/ui/spinner.module.scss";

const Spinner: React.FC<SpinnerProps> = ({ type }) => (
    <div
        className={spinnerStyles.spinner}
        id="spinner"
        role="status"
        data-type={type}
    >
        <span className={spinnerStyles.spinnerCircle} />
    </div>
);

export default Spinner;
