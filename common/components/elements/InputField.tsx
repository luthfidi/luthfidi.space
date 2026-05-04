import { useId } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface InputFieldProps<TFormValue extends FieldValues> {
  register: UseFormRegister<TFormValue>;
  name: Path<TFormValue>;
  error: FieldErrors;
  rule?: RegisterOptions<TFormValue, Path<TFormValue>>;
  isTextArea?: boolean;
  placeholder?: string;
  rows?: number;
  label?: string;
  type?: string;
  requiredMessage?: string;
}

const InputField = <TFormValue extends FieldValues>({
  name,
  rule,
  error,
  isTextArea = false,
  placeholder = "",
  rows = 2,
  register,
  label,
  type = "text",
  requiredMessage,
}: InputFieldProps<TFormValue>) => {
  const reactId = useId();
  const inputId = `${reactId}-${name}`;
  const errorId = `${reactId}-${name}-error`;

  const renderPlaceholder =
    placeholder || name.charAt(0).toUpperCase() + name.slice(1);
  const accessibleLabel = label ?? renderPlaceholder;

  const fieldError = error[name];
  const hasError = Boolean(fieldError);

  const errorMessage = (() => {
    if (!fieldError) return null;
    if (fieldError.type === "required") {
      return requiredMessage ?? `${accessibleLabel} is required`;
    }
    return fieldError.message ? String(fieldError.message) : "Invalid value";
  })();

  return (
    <div className="w-full space-y-2">
      <label htmlFor={inputId} className="sr-only">
        {accessibleLabel}
      </label>
      {isTextArea ? (
        <textarea
          id={inputId}
          rows={rows}
          placeholder={renderPlaceholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          {...register(name, rule)}
          className="w-full rounded-lg bg-neutral-50 p-2 outline outline-neutral-300 focus:outline-neutral-400 dark:bg-neutral-900 dark:outline-neutral-700"
        />
      ) : (
        <input
          id={inputId}
          type={type}
          placeholder={renderPlaceholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          {...register(name, rule)}
          className="w-full rounded-lg bg-neutral-50 p-2 outline outline-neutral-300 focus:outline-neutral-400 dark:bg-neutral-900 dark:outline-neutral-700"
        />
      )}
      {errorMessage && (
        <p id={errorId} role="alert" className="text-xs text-red-400">
          *{errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;
