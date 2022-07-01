import {PLUS_ICON, REMOVE_ICON} from '../../../assets';
import React, {useState, useCallback} from 'react';
import styled from 'styled-components/native';
import {CustomerInput} from './CustomerInput';
import {TextInput} from 'react-native';

interface CustomerButtonListProps {
  label: string;
  setParams: (prev: any) => void;
  data: string[];
  keyName: string;
}

interface CustomerCellProps {
  onRemove: (index: number) => void;
  index: number;
  data: string[];
  setParams: (prev: any) => void;
  keyName: string;
}

const Cell = (props: CustomerCellProps) => {
  const {onRemove, index, data, setParams} = props;
  console.log('index', index);

  // const onChangeValue = useCallback(
  //   (value: string) => {
  //     setInputText(value);
  //   },
  //   [inputText],
  // );

  // const onValueChange = useCallback((keyName: string, value: string[]) => {
  //   setParams(state => ({
  //     ...state,
  //     [keyName]: value,
  //   }));
  // }, []);
  //

  const onValueChange = useCallback((value: string) => {
    setParams(prev => {
      let _arr = [...prev['phoneNumber']];
      _arr[index] = value;
      return {
        ...prev,
        ['phoneNumber']: _arr,
      };
    });
  }, []);

  // const onValueChangePhoneNumber = useCallback((value: string) => {
  //   setParams(prev => {
  //     let _arr = [...prev['phoneNumber']];
  //     _arr[index] = value;
  //     return {
  //       ...prev,
  //       ['phoneNumber']: _arr,
  //     };
  //   });
  // }, []);

  // const onValueChangeEmail = useCallback((value: string) => {
  //   setParams(prev => {
  //     let _arr = [...prev['email']];
  //     _arr[index] = value;
  //     return {
  //       ...prev,
  //       ['email']: _arr,
  //     };
  //   });
  // }, []);
  //
  // const onValueChangeAddress = useCallback((value: string) => {
  //   setParams(prev => {
  //     let _arr = [...prev['address']];
  //     _arr[index] = value;
  //     return {
  //       ...prev,
  //       ['address']: _arr,
  //     };
  //   });
  // }, []);

  return (
    <InputContainerView>
      <InputContainer
        onPress={() => {
          onRemove(index);
        }}>
        <PlusIcon source={REMOVE_ICON} />
      </InputContainer>
      <CustomerInput
        placeholder={'Mời nhập'}
        autoFocus={true}
        value={data[index]}
        onChangeText={onValueChange}
      />
    </InputContainerView>
  );
};

export const CustomerButtonList = (props: CustomerButtonListProps) => {
  const {label, setParams, data, keyName} = props;
  const [array, setArray] = useState<string[]>([]);

  const addNewValue = useCallback(() => {
    setParams(prev => {
      let _arr = [...prev[keyName]];
      _arr.push('');
      return {...prev, [keyName]: _arr};
    });
  }, [array]);

  const onRemove = useCallback(
    (index: number) => {
      const oldArray = [...array];
      setArray(oldArray.filter((_item, _index) => _index !== index));
    },
    [array],
  );

  return (
    <Container>
      {/*Bao loi Object underfined thi them dau hoi cham*/}
      {data?.map((item, index) => {
        return (
          <Cell
            key={index}
            onRemove={onRemove}
            index={index}
            data={data}
            setParams={setParams}
          />
        );
      })}
      <ButtonContactContainer onPress={addNewValue}>
        <PlusIcon source={PLUS_ICON} />
        <ButtonContactText>{label}</ButtonContactText>
      </ButtonContactContainer>
    </Container>
  );
};

const Container = styled.View`
  background-color: white;
  align-items: center;
  flex-direction: column;
  margin-top: 24px;
`;

const PlusIcon = styled.Image`
  height: 24px;
  width: 24px;
`;

const ButtonContactText = styled.Text`
  font-family: Roboto-Regular;
  font-size: 15px;
  font-weight: 400;
  color: #333333;
  padding-left: 17px;
`;

const ButtonContactContainer = styled.TouchableOpacity`
  height: 44px;
  width: 90%;
  background-color: white;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: #e0e0e0;
`;

const InputContainer = styled.TouchableOpacity``;

const InputContainerView = styled.View`
  height: 44px;
  width: 90%;
  background-color: white;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: #e0e0e0;
`;

const InputContact = styled.TextInput`
  width: 93%;
  padding-left: 17px;
  color: #2f80ed;
  font-weight: 400;
  font-size: 15px;
  font-family: Roboto-Regular;
`;
