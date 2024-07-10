import {useMemo} from 'react';
import {Contact} from 'react-native-contacts';

export const useFilteredContacts = (contacts: Contact[], search: string) => {
  return useMemo(() => {
    if (!search.trim()) {
      return contacts;
    }
    const searchLower = search.toLowerCase();
    return contacts.filter(
      contact =>
        contact?.givenName.toLowerCase().includes(searchLower) ||
        contact?.familyName.toLowerCase().includes(searchLower) ||
        contact?.phoneNumbers.some(phone => phone.number.includes(search)),
    );
  }, [contacts, search]);
};

export const useGroupedContacts = (contacts: Contact[]) => {
  return useMemo(() => {
    const grouped = contacts.reduce(
      (acc: {[key: string]: Contact[]}, contact) => {
        const firstLetter = contact?.givenName.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
      },
      {},
    );

    return Object.keys(grouped)
      .sort()
      .map(letter => ({title: letter, data: grouped[letter]}));
  }, [contacts]);
};
