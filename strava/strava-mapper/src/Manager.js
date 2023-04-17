const Secrets = require("./Secrets.json");

class SecretManager {
    constructor() {
        // not that secure
        this.CLIENT_ID = Secrets["CLIENT_ID"];
        this.CLIENT_SECRET = Secrets["CLIENT_SECRET"];
        this.ACCESS_TOKEN = Secrets["ACCESS_TOKEN"];
        this.REFRESH_TOKEN = Secrets["REFRESH_TOKEN"];
        this.GOOGLE_API_KEY = Secrets["GOOGLE_API_KEY"];
        this.KIRK_ID = Secrets["KIRK_ID"];
        this.OAUTH_CODE = Secrets["OAUTH_CODE"];
    }
}
const SECRET_MANAGER = new SecretManager();

export { SECRET_MANAGER };
