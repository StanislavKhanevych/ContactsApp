import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import ContactsListScreen from '../../ContactsListScreen/ContactsListScreen';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('../../../services/useContacts', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    contacts: [
      {
        recordID: '6b2237ee0df85980',
        emailAddresses: [
          {
            label: 'work',
            email: 'carl-jung@example.com',
          },
        ],
        familyName: 'Jung',
        givenName: 'Carl',
        phoneNumbers: [
          {
            label: 'mobile',
            number: '(555) 555-5555',
          },
        ],
        hasThumbnail: true,
        thumbnailPath: 'content://com.android.contacts/display_photo/3',
      },
    ],
    permissionGranted: true,
    setContacts: jest.fn(),
  }),
}));

describe('ContactsListScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders items correctly', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <ContactsListScreen navigation={mockNavigation} />
      </NavigationContainer>,
    );
    const list = getByTestId('flat-list');

    expect(list).toBeDefined();
  });

  it('checks if search works correctly', async () => {
    const {getByTestId, queryByText} = render(
      <NavigationContainer>
        <ContactsListScreen navigation={mockNavigation} />
      </NavigationContainer>,
    );

    const searchInput = getByTestId('search-bar');
    fireEvent.changeText(searchInput, 'Jung');

    await waitFor(() => {
      expect(queryByText('Jack')).toBeNull();
      expect(queryByText('Jung')).toBeTruthy();
      expect(queryByText('Alice')).toBeNull();
    });
  });

  it('navigates to CreateContact screen on add-contact press', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <ContactsListScreen navigation={mockNavigation} />
      </NavigationContainer>,
    );
    const addButton = getByTestId('add-contact');
    fireEvent.press(addButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('CreateContact');
  });

  it('navigates to ContactDetails screen on contact item press', () => {
    const {getByText} = render(
      <NavigationContainer>
        <ContactsListScreen navigation={mockNavigation} />
      </NavigationContainer>,
    );
    const contactItem = getByText('Jung');
    fireEvent.press(contactItem);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('ContactDetails', {
      contactInfo: {id: '6b2237ee0df85980'},
    });
  });

  it('should match the snapshot', () => {
    const component = render(
      <NavigationContainer>
        <ContactsListScreen navigation={mockNavigation} />
      </NavigationContainer>,
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
