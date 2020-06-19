import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../theme";
import { saveSettings, SettingsPayload } from "../../store/actions";
import { connect } from "react-redux";
import { enter } from "./strings.json";
import {Header, SafeAreaViewBackground} from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SplashScreen from "react-native-splash-screen";

interface StartupScreenState {

}

interface StartupScreenProps {
  navigation: any;
  settings: SettingsPayload;
  saveSettings: typeof saveSettings;
}

class StartupScreen extends Component<StartupScreenProps, StartupScreenState> {
    timer: number | null = null;

    componentDidMount() {
        this.timer = setTimeout(() => {
            SplashScreen.hide();
        }, 500);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        console.log(this.props.settings)
        return (
            <SafeAreaViewBackground>
                <Header
                    title={enter}
                />
                <KeyboardAwareScrollView
                    bounces={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View style={styles.container}>

                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaViewBackground>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: colors.background,
  },
});

const mapStateToProps = (state: any) => ({
  settings: state.settings,
});

const mapDispatchToProps = {
  saveSettings: saveSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartupScreen);
