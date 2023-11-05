import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constants/constants";

export const getLanguages = createAsyncThunk(
    "getLanguages", async () => {
        // constant'ta metod get olarak tanımlandığı için 
        // tekrar get olarak tanımlamaya gerek yok
        // API İSTEĞİ
        const res = await axios.request(options);

        const data = res.data.data.languages;

        /*
       Diziyi dönüp her objesi için value ve label değerlerine sahip
       yeni obje oluşturup
       value'lara -> kodu
       label'a da -> name eşitlendi... 
        */
        const refinedData = data.map((item) => ({
            value: item.code,
            label: item.name,
        }));

        // oluşturduğumuz asenkron aksiyonun slice'a aktaracağı veri
        // => (payload)
        return refinedData;
    });

export const translateText = createAsyncThunk(
    "translate", async (params) => {

        //  istekle alakalı API ayarları
        const encodedParams = new URLSearchParams();
        encodedParams.set('source_language', params.sourceLang.value);
        encodedParams.set('target_language', params.targetLang.value);
        encodedParams.set('text', params.text);

        const options = {
            method: 'POST',
            url: 'https://text-translator2.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '50a0910dacmshf301a82095d56e5p119f19jsnf2f65f7f0714',
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            },
            data: encodedParams,
        };

        const res = await axios.request(options);

        // veriyi slice'a gönderme (payload ekler)
        return res.data.data.translatedText;
    })