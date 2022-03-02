import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import HomeScreen from './screen/HomeScreen';
import SinhVien from './screen/SinhVien';
import MonHoc from './screen/MonHoc';
import Hoc from './screen/Hoc';
import AddSV from './screen/AddSV';
import FromSV from './screen/FromSV';
import AddMH from './screen/AddMH';
import FromMH from './screen/FromMH';
import AddHOC from './screen/AddHOC';
import FromHOC from './screen/FromHOC';

const AppNavigator = createStackNavigator({
    HomeScreen:{
        screen:HomeScreen
    },
    SinhVien:{
        screen:SinhVien
    },
    MonHoc:{
        screen:MonHoc
    },
    Hoc:{
        screen:Hoc
    },
    AddSV:{
        screen:AddSV
    },
    FromSV:{
        screen:FromSV
    },
    AddMH:{
        screen:AddMH
    },
    FromMH:{
        screen:FromMH
    },
    AddHOC:{
        screen:AddHOC
    },
    FromHOC:{
        screen:FromHOC
    }

});

export default createAppContainer(AppNavigator);