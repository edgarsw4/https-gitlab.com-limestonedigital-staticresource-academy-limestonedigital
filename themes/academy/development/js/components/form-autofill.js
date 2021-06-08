// https://developers.google.com/identity/sign-in/web/build-button
class Autofiller {
    constructor(fields, buttonSelector = '#google-button', layersSelector = '.google-button-hide-layer') {
        this.fields = fields;
        this.buttonSelector = buttonSelector;
        this.layersSelector = layersSelector;
        this.auth2;
    }

    startApp() {
        gapi.load('auth2', () => {
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            this.auth2 = gapi.auth2.init({
                client_id: '948576100735-9glr4j58af3n4gdjub6f5fb15n7o1pda.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                // Request scopes in addition to 'profile' and 'email'
                //scope: 'additional_scope'
            });
            this._attachButton();
        });
    };

    _attachButton() {
        const button = document.querySelector(this.buttonSelector);

        if (button) {
            this.auth2.attachClickHandler(button, {},
            (googleUser) => {
                this._fillForm(googleUser);
                this._hideButton();
                this._signOut();

            }, (error) => {
                console.error(JSON.stringify(error, undefined, 2));
            });
        }
    }

    _fillForm(googleUser) {
        const profile = googleUser.getBasicProfile();

        for (const fieldName in this.fields) {
            const element = document.querySelector('[name="'+fieldName+'"]');
            const fnName = this.fields[fieldName];
            if (typeof profile[fnName] === "function") {
                element.value = profile[fnName](); // call profile.getEmail() etc.
                element.dispatchEvent(new Event('input'));
            } else {
                console.error(`profile.${fnName} function dont exist.`);
            }
        }
    }

    _hideButton() {
        const layers = document.querySelectorAll(this.layersSelector);

        if (layers.length > 0) {
            for (let layer of layers) {
                layer.classList.add('hidden');
            }
        } else {
            document.querySelector(this.buttonSelector).classList.add('hidden');
        }
    }

    _signOut() {
        this.auth2.signOut().catch(console.error);
    }
}

export function formAutofill(...args) {
    if (args[0] && typeof gapi !== 'undefined' && gapi) {
        const filler = new Autofiller(...args);
        filler.startApp();
    }
}
