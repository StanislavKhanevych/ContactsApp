import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, TextInput, Alert} from 'react-native';
import useContactOperations from '../../services/useContactOperations';

type TCreateContactProps = {
  navigation: any;
  route: any;
};

const CreateContactScreen = ({navigation, route}: TCreateContactProps) => {
  const {addContact, updateContact} = useContactOperations();
  const {editMode, contactInfo: initialContactInfo} = route.params || {};
  const [firstName, setFirstName] = useState(
    editMode ? initialContactInfo.firstName : '',
  );
  const [lastName, setLastName] = useState(
    editMode ? initialContactInfo.lastName : '',
  );
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(
    editMode ? initialContactInfo.phoneNumbers : [''],
  );

  const [emailAddresses, setEmailAddresses] = useState<string[]>(
    editMode ? initialContactInfo.emailAddresses : [''],
  );

  const handlePhoneNumberChange = (text: string, index: number) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = text;
    setPhoneNumbers(newPhoneNumbers);
  };

  const handleEmailChange = (text: string, index: number) => {
    const newEmailAddressess = [...emailAddresses];
    newEmailAddressess[index] = text;
    setEmailAddresses(newEmailAddressess);
  };

  const handleSaveContact = async () => {
    try {
      if (editMode) {
        const updatedContact = {
          recordID: initialContactInfo.recordID,
          givenName: firstName,
          familyName: lastName,
          phoneNumbers: phoneNumbers.map(phoneNumber => ({
            label: 'mobile',
            number: phoneNumber,
          })),
          emailAddresses: emailAddresses.map(email => ({
            label: 'work',
            email: email,
          })),
        };
        console.log('initialContactInfo', initialContactInfo);
        await updateContact(updatedContact);
      } else {
        await addContact(firstName, lastName, phoneNumbers);
      }
      navigation.navigate('ContactsList');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
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
        {phoneNumbers.map((phoneNumber, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={text => handlePhoneNumberChange(text, index)}
          />
        ))}
        {emailAddresses.map((email, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={text => handleEmailChange(text, index)}
          />
        ))}
      </View>
      <Button title="Save" onPress={handleSaveContact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CreateContactScreen;
