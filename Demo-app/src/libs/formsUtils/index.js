import * as Yup from "yup";
import General from "../utility/General";

export const getValidationSchema = (fields) => {
  const schemaFields = {};

  fields.forEach(
    ({
      fieldName,
      isRequired = false,
      isMinLength,
      isMaxLength,
      regexPattern,
      isEmail,
      isPassword,
      isDropdown = false,
      isMultiSelect = false,
      isStateValid = false,
      isFormObject = false,
      isArray = false,
      arrayItemType,
      arrayItemRequired,
      when,
      customValidation,
      customFieldName,
    }) => {
      let fieldSchema = Yup.string().trim();
      const labelName =
        customFieldName || General.camelToPascalWithSpaces(fieldName);

      if (when) {
        fieldSchema = fieldSchema.when(when.field, {
          is: when.is,
          then: (schema) => {
            if (when.then.isRequired) {
              schema = schema.required(`${labelName} is required`);
            }
            if (when.then.regexPattern) {
              schema = schema.matches(
                when.then.regexPattern,
                `${labelName} is invalid`
              );
            }
            if (when.then.isEmail) {
              schema = schema
                .email(`${labelName} must be a valid email`)
                .matches(
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  `${labelName} must be a valid email`
                );
            }
            if (when.then.customValidation) {
              schema = schema.test("custom", "", function (value) {
                const { parent } = this;
                const error = when.then.customValidation(value, parent);
                return error ? this.createError({ message: error }) : true;
              });
            }
            return schema;
          },
          otherwise: (schema) => schema.notRequired(),
        });
      } else if (isArray) {
        let itemSchema = Yup.string().required(`${labelName} is required`);
        if (arrayItemType === "date") {
          itemSchema = Yup.date().typeError(`${labelName} is required`).required(`${labelName} is required`);
        }
        fieldSchema = Yup.array()
          .of(itemSchema)
          .min(1, `${labelName} is required`);
      } else {
        if (isFormObject) {
          fieldSchema = Yup.object().shape({
            intakeForm: Yup.boolean(),
            consentForm: Yup.boolean(),
          });
        } else if (isDropdown) {
          fieldSchema = Yup.object({
            label: Yup.string().trim().required(`${labelName} is required`),
            value: Yup.string()
              .trim()
              .required(`${labelName} value is required`),
          })
            .nullable()
            .required(`${labelName} is required`);
        } else if (isMultiSelect) {
          fieldSchema = Yup.array()
            .of(
              Yup.object().shape({
                label: Yup.string().required(),
                value: Yup.string().required(),
              })
            )
            .when([], {
              is: () => isRequired,
              then: (schema) => schema.min(1, `${labelName} is required`),
              otherwise: (schema) => schema.notRequired(),
            });
        } else {
          if (isRequired) {
            fieldSchema = fieldSchema.required(`${labelName} is required`);
          }
          if (isMinLength) {
            fieldSchema = fieldSchema.min(
              isMinLength,
              `${labelName} must be at least ${isMinLength} characters`
            );
          }
          if (isMaxLength) {
            fieldSchema = fieldSchema.max(
              isMaxLength,
              `${labelName} must be at most ${isMaxLength} characters`
            );
          }
          if (regexPattern) {
            fieldSchema = fieldSchema.matches(
              regexPattern,
              `${labelName} is invalid`
            );
          }
          if (isEmail) {
            fieldSchema = fieldSchema
              .email(`${labelName} must be a valid email`)
              .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                `${labelName} must be a valid email`
              );
          }
          if (isPassword) {
            fieldSchema = fieldSchema.matches(
              regexPattern,
              `${labelName} must contain at least one uppercase letter, one lowercase letter, one number, and one special character`
            );
          }
          if (customValidation) {
            fieldSchema = fieldSchema.test("custom", "", function (value) {
              const { parent } = this;
              const error = customValidation(value, parent);
              return error ? this.createError({ message: error }) : true;
            });
          }
        }
      }

      schemaFields[fieldName] = fieldSchema;
    }
  );

  return Yup.object().shape(schemaFields);
};
