class Utils {
    *getIdGenerator() {
        let id = 0;

        while (true) {
            yield ++id;
        }
    }
}

module.exports = new Utils();