export class AddressUtils {

    static normalize(address) {
        if (!address) {
            return "";
        }
        return address
            .toLowerCase()
            .replace("ł", "l")
            .replace("ż", "z")
            .replace("ź", "z")
            .replace("ą", "a")
            .replace("ę", "e")
            .replace("ć", "c")
            .replace("ó", "o")
            .replace("ś", "s")
            .replace("ń", "n")
    }

    static areEqual(addr1, addr2) {
        return addr1.toLowerCase() === addr2.toLowerCase();
    }
}