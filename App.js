// App.js

import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./App/PublicScreens/LoginScreen/Login";
import Signin from "./App/PublicScreens/SigninScreen/Signin";
import Signup from "./App/PublicScreens/SignupScreen/Signup";
import Home from "./App/Screens/HomeScreen/Home";
import ForgotPassword from "./App/PublicScreens/ForgotPasswordScreen/ForgotPassword";
import Footer from "./App/Common/Footer/Footer";
import Cart from "./App/Screens/CartScreen/Cart";
import Categories from "./App/Screens/CategoriesScreen/Categories";
import New from "./App/Screens/New/New";
import Discount from "./App/Screens/Discount/Discount";
import Profile from "./App/Screens/ProfileScreen/Profile";
import EditProfile from "./App/Screens/ProfileScreen/EditProfile";
import WishList from "./App/Screens/WishList/WishList";
import BookDetails from "./App/Screens/BookDetails/BookDetails";
import From0To2 from "./App/Screens/CategoriesScreen/From0To2";
import From9To12 from "./App/Screens/CategoriesScreen/From9To12";
import From2To4 from "./App/Screens/CategoriesScreen/From2To4";
import From3To6 from "./App/Screens/CategoriesScreen/From3To6";
import InteractiveBooks from "./App/Screens/CategoriesScreen/InteractiveBooks";
import YoungAdults from "./App/Screens/CategoriesScreen/YoungAdults";

import store, { persistor } from "./App/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import CheckoutScreen from "./App/Screens/CheckoutScreen/CheckoutScreen";

const Stack = createStackNavigator();


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ footer: () => <Footer /> }}
            />
            <Stack.Screen
              name="Categories"
              component={Categories}
              options={{ footer: () => <Footer /> }}
            />
            <Stack.Screen
              name="New"
              component={New}
              options={{ footer: () => <Footer /> }}
            />
            <Stack.Screen
              name="Discount"
              component={Discount}
              options={{ footer: () => <Footer /> }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ footer: () => <Footer /> }}
            />
            <Stack.Screen
              name="WishList"
              component={WishList}
              options={{ footer: () => <Footer /> }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{ footer: () => <Footer /> }}
            />
            <Stack.Screen
              name="BookDetails"
              component={BookDetails}
              options={{ footer: () => <Footer /> }}
            />
            <Stack.Screen name="From0To2" component={From0To2} />
            <Stack.Screen name="From2To4" component={From2To4} />
            <Stack.Screen name="From3To6" component={From3To6} />
            <Stack.Screen name="From9To12" component={From9To12} />
            <Stack.Screen name="InteractiveBooks" component={InteractiveBooks} />
            <Stack.Screen name="YoungAdults" component={YoungAdults} />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={({ navigation }) => ({
                footer: () => <Footer navigation={navigation} />,
              })}
            />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

