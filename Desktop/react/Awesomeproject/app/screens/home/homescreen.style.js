import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: '#FDFDFD',
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingTop: 15
  },
  headr: {
    width: '100%',
  },
  headerTextWelcomeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop:20
  },
  userInfoText: {
    textTransform: 'capitalize',
    fontWeight: '700',
    marginRight:10,
    fontSize: 20,
    color: '#000',
  },
  welcomeText: {
    fontSize: 20,
    color: '#444262',
    marginTop: 10,
  },
  explicationText: {
    fontSize: 16,
    color: '#312651',
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  searchInputContainer: {
    flex: 1,
    backgroundColor: '#F3F4F8',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    height: '100%',
  },
  searchTextInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    textAlign: "right"
  },
  searchImageContainer: {
    width: 50,
    height: '100%',
    backgroundColor: '#198E52',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchImage: {
    width: '50%',
    height: '50%',
    tintColor: '#F3F4F8',
    resizeMode: 'contain',
  },
  typesContainer: {width: '100%', marginTop: 16, alignItems: 'flex-end'},
  readItem: {
    width: '45%',
    height: 130,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    shadowColor: '#171717',
    },
  readItemTitle:{color: '#198E52', fontSize: 20, fontWeight: '400'},
  tab: (activeJobType, item) => ({
    paddingVertical: 12 / 2,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: activeJobType === item ? '#198E52' : '#C1C0C8',
    backgroundColor: activeJobType === item ? '#198E52' : '#FDFDFD',
  }),
  tabText: (activeJobType, item) => ({
    // fontFamily: FONT.medium,
    color: activeJobType === item ? '#FDFDFD' : '#C1C0C8',
  }),
});

export default styles;
