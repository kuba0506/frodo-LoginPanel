interface Defaults {
    lang : string;
    version: string;
    provider: string[];
    device: string;
    clientId: string;
    redirectUri: string;
    scope: string;
}

interface FrodoConfig  {
    currentForm: string;
    forms: string[];
    body: string;
    frodoWrapper: string;
    frodo: string;
    frodoOverlay: string;
    frodoForm: string;
    frodoHeader: FrodoHeader;
    frodoLogin: FrodoLogin;
    log: string;
    social: string;
    frodoVisible: string;
    hideClass: string;
    noScroll: string;
    errorClass: ErrorClass;
    method: string;
    submitUrl: string;
    forgotLink: string;
    signUpLink: string;

}

interface FrodoHeader {
    header: string;
    text: string;
    closeBtn: string;
}

interface FrodoLogin {
    box: string;
    message: string;
    messageAlert: string;
    messageSuccess: string;
    frodoProvider: string;
    frodoProviderMobile: string;
    input: string;
    inputWrapper: string;
    inputError: string;
    footer: string;
    linksWrapper: string;
    forgot: string;
    signUp: string;
    submit: string;
}

interface ErrorClass {
    input: string;
    msg: string;
}

interface Translation {
    'en': Language;
    'se': Language;
    'dk': Language;
    'no': Language;
    'ar': Language;
}

interface Language {
    loginTxt: string;
    signUpTxt: string;
    resetTxt: string;
    userPlaceholder: string;
    passPlaceholder: string;
    passConfirmPlaceholder: string;
    emailPlaceholder: string;
    emailResetPlaceholder: string;
    links: string[];
    login: string;
    logWith: string;
    errors: LangError;
}

interface LangError {
    email: string;
    password: string;
    passwordNotMatch: string;
    fullname: string;
}

interface Social {
    'eniro': SocialBtn;
    'facebook': SocialBtn;
    'twitter': SocialBtn;
    'google': SocialBtn;
    'linkedin': SocialBtn;
    'android': SocialBtn;
    'skype': SocialBtn;
}

interface SocialBtn {
    text: string;
    link: string;
}