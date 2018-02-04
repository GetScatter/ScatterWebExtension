export default class StringHelpers {

    static camelToTitle(camel){
        return camel
            .replace(/([A-Z])/g, (match) => ` ${match}`)
            .replace(/^./, (match) => match.toUpperCase());
    }

}