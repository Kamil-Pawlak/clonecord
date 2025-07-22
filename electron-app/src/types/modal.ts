
export type ModalFields = {
    label: string;
    type: 'text' | 'email' | 'password' | 'url' | 'number' | 'select';
    name: string;
    placeholder: string;
    required?: boolean;
}