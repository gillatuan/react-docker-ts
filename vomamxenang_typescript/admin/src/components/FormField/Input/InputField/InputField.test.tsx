import { testSnapshots } from 'utils/test';
import { Input } from 'reactstrap';

jest.mock('formik', () => ({
  useField: (name: string) => {
    return [null, { value: 'Test value' }, { setValue: jest.fn() }];
  }
}));

describe('<InputField />', () => {
  testSnapshots(Input, [
    {
      props: {
        component: 'input',
        id: 'render_input',
        key: 'render_input',
        name: 'test'
      },
      description: 'renders input correctly'
    },
    {
      props: {
        component: 'input',
        disabled: true,
        id: 'render_disable_input',
        key: 'render_disable_input',
        name: 'test'
      },
      description: 'renders disable input correctly'
    },
    {
      props: {
        component: 'input',
        readOnly: true,
        id: 'render_readonly_input',
        key: 'render_readonly_input',
        name: 'test'
      },
      description: 'renders readonly input'
    },
    {
      props: {
        component: 'input',
        id: 'render_input_email',
        key: 'render_input_email',
        name: 'test',
        type: 'email'
      },
      description: 'renders input is email'
    },
    {
      props: {
        component: 'input',
        id: 'render_select',
        key: 'render_select',
        name: 'test',
        type: 'select'
      },
      description: 'renders input is select'
    },
    {
      props: {
        component: 'input',
        id: 'render_select_multi',
        key: 'render_select_multi',
        multiple: true,
        name: 'test',
        type: 'select'
      },
      description: 'renders input is select multi'
    },
    {
      props: {
        component: 'input',
        id: 'render_file',
        key: 'render_file',
        multiple: true,
        name: 'test',
        type: 'file'
      },
      description: 'renders input is file'
    },
    {
      props: {
        component: 'input',
        id: 'render_textarea',
        key: 'render_textarea',
        multiple: true,
        name: 'test',
        type: 'textarea'
      },
      description: 'renders input is textarea'
    },
    {
      props: {
        component: 'input',
        id: 'render_search',
        key: 'render_search',
        multiple: true,
        name: 'test',
        type: 'search'
      },
      description: 'renders input is search'
    },
    {
      props: {
        component: 'input',
        id: 'render_image',
        key: 'render_image',
        multiple: true,
        name: 'test',
        type: 'image'
      },
      description: 'renders input is image'
    },
    {
      props: {
        component: 'input',
        id: 'render_number',
        key: 'render_number',
        multiple: true,
        name: 'test',
        type: 'number'
      },
      description: 'renders input is number'
    },
    {
      props: {
        component: 'input',
        id: 'render_date',
        key: 'render_date',
        multiple: true,
        name: 'test',
        type: 'date'
      },
      description: 'renders input is date'
    },
    {
      props: {
        component: 'input',
        id: 'render_checkbox',
        key: 'render_checkbox',
        multiple: true,
        name: 'test',
        type: 'checkbox'
      },
      description: 'renders input is checkbox'
    },
    {
      props: {
        component: 'input',
        disabled: true,
        id: 'render_checkbox',
        key: 'render_checkbox',
        multiple: true,
        name: 'test',
        type: 'checkbox'
      },
      description: 'renders input is disabled checkbox'
    },
    {
      props: {
        component: 'input',
        id: 'render_custom_checkbox',
        key: 'render_custom_checkbox',
        multiple: true,
        name: 'test',
        type: 'checkbox'
      },
      description: 'renders input is Custom checkbox'
    },
    {
      props: {
        component: 'input',
        disabled: true,
        id: 'render_custom_checkbox',
        key: 'render_custom_checkbox',
        multiple: true,
        name: 'test',
        type: 'checkbox'
      },
      description: 'renders input is disabled  Custom checkbox'
    },
    {
      props: {
        component: 'input',
        id: 'render_radio',
        key: 'render_radio',
        multiple: true,
        name: 'test',
        type: 'radio'
      },
      description: 'renders input is radio'
    },
    {
      props: {
        component: 'input',
        disabled: true,
        id: 'render_radio',
        key: 'render_radio',
        multiple: true,
        name: 'test',
        type: 'radio'
      },
      description: 'renders input is disabled radio'
    },
    {
      props: {
        component: 'input',
        id: 'render_custom_radio',
        key: 'render_custom_radio',
        multiple: true,
        name: 'test',
        type: 'radio'
      },
      description: 'renders input is Custom Radio'
    },
    {
      props: {
        component: 'input',
        disabled: true,
        id: 'render_custom_radio',
        key: 'render_custom_radio',
        multiple: true,
        name: 'test',
        type: 'radio'
      },
      description: 'renders input is disabled Custom Radio'
    }
  ]);
});
