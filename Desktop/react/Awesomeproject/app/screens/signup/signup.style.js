import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  scrollView: {
    
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  header: {
    height: 150,
    marginTop: 50,
    justifyContent: 'center',
  },
  headerWelcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#198E52',
    textAlign: 'right',
  },
  headerWelcomeText_2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'right',
  },
  headerDescriptionText: {
    color: '#444262',
    fontSize: 16,
    lineHeight: 25,
    marginTop: 30,
  },
  formContainer: {
    height: 430,
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  footer: {
    height:120,
    justifyContent: 'space-around',
  },
  singupGoogle: {
    backgroundColor: '#FDFDFD',
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C1C0C8',
    flexDirection: 'row',
  },
  googleIcon: {width: 30, height: 30, marginRight: 10},
  googleText: {color: '#000000', fontSize: 16, fontWeight: '500'},
    anotherAcountText: {
    marginTop:5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default styles;
