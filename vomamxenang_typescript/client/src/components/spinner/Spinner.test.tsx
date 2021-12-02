import { testSnapshots } from 'utils/test';
import Spinner from 'components/spinner/Spinner';

describe('<Spinner />', () => {
  testSnapshots(Spinner, [
    {
      props: {},
      description: 'default render Spinner'
    }
  ]);
});
