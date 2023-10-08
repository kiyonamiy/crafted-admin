import { IFormFeedback } from "@formily/core";
import { observer, useParentForm } from "@formily/react";
import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";
import React from "react";

export interface ISubmitProps extends ButtonProps {
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (values: any) => any;
  onSubmitSuccess?: (payload: unknown) => void;
  onSubmitFailed?: (feedbacks: IFormFeedback[]) => void;
}

export const Submit: React.FC<React.PropsWithChildren<ISubmitProps>> = observer(
  ({
    onSubmit,
    onSubmitFailed,
    onSubmitSuccess,
    onClick,
    loading,
    children,
    ...restProps
  }: ISubmitProps) => {
    const form = useParentForm();
    return (
      <Button
        htmlType={onSubmit ? "button" : "submit"}
        type="primary"
        {...restProps}
        loading={loading ?? form.submitting}
        onClick={(e) => {
          if (onClick?.(e) === false) {
            return;
          }
          if (onSubmit) {
            void form
              .submit(onSubmit)
              .then(onSubmitSuccess)
              .catch(onSubmitFailed);
          }
        }}
      >
        {children}
      </Button>
    );
  },
  {
    forwardRef: true,
  },
);

export default Submit;
