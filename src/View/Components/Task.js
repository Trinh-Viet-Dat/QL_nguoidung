import { useState } from "react";

function Task(props) {
    const { data, inputSearch } = props;
    const handleDelete = (id) => {
        props.handleDelete(id)
    }
    const [isOpen, setIsOpen] = useState(false)
    const handleSignUp = (id) => {
        props.handleSignUp(id)
        setIsOpen(!isOpen)
    }
    return (
        <table className="table">
            <thead>
                <tr style={{ textAlign: "center" }}>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th style={{ width: "270px" }}>Email</th>
                    <th scope="col">Birthday</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Title</th>
                </tr>
            </thead>
            <tbody>
                {data?.filter(
                    e => {
                        return (
                            (e.fistName.toUpperCase().includes(inputSearch.name) || e.lastName.includes(inputSearch.name)) & e.gender.includes(inputSearch.genders)
                        )
                    }
                ).map((e, index) => (
                    <tr key={index} style={{ textAlign: "center" }}>
                        <th scope="row">{e.id}</th>
                        <td>{e.fistName + " " + e.lastName}</td>
                        <td>{e.email}</td>
                        <td>{e.birthday}</td>
                        <td>{e.gender}</td>
                        <td>
                            <button type="button" onClick={() => handleSignUp(e.id)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Sửa thông tin
                            </button>
                            &nbsp;
                            <button type="button" style={{ background: "red", border: "none" }} onClick={() => handleDelete(e.id)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Xóa Nhân viên
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default Task;