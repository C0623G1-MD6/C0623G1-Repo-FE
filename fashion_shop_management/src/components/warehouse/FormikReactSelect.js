import React from 'react';
import Select from 'react-select';
import { useField, useFormikContext } from 'formik';

const FormikReactSelect = ({ name, options, ...props }) => {
    const [field, , helpers] = useField(name);
    const { setValue } = useFormikContext();

    const handleChange = (value) => {
        helpers.setValue(value);
    };

    return (
        <Select key={options.key}
            {...field}
            {...props}
            options={options}
            onChange={handleChange}
            isSearchable
        />
    );
};

export default FormikReactSelect;