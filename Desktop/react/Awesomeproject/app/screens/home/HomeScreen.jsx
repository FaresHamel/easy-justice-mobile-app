import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  FlatList,
  StatusBar,
  LogBox,
  ScrollView,
} from 'react-native';
import search from '../../assets/search.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './homescreen.style';
import welcomeBackImage from "../../assets/icons/welcomeBack.png"
import lawLogo from "../../assets/icons/lawLogoHome.png";

const jobTypes = [
  {id: 2, name: 'كاتب عمومي', link: 'Clerk'},
  {id: 4, name: 'محضر قضائي', link: 'Judiciel'},
  {id: 3, name: 'موثق', link: 'Notary'},
  {id: 1, name: 'محامي', link: 'Lawyers'},
];
const condition = [
  {id: 0, name: 'القانون الدولي'},
  {id: 1, name: 'القانون الدستوري'},
  {id: 2, name: 'القانون المالي '},
  {id: 3, name: 'قانون  الضمانات الاجتماعية'},
  {id: 4, name: 'القانون الجزائي'},
  {id: 5, name: 'القانون التجاري'},
  {id: 6, name: 'القانون العمالي'},
  {id: 7, name: 'قانون الملكية'},
  {id: 8, name: 'قانون  الاسرة'},
  {id: 9, name: 'قانون الميراث'},
];

const HomeScreen = ({navigation}) => {
  const [activeJobType, setActiveJobType] = useState('محامي');
  const [userData, setUserData] = useState({});

  const [searchText, setSearchText] = useState(''); // State variable to store text
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Initially disabled

  const handleSearchChange = (text) => {
    setSearchText(text); // Update state with new text
    setIsButtonDisabled(text.trim() === '');
  };
  const handleSearchButton = () => {
    navigation.navigate("Search", { text: searchText });
    setSearchText('');
  }

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getData();
  }, [userData]);

  const getData = async () => {
    try {
      const dannn = await AsyncStorage.getItem('userInfo');
      const userInfo = await JSON.parse(dannn);
      setUserData(userInfo);
    } catch (e) {      
      // console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1}}>
          <View>
            <View style={styles.header}>
            
              <View style={styles.headerTextWelcomeContainer}>
                <View style={{flexDirection:"row",alignItems:"baseline",justifyContent:"space-between",width:"100%"}} >
                  <View>
                    <Image source={welcomeBackImage } style={{width:30,height:30}}/>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "flex-end" }} >
                     <Text style={styles.userInfoText}>
                    {userData.name + ' ' + userData.lastname}
                </Text>
                <Text style={styles.welcomeText}>مرحبا</Text>
                  </View>
               </View>
              </View>
                <View style={{backgroundColor:"#198E52",marginBottom:30,width:"100%",height: 150,borderRadius: 20,flexDirection: "row",alignItems: "center",justifyContent: "space-between"}} >
                 <Image source={lawLogo} style={{width:100,height:100}} />
                <View>
                  <Text style={{color:"#fff",width:"90%",fontSize: 11,fontWeight:"700"}} >- تواصل مع مختلف الجهات القانونية</Text>
                  <Text style={{color:"#fff",width:"90%",fontSize:11,fontWeight: "700"}} >- اطلع على اهم القوانين الجزاىرية في مختلف المجالات</Text>
                  <Text style={{color:"#fff",width:"90%",fontSize:11,fontWeight:"700"}} >- استلم الوثائق القانونية في الوقت المناسب</Text>
                 </View>
             </View>
            </View>
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <TextInput
                  style={styles.searchTextInput}
                  placeholder="مالذي تريد البحث عنه ؟"
                  onChangeText={handleSearchChange}
                  value={searchText}
                />
              </View>
              <TouchableOpacity
                disabled={isButtonDisabled}
                style={styles.searchImageContainer}
                onPress={handleSearchButton}
              >
                <Image source={search} style={styles.searchImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.typesContainer}>
              <FlatList
                data={jobTypes}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.tab(activeJobType, item.name)}
                    key={item.id}
                    onPress={() => navigation.navigate(item.link)}>
                    <Text style={styles.tabText(activeJobType, item.name)}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => String(index)}
                contentContainerStyle={{columnGap: 12}}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
        <View style={{width: '100%'}}>
          <View style={{marginTop: 20, marginBottom: 20}}>
            <Text style={{textAlign: 'right',fontWeight:"600"}}>ونقترح قراءة المزيد عن:</Text>
          </View>
          <FlatList
            style={{width:"100%"}}
            data={condition}
            numColumns={2}
            columnWrapperStyle={{gap: 1}}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.readItem}
                key={item.id}
                onPress={() => 
                  navigation.navigate("Detailscreen",{law:item.name})
                }>
                <Text style={styles.readItemTitle}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
