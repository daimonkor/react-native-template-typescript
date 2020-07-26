module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
        "transform-export-extensions",
        [
            "babel-plugin-inline-import",
            {
                extensions: [".svgr"],
            },
        ]]

};
