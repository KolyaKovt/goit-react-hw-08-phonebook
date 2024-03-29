import { useDispatch, useSelector } from "react-redux"

import { selectFilteredContacts } from "../Redux/contacts/slice"
import { deleteContactThunk } from "../Redux/contacts/operations"

export const ContactsList = () => {
  const dispatch = useDispatch()
  const contacts = useSelector(selectFilteredContacts)

  return (
    <div className="overflow-x-auto pb-5">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={contact.id}>
              <th>{index + 1}</th>
              <td>{contact.name}</td>
              <td>{contact.number}</td>
              <td>
                <button className="btn btn-ghost btn-xs" onClick={() => dispatch(deleteContactThunk(contact.id))}>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
