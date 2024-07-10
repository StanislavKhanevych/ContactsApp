import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 17,
  },
  doneText: {
    color: '#007AFF',
    fontSize: 17,
  },
  disabled: {
    color: '#ccc',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  editText: {
    color: '#007AFF',
    fontSize: 17,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#007AFF',
    fontSize: 17,
    marginLeft: 5,
  },
  defaultText: {
    color: '#007AFF',
    fontSize: 17,
  },
});
