import VoxeetSdk from '@voxeet/voxeet-web-sdk';

export default class Sdk {
    constructor() {
        throw new Error("Don't instanciate !");
    }

    static create() {
        console.log("console.log(Sdk.instance);",Sdk.instance);

        if (!Sdk.instance) {
            Sdk.instance = new VoxeetSdk();
        }
        return Sdk.instance;
    }

    static destroy() {
        console.log("console.log(Sdk.instance);",Sdk.instance);
        Sdk.instance = undefined;
    }

    static setSdk(sdk) {
        console.log("console.log(Sdk.instance);",Sdk.instance);
        Sdk.instance = sdk;
    }
}
