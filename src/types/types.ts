import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  ContactsListScreen: undefined;
  ContactDetailsScreen: undefined;
  CreateContactScreen: undefined;
};

export type ContactDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'ContactDetails'
>;
export type ContactDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ContactDetails'
>;

export type ContactsListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ContactsList'
>;

export type TContactsListScreenProps = {
  navigation: ContactsListScreenNavigationProp;
};
