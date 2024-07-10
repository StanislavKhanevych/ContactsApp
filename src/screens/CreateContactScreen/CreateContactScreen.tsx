import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Pressable,
} from 'react-native';
import useContactOperations from '../../services/useContactOperations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Contact} from 'react-native-contacts';
import ContactPhoto from '../../components/ContactPhoto/ContactPhoto';
import useContacts from '../../services/useContacts';

import styles from './styles';

type TCreateContactProps = {
  navigation: any;
  route: any;
};

const CreateContactScreen = ({navigation, route}: TCreateContactProps) => {
  const {permissionGranted, setContacts} = useContacts();
  const {addContact, updateContact} = useContactOperations(
    permissionGranted,
    setContacts,
  );
  const {editMode, contactInfo: initialContactInfo} = route.params || {};

  const [firstName, setFirstName] = useState<Contact['givenName']>(
    editMode ? initialContactInfo.givenName : '',
  );
  const [lastName, setLastName] = useState<Contact['familyName']>(
    editMode ? initialContactInfo.familyName : '',
  );

  const [phoneNumbers, setPhoneNumbers] = useState<Contact['phoneNumbers']>(
    editMode
      ? initialContactInfo.phoneNumbers
      : [{number: '', label: 'mobile'}],
  );

  const [emailAddresses, setEmailAddresses] = useState<
    Contact['emailAddresses']
  >(
    editMode ? initialContactInfo.emailAddresses : [{email: '', label: 'work'}],
  );

  const isDoneButtonDisabled =
    !firstName &&
    !lastName &&
    phoneNumbers.every(phone => phone.number.length === 0);

  const handlePhoneNumberChange = useCallback(
    (text: string, index: number) => {
      const newPhoneNumbers = [...phoneNumbers];
      newPhoneNumbers[index].number = text;
      setPhoneNumbers(newPhoneNumbers);
    },
    [phoneNumbers],
  );

  const handleEmailChange = useCallback(
    (text: string, index: number) => {
      const newEmailAddresses = [...emailAddresses];
      newEmailAddresses[index].email = text;
      setEmailAddresses(newEmailAddresses);
    },
    [emailAddresses],
  );

  const handleFirstName = useCallback(
    (text: string) => {
      setFirstName(text);
    },
    [firstName],
  );

  const handleLastName = useCallback(
    (text: string) => {
      setLastName(text);
    },
    [lastName],
  );

  const addPhoneNumberField = useCallback(() => {
    setPhoneNumbers([...phoneNumbers, {number: '', label: 'mobile'}]);
  }, [phoneNumbers]);

  const addEmailField = useCallback(() => {
    setEmailAddresses([...emailAddresses, {email: '', label: 'work'}]);
  }, [emailAddresses]);

  const handleSaveContact = useCallback(async () => {
    try {
      if (editMode) {
        const updatedContact = {
          ...initialContactInfo,
          givenName: firstName,
          familyName: lastName,
          phoneNumbers: phoneNumbers,
          emailAddresses: emailAddresses,
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
    type: 'number' | 'email';
  }) => {
    const placeholder = type === 'number' ? 'Phone Number' : 'Email Address';
    const keyboardType = type === 'number' ? 'phone-pad' : 'default';
    const handleChange =
      type === 'number' ? handlePhoneNumberChange : handleEmailChange;

    return (
      <TextInput
        key={index}
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={item[type]}
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
    type: 'number' | 'email';
    callBack: () => void;
  }) => {
    const isAddButtonActive = data.every(item => item[type].length !== 0);
    return (
      <View>
        {data.map((item, index) => (
          <View key={`${type}-${index}`}>
            {renderInputField({item, index, type})}
          </View>
        ))}
        <Pressable
          style={styles.addButton}
          onPress={callBack}
          disabled={!isAddButtonActive}>
          <Ionicons name="add-circle-outline" size={24} color="green" />
          <Text
            style={[
              styles.addButtonText,
              !isAddButtonActive && styles.disabled,
            ]}>
            add {type}
          </Text>
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
        <Pressable onPress={handleSaveContact} disabled={isDoneButtonDisabled}>
          <Text
            style={[styles.doneText, isDoneButtonDisabled && styles.disabled]}>
            Done
          </Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.avatarContainer}>
          <ContactPhoto
            contact={{
              givenName: initialContactInfo?.firstName,
              hasThumbnail: initialContactInfo?.hasThumbnail,
            }}
            photoURI={initialContactInfo?.thumbnailPath}
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
            onChangeText={handleFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={handleLastName}
          />
          {renderDetailsList({
            data: phoneNumbers,
            type: 'number',
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
