import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  SectionList,
  SectionListData,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Contact} from 'react-native-contacts';
import useContacts from '../../services/useContacts';
import {TContactsListScreenProps} from '../../types/types';
import ContactsCard from '../../components/ContactCard/ContactCard';
import styles from './styles';
import {
  useFilteredContacts,
  useGroupedContacts,
} from '../../services/useContactFilters';

const ContactsListScreen = ({navigation}: TContactsListScreenProps) => {
  const [search, setSearch] = useState('');
  const contacts = useContacts();
  const filteredContacts = useFilteredContacts(contacts, search);
  const groupedContacts = useGroupedContacts(filteredContacts);

  const handlePressContact = (contactId: string) => {
    navigation.navigate('ContactDetails', {contactInfo: {id: contactId}});
  };

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: SectionListData<Contact>;
  }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const renderItem = ({item}: {item: Contact}) => (
    <Pressable onPress={() => handlePressContact(item.recordID)}>
      <ContactsCard contactInfo={item} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Ionicons
        name="add-circle"
        size={62}
        color="#007AFF"
        style={styles.icon}
        onPress={() => navigation.navigate('CreateContact')}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
      <SectionList
        sections={groupedContacts}
        keyExtractor={(item: Contact) => item.recordID}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled
      />
    </View>
  );
};

export default ContactsListScreen;
