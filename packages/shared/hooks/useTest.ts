import {useCustomForm} from '../components/Form/Form.hook';
import {FieldTestConfig} from '../components/Form/Form.utils';

const useTestScreen = () => {
  const fields = [FieldTestConfig.TestInput, FieldTestConfig.SearchTestInput];
  const {reset, renderFrom, handleSubmit, watch, control, setValue, getValues} =
    useCustomForm({
      fields,
      defaultValues: {},
    });

  return {
    reset,
    renderFrom,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
  };
};

export default useTestScreen;
