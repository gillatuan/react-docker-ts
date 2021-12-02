import {
  validateEmail,
  validateRequired,
  checkValueError,
  validateContainLeastNumber,
  validateContainLeastCharacter,
  validateNumberDiscountValue,
  validatePercentDiscountValue,
  validateAlphaNumeric,
  validateNumber,
  validateNumberLarger0,
  validatePoint,
  validateMinLength,
  validateMaxLength,
  ValidateSizeImg,
  validateValueType,
  validateOnlyAlphaNumeric,
  validationRules,
  validateIsUrl,
  validateOnlyPositiveNumber,
  validateCompareToField,
  validateMaxValue
} from 'utils/validation';

jest.mock('formik', () => ({
  useField: (name: string) => {
    return [null, { value: 'Test value' }, { setValue: jest.fn() }];
  }
}));

// inputEle.simulate('change', { target: { value: 'admin@shahid.com' } });

describe('WidgetViews utils', () => {
  describe('validation', () => {
    describe('validateEmail', () => {
      // define input value
      test('should return true for valid email', () => {
        const validCases = [
          'firstname.lastname@domain.com',
          'email@subdomain.domain.com',
          'firstname+lastname@domain.com',
          '"email"@domain.com',
          '1234567890@domain.com',
          'email@domain-one.com',
          '_______@domain.com',
          'email@domain.name',
          'email@domain.co.jp',
          'firstname-lastname@domain.com',
          'valid@gmail.com'
        ];

        const result = validCases.map(validateEmail);
        const expectResult: any = [];
        expectResult.length = validCases.length;
        expectResult.fill(true);
        expect(result).toEqual(expectResult);
      });

      test('should return false for invalid email', () => {
        const inValidEmail = 'firstname@.lastname@domain.com';
        const result = validateEmail(inValidEmail);
        expect(result).toEqual(false);
      });
    });

    describe('validateRequired', () => {
      test('should return false on empty', () => {
        expect(validateRequired('')).toBe(false);
      });
      test('should return true on value', () => {
        expect(validateRequired('abd')).toBe(true);
      });
    });

    describe('validateMinLength', () => {
      it('should return false on length less than n', () => {
        const minLength = 4;
        expect(validateMinLength(minLength)('a')).toBe(false);
      });
      it('should return true on length more than or equal n', () => {
        const minLength = 3;
        expect(validateMinLength(minLength)('abc')).toBe(true);
        expect(validateMinLength(minLength)('abcd')).toBe(true);
      });
    });

    describe('validateMaxLength', () => {
      const maxLength = 8;
      expect(validateMaxLength(maxLength)('test')).toEqual(true);
    });
    describe('validateContainLeastCharacter', () => {
      test('should return false with no character', () => {
        expect(validateContainLeastCharacter('12123')).toEqual(false);
      });
      test('should return false on containing character', () => {
        expect(validateContainLeastCharacter('12123abc')).toEqual(true);
        expect(validateContainLeastCharacter('abc123')).toEqual(true);
      });
    });
    describe('validateContainLeastNumber', () => {
      test('should return false on no lower case', () => {
        expect(validateContainLeastNumber('QWEasd')).toBe(false);
      });
      test('should return true on containing number', () => {
        expect(validateContainLeastNumber('21')).toBe(true);
        expect(validateContainLeastNumber('ASFa99')).toBe(true);
      });
    });
    describe('validateAlphaNumeric', () => {
      test('should return undefined when value valid ', () => {
        expect(validateAlphaNumeric('ab12')).toEqual(undefined);
      });
      test('should return FORM_ERROR_REQUIRED_FIELD when do not have value ', () => {
        expect(validateAlphaNumeric('')).toEqual('FORM_ERROR_REQUIRED_FIELD');
      });
      test('should return invalid data when value has special character ', () => {
        expect(validateAlphaNumeric('abc!')).toEqual('INVALID_DATA');
      });
    });

    describe('validatePoint', () => {
      test('should return undefined when value valid ', () => {
        expect(validatePoint('12')).toEqual(undefined);
      });
      test('should return FORM_ERROR_REQUIRED_FIELD when do not have value ', () => {
        expect(validatePoint('')).toEqual('FORM_ERROR_REQUIRED_FIELD');
      });
      test('should return invalid data when value has length greater than 10 ', () => {
        expect(validatePoint('abc4234234243434!')).toEqual('INVALID_DATA');
      });
    });
    describe('validateNumber', () => {
      test('should return undefined when value valid ', () => {
        expect(validateNumber('12')).toEqual(undefined);
      });
      test('should return FORM_ERROR_REQUIRED_FIELD when do not have value ', () => {
        expect(validateNumber('')).toEqual('FORM_ERROR_REQUIRED_FIELD');
      });
      test('should return invalid data when value has character or special character ', () => {
        expect(validateNumber('abc44!')).toEqual('INVALID_DATA');
      });
    });
    describe('validateNumberLarger0', () => {
      test('should return undefined when value valid ', () => {
        expect(validateNumberLarger0('12')).toEqual(undefined);
      });
      test('should return FORM_ERROR_REQUIRED_FIELD when do not have value ', () => {
        expect(validateNumberLarger0('')).toEqual('FORM_ERROR_REQUIRED_FIELD');
      });
      test('should return invalid data when value has character or special character ', () => {
        expect(validateNumberLarger0('abc44!')).toEqual('INVALID_DATA');
      });
      test('should return invalid data when value is equal to 0 ', () => {
        expect(validateNumberLarger0('0')).toEqual('INVALID_DATA');
      });
    });
    describe('validateSizeImg ', () => {
      test('should return false when file size greater than file size image', () => {
        const file = {
          files: [
            {
              size: 100000000000000
            }
          ]
        };
        expect(ValidateSizeImg(file)).toEqual(false);
      });
    });
    describe('validateNumberDiscountValue', () => {
      test('should return undefined when value valid ', () => {
        expect(validateNumberDiscountValue('12')).toEqual(undefined);
      });
      test('should return FORM_ERROR_REQUIRED_FIELD when do not have value ', () => {
        expect(validateNumberDiscountValue('')).toEqual('');
      });
      test('should return invalid data when value has character or special character ', () => {
        expect(validateNumberDiscountValue('abc44!')).toEqual('INVALID_DATA');
      });
      test('should return invalid data when value is equal to 0 ', () => {
        expect(validateNumberDiscountValue('0')).toEqual('DISCOUNT_VALUE_MUST_BE_SMALLER_THAN_99999999');
      });
      test('should return invalid data when value is smaller than 99999999 ', () => {
        expect(validateNumberDiscountValue('999999999999')).toEqual('DISCOUNT_VALUE_MUST_BE_SMALLER_THAN_99999999');
      });
    });
    describe('validatePercentDiscountValue', () => {
      test('should return string when value valid ', () => {
        expect(validatePercentDiscountValue('12')).toEqual('');
      });
      test('should return FORM_ERROR_REQUIRED_FIELD when do not have value ', () => {
        expect(validatePercentDiscountValue('')).toEqual('');
      });
      test('should return invalid data when value has character or special character ', () => {
        expect(validatePercentDiscountValue('abc44!')).toEqual('INVALID_DATA');
      });
      test('should return invalid data when value is equal to 0 ', () => {
        expect(validatePercentDiscountValue('0')).toEqual('PLEASE_ENTER_THE_NUMBER_FROM_0_TO_100');
      });
      test('should return invalid data when value is smaller than 100 ', () => {
        expect(validatePercentDiscountValue('101')).toEqual('PLEASE_ENTER_THE_NUMBER_FROM_0_TO_100');
      });
      test('should return invalid data when value has more than 2 decimals ', () => {
        expect(validatePercentDiscountValue('1.323')).toEqual('INVALID_DATA');
      });
    });
    describe('validateValueType', () => {
      test('should return empty string when value valid ', () => {
        expect(validateValueType('12')).toEqual('');
      });
      test('should return FORM_ERROR_REQUIRED_FIELD when do not have value ', () => {
        expect(validateValueType('')).toEqual('FORM_ERROR_REQUIRED_FIELD');
      });
      test('should return invalid data when value has character or special character ', () => {
        expect(validateValueType('abc44!')).toEqual('INVALID_DATA');
      });
    });
    describe('checkValueError', () => {
      const validateFields = {
        email: [
          {
            validator: validateRequired,
            code: 'FORM_ERROR_REQUIRED_FIELD'
          },
          {
            validator: validateEmail,
            code: 'FORM_ERROR_REQUIRED_FIELD_EMAIL_INVALID'
          }
        ],
        password: [
          {
            validator: validateRequired,
            code: 'FORM_ERROR_REQUIRED_FIELD'
          }
        ]
      };
      test('should return empty object when value valid ', async () => {
        const results = await checkValueError(validateFields)({
          email: 'abc@gmail.com',
          password: '12345678'
        });
        expect(results).toEqual({});
      });
    });
    describe('validateOnlyAlphaNumeric', () => {
      test('should return undefined when value valid ', () => {
        expect(validateOnlyAlphaNumeric('ab12')).toEqual(true);
      });
      test('should return undefined when do not have value ', () => {
        expect(validateOnlyAlphaNumeric('')).toEqual(true);
      });
      test('should return invalid data when value has special character ', () => {
        expect(validateAlphaNumeric('abc!')).toEqual('INVALID_DATA');
      });
    });
    describe('validateIsUrl', () => {
      test('should return true when value valid ', () => {
        expect(validateIsUrl('https://www.google.com/')).toEqual(true);
      });
      test('should return undefined when do not have value ', () => {
        expect(validateIsUrl('')).toEqual(true);
      });
      test('should return invalid data when value has special character ', () => {
        expect(validateIsUrl('abc')).toEqual(false);
      });
    });
    describe('validateOnlyPositiveNumber', () => {
      test('should return true when value is greater than or equal to 0', () => {
        expect(validateOnlyPositiveNumber(1)).toBeTruthy();
      });

      test('should return false when value is less than 0', () => {
        expect(validateOnlyPositiveNumber(-1)).toBeFalsy();
      });
    });
    describe('validateCompareToField', () => {
      const fieldName = 'sampleField';
      const formValues = {
        sampleField: 10
      };
      test('should return true when value greater than field value', () => {
        expect(validateCompareToField(fieldName, 'gt')(12, formValues)).toBeTruthy();
      });
      test('should return true when value less than field value', () => {
        expect(validateCompareToField(fieldName, 'lt')(9, formValues)).toBeTruthy();
      });
      test('should return true when value greater than or equal to field value', () => {
        expect(validateCompareToField(fieldName, 'gte')(10, formValues)).toBeTruthy();
      });
      test('should return true when value less than or equal to field value', () => {
        expect(validateCompareToField(fieldName, 'lte')(9, formValues)).toBeTruthy();
      });
    });
    describe('validateMaxValue', () => {
      test('should return true when value less than or equal to max value', () => {
        const value = 15;
        const maxValue = 15;
        expect(validateMaxValue(maxValue)(value)).toBeTruthy();
      });
      test('should return false when value greater than max value', () => {
        const value = 20;
        const maxValue = 15;
        expect(validateMaxValue(maxValue)(value)).toBeFalsy();
      });
    });
  });
});
