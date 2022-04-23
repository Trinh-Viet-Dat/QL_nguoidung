import axios from "axios";
import React, { useState, useEffect } from "react";
import FormSignUp from "../Components/FormSignUp";
import Task from "../Components/Task";

function QL() {
    const url = `http://localhost:8080/api/forms`
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(url).then(res => {
            setData(res.data)
        })
    }, [data])
    const initValue = {

        fistName: "",
        lastName: "",
        email: "",
        birthday: "",
        gender: "",
        useName: "",
        password: "",
        repeatpassword: ""
    }
    const [value, setValue] = useState(initValue)
    const [isOpen, setIsOpen] = useState(false)
    const [idEdit, setIdEdit] = useState()
    const handleSignUp = (id) => {
        setIdEdit(id)
        console.log(id);
        if (id > 0) {
            axios.get(`${url}/${id}`).then(res => {
                const { fistName, lastName, email, birthday, gender, useName, password, repeatpassword } = res.data;
                setValue({
                    fistName,
                    lastName,
                    email,
                    birthday,
                    gender,
                    useName,
                    password,
                    repeatpassword
                })
            })
        }
        else {
            setValue(initValue)
        }
        setIsOpen(!isOpen)
    }
    const handleSaveSignUp = (value) => {
        console.log(idEdit);
        if (idEdit) {
            axios.patch(`${url}/${idEdit}`, value)
        } else {
            axios.post(`${url}`, value)
        }
    }
    const handleIsOpen = () => {
        setIsOpen(!isOpen)
    }
    const handleDelete = (id) => {
        axios.delete(`${url}/${id}`)
    }
    const [input, setInput] = useState("")
    const handleInput = (e) => {
        setInput(e.target.value)
    }
    return (
        <div style={{ padding: "10px" }}>
            <p style={{ fontSize: "30px", padding: "5px" }}>Nhân sự</p>
            <hr />
            <form style={{ padding: "5px" }}>
                <div className="row">
                    <div className="col">
                        <input type="text" style={{ marginLeft: "20px" }} onChange={handleInput} className="form-control" placeholder="Tìm kiếm" name="search" />
                    </div>
                    <div className="col">
                        <button style={{ margin: "4px", marginLeft: "60%" }} value="0" onClick={(id) => handleSignUp(id.target.value)} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Thêm nhân viên
                        </button>
                    </div>
                </div>
            </form>
            <hr />
            <FormSignUp idEdit={idEdit} value={value} isOpen={isOpen} handleSaveSignUp={handleSaveSignUp} handleIsOpen={handleIsOpen} />
            <Task input={input} data={data} handleDelete={handleDelete} url={url} handleSignUp={handleSignUp} />
        </div>
    )
}
export default QL;