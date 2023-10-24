const isDev = process.env.NODE_ENV !== 'production';

export default class C_Config
{
    public static SERVER_URL:string = isDev ? "http://192.168.0.152:8080" : "http://35.156.32.98/api";
    public static IMG_URL:string = isDev ? "http://192.168.0.152/" : "http://35.156.32.98/imgcache/";
    public static URL_BASE:string = isDev ? "http://192.168.0.152:8081/" : "http://35.156.32.98";

    public static USD_TO_BGN:number = 1.83;


}
