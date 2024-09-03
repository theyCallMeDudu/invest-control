export interface IFormField {
  label: string;
  type: string;
  name: string;
  value?: string;
  required?:  boolean | string;
}

export interface IFormConfig {
  fields: IFormField[];
  buttonText: string;
  onSubmit: (formValues: { [key: string]: any }) => void;
}
