import { testSnapshots } from 'utils/test';
import HelmetWrapper from 'components/HelmetWrapper';

describe('<HelmetWrapper />', () => {
  testSnapshots(HelmetWrapper, [
    {
      props: {},
      description: 'default render HelmetWrapper'
    }
  ]);
});
