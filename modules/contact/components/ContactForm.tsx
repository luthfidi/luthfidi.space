"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import InputField from "@/common/components/elements/InputField";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface FormEmail {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormEmail>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const t = useTranslations("ContactPage");

  useEffect(() => {
    if (!isSuccess) return;
    const timeout = setTimeout(() => setIsSuccess(false), 5000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);

  const buttonText = isLoading
    ? t("form.sending")
    : isSuccess
      ? t("form.success")
      : t("form.button");

  const handleFormSubmit = async (payload: FormEmail) => {
    setIsLoading(true);
    setSubmitError(null);
    try {
      const response = await axios.post("/api/email", payload);
      if (response.status === 200) {
        setIsSuccess(true);
        reset();
      }
    } catch (error) {
      console.error(error);
      setSubmitError(t("form.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2>{t("form.title")}</h2>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        aria-busy={isLoading}
        className="space-y-4 transition-all duration-300"
      >
        <div className="flex w-full flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <InputField
            name="name"
            label={t("form.input_name")}
            placeholder={t("form.input_name")}
            requiredMessage={t("form.errors.required", {
              field: t("form.input_name"),
            })}
            rule={{ required: true }}
            register={register}
            error={errors}
          />
          <InputField
            name="email"
            type="email"
            label={t("form.input_email")}
            placeholder={t("form.input_email")}
            requiredMessage={t("form.errors.required", {
              field: t("form.input_email"),
            })}
            rule={{
              required: true,
              pattern: {
                value: EMAIL_REGEX,
                message: t("form.errors.invalid_email"),
              },
            }}
            register={register}
            error={errors}
          />
        </div>
        <InputField
          name="message"
          label={t("form.input_message")}
          placeholder={t("form.input_message")}
          requiredMessage={t("form.errors.required", {
            field: t("form.input_message"),
          })}
          rule={{ required: true }}
          register={register}
          error={errors}
          isTextArea
        />
        <button
          disabled={isLoading}
          type="submit"
          className="w-full rounded-lg bg-neutral-600 px-4 py-2 text-neutral-50 shadow-md transition-all duration-300 hover:bg-neutral-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 dark:bg-neutral-800 hover:dark:bg-neutral-700"
        >
          {buttonText}
        </button>

        <div role="status" aria-live="polite" className="sr-only">
          {isLoading
            ? t("form.sending")
            : isSuccess
              ? t("form.success")
              : ""}
        </div>

        {submitError && (
          <p role="alert" className="text-sm text-red-500">
            {submitError}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
