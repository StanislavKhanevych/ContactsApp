import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import useContactOperations from '../../services/useContactOperations';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

type TCreateContactProps = {
  navigation: any;
  route: any;
};

const CreateContactScreen = ({navigation, route}: TCreateContactProps) => {
  const {addContact, updateContact} = useContactOperations();
  const {editMode, contactInfo: initialContactInfo} = route.params || {};

  const initialPhoneNumbers = useMemo(
    () => (editMode ? initialContactInfo.phoneNumbers : ['']),
    [editMode, initialContactInfo],
  );

  const initialEmailAddresses = useMemo(
    () => (editMode ? initialContactInfo.emailAddresses : ['']),
    [editMode, initialContactInfo],
  );

  const [firstName, setFirstName] = useState(
    editMode ? initialContactInfo.firstName : '',
  );
  const [lastName, setLastName] = useState(
    editMode ? initialContactInfo.lastName : '',
  );
  const [phoneNumbers, setPhoneNumbers] =
    useState<string[]>(initialPhoneNumbers);
  const [emailAddresses, setEmailAddresses] = useState<string[]>(
    initialEmailAddresses,
  );

  const handlePhoneNumberChange = useCallback(
    (text: string, index: number) => {
      const newPhoneNumbers = [...phoneNumbers];
      newPhoneNumbers[index] = text;
      setPhoneNumbers(newPhoneNumbers);
    },
    [phoneNumbers],
  );

  const handleEmailChange = useCallback(
    (text: string, index: number) => {
      const newEmailAddresses = [...emailAddresses];
      newEmailAddresses[index] = text;
      setEmailAddresses(newEmailAddresses);
    },
    [emailAddresses],
  );

  const addPhoneNumberField = useCallback(() => {
    setPhoneNumbers([...phoneNumbers, '']);
  }, [phoneNumbers]);

  const addEmailField = useCallback(() => {
    setEmailAddresses([...emailAddresses, '']);
  }, [emailAddresses]);

  const handleSaveContact = useCallback(async () => {
    try {
      if (editMode) {
        const updatedContact = {
          recordID: initialContactInfo.recordID,
          givenName: firstName,
          familyName: lastName,
          phoneNumbers: phoneNumbers
            .filter(p => p)
            .map(phoneNumber => ({
              label: 'mobile',
              number: phoneNumber,
            })),
          emailAddresses: emailAddresses
            .filter(e => e)
            .map(email => ({
              label: 'work',
              email: email,
            })),
        };
        await updateContact(updatedContact);
      } else {
        await addContact(firstName, lastName, phoneNumbers, emailAddresses);
      }
      navigation.navigate('ContactsList');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  }, [
    editMode,
    initialContactInfo,
    firstName,
    lastName,
    phoneNumbers,
    emailAddresses,
    addContact,
    updateContact,
    navigation,
  ]);

  const renderInputField = ({
    item,
    index,
    type,
  }: {
    item: string;
    index: number;
    type: 'phone' | 'email';
  }) => {
    const placeholder = type === 'phone' ? 'Phone Number' : 'Email Address';
    const keyboardType = type === 'phone' ? 'phone-pad' : 'default';
    const handleChange =
      type === 'phone' ? handlePhoneNumberChange : handleEmailChange;

    return (
      <TextInput
        key={index}
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={item}
        onChangeText={text => handleChange(text, index)}
      />
    );
  };

  const renderDetailsList = ({
    data,
    type,
    callBack,
  }: {
    data: string[];
    type: 'phone' | 'email';
    callBack: () => void;
  }) => {
    return (
      <View>
        {data.map((item, index) => (
          <View key={`${type}-${index}`}>
            {renderInputField({item, index, type})}
          </View>
        ))}
        <Pressable style={styles.addButton} onPress={callBack}>
          <Ionicons name="add-circle-outline" size={24} color="green" />
          <Text style={styles.addButtonText}>add {type}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
        <Text style={styles.doneText} onPress={handleSaveContact}>
          Done
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            source={{uri: 'https://via.placeholder.com/100'}}
            style={styles.avatar}
          />
          <Pressable>
            <Text style={styles.editText}>Edit</Text>
          </Pressable>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
          {renderDetailsList({
            data: phoneNumbers,
            type: 'phone',
            callBack: addPhoneNumberField,
          })}
          {renderDetailsList({
            data: emailAddresses,
            type: 'email',
            callBack: addEmailField,
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default CreateContactScreen;
