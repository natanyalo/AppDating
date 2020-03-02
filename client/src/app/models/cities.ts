import {Coordinates} from './coordinates'
export class Cities {
    private static cities: Cities;
    public  MapCities: Map<string, Coordinates>;
    private constructor() {
        this.MapCities = new Map<string, Coordinates>();
        this.MapCities.set('Jerusalem', { lat: 31.7690392, lon: 35.216331 });
        this.MapCities.set('Tel Aviv', { lat: 32.818409, lon: 34.9884987 });
        this.MapCities.set('Haifa', { lat: 31.7690392, lon: 35.216331 });
        this.MapCities.set('Ashdod', { lat: 32.818409, lon: 34.9884987 });
        this.MapCities.set('Rishon LeẔiyyon', { lat: 31.9710197, lon: 34.7893906 });
        this.MapCities.set('Petaẖ Tiqwa', { lat: 32.0870705, lon: 34.8874702 });
        this.MapCities.set('Beersheba', { lat: 31.2518101, lon: 34.7913017 });
        this.MapCities.set('Netanya', { lat: 32.3329086, lon: 34.8599205 });
        this.MapCities.set('H̱olon', { lat: 32.0103416, lon: 34.7791786 });
        this.MapCities.set('Bnei Brak', { lat: 32.0807419, lon: 34.8338013 });
        this.MapCities.set('Reẖovot', { lat: 31.8942108, lon: 34.8119888 });
        this.MapCities.set('Bat Yam', { lat: 32.0237885, lon: 34.7518501 });
        this.MapCities.set('Ramat Gan', { lat: 32.0822716, lon: 34.8106499 });
        this.MapCities.set('Ashkelon', { lat: 31.66926, lon: 34.5714912 });
        this.MapCities.set('Herzliya', { lat: 32.1749992, lon: 34.9069405 });
        this.MapCities.set('Kfar Saba', { lat: 32.1836014, lon: 34.8738594 });
        this.MapCities.set('Hadera', { lat: 32.4419212, lon: 34.9039001 });
    }
    public static getCities():Cities {
        return !this.cities ? new Cities(): this.cities; 
    }
}