import { createForm as formilyCreateForm, Form } from "@formily/core";
import { Field, FormProvider } from "@formily/react";
import { App } from "antd";
import { useCallback } from "react";

import FormItem from "@/components/form/form-item";
import FormLayout from "@/components/form/form-layout";

interface FieldProps
  extends Omit<React.ComponentProps<typeof Field>, "decorator" | "name"> {
  name: string;
}

/**
 *
 * @title （可选）打开的表单的默认标题（如果每次打开的标题都一样，则在此处设置一次即可）
 * @items 必填，表单填写项
 * @onConfirm （可选）表单的默认提交回调（如果每次回调都一样，则在此处设置一次即可）
 */
export function useFormModal<FormResult extends object>({
  title: defaultTitle,
  createForm = formilyCreateForm<FormResult>,
  items,
  onConfirm: defaultOnConfirm,
}: {
  title?: string;
  createForm?: () => Form<FormResult>;
  items: FieldProps[];
  onConfirm?: (formResult: FormResult) => Promise<void>;
}) {
  const { modal } = App.useApp();
  /**
   * 打开表单
   * @param title（可选）表单标题，默认等于 useFormModal 传入的 title
   * @param form（可选）自定义新建的表单数据（可以带表单联动），否则就是默认创建的 createForm<FormResult>()
   * @param initialData（可选）给表单赋初值（一般是“修改弹窗”赋默认值）
   * @param onConfirm（可选）表单提交后的回调（可以对用户填写的表单结果进行处理，例如向后端发起请求），默认等于 useFormModal 传入的 onConfirm
   */
  const openFormModal = useCallback(
    ({
      title = defaultTitle,
      form = createForm(),
      initialData,
      onConfirm = defaultOnConfirm,
    }: {
      title?: string;
      form?: Form<FormResult>;
      initialData?: FormResult;
      onConfirm?: (formResult: FormResult) => Promise<void>;
    }) => {
      if (initialData != null) {
        form.setValues(initialData);
      }
      const handleOk = async () => {
        const formResult = await form.submit<FormResult>();
        if (formResult == null) {
          return;
        }
        await onConfirm?.(formResult);
        return;
      };

      void modal.confirm({
        title,
        width: "35vw",
        icon: null,
        closable: true,
        content: (
          <FormProvider form={form}>
            <FormLayout
              colon={false}
              layout="horizontal"
              labelAlign="left"
              labelCol={9}
              wrapperCol={15}
            >
              {items.map((item) => (
                <Field key={item.name} decorator={[FormItem]} {...item} />
              ))}
            </FormLayout>
          </FormProvider>
        ),
        onOk: handleOk,
      });
    },
    [createForm, defaultOnConfirm, defaultTitle, items, modal],
  );

  return openFormModal;
}
