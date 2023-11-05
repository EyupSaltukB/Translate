import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLanguages, translateText, } from "../redux/actions/translateActions"
import Select from "react-select";
import { clearAnswer } from "../redux/slices/translateSlice";
import {FaExchangeAlt} from 'react-icons/fa'

const MainPage = () => {
    const state = useSelector((store) => store.translateSlice);
    const dispatch = useDispatch();

    // çevrilecek metnin state'i
    const [text, setText] = useState('');

    // kaynak dil ve ilk değeri Türkçe
    const [sourceLang, setSourceLang] = useState({
        value: 'tr',
        label: 'Turkish',
    });
    // hedef dil ve ilk değeri İngilizce
    const [targetLang, setTargetLang] = useState({
        value: 'en',
        label: 'English',
    });

    // uygulmanın ilk ekrana gelme anını izleme
    useEffect(() => {
        // dilleri al store'a aktar
        dispatch(getLanguages());
    }, []);

    const handleChange = () => {
        setTargetLang(sourceLang);
        setSourceLang(targetLang);
        // input temizliği
        setText('');
        dispatch(clearAnswer());
    }

    return (
        <div className="main-page">
            <div className="container">
                <h1>Çeviri +</h1>

                <div className="translate-area">
                    {/* sol kısım */}
                    <div className="left">
                        <Select
                            value={sourceLang}
                            onChange={(e) => setSourceLang(e)}
                            isDisabled={state.isLoading}
                            isLoading={state.isLoading}
                            className="select"
                            options={state.languages}
                        />
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                    </div>
                    {/* orta */}
                    <button
                        onClick={handleChange}
                        className="change-btn"><FaExchangeAlt/></button>
                    {/* sağ kısım */}
                    <div className="right">
                        <Select
                            isLoading={state.isLoading}
                            isDisabled={state.isLoading}
                            options={state.languages}
                            value={targetLang}
                            onChange={(e) => setTargetLang(e)}
                            className="select"
                        />
                        <textarea
                            disabled
                            value={state.answer}>
                        </textarea>
                    </div>
                </div>

                <button
                    onClick={() => dispatch(translateText({ sourceLang, targetLang, text }))}
                    className="submit-btn">Çevir</button>
            </div>
        </div>
    )
}

export default MainPage;