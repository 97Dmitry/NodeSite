import React, {useState} from "react";
import {useHttp} from "../hooks/http.hook";


export const AuthPage = () => {
    const {request, loading} = useHttp()
    const [form, setForm] = useState({
        username: "", email: "", password: ""
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registrationHandler = async () => {
        try {
            const data = await request("/api/auth/registration", "POST", {...form})
            console.log('Data', data)
        } catch (event) {
        }
    }

    return (
        <div>
            <div className="card blue-grey darken-1">
                <div className="card-content black-text">
                    <span className="card-title">Регистрация</span>
                    <div className="row">
                        <form className="col s12">
                            <div className="row row__input">
                                <div className="input-field col">
                                    <input placeholder="Введите username"
                                           id="username"
                                           type="text"
                                           name="username"
                                           className="username"
                                           aria-autocomplete="list"
                                           onChange={changeHandler}
                                    />
                                    {/*<label htmlFor="username">Username</label>*/}
                                </div>
                                <div className="input-field col">
                                    <input placeholder="Введите email"
                                           id="email"
                                           type="text"
                                           name="email"
                                           className="emile"
                                           aria-autocomplete="list"
                                           onChange={changeHandler}
                                    />
                                    {/*<label htmlFor="email">Email</label>*/}
                                </div>
                                <div className="input-field col">
                                    <input placeholder="Введите password"
                                           id="password"
                                           type="password"
                                           name="password"
                                           className="password"
                                           aria-autocomplete="list"
                                           onChange={changeHandler}
                                    />
                                    {/*<label htmlFor="password">Password</label>*/}
                                </div>
                                {/*<div className="input-field col">*/}
                                {/*    <input placeholder="Повторите password"*/}
                                {/*           id="password"*/}
                                {/*           type="password"*/}
                                {/*           name="password2"*/}
                                {/*           className="password2"*/}
                                {/*           onChange={changeHandler}*/}
                                {/*    />*/}
                                {/*<label htmlFor="password">Password</label>*/}
                                {/*</div>*/}
                            </div>
                        </form>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4"
                                disabled={loading}
                        >Войти
                        </button>
                        <button className="btn grey lighten-1 black-text"
                                onClick={registrationHandler}
                                disabled={loading}
                        >Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
